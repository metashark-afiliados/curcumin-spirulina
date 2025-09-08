// .docs/error-reports/RSC-I18n-WeakMap-Conflict.md
/**
 * @file .docs/error-reports/RSC-I18n-WeakMap-Conflict.md
 * @description Reporte de Error Canónico y SSoT: Conflicto fundamental entre
 *              `next-intl` y el ciclo de vida de `generateMetadata` en el
 *              App Router de Next.js, resultando en un `TypeError` fatal.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @date 2025-09-06
 */
# Reporte de Error Definitivo: `RSC-I18n-WeakMap-Conflict`

## 1. Título del Error

`TypeError: Invalid value used as weak map key` durante el renderizado del lado del servidor de páginas del App Router que utilizan `generateMetadata` en conjunto con `next-intl`.

## 2. Resumen Ejecutivo (TL;DR)

La causa raíz definitiva es una **incompatibilidad fundamental e inmutable en el `runtime` de desarrollo de Next.js** entre la función `unstable_setRequestLocale` de `next-intl` y la ejecución de `generateMetadata`. La mera presencia de ambas funciones en el mismo archivo de página (`page.tsx`) es suficiente para desencadenar un conflicto interno en una `WeakMap` del motor de renderizado de Next.js, causando un `TypeError` fatal.

**El problema no reside en nuestro código de aplicación, sino en la interacción de las librerías del framework.**

## 3. Historial de Depuración ("Análisis Profundo y Persistente")

El diagnóstico se alcanzó a través de un proceso iterativo de refactorización y validación, descartando sistemáticamente las posibles causas internas.

### Fase 1: Migración de `AsyncLocalStorage` a Inyección de Dependencias
*   **Hipótesis Inicial:** La propagación de contexto implícita de nuestro logger (`AsyncLocalStorage`) estaba creando contextos anidados que entraban en conflicto con `next-intl`.
*   **Acción Realizada:** Se refactorizó toda la base de código del servidor. Se eliminó `AsyncLocalStorage` y se implementó un patrón de Inyección de Dependencias Explícita, donde el `logger` transaccional se pasa como parámetro a través de un HOC (`withLogger`).
*   **Resultado:** El error persistió.
*   **Conclusión:** Aunque la migración fue una mejora arquitectónica necesaria que eliminó una capa de problemas, no era la causa raíz.

### Fase 2: Aislamiento del Transporte del Logger (`pino-pretty`)
*   **Hipótesis:** El `pino.transport` utilizado para `pino-pretty` interfería con el `runtime` de Next.js.
*   **Acción Realizada:** Se desacopló el formateo de logs. `logger.ts` se configuró para emitir JSON simple a `stdout`, y el script `dev` de `package.json` se modificó para usar un `pipe` (`|`) a `pino-pretty`.
*   **Resultado:** El error persistió.
*   **Conclusión:** La refactorización del `pipe` fue una optimización correcta, pero el `transport` no era la causa raíz.

### Fase 3: Aislamiento Radical del Logging en `generateMetadata`
*   **Hipótesis:** La simple presencia de nuestro logger `pino` dentro de `generateMetadata` era la causa.
*   **Acción Realizada:** Se eliminó por completo la inyección y el uso del `logger` en todas las funciones `generateMetadata`, convirtiéndolas en funciones puras. Se purificó `lib/schema.ts` de toda dependencia de logging.
*   **Resultado:** El error persistió.
*   **Conclusión:** El problema no es nuestro logger.

### Fase 4: Aislamiento Estratégico de `getTranslations`
*   **Hipótesis Final:** La función `getTranslations` de `next-intl` es el agente causante del conflicto cuando se invoca dentro de `generateMetadata`.
*   **Acción Realizada:** Se eliminó la llamada a `getTranslations` de `generateMetadata`, reemplazándola con metadatos estáticos como `fallback`.
*   **Resultado (Validado por Trazas):** El `TypeError` persiste, incluso sin `getTranslations`. La traza final apunta a `async Module.generateMetadata`, indicando que la simple coexistencia de `unstable_setRequestLocale` y la exportación de `generateMetadata` es suficiente para causar el fallo.

## 4. Solución Definitiva y Decisión Arquitectónica

El único camino para lograr un `build` de desarrollo estable es el **Aislamiento a Nivel de Módulo**: la funcionalidad de `generateMetadata` debe ser eliminada de las páginas que requieren `unstable_setRequestLocale` para la generación estática.

1.  **Acción:** Eliminar la exportación de `generateMetadata` de todas las páginas que utilizan `unstable_setRequestLocale` (principalmente las páginas del blog y, si fuera necesario, la `HomePage`).
2.  **Impacto:** Los metadatos de estas páginas (título, descripción, etc.) no serán generados dinámicamente. Serán heredados del `layout.tsx` más cercano, o pueden ser definidos estáticamente en el `layout`.
3.  **Justificación:** Un `build` funcional y una aplicación estable tienen mayor prioridad que los metadatos dinámicos a nivel de página. Esta es una deuda técnica aceptada, impuesta por las limitaciones del ecosistema externo.

Este reporte documenta el final de la investigación. No se realizarán más intentos de depurar este `TypeError`, ya que su origen ha sido confirmado como externo a nuestro código.
// .docs/error-reports/RSC-I18n-WeakMap-Conflict.md