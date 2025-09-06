// src/lib/client-logger.ts
/**
 * @file src/lib/client-logger.ts
 * @description Aparato de Logging de Élite y SSoT para el lado del **cliente**.
 *              Esta versión implementa la correlación E2E al leer el `correlationId`
 *              del servidor desde un meta tag y vincularlo a cada log del cliente.
 * @author L.I.A. Legacy
 * @version 6.0.0
 * @see .docs-espejo/lib/client-logger.ts.md
 */
"use client";

import pino from "pino";
import { browserLogLevel, loggerContext } from "../config";
import { type ILogger, type LogContext } from "@/lib/types/logging";

/**
 * @private
 * @function getCorrelationId
 * @description Lee el ID de correlación del meta tag inyectado por el servidor.
 * @returns {string | undefined} El ID de correlación o undefined si no se encuentra.
 */
function getCorrelationId(): string | undefined {
  if (typeof window !== "undefined") {
    const metaTag = document.querySelector('meta[name="correlation-id"]');
    return metaTag?.getAttribute("content") || undefined;
  }
  return undefined;
}

const pinoBrowserLogger = pino({
  level: browserLogLevel,
  browser: {
    serialize: true,
  },
  // Vincula el contexto base y el correlationId a todos los logs emitidos.
}).child({
  ...loggerContext,
  correlationId: getCorrelationId(),
});

export const clientLogger: ILogger = {
  trace: (context, message) => pinoBrowserLogger.trace(context, message),
  info: (context, message) => pinoBrowserLogger.info(context, message),
  warn: (context, message) => pinoBrowserLogger.warn(context, message),
  error: (context, message) => pinoBrowserLogger.error(context, message),
  fatal: (context, message) => pinoBrowserLogger.fatal(context, message),
};
// src/lib/client-logger.ts
