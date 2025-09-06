// .docs/TODO.md
/**
 * @file .docs/TODO.md
 * @description Manifiesto de Tareas Pendientes y Hoja de Ruta para la refactorización
 *              final de la Arquitectura de Observabilidad.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @date 2025-09-06
 */
# Manifiesto de Tareas: Migración a Inyección de Dependencias Explícita

## 1. Misión

Resolver de forma definitiva el `TypeError: Invalid value used as weak map key` eliminando el uso de `AsyncLocalStorage` del ciclo de renderizado de Next.js y refactorizando la arquitectura de observabilidad a un patrón de **Inyección de Dependencias Explícita**.

## 2. Contexto del Problema

Nuestra arquitectura inicial basada en `AsyncLocalStorage` para la propagación implícita del `correlationId` ha demostrado ser incompatible con el funcionamiento interno de `next-intl` y el motor de renderizado de Next.js, causando un conflicto de contextos asíncronos que resulta en un error fatal.

## 3. Plan de Acción Atómico

La ejecución se realizará en el siguiente orden estricto, refactorizando cada aparato para que se ajuste al nuevo paradigma.

### ✅ Fase 1: Cimentar la Nueva Arquitectura (Completada)

1.  **Aparato: `src/lib/logger.ts`**
    *   **Acción:** Eliminar `AsyncLocalStorage` y el `Proxy`. Exportar una única instancia base de `pino`.
    *   **Estado:** `((Completado))`

2.  **Aparato: `src/lib/helpers/correlation-id.helper.ts`**
    *   **Acción:** Transformar el HOC `withCorrelationId` en `withLogger`. Su nueva responsabilidad es crear un `childLogger` e inyectarlo como primer argumento al handler envuelto. Eliminar `getCorrelationId`.
    *   **Estado:** `((Completado))`

### ⏳ Fase 2: Adaptar los Consumidores (Pendiente)

1.  **Aparato: `src/middleware.ts`**
    *   **Aparatos Afectados:** `src/middleware.ts`, `src/middleware/handlers/i18n/index.ts`, `src/lib/helpers/geoip.helper.ts`.
    *   **Acción:** Eliminar la dependencia de `withCorrelationId`. La función `middleware` generará el `correlationId` y lo pasará explícitamente a los manejadores.
    *   **Estado:** `((Pendiente))`

2.  **Aparato: `src/i18n.ts`**
    *   **Acción:** Eliminar toda la lógica de logging y `withCorrelationId` para convertirlo en una función pura, tal como se determinó en la investigación del bug.
    *   **Estado:** `((Pendiente))`

3.  **Aparatos de Página (Server Components)**
    *   **Aparatos Afectados:** `src/app/[locale]/page.tsx`, `src/app/[locale]/blog/page.tsx`, `src/app/[locale]/blog/[slug]/page.tsx`, `src/app/not-found.tsx`.
    *   **Acción:** Adaptar cada página para que utilice el HOC `withLogger`. La firma de sus funciones `generateMetadata` y del componente de página cambiará para aceptar `logger` como primer argumento. El logging se realizará a través de esta instancia inyectada.
    *   **Estado:** `((Pendiente))`

4.  **Aparatos de Lógica de Servidor**
    *   **Aparatos Afectados:** `src/lib/blog.ts`, `src/lib/schema.ts`, `src/components/server-only/*`.
    *   **Acción:** Refactorizar todas las funciones que actualmente usan el logger global para que acepten una instancia de `logger` como parámetro (Inyección de Dependencias).
    *   **Estado:** `((Pendiente))`

Al completar esta hoja de ruta, el sistema será estable, observable y estará arquitectónicamente alineado para un build exitoso.
// .docs/TODO.md