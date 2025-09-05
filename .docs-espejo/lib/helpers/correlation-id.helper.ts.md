// .docs-espejo/lib/helpers/correlation-id.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de ID de correlación.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `correlation-id.helper`

## 1. Rol Estratégico y Propósito

Este aparato es un pilar fundamental de la **Arquitectura de Observabilidad**. Su único propósito es gestionar un **identificador único de correlación** (`correlationId`) para cada petición que llega al servidor. Esto permite agrupar todos los logs generados durante el ciclo de vida de una única petición, facilitando un diagnóstico y una trazabilidad de élite.

Actúa como la implementación técnica del requisito de "trazabilidad de extremo a extremo" definido en los manifiestos de arquitectura.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en la API nativa de Node.js `AsyncLocalStorage`, que permite mantener un estado aislado a lo largo de una cadena de ejecuciones asíncronas.

```mermaid
sequenceDiagram
    participant Middleware
    participant withCorrelationId as withCorrelationId()
    participant ServerAction as Server Action
    participant Logger as logger.info()
    participant getCorrelationId as getCorrelationId()

    Middleware->>withCorrelationId: Envuelve la petición
    withCorrelationId->>withCorrelationId: Genera/Recibe correlationId y lo registra
    withCorrelationId->>ServerAction: Invoca la lógica de la acción
    ServerAction->>Logger: Llama a logger.info()
    Logger->>getCorrelationId: Obtiene el ID del contexto actual
    getCorrelationId-->>Logger: Devuelve correlationId
    Logger->>Logger: Inyecta el ID en el log JSON
    Logger-->>ServerAction: Finaliza el log
    ServerAction-->>Middleware: Retorna resultado
3. Contrato de API
getCorrelationId(): string | undefined
Entrada: Ninguna.
Salida: El correlationId del contexto actual, o undefined si no se está ejecutando dentro de uno.
withCorrelationId<R>(fn: () => R, correlationId?: string): R
Entrada: Una función fn a ejecutar y un correlationId opcional.
Salida: El valor de retorno de la función fn.
4. Zona de Melhorias Futuras
Integración con Headers de Terceros: Mejorar withCorrelationId para que detecte y reutilice IDs de correlación de cabeceras estándar como X-Request-ID o X-Correlation-ID si son provistas por un balanceador de carga o un API gateway.
Propagación al Cliente: Implementar un mecanismo para que el correlationId generado en el servidor pueda ser enviado al cliente (ej. a través de una meta tag) para que las llamadas de clientLogger puedan incluirlo, logrando una trazabilidad verdaderamente completa.
Tipado de Contexto Extensible: Modificar el tipo del asyncStorage para permitir almacenar no solo el correlationId, sino un objeto de contexto más rico (ej. { correlationId: string; userId?: string }) que pueda ser enriquecido a lo largo de la petición.
Helper para Workers: Crear una variante del helper que funcione en entornos de Web Workers si el proyecto evoluciona para usarlos.
Benchmarking de Performance: Añadir pruebas de rendimiento para asegurar que el overhead de AsyncLocalStorage es despreciable bajo alta carga.
Decorador para Clases: Implementar un decorador de TypeScript @WithCorrelationId que pueda ser aplicado a métodos de clases de servicio para envolverlos automáticamente.
Integración con OpenTelemetry: Integrar el correlationId con el traceId de OpenTelemetry para una observabilidad distribuida.
Documentación en Español: Traducir este documento espejo al español para consistencia con el resto de la documentación.
Helper de Saneamiento de ID: Añadir una pequeña función de saneamiento dentro de withCorrelationId para asegurar que el ID provisto externamente no contenga caracteres maliciosos.
Tipado Estricto de correlationId: Implementar un tipo brand de TypeScript para correlationId (ej. type CorrelationId = string & { __brand: 'CorrelationId' }) para prevenir el uso accidental de un string cualquiera en su lugar.
// .docs-espejo/lib/helpers/correlation-id.helper.ts.md