// .docs-espejo/lib/helpers/correlation-id.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de ID de correlación.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `correlation-id.helper`

## 1. Rol Estratégico y Propósito

Este aparato es un pilar fundamental de la **Arquitectura de Observabilidad**. Su único propósito es gestionar un **identificador único de correlación** (`correlationId`) para cada petición que llega al servidor. Esto permite agrupar todos los logs generados durante el ciclo de vida de una única petición, facilitando un diagnóstico y una trazabilidad de élite.

Es un aparato de bajo nivel, puro y sin dependencias, que implementa el requisito de "trazabilidad de extremo a extremo".

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en la API nativa de Node.js `AsyncLocalStorage`, que permite mantener un estado aislado a lo largo de una cadena de ejecuciones asíncronas.

```mermaid
sequenceDiagram
    participant Middleware
    participant withCorrelationId as withCorrelationId()
    participant Logger as logger.trace()
    participant ServerAction as Server Action
    participant getCorrelationId as getCorrelationId()

    Middleware->>withCorrelationId: Envuelve la petición
    withCorrelationId->>withCorrelationId: Genera/Recibe correlationId y lo registra en el contexto
    Middleware->>Logger: Registra la creación del contexto
    Middleware->>ServerAction: Invoca la lógica de la acción
    ServerAction->>Logger: Llama a logger.info()
    Logger->>getCorrelationId: Obtiene el ID del contexto actual
    getCorrelationId-->>Logger: Devuelve correlationId
    Logger->>Logger: Inyecta el ID en el log JSON
3. Contrato de API
getCorrelationId(): string | undefined:
Salida: El correlationId del contexto actual, o undefined si no se está ejecutando dentro de uno.
withCorrelationId<R>(fn: () => R, correlationId?: string): R:
Entrada: Una función fn a ejecutar y un correlationId opcional.
Salida: El valor de retorno de la función fn.
4. Zona de Melhorias Futuras
Integração com Headers de Terceiros: Melhorar withCorrelationId para que detecte e reutilize IDs de correlação de cabeçalhos padrão como X-Request-ID ou X-Correlation-ID.
Propagação ao Cliente: Implementar um mecanismo para que o correlationId gerado no servidor possa ser enviado ao cliente (ex: através de uma meta tag) para que as chamadas de clientLogger possam incluí-lo.
Tipagem de Contexto Extensível: Modificar o tipo do asyncStorage para permitir armazenar um objeto de contexto mais rico (ex: { correlationId: string; userId?: string }).
Integração com OpenTelemetry: Integrar o correlationId com o traceId de OpenTelemetry para uma observabilidade distribuída.
// .docs-espejo/lib/helpers/correlation-id.helper.ts.md