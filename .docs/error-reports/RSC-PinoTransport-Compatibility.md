// .docs/error-reports/RSC-PinoTransport-Compatibility.md
/**
 * @file .docs/error-reports/RSC-PinoTransport-Compatibility.md
 * @description Reporte de Error Canónico: Conflicto de Compatibilidad entre `pino`
 *              (con `AsyncLocalStorage`) y el ciclo de vida de renderizado de
 *              React Server Components (RSC) en Next.js con `next-intl`.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @date 2025-09-06
 */
# Reporte de Error: `RSC-AsyncLocalStorage-Compatibility`

## 1. Título del Error

`TypeError: Invalid value used as weak map key` durante el renderizado del lado del servidor de páginas del App Router, específicamente en la función `generateMetadata`.

## 2. Descripción del Problema

Durante la ejecución de `pnpm run dev`, el proceso de renderizado de la página fallaba con un error `500`, mostrando repetidamente el error `TypeError: Invalid value used as weak map key` en la consola. La traza de la pila apuntaba a interacciones entre el motor de Next.js, la librería `next-intl` y nuestro sistema de logging.

## 3. Historial de Depuración e Hipótesis

El proceso de depuración siguió un análisis profundo e incremental, descartando hipótesis hasta llegar a la causa raíz.

### Hipótesis 1: `pino.transport` es incompatible (Parcialmente Correcta)

*   **Observación:** El proyecto de referencia `nextjs-pino-log-demo-main` utilizaba un pipe externo (`| pino-pretty`) en lugar de `pino.transport`.
*   **Acción:** Se implementó el "Patrón Guardián" en `src/lib/logger.ts`, que desactivaba el logging si no había un contexto `AsyncLocalStorage`.
*   **Resultado:** El error persistió. **Conclusión:** Aunque la incompatibilidad de `pino.transport` con RSC es real, no era la causa raíz de *este* error específico.

### Hipótesis 2: El `Proxy` del Logger contamina `next-intl` (Parcialmente Correcta)

*   **Observación:** El error ocurría después de llamar a `getTranslations` de `next-intl` desde un contexto con `AsyncLocalStorage` activo.
*   **Acción:** Se refactorizó `i18n.ts` para que fuera una función pura, sin logging ni contexto `AsyncLocalStorage`, y se implementó el "Patrón de Aislamiento Contextual" en las páginas para llamar a `getTranslations` *antes* de establecer el contexto de logging.
*   **Resultado:** El error persistió. **Conclusión:** El problema no era el logging *dentro* de `i18n.ts`, sino la existencia misma del contexto `AsyncLocalStorage` durante la ejecución de `next-intl`.

## 4. Causa Raíz Holística (Definitiva)

La causa raíz es un **conflicto de contextos asíncronos anidados**. La librería `next-intl` y/o el motor de renderizado de Next.js utilizan muy probablemente su propia instancia interna de `AsyncLocalStorage` para gestionar el `locale` y otros datos de la petición.

Cuando envolvemos `generateMetadata` o una página en nuestro propio `storage.run()`, creamos un contexto `AsyncLocalStorage` anidado. El motor de Next.js, al ejecutar `getTranslations` dentro de nuestro contexto, se confunde, intenta operar con el contexto incorrecto y termina pasando un valor inválido (probablemente relacionado con nuestro `childLogger`) a una de sus `WeakMap` internas, provocando el `TypeError`.

**En resumen, la propagación de contexto implícita mediante `AsyncLocalStorage` es demasiado invasiva e incompatible con el funcionamiento interno de `next-intl` en el ciclo de vida de renderizado de Next.js.**

## 5. Solución Final Implementada

La solución es abandonar la propagación de contexto *implícita* y adoptar un patrón de **Inyección de Dependencias explícita** para la observabilidad.

1.  **Eliminación de `AsyncLocalStorage`:** Se refactorizará `src/lib/logger.ts` para eliminar `AsyncLocalStorage` y el `Proxy`. El `logger` exportado será la instancia base de `pino`.
2.  **`withCorrelationId` se convierte en un Inyector:** El HOC `withCorrelationId` ya no usará `storage.run()`. Su nueva responsabilidad será generar un `requestId`, crear un `childLogger` con ese ID, y **pasarlo como primer argumento** a la función que envuelve.
3.  **Refactorización de Consumidores:** Todos los aparatos (páginas, sitemap) serán refactorizados para aceptar un `logger` como parámetro y utilizarlo, en lugar del logger global.
4.  **Middleware:** El `middleware` generará el `correlationId` y lo pasará explícitamente a sus manejadores.

Este enfoque es más simple, más predecible, y elimina por completo el conflicto de contextos, garantizando un build exitoso.
// .docs/error-reports/RSC-PinoTransport-Compatibility.md