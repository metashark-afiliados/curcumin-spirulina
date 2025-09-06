<!-- .docs-espejo/lib/helpers/with-logger.helper.ts.md -->
/**
 * @file .docs-espejo/lib/helpers/with-logger.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de logging transaccional.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `with-logger.helper.ts` (Server-Only)

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la observabilidad transaccional para el entorno de servidor Node.js**. Su única responsabilidad es implementar el patrón de **Inyección de Dependencias** para el logging.

Provee un HOC (`withLogger`) que genera un `requestId`, crea un `childLogger` enriquecido con ese ID, y lo **inyecta como primer argumento** a la función que envuelve.

**ADVERTENCIA ARQUITECTÓNICA:** Este aparato es **incompatible con el Edge Runtime**.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en un HOC que actúa como una factoría y un inyector.

```mermaid
graph TD
    A[Route Handler / Server Action] -- "1. Es envuelto por" --> B["`withLogger(handler)`"];
    B -- "2. Se invoca la función envuelta" --> C{Lógica Interna de `withLogger`};
    subgraph "Lógica Interna"
        C -- "3. Genera `requestId`" --> D;
        D -- "4. Crea `childLogger`" --> E;
        E -- "5. Llama al `handler` original, inyectando `childLogger`" --> F["`handler(logger, ...)`"];
    end
    F --> G[Resultado de la Lógica de Negocio];
3. Contrato de API
withLogger(handlerFn): R: Un HOC que recibe una función handlerFn cuyo primer argumento debe ser de tipo pino.Logger, y devuelve una nueva función con la firma original del handlerFn (excluyendo el logger).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Inyección de Contexto Adicional: Modificar el HOC para que acepte un objeto de contexto adicional (ej. { userId: '123' }) que se fusione en el childLogger.
Adaptador para Clases (Decorador): Crear una versión de withLogger como un decorador de método (@WithLogger()) para arquitecturas basadas en clases.
Integración con OpenTelemetry: Integrar la generación del requestId con el estándar de OpenTelemetry, utilizando su traceId.
<!-- .docs-espejo/lib/helpers/with-logger.helper.ts.md -->