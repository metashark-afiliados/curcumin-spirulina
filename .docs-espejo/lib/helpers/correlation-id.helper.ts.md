// .docs-espejo/lib/helpers/correlation-id.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `correlation-id.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `correlation-id.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **sistema nervioso central de la observabilidad** en el lado del servidor. Su propósito es implementar un mecanismo de trazabilidad de peticiones de extremo a extremo.

Utiliza `AsyncLocalStorage` de Node.js para "etiquetar" cada ejecución de una función envuelta con un Identificador Único Universal (`UUID`) llamado `correlationId`. Esta etiqueta persiste a través de toda la pila de llamadas asíncronas de esa ejecución, permitiendo que el logger y otros sistemas de monitoreo agrupen todos los eventos relacionados con una única transacción.

## 2. Arquitectura y Flujo de Ejecución

El aparato se basa en el patrón de "wrapper de alto orden" (HOC), que crea un contexto asíncrono.

```mermaid
graph TD
    A[Server Action / Middleware] -- es envuelta por --> B(HOC `withCorrelationId`);
    B --> C(Función Envuelve y Exportada);
    subgraph "En Tiempo de Ejecución"
      D[Invocación de la Función Envuelve] --> E{Crea Contexto Asíncrono <br> ID: req-abc-123};
      E --> F[Ejecuta la Lógica Original];
      subgraph "Dentro de la Lógica Original"
        G[Cualquier Módulo] -- llama a --> H(getCorrelationId());
        H -- retorna --> I["'req-abc-123'"];
      end
    end
3. Contrato de API
getCorrelationId(): string | undefined
Salida: Devuelve el correlationId del contexto actual, o undefined si se llama fuera de un contexto gestionado.
withCorrelationId<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T>
Entrada:
fn: La función a envolver, con cualquier firma de argumentos y tipo de retorno.
Salida: Una nueva función que tiene exactamente la misma firma que fn, pero que al ser ejecutada, lo hará dentro de un contexto de correlación.
4. Zona de Melhorias Futuras
Propagación de Contexto Enriquecido: Extender el AsyncLocalStorage para almacenar no solo el correlationId, sino un objeto de contexto más rico (ej. { correlationId, userId, locale }).
Integración con OpenTelemetry: Alinear el correlationId con los estándares de traceId y spanId de OpenTelemetry para una integración nativa con herramientas de APM.
Propagación de ID desde Cliente: Aceptar un correlationId opcional en la función envuelta, que si se provee, continuará una traza iniciada en el cliente.
Manejo de Errores Centralizado: El wrapper podría incluir un try/catch para capturar errores de la función envuelta y registrarlos automáticamente con el correlationId.
Benchmarking de Rendimiento: Realizar pruebas de carga para medir el overhead de AsyncLocalStorage en escenarios de alta concurrencia.
Tipado de args: Aunque genérico, para casos de uso muy específicos se podrían crear wrappers especializados con tipos de argumentos más estrictos.
Helper getContext Genérico: Crear un helper getAsyncContext() que devuelva el store completo del AsyncLocalStorage, no solo el correlationId.
Versión Síncrona: Crear una versión withCorrelationIdSync para envolver funciones síncronas si fuera necesario.
Pruebas Unitarias de Alto Orden: Escribir pruebas unitarias que verifiquen que la función devuelta por el HOC mantiene la firma y propaga los argumentos correctamente.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/helpers/correlation-id.helper.ts.md