<!-- .docs-espejo/lib/logger.ts.md -->
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del servidor.
 * @author L.I.A. Legacy
 * @version 5.3.0
 */
# Manifiesto Conceptual: Aparato `logger.ts` (Server-Side)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para el sistema de logging del lado del servidor**. Su propósito es proporcionar una API de logging de alto rendimiento, segura y trazable para todas las operaciones que se ejecutan en el entorno de Node.js de Next.js (Server Components, Server Actions, Route Handlers, etc.).

Como aparato soberano y atómico, sus responsabilidades son:

1.  **Emisión de Logs Síncrona y Robusta:** Utiliza la librería `pino` configurada con un destino `síncrono` (`pino.destination({ sync: true })`) para emitir logs estructurados en formato JSON directamente a `stdout`. Esta configuración es crucial para garantizar la compatibilidad con el entorno de React Server Components (RSC) de Next.js, evitando los problemas de `worker threads` y `ThreadStream` que causaban fallos críticos.
2.  **Censura de Datos Sensibles (`redact`):** Integra la configuración de `REDACTED_PATHS` (desde `src/config/logger.config.ts`) para prevenir automáticamente la fuga de Información de Identificación Personal (PII) en los logs.
3.  **Trazabilidad de Peticiones (`correlationId`):** Inyecta el `correlationId` (obtenido de `src/lib/helpers/correlation-id.helper.ts`) en cada log, permitiendo la correlación de eventos a través de todo el ciclo de vida de una petición.
4.  **Integración con Servicios de Observabilidad:** Los logs emitidos a `stdout` pueden ser fácilmente capturados por plataformas como Vercel Log Drains o procesados externamente (ej., `pino-pretty` en desarrollo) para su análisis.
5.  **Coherencia de API:** Implementa la interfaz `ILogger` (desde `src/lib/types/logging.ts`), garantizando una firma consistente para sus métodos de logging.

La directiva `"server-only";` al principio del archivo asegura que este módulo solo se compile en el servidor (entorno Node.js completo), mientras que la configuración síncrona de `pino` lo hace compatible con los entornos de ejecución más restringidos de Next.js (RSC).

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor puro (`"server-only"`) que exporta una instancia de logger configurada.

```mermaid
graph TD
    A["`src/config/logger.config.ts` <br> (REDACTED_PATHS)"] --> B["`src/lib/logger.ts`"];
    C["`src/lib/helpers/correlation-id.helper.ts` <br> (getCorrelationId)"] --> B;
    D["`src/lib/types/logging.ts` <br> (ILogger, LogContext)"] --> B;

    B -- "1. Instancia `pino` con `pinoConfig` (redact, formatters) <br> y `pino.destination({ sync: true })`" --> E["`serverLogger` (ILogger)"];
    E -- "2. Se expone como `logger`" --> F[Server Components, Server Actions, Route Handlers];
    F -- "3. Invoca `logger.info({ context }, 'message')`" --> E;
    E -- "4. Inyecta `correlationId` y censura" --> G[Logs JSON estructurados <br> (síncronos a `stdout`)];
    G --> H[Sistema de Observabilidad (Vercel Log Drains, <br> `pino-pretty` externo)];
3. Contrato de API
serverLogger: ILogger:
Propósito: La instancia principal del logger de servidor.
Métodos: trace, info, warn, error, todos siguiendo la firma (context: LogContext, message: string).
logger: ILogger:
Propósito: Un alias canónico para serverLogger, preferido para la importación por defecto en el código de servidor.
Métodos: Idénticos a serverLogger.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Sentry (via pino-sentry o SDK directo): Reevaluar la integración de Sentry para el logging en producción. En lugar de pino.transport con workers, se puede usar un transporte de pino-sentry si es compatible con el entorno, o (la recomendación más común para RSC) capturar las excepciones directamente con el SDK de Sentry en los catch blocks de las Server Actions o generateMetadata, usando la información del serverLogger para enriquecer el evento de Sentry.
Contexto Global de Loggers Enriquecido: Implementar un mecanismo para inyectar un contexto base adicional (ej., versión de la aplicación, SHA del commit, ambiente de despliegue) de forma automática en cada log de Pino, sin que el desarrollador tenga que pasarlo manualmente en cada llamada.
Logging en Formato OpenTelemetry (OTLP): Explorar la posibilidad de configurar Pino para emitir logs en un formato compatible con OpenTelemetry (OTLP) para una integración más profunda con sistemas de monitoreo de Observabilidad Distribuida, si la arquitectura de observabilidad del proyecto escala a este nivel.
Diferenciación de service por Entorno: Permitir que el nombre del servicio en pinoConfig.base.service se adapte dinámicamente al entorno (ej., "curcumin-spirulina-hub-dev" vs "curcumin-spirulina-hub-prod") para una mejor categorización de logs en sistemas centralizados.
Manejo de Errores de Serialización JSON: Aunque Pino es robusto, añadir un try/catch o un serializer personalizado a pinoConfig para manejar casos raros donde un objeto complejo no serializable es pasado al logger, previniendo fallos inesperados.
<!-- .docs-espejo/lib/logger.ts.md -->