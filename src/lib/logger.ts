// src/lib/logger.ts
/**
 * @file src/lib/logger.ts
 * @description Aparato de Logging de Élite y Única Fuente de Verdad (SSoT) para el lado del **servidor**.
 *              Utiliza `pino` para un rendimiento óptimo y logs estructurados en JSON.
 *              Integra funcionalidades clave de observabilidad como la censura de datos sensibles
 *              (`redact`) y la trazabilidad de peticiones mediante el `correlationId`.
 *              Provee una API unificada a través de la interfaz `ILogger`.
 *              **Esta versión ha sido optimizada para la compatibilidad con React Server Components (RSC)
 *              y el entorno de Next.js, forzando un destino síncrono para `pino` para evitar
 *              problemas con worker threads y el Edge Runtime durante el SSR/SSG.**
 * @author L.I.A. Legacy
 * @version 5.3.0
 * @see .docs-espejo/lib/logger.ts.md
 * @see src/config/logger.config.ts (SSoT para `REDACTED_PATHS`)
 * @see src/lib/helpers/correlation-id.helper.ts (SSoT para `getCorrelationId`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext` y `ILogger`)
 */
"server-only"; // Directiva para asegurar que este módulo solo se compile en el servidor (Node.js).

import pino from "pino";
import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { type ILogger, type LogContext } from "@/lib/types/logging";

/**
 * @private
 * @constant pinoConfig
 * @description Opciones de configuración para la instancia de Pino.
 *              Incluye niveles de log por entorno, nombre del servicio,
 *              timestamps ISO, formateadores para niveles y el `correlationId`.
 *              La censura de datos sensibles (`redact`) se configura utilizando
 *              las rutas definidas en `REDACTED_PATHS`.
 *              **El logging se configura para ser síncrono para compatibilidad
 *              con el entorno de Next.js RSC.**
 */
const pinoConfig: pino.LoggerOptions = {
  level: process.env.NODE_ENV === "development" ? "trace" : "info",
  base: {
    service: "curcumin-spirulina-hub", // Nombre canónico del servicio
  },
  timestamp: pino.stdTimeFunctions.isoTime, // Formato de tiempo ISO 8601
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }), // Nivel de log en mayúsculas
    log: (obj) => {
      // Inyecta el correlationId en cada log si está disponible en el contexto.
      const correlationId = getCorrelationId();
      if (correlationId) {
        return { ...obj, correlationId };
      }
      return obj;
    },
  },
  // Configuración de censura para PII, utilizando la SSoT de REDACTED_PATHS.
  redact: {
    paths: [...REDACTED_PATHS],
    censor: "[REDACTED]", // Valor de reemplazo para los datos censurados.
  },
};

/**
 * @private
 * @constant pinoDestination
 * @description Configura el destino de los logs de Pino.
 *              **Se utiliza `pino.destination({ sync: true })` para forzar un
 *              transporte síncrono a `stdout`. Esto es crucial para la
 *              compatibilidad con el entorno de React Server Components (RSC)
 *              en Next.js, evitando el uso de worker threads que causaban errores.**
 *              Los logs se emitirán como JSON a `stdout`, y se pueden formatear
 *              externamente (ej. con `pino-pretty` piped en el script `dev`).
 */
const pinoDestination = pino.destination({ sync: true });

/**
 * @public
 * @constant serverLogger
 * @description La instancia explícita del logger de servidor. Emite logs JSON
 *              estructurados de forma síncrona a `stdout`.
 *              Implementa la interfaz `ILogger` para una API tipo-segura y unificada.
 */
export const serverLogger: ILogger = pino(
  pinoConfig,
  pinoDestination
) as ILogger;

/**
 * @public
 * @constant logger
 * @description Alias canónico para `serverLogger`. Debe ser utilizado por defecto
 *              en todo el código de servidor para una mayor consistencia y legibilidad,
 *              adhiriéndose a la interfaz `ILogger`.
 */
export const logger: ILogger = serverLogger;
// src/lib/logger.ts
