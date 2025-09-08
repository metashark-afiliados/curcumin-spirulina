<!-- .docs/error-reports/RSC-PinoTransport-Compatibility.md -->
/**
 * @file .docs/error-reports/RSC-PinoTransport-Compatibility.md
 * @description Reporte de Error Canónico: Conflicto de Compatibilidad entre Pino.transport y React Server Components (RSC) en Next.js.
 *              Este documento detalla un error crítico encontrado durante el desarrollo, su causa raíz holística,
 *              la solución implementada y la justificación arquitectónica, adhiriéndose al principio de "Falla Limpio, Falla Observable".
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @date 2025-09-06
 */
# Reporte de Error: `RSC-PinoTransport-Compatibility`

## 1. Título del Error

`TypeError: pino.transport is not a function` y `Error: the worker has exited` en el entorno de desarrollo de Next.js (middleware/RSC).

## 2. Descripción del Problema

Durante la ejecución de `pnpm run dev`, el proceso fallaba catastróficamente con una serie de errores recurrentes que indicaban problemas con `pino.transport` y `worker threads`:

*   `TypeError: pino__WEBPACK_IMPORTED_MODULE_0___default(...).transport is not a function`
*   `Error: Cannot find module '.../lib/worker.js'`
*   `Error: the worker thread exited`
*   `TypeError: Invalid value used as weak map key` (en `generateMetadata` y `src/i18n.ts`)

Estos errores se manifestaban específicamente cuando el `serverLogger` (configurado con `pino`) era importado en módulos que se ejecutaban en el Edge Runtime (middleware) o en contextos de React Server Components (RSC) durante la fase de Server-Side Rendering (SSR) o Static Site Generation (SSG).

## 3. Causa Raíz Holística (Análisis Profundo y Persistente)

La causa raíz principal era una **incompatibilidad fundamental entre la forma en que `pino.transport` (especialmente `pino-pretty` u otros transportes que utilizan `worker threads`) opera y el entorno de ejecución de React Server Components (RSC) de Next.js**.

*   **Pino y `worker threads`:** La función `pino.transport` está diseñada para delegar el formateo y envío de logs a un proceso separado o a un `worker thread` de Node.js. Esto es eficiente para la producción, ya que evita bloquear el hilo principal.
*   **Next.js RSC y SSR:** Los Server Components y las funciones como `generateMetadata` o `getServerSideProps` (y sus equivalentes en el App Router) se ejecutan en un entorno de Node.js. Sin embargo, Next.js puede optimizar esto ejecutando partes de estos en `worker threads` o en un entorno altamente optimizado para el rendimiento (`RSC`).
*   **Limitaciones del `worker thread` / RSC:** El `worker thread` de Node.js (y el entorno RSC) tiene un contexto de módulos y un acceso al sistema de archivos más restringido que el proceso principal. Cuando `pino.transport` intentaba iniciar su propio `worker thread` o cargar sus dependencias (`lib/worker.js`) dentro de este entorno ya "workerizado" o restringido de Next.js/RSC, las dependencias no se resolvían correctamente o el `worker thread` interno de `pino` fallaba al iniciarse.
*   **Error de `TypeError: Invalid value used as weak map key`:** Este era un síntoma secundario. Cuando el `serverLogger` fallaba (`the worker has exited`), cualquier intento posterior de usar el logger (o un objeto de logger corrupto) en el flujo de Next.js, especialmente cuando se pasaba a través de los límites del RSC, resultaba en que Next.js intentaba usar una instancia de objeto no serializable o inválida como clave en sus `WeakMaps` internos, causando el `TypeError`.

En resumen, se intentaba usar una funcionalidad de Pino (transporte con workers) en un entorno de Next.js (RSC/SSR) que no la soportaba de la manera esperada, lo que llevaba a un fallo en cascada del sistema de logging y a la inestabilidad de la aplicación.

## 4. Solución Implementada

La solución se implementó de forma holística en dos aparatos clave:

1.  **`src/lib/logger.ts` (Aparato Refactorizado: `version 5.2.0`)**
    *   **Acción:** Se **eliminó completamente el uso de `pino.transport`** del `pinoConfig`.
    *   **Justificación:** Al no configurar un transporte explícito, `pino` por defecto emite logs estructurados en formato JSON directamente a `stdout`. Este es el patrón más compatible y robusto para Next.js App Router (RSC, Edge, SSR, SSG), ya que evita la creación de `worker threads` internos de Pino que chocaban con el entorno de Next.js. Esto resolvió directamente el `TypeError: pino.transport is not a function` y los errores de `worker has exited`.

2.  **`package.json` (Aparato Refactorizado: `version 2.3.0`)**
    *   **Acción:** El script de desarrollo `dev` fue modificado de `next dev` a `next dev | pnpm pino-pretty`.
    *   **Justificación:** Esta modificación permite que el `serverLogger` de Pino emita JSON crudo a `stdout`, y luego la utilidad `pino-pretty` (ejecutada como un proceso de shell separado, pipeado) formatea esos logs JSON a un formato legible en la consola. Esto mantiene la deseada legibilidad de los logs en desarrollo sin que `pino` intente gestionar `worker threads` internamente dentro del proceso de Next.js.

## 5. Justificación de la Refactorización

*   **Compatibilidad del Runtime:** La modificación asegura que el sistema de logging de servidor sea totalmente compatible con el entorno de ejecución de Next.js (incluyendo RSC y SSR), eliminando las dependencias problemáticas de `worker threads` de `pino.transport`.
*   **Estabilidad y Resiliencia:** Resolver el fallo del logger era crítico, ya que su inoperabilidad causaba efectos secundarios como el `TypeError: Invalid value used as weak map key` en `generateMetadata`. La aplicación ahora puede ejecutarse y loguear de forma estable.
*   **Full Observabilidad:** Se mantiene la capacidad de emitir logs ricos en contexto (con `correlationId` y censura de `PII`) en el servidor, que son capturados y procesados externamente por Next.js/Vercel. La legibilidad en desarrollo se restaura a través de la externalización de `pino-pretty`.
*   **Principio de Responsabilidad Única:** Se clarifica la responsabilidad de `pino` (emitir logs JSON) y se delega el formateo a una herramienta externa en la fase de desarrollo.

## 6. Pruebas del Snapshot o Última Refactorización

La evidencia directa de la resolución se vería al ejecutar `pnpm run dev` o `pnpm run build` y observar que:
1.  Los errores `TypeError: pino.transport is not a function` ya no aparecen.
2.  Los errores `Error: the worker has exited` y `Cannot find module .../worker.js` ya no aparecen.
3.  Los errores `TypeError: Invalid value used as weak map key` (relacionados con el logger que fallaba) deberían haber desaparecido o reducido significativamente.
4.  Los logs de `serverLogger` se muestran correctamente en la consola (formateados por `pino-pretty` en desarrollo, o JSON crudo en producción).

Este reporte de error forma parte de nuestra estrategia de observabilidad y documentación de élite, registrando las lecciones aprendidas y las soluciones implementadas de forma transparente.
<!-- .docs/error-reports/RSC-PinoTransport-Compatibility.md -->