// src/lib/edge-logger.ts
/**
 * @file src/lib/edge-logger.ts
 * @description Aparato de Logging de Élite, autónomo y SSoT para el Edge Runtime.
 *              No tiene dependencias externas para la gestión de contexto; recibe
 *              el `correlationId` y otros datos explícitamente a través del
 *              objeto de contexto en cada llamada. Es resiliente y compatible con el Edge.
 * @author L.I.A. Legacy
 * @version 5.0.0
 * @see .docs-espejo/lib/edge-logger.ts.md
 */
import { type ILogger, type LogContext } from "@/lib/types/logging";

type LogLevel = "trace" | "info" | "warn" | "error" | "fatal";

const createEdgeLoggerMethod =
  (level: LogLevel) => (context: LogContext, message: string) => {
    const timestamp = new Date().toISOString();

    // El correlationId y otros datos de contexto son recibidos explícitamente.
    const logObject = {
      level: level.toUpperCase(),
      timestamp,
      message,
      service: "curcumin-spirulina-hub-edge",
      ...context, // Fusiona el contexto inyectado (que contiene el correlationId).
    };

    try {
      const logString = JSON.stringify(logObject);
      switch (level) {
        case "fatal":
        case "error":
          console.error(logString);
          break;
        case "warn":
          console.warn(logString);
          break;
        case "info":
          console.info(logString);
          break;
        default:
          console.log(logString);
          break;
      }
    } catch (error) {
      console.error(
        JSON.stringify({
          level: "ERROR",
          timestamp: new Date().toISOString(),
          message:
            "FALLO CRÍTICO EN EL LOGGER: Error de serialización de JSON.",
          service: "curcumin-spirulina-hub-edge",
          correlationId: context.correlationId || "unknown",
          originalLogLevel: level,
          originalMessage: message,
        })
      );
    }
  };

export const edgeLogger: ILogger = {
  trace: createEdgeLoggerMethod("trace"),
  info: createEdgeLoggerMethod("info"),
  warn: createEdgeLoggerMethod("warn"),
  error: createEdgeLoggerMethod("error"),
  fatal: createEdgeLoggerMethod("fatal"),
};
// src/lib/edge-logger.ts
