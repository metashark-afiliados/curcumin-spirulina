<!-- .docs-espejo/components/telemetry/TelemetryProvider.tsx.md -->
/**
 * @file .docs-espejo/components/telemetry/TelemetryProvider.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TelemetryProvider.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `TelemetryProvider`

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador soberano de la telemetría del cliente**. Su propósito es gestionar el ciclo de vida de la sesión del visitante, capturar eventos globales automáticos (vistas de página, scroll) y proveer una API segura y desacoplada (`useTelemetry`) para que el resto de la aplicación pueda registrar eventos de comportamiento. Se adhiere a la API de logging unificada del cliente (`src/lib/client-logger.ts`) para una observabilidad completa.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`)** que implementa el patrón "Proveedor de Contexto".
*   **Gestión de Sesión:** Utiliza `next-client-cookies` para crear y persistir un `sessionId` único por visitante.
*   **Event Batching:** Agrupa múltiples eventos antes de enviarlos a la Server Action (`logTelemetryEvent`) para optimizar el rendimiento de la red y reducir la carga del servidor.
*   **Captura de Eventos Globales:** Utiliza `useEffect` para registrar automáticamente eventos de `PAGE_VIEW` (al cambiar de ruta) y `SCROLL_DEPTH` en hitos específicos.
*   **Frontera de Confianza (Zod):** No valida sus propias props. Su rol es **construir y enviar** un objeto de evento que debe cumplir con el contrato `TelemetryEventSchema`. La validación con Zod ocurre en la Server Action (`logTelemetryEvent.action.ts`), que es la "frontera" del servidor, garantizando que solo datos válidos sean persistidos.
*   **Observabilidad:** Utiliza `clientLogger` (ahora con la firma `(context, message)`) para registrar su propio flujo y errores.

## 3. Contrato de API
### Componente (`TelemetryProvider`):
*   **Props de Entrada:** `{ children: ReactNode }`.
*   **Efecto:** Provee el contexto de telemetría a sus hijos.

### Hook (`useTelemetry`):
*   **Salida:** `{ trackEvent: (eventName, payload) => void }`: Un objeto que contiene la función para registrar eventos de telemetría.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **OUTBOUND LINK TRACKING:** Capturar clics en enlaces que llevan fuera del sitio, añadiendo un detector de eventos global o envolviendo los enlaces externos con un componente que dispare el evento.
*   **TIME ON PAGE:** Registrar un evento `PAGE_LEAVE` usando la API `visibilitychange` o `beforeunload` del navegador para calcular el tiempo que un usuario pasa en una página.
*   **EXTRACCIÓN A HOOKS DEDICADOS:** La lógica de seguimiento de scroll y page view podría ser extraída a hooks personalizados (`usePageViewTracker`, `useScrollDepthTracker`) para una mayor limpieza, testeabilidad y reutilización.
*   **FILTRADO Y MUESTREO DE EVENTOS CLIENTE:** Implementar una lógica en el `TelemetryProvider` para filtrar o muestrear eventos en el cliente (basado en configuraciones o `feature flags`) antes de que sean añadidos al buffer, reduciendo el ruido de los logs y la carga de procesamiento.
*   **RECUPERACIÓN DE ERRORES EN EL ENVÍO:** Implementar un mecanismo de reintento con "exponential backoff" para el envío de lotes de eventos si la Server Action `logTelemetryEvent` falla por problemas de red o del servidor.
<!-- .docs-espejo/components/telemetry/TelemetryProvider.tsx.md -->