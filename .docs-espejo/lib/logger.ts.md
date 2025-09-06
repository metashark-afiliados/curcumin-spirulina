<!-- .docs-espejo/lib/logger.ts.md -->
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato de logging del servidor.
 * @author L.I.A. Legacy
 * @version 5.5.0
 */
# Manifiesto Conceptual: Aparato `logger.ts` (Server-Side)

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para el sistema de logging del lado del servidor**. Su propósito es proporcionar una API de logging de alto rendimiento, segura y trazable para todas las operaciones que se ejecutan en el entorno de Node.js de Next.js (Server Components, Server Actions, Route Handlers, etc.).

Como aparato soberano y atómico, sus responsabilidades son:

1.  **Inicialización Lazy y Adaptativa:** Implementa un patrón de **inicialización bajo demanda (lazy initialization)** para la instancia de `pino`. Esto es crucial para la compatibilidad con React Server Components (RSC) y el entorno de Next.js, ya que evita que la instancia compleja de `pino` cause `TypeError: Invalid value used as weak map key` cuando se importa en contextos donde Next.js intenta serializarla o usarla como clave de `WeakMap` durante el `build`/prerrenderizado. La instancia real de `pino` solo se crea si el entorno es el Node.js principal del servidor; de lo contrario (ej., en worker threads de build/RSC o en entornos de prueba), se utiliza una instancia de logger **dummy** (que usa `console`) para evitar errores y mantener la estabilidad del `build`.
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

    F[Server Components, Server Actions, Route Handlers] -- "1. Invoca `logger.method(...)`" --> B;
    B -- "2. Llama a `getPinoInstance()`" --> G{Es entorno de Node.js principal y no es test?};
    alt Sí (Node.js principal)
        G -- Sí --> H["3a. Llama a `initializePino()` <br> (crea instancia real de `pino` síncrona a `stdout`)"];
        H --> I["Instancia de `pino` (real)"];
    end
    alt No (RSC/Build Worker/Test)
        G -- No --> J["3b. Crea instancia de `pino` DUMMY <br> (usa `console` como fallback)"];
        J --> I; // I ahora es la instancia dummy
    end
    I -- "4. Ejecuta `pinoInstance.method(...)` <br> (inyecta `correlationId`, censura)" --> K[Logs JSON (o console fallback)];
    K --> L[Sistema de Observabilidad (Vercel Log Drains, <br> `pino-pretty` externo)];
3. Contrato de API
serverLogger: ILogger:
Propósito: La instancia explícita del logger de servidor.
Métodos: trace, info, warn, error, todos siguiendo la firma (context: LogContext, message: string). La inicialización de Pino es lazy y condicional.
logger: ILogger:
Propósito: Un alias canónico para serverLogger, preferido para la importación por defecto en el código de servidor.
Métodos: Idénticos a serverLogger.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
INTEGRACIÓN SENTRY (ROBUSTA - Directa): Reafirmar que la mejor práctica para la integración de Sentry con Server Components es capturar las excepciones directamente con el SDK de Sentry en los catch blocks de las Server Actions o generateMetadata. El serverLogger (real o dummy) se usaría para logs contextuales, y el error capturado se pasaría al SDK de Sentry. Esto es más fiable que un pino.transport en este entorno.
Contexto Global de Loggers Enriquecido: Implementar un mecanismo para inyectar un contexto base adicional (ej., versión de la aplicación, SHA del commit, ambiente de despliegue) de forma automática en cada log de Pino, sin que el desarrollador tenga que pasarlo manualmente en cada llamada.
Logging en Formato OpenTelemetry (OTLP): Explorar la posibilidad de configurar Pino para emitir logs en un formato compatible con OpenTelemetry (OTLP) para una integración más profunda con sistemas de monitoreo de Observabilidad Distribuida, si la arquitectura de observabilidad del proyecto escala a este nivel.
Diferenciación de service por Entorno: Permitir que el nombre del servicio en pinoConfig.base.service se adapte dinámicamente al entorno (ej., "curcumin-spirulina-hub-dev" vs "curcumin-spirulina-hub-prod") para una mejor categorización de logs en sistemas centralizados.
Manejo de Errores de Serialización JSON: Aunque Pino es robusto, añadir un try/catch o un serializer personalizado a pinoConfig para manejar casos raros donde un objeto complejo no serializable es pasado al logger, previniendo fallos inesperados.
<!-- .docs-espejo/lib/logger.ts.md -->