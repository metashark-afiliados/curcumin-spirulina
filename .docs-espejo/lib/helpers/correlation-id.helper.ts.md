<!-- .docs-espejo/lib/helpers/correlation-id.helper.ts.md -->
/**
 * @file .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de ID de correlación.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `correlation-id.helper`

## 1. Rol Estratégico y Propósito

Este aparato es un pilar fundamental de la **Arquitectura de Observabilidad de Élite**. Su única y atómica responsabilidad es gestionar un **identificador único de correlación** (`correlationId`) para cada petición que llega al servidor.

Actúa como la Única Fuente de Verdad (SSoT) para la propagación de contexto en operaciones asíncronas del lado del servidor. Esto es crucial para:

1.  **Trazabilidad de Extremo a Extremo:** Enlazar todos los logs y eventos relacionados con una única petición, desde el middleware hasta las Server Actions y las llamadas a bases de datos.
2.  **Diagnóstico Simplificado:** Facilitar la depuración y el análisis de errores al permitir filtrar logs por un `correlationId` específico.
3.  **Coherencia del Contexto:** Asegurar que los datos contextuales (como el `correlationId`) estén disponibles en cualquier punto de la cadena de ejecución sin necesidad de pasarlos explícitamente a través de todas las funciones.

Su implementación no utiliza la directiva `"server-only"`, confiando en las capacidades de tree-shaking del bundler para una separación óptima de bundles, ya que su lógica se ejecuta exclusivamente en el runtime de Node.js (servidor).

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en la API nativa de Node.js `AsyncLocalStorage`, que proporciona un mecanismo para almacenar datos a lo largo del ciclo de vida de una petición asíncrona, de forma aislada.

```mermaid
sequenceDiagram
    participant Middleware
    participant withCorrelationId as withCorrelationId()
    participant Logger as logger.trace()
    participant ServerAction as Server Action
    participant getCorrelationId as getCorrelationId()

    Middleware->>withCorrelationId: 1. Envuelve la petición con el contexto de `correlationId`
    withCorrelationId->>withCorrelationId: 2. Genera/Reutiliza `correlationId` y lo registra en `AsyncLocalStorage`
    Middleware->>Logger: 3. Registra el inicio de la petición (incluye `correlationId`)
    Middleware->>ServerAction: 4. Invoca la lógica de la acción
    ServerAction->>Logger: 5. Llama a `logger.info()`
    Logger->>getCorrelationId: 6. Obtiene el ID del contexto actual de `AsyncLocalStorage`
    getCorrelationId-->>Logger: 7. Devuelve `correlationId`
    Logger->>Logger: 8. Inyecta el ID en el log JSON
    ServerAction-->>Middleware: 9. La acción finaliza
3. Contrato de API
getCorrelationId(): string | undefined:
Propósito: Recupera el identificador de correlación del contexto de ejecución actual.
Retorno: El string del correlationId si está disponible en el contexto, de lo contrario undefined.
withCorrelationId<R>(fn: () => R, correlationId?: string): R:
Propósito: Ejecuta una función de callback (fn) dentro de un nuevo contexto de AsyncLocalStorage que contiene el correlationId. Si se proporciona un correlationId existente, se reutiliza para mantener la trazabilidad; de lo contrario, se genera uno nuevo.
Parámetros:
fn: La función que encapsula la lógica de la petición, cuya ejecución se beneficiará del contexto del correlationId.
correlationId (opcional): Un identificador de correlación preexistente (ej. de una cabecera X-Request-ID de un gateway) para extender la trazabilidad.
Retorno: El valor retornado por la ejecución de la función fn.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Headers de Terciarios (Inbound): Mejorar withCorrelationId para que detecte y reutilice IDs de correlación de cabeceras estándar como X-Request-ID o traceparent (OpenTelemetry) si están presentes en la petición entrante. Esto extendería la trazabilidad a sistemas externos.
Propagación al Cliente (Outbound): Implementar un mecanismo para que el correlationId generado en el servidor pueda ser enviado al cliente (ej. a través de una cookie o una cabecera de respuesta) para que las llamadas de clientLogger (src/lib/client-logger.ts) puedan incluirlo. Esto completaría la trazabilidad de extremo a extremo en la observabilidad unificada.
Tipado de Contexto Extensible: Aunque asyncStorage internamente ya usa { correlationId: string }, se podría explorar cómo permitir almacenar un objeto de contexto más rico (ej. { correlationId: string; userId?: string; requestId?: string }) de forma tipo-segura en futuras versiones, si la necesidad de contexto aumenta.
G generación de ID Configurable: Permitir que el prefijo por defecto (req-) para los IDs generados sea configurable a través de variables de entorno o un objeto de configuración.
Tests de Concurrencia: Crear pruebas de integración que verifiquen el aislamiento correcto del contexto del correlationId en múltiples llamadas asíncronas concurrentes, asegurando su robustez bajo carga.
<!-- .docs-espejo/lib/helpers/correlation-id.helper.ts.md -->