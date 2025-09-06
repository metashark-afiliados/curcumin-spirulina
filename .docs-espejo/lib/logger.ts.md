<!-- .docs-espejo/lib/logger.ts.md -->
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del servidor.
 * @author L.I.A. Legacy
 * @version 5.4.1
 */
# Manifiesto Conceptual: Aparato `logger.ts` (Server-Side)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para el sistema de logging del lado del servidor**. Su propósito es proporcionar una API de logging de alto rendimiento, segura y trazable para todas las operaciones que se ejecutan en el entorno de Node.js de Next.js (Server Components, Server Actions, Route Handlers, etc.).

Como aparato soberano y atómico, sus responsabilidades son:

1.  **Inicialización Lazy y Robusta:** Implementa un patrón de **inicialización bajo demanda (lazy initialization)** para la instancia de `pino`. Esto es crucial para la compatibilidad con React Server Components (RSC) y el entorno de Next.js, ya que evita que la instancia compleja de `pino` cause `TypeError: Invalid value used as weak map key` cuando se importa en contextos donde Next.js intenta serializarla o usarla como clave de `WeakMap`. La instancia de `pino` se crea solo cuando uno de sus métodos de logging es invocado por primera vez.
2.  **Emisión de Logs Síncrona:** Configura `pino` con `pino.destination({ sync: true })` para emitir logs estructurados en formato JSON directamente a `stdout`. Esto elimina la dependencia de `worker threads` internos de Pino que generaban conflictos en el entorno de Next.js.
3.  **Censura de Datos Sensibles (`redact`):** Integra la configuración de `REDACTED_PATHS` (desde `src/config/logger.config.ts`) para prevenir automáticamente la fuga de Información de Identificación Personal (PII) en los logs.
4.  **Trazabilidad de Peticiones (`correlationId`):** Inyecta el `correlationId` (obtenido de `src/lib/helpers/correlation-id.helper.ts`) en cada log, permitiendo la correlación de eventos a través de todo el ciclo de vida de una petición.
5.  **Coherencia de API:** Implementa la interfaz `ILogger` (desde `src/lib/types/logging.ts`), garantizando una firma consistente para sus métodos de logging.

La directiva `"server-only";` al principio del archivo asegura que este módulo solo se compile en el servidor (entorno Node.js completo).

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor puro (`"server-only"`) que exporta un proxy/lazy-initialized logger.

```mermaid
graph TD
    A["`src/config/logger.config.ts` <br> (REDACTED_PATHS)"] --> B["`src/lib/logger.ts`"];
    C["`src/lib/helpers/correlation-id.helper.ts` <br> (getCorrelationId)"] --> B;
    D["`src/lib/types/logging.ts` <br> (ILogger, LogContext)"] --> B;

    B -- "1. `serverLogger` (Proxy) se exporta" --> F[Server Components, Server Actions, Route Handlers];
    F -- "2. Invoca `logger.info({ context }, 'message')`" --> B;
    B -- "3. Primera invocación: `getPinoInstance()` <br> Llama a `initializePino()` (crea instancia de `pino` síncrona)" --> E["Instancia de `pino` (síncrona a `stdout`)"];
    E -- "4. Inyecta `correlationId` y censura" --> G[Logs JSON estructurados <br> (a `stdout`)];
    G --> H[Sistema de Observabilidad (Vercel Log Drains, <br> `pino-pretty` externo)];
3. Contrato de API
serverLogger: ILogger:
Propósito: La instancia explícita del logger de servidor.
Métodos: trace, info, warn, error, todos siguiendo la firma (context: LogContext, message: string). La inicialización de Pino es lazy.
logger: ILogger:
Propósito: Un alias canónico para serverLogger, preferido para la importación por defecto en el código de servidor.
Métodos: Idénticos a serverLogger.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Integración con Sentry (con pino-sentry o SDK directo): Reevaluar la integración de Sentry para el logging en producción. Dado que pino ahora es síncrono a stdout, la mejor práctica para Sentry sería capturar las excepciones directamente con el SDK de Sentry en los catch blocks de las Server Actions o generateMetadata, usando la información del serverLogger para enriquecer el evento de Sentry. Alternativamente, si se requiere un transporte de logs a Sentry, investigar pino-sentry para ver si es compatible con el enfoque síncrono o si necesita una configuración de transport compatible con Next.js que no use workers.
Contexto Global de Loggers Enriquecido: Implementar un mecanismo para inyectar un contexto base adicional (ej., versión de la aplicación, SHA del commit, ambiente de despliegue) de forma automática en cada log de Pino, sin que el desarrollador tenga que pasarlo manualmente en cada llamada.
Logging en Formato OpenTelemetry (OTLP): Explorar la posibilidad de configurar Pino para emitir logs en un formato compatible con OpenTelemetry (OTLP) para una integración más profunda con sistemas de monitoreo de Observabilidad Distribuida, si la arquitectura de observabilidad del proyecto escala a este nivel.
Manejo de Errores de Serialización JSON: Aunque Pino es robusto, añadir un try/catch o un serializer personalizado a pinoConfig para manejar casos raros donde un objeto complejo no serializable es pasado al logger, previniendo fallos inesperados.
<!-- .docs-espejo/lib/logger.ts.md -->