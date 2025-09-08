// .docs-espejo/lib/actions/telemetry/logTelemetryEvent.action.ts.md
/**
 * @file .docs-espejo/lib/actions/telemetry/logTelemetryEvent.action.ts.md
 * @description Documento Espejo y SSoT conceptual para la Server Action `logTelemetryEvent`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `logTelemetryEvent.action.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Punto de Ingesta Canónico** para todos los eventos de telemetría generados por el cliente. Actúa como una Server Action soberana y "fire-and-forget", cuya única responsabilidad es recibir, validar y registrar de forma segura los datos de comportamiento del usuario.

Su propósito estratégico es desacoplar la recolección de datos en el frontend de su procesamiento y persistencia en el backend, proporcionando una API de servidor robusta y segura para la observabilidad del comportamiento del usuario.

## 2. Arquitectura y Flujo de Ejecución

La acción sigue un patrón de "decorador" donde la función pública envuelve la lógica de negocio con el contexto de correlación.

```mermaid
graph TD
    A[Cliente invoca `logTelemetryEvent`] --> B{withCorrelationId};
    subgraph "Contexto de Logging Transaccional"
        B --> C[Valida payload con `TelemetryEventSchema`];
        C -- Falla --> D[Log `warn` y retorna error];
        C -- Éxito --> E[Log `info` con evento validado];
        E --> F["(Futuro) Persistencia en DB"];
        F --> G[Retorna éxito];
    end
3. Contrato de API
logTelemetryEvent(eventData: unknown): Promise<ActionResult<boolean>>
Entrada: eventData: Los datos crudos del evento, de tipo unknown para forzar la validación.
Salida: Una Promise que resuelve a un ActionResult simple, indicando si el evento fue recibido y validado correctamente.
4. Zona de Melhorias Futuras
Persistencia en Base de Datos: (Prioridad Crítica) La mejora más importante es añadir la lógica para insertar el evento validado en una tabla telemetry_events en Supabase.
Enriquecimiento de Datos del Servidor: Enriquecer el payload del evento con datos solo disponibles en el servidor, como la información de GeoIP derivada de la IP de la petición.
Procesamiento en Lote (Batching): Modificar el TelemetryProvider en el cliente para que agrupe varios eventos y los envíe en una única llamada a esta Server Action, reduciendo el número de peticiones de red.
Autenticación de la Acción: Requerir un token de API o una sesión de usuario para invocar esta acción, previniendo el envío de eventos por parte de actores no autorizados.
Tipado de Payloads de Eventos: Crear schemas Zod específicos para el payload de cada eventName (ej. PageViewPayloadSchema), y usar un discriminatedUnion en el schema principal para una validación de payload de élite.
Envío a Múltiples Destinos: Refactorizar la acción para que, además de registrar el log, pueda enviar el evento a otros servicios de analítica (ej. Google Analytics, Mixpanel).
Manejo de Versiones de Eventos: Añadir un campo version al TelemetryEventSchema para facilitar la migración y el procesamiento de eventos si su estructura cambia en el futuro.
Rate Limiting: Aplicar un rate limiter a la acción para protegerla contra el abuso y los envíos masivos de eventos.
Pruebas de Integración: Escribir pruebas de integración que invoquen la Server Action con payloads válidos e inválidos y verifiquen que la lógica de validación y logging funciona correctamente.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/actions/telemetry/logTelemetryEvent.action.ts.md