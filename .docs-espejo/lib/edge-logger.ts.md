<!-- .docs-espejo/lib/edge-logger.ts.md -->
/**
 * @file .docs-espejo/lib/edge-logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del Edge Runtime.
 * @author L.I.A. Legacy
 * @version 2.4.0
 */
# Manifiesto Conceptual: Aparato `edge-logger.ts` (Edge Runtime)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para el sistema de logging del Edge Runtime**. Su propósito es proporcionar una API de logging ultra-ligera, segura y consistente para todas las operaciones que se ejecutan en el entorno de Edge (ej. `middleware.ts`, Route Handlers de Edge).

Como aparato soberano y atómico, sus responsabilidades son:

1.  **Emisión de Logs Optimizada para Edge:** Utiliza un wrapper sobre los métodos nativos de `console` para emitir logs estructurados en formato JSON. Esta estrategia es la más compatible y performante para los entornos de Edge, donde las dependencias de Node.js completas están restringidas.
2.  **Trazabilidad de Peticiones (`correlationId`):** Inyecta el `correlationId` (obtenido de `src/lib/helpers/correlation-id.helper.ts`) en cada log, permitiendo la correlación de eventos a través del middleware y otros procesos de Edge.
3.  **API Unificada:** Implementa la interfaz `ILogger` (desde `src/lib/types/logging.ts`), asegurando que su firma `(context: LogContext, message: string)` sea consistente con el `serverLogger` y `clientLogger`. Esto mejora la interoperabilidad y reduce la carga cognitiva.
4.  **Contexto Enriquecido:** Permite adjuntar un objeto `LogContext` a cada mensaje, proporcionando información adicional estructurada para el monitoreo y la depuración en el Edge.
5.  **Semántica Clara de Entorno:** Su diseño está optimizado para el Edge Runtime, sin la directiva `"server-only";`, que es más apropiada para el entorno Node.js tradicional.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de Edge puro que exporta una instancia de logger configurada.

```mermaid
graph TD
    A["`src/lib/types/logging.ts` <br> (ILogger, LogContext)"] --> B["`src/lib/edge-logger.ts`"];
    C["`src/lib/helpers/correlation-id.helper.ts` <br> (getCorrelationId)"] --> B;

    B -- "1. Define `createEdgeLoggerMethod`" --> D["`edgeLogger` (ILogger)"];
    D -- "2. Se expone como `edgeLogger`" --> E[Middleware, Edge Route Handlers];
    E -- "3. Invoca `edgeLogger.info({ context }, 'message')`" --> D;
    D -- "4. Inyecta `correlationId` y formatea" --> F[Logs JSON estructurados];
    F -- "5. Envía a `console.method()`" --> G[Sistema de Observabilidad (Vercel Log Drains, Cloudflare Logs)];
3. Contrato de API
edgeLogger: ILogger:
Propósito: La instancia principal del logger de Edge Runtime.
Métodos: trace, info, warn, error, todos siguiendo la firma (context: LogContext, message: string).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Sentry (Edge): Configurar edgeLogger.error para que, además de a console.error, envíe los errores críticos a Sentry de forma estructurada, completando la observabilidad de logs en el Edge.
Filtrado Dinámico de Niveles: Permitir la configuración dinámica del nivel de log mínimo en el Edge (ej. a través de variables de entorno), para ajustar la verbosidad según el entorno de despliegue.
Enriquecimiento Automático de Contexto: Explorar la posibilidad de inyectar automáticamente información contextual común (ej. requestId, geoLocation, userAgent) en cada LogContext si no se está usando correlationId directamente o para complementar.
Batching de Logs en Edge: Para entornos de muy alto tráfico, podría explorarse una estrategia de "event batching" en el Edge para reducir el número de invocaciones de console.log o llamadas a APIs externas de logs.
Añadir Niveles de Log Específicos: Podríamos añadir niveles de log más granulares si la necesidad lo justifica (ej. debug, critical).
<!-- .docs-espejo/lib/edge-logger.ts.md -->