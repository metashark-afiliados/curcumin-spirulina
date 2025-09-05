// .docs-espejo/sistema-telemetria.md
/**
 * @file .docs-espejo/sistema-telemetria.md
 * @description Documento Espejo y SSoT conceptual para el Sistema de Telemetría.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Sistema de Telemetría de Cliente

## 1. Rol Estratégico y Propósito

Este sistema es el **aparato soberano de recolección de datos de comportamiento del visitante**. Su propósito es capturar interacciones clave del usuario de forma performante y estructurada, para integrarlas en la plataforma de observabilidad central.

## 2. Arquitectura de Aparatos

El sistema se compone de aparatos atómicos con responsabilidades únicas:

*   **`TelemetryEvent.schema.ts` (Contrato):** La SSoT que define la forma de un evento.
*   **`logTelemetryEvent.action.ts` (Persistencia):** La Server Action que recibe y registra los eventos.
*   **`TelemetryProvider.tsx` (Orquestador):** El componente de cliente que gestiona la sesión y los eventos globales (vistas de página, scroll).
*   **`useTelemetry.ts` (API):** El hook que expone la funcionalidad a la UI.

## 3. Flujo de Datos

El flujo es unidireccional y desacoplado:
`UI -> useTelemetry() -> TelemetryProvider -> logTelemetryEvent.action.ts -> serverLogger`

## 4. Zona de Melhorias Futuras

*   **EVENTOS DE VIDEO:** Integrar con una librería de reproductor de video para capturar eventos como `VIDEO_PLAY`, `VIDEO_PAUSE`, `VIDEO_PROGRESS_25%`.
*   **MIDDLEWARE INTEGRATION:** Crear un manejador de middleware que capture el evento `SESSION_START` con datos enriquecidos del servidor (User-Agent, IP, Referrer) antes de que la página se renderice.
*   **EVENT BATCHING:** Implementar una lógica en el `TelemetryProvider` para agrupar varios eventos en un "buffer" y enviarlos en una única llamada a la Server Action para reducir el número de peticiones de red.
*   **OUTBOUND LINK TRACKING:** Capturar clics en enlaces que llevan fuera del sitio.
*   **TIME ON PAGE:** Registrar un evento `PAGE_LEAVE` usando la API `visibilitychange` o `beforeunload` para calcular el tiempo que un usuario pasa en una página.

// .docs-espejo/sistema-telemetria.md