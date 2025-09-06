<!-- .docs-espejo/lib/edge-logger.ts.md -->
/**
 * @file .docs-espejo/lib/edge-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del Edge Runtime.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `edge-logger.ts` (Edge Runtime)

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT para el logging en el Edge Runtime**. Su propósito es proporcionar una API de logging ultra-ligera y resiliente. Su diseño es completamente **autónomo y sin dependencias de contexto implícito**.

Adopta el patrón de **Inyección de Dependencias Explícita**: no intenta obtener el `correlationId` por sí mismo; espera recibirlo, junto con cualquier otro dato contextual, en el objeto `context` de cada llamada.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de Edge puro que exporta una instancia de logger. Su núcleo es una factoría que crea métodos de log que consumen un contexto explícito.

```mermaid
graph TD
    A[Manejador de Middleware] -- "1. Llama a `edgeLogger.info({ id, ... }, msg)`" --> B["`createEdgeLoggerMethod`"];
    B -- "2. Fusiona el contexto recibido en `logObject`" --> C{"`try JSON.stringify(logObject)`"};
    C -- Éxito --> D["`console.info(jsonString)`"];
    D --> E[Log enviado a Vercel Log Drains];
    
    subgraph "Escudo de Resiliencia"
        C -- Falla --> F["Bloque `catch`"];
        F -- "Crea log de fallback" --> G["`console.error(fallbackJson)`"];
        G --> E;
    end
3. Contrato de API
edgeLogger: ILogger: La instancia principal del logger.
Métodos: trace, info, warn, error, fatal, todos con la firma (context: LogContext, message: string). El context debe ser proporcionado por el invocador.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Sentry Edge SDK: Modificar los métodos error y fatal para que envíen el error a Sentry, utilizando el correlationId del contexto como una tag.
Control de Nivel de Log Dinámico: Leer una variable desde Vercel Edge Config para determinar el logLevel mínimo a registrar.
Batching de Logs hacia API Externa: Implementar un buffer que agrupe los logs y los envíe en lotes a un colector externo (ej. Datadog) usando fetch en un waitUntil.
<!-- .docs-espejo/lib/edge-logger.ts.md -->