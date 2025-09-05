// .docs-espejo/components/telemetry/TelemetryProvider.tsx.md
/**
 * @file .docs-espejo/components/telemetry/TelemetryProvider.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TelemetryProvider.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `TelemetryProvider`

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador soberano de la telemetría del cliente**. Su propósito es gestionar el ciclo de vida de la sesión del visitante, capturar eventos globales automáticos (vistas de página, scroll) y proveer una API segura y desacoplada (`useTelemetry`) para que el resto de la aplicación pueda registrar eventos de comportamiento.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`)** que implementa el patrón "Proveedor de Contexto".
*   **Gestión de Sesión:** Utiliza `next-client-cookies` para crear y persistir un `sessionId` único por visitante.
*   **Captura de Eventos Globales:** Utiliza `useEffect` para registrar automáticamente eventos de `PAGE_VIEW` (al cambiar de ruta) y `SCROLL_DEPTH`.
*   **Frontera de Confianza (Zod):** No valida sus propias props. Su rol es **construir y enviar** un objeto de evento que debe cumplir con el contrato `TelemetryEventSchema`. La validación con Zod ocurre en la Server Action (`logTelemetryEvent.action.ts`), que es la "frontera" del servidor, garantizando que solo datos válidos sean persistidos.

## 3. Contrato de API
### Componente (`TelemetryProvider`):
*   **Props de Entrada:** `{ children: ReactNode }`.
*   **Efecto:** Provee el contexto de telemetría a sus hijos.

### Hook (`useTelemetry`):
*   **Salida:** `{ trackEvent: (eventName, payload) => void }`.

## 4. Zona de Melhorias Futuras
*   **EVENT BATCHING:** Implementar una lógica para agrupar varios eventos en un "buffer" y enviarlos en una única llamada a la Server Action para reducir el número de peticiones de red.
*   **OUTBOUND LINK TRACKING:** Capturar clics en enlaces que llevan fuera del sitio.
*   **TIME ON PAGE:** Registrar un evento `PAGE_LEAVE` usando la API `visibilitychange` o `beforeunload` para calcular el tiempo que un usuario pasa en una página.
*   **EXTRACCIÓN A HOOKS DEDICADOS:** La lógica de seguimiento de scroll y page view podría ser extraída a hooks personalizados (`usePageViewTracker`, `useScrollDepthTracker`) para una mayor limpieza y testeabilidad.
// .docs-espejo/components/telemetry/TelemetryProvider.tsx.md