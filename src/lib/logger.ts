// src/lib/logger.ts
/**
 * @file logger.ts
 * @description Aparato de Logging de Élite, Soberano y Agnóstico.
 *              Implementa el logger de servidor `pino` para logs JSON estructurados
 *              de alta performance, un `clientLogger` robusto, y está enriquecido
 *              con inyección automática de `correlationId` para trazabilidad completa.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/lib/logger.ts.md
 */
import "server-only";

import pino from "pino";
import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";

// =====================================================================
//                           LOGGER DE SERVIDOR (PINO)
// =====================================================================

const pinoConfig: pino.LoggerOptions = {
  level: process.env.NODE_ENV === "development" ? "trace" : "info",
  base: { service: "curcumin-spirulina-hub" },
  formatters: {
    level: (label: string) => ({ level: label.toUpperCase() }),
    log: (obj: Record<string, unknown>) => {
      const correlationId = getCorrelationId();
      if (correlationId) {
        return { ...obj, correlationId };
      }
      return obj;
    },
  },
  redact: {
    paths: [...REDACTED_PATHS],
    censor: "[REDACTED]",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

const transport =
  process.env.NODE_ENV === "development"
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname,service",
        },
      })
    : undefined;

export const serverLogger = pino(pinoConfig, transport);

serverLogger.info(
  `Sistema de logging do servidor inicializado. Nível de log: ${pinoConfig.level}.`
);

// =====================================================================
//                            LOGGER DE CLIENTE
// =====================================================================

/**
 * @private
 * @function createSafeConsoleMethod
 * @description Factoría que crea un método de logging seguro para el cliente.
 *              Verifica si `console` y el método específico existen antes de
 *              vincularse, previniendo errores en entornos de navegador antiguos o inusuales.
 * @param {'log' | 'info' | 'warn' | 'error' | 'debug'} method - El método de la consola a envolver.
 * @param {string} prefix - Un prefijo a añadir a cada mensaje de log para una fácil identificación.
 * @returns {(...args: any[]) => void} Una función de logging segura.
 */
const createSafeConsoleMethod = (
  method: "log" | "info" | "warn" | "error" | "debug",
  prefix: string
): ((...args: any[]) => void) => {
  if (typeof console !== "undefined" && typeof console[method] === "function") {
    return console[method].bind(console, prefix);
  }
  return () => {}; // Devuelve una función no-op si el método no está disponible.
};

/**
 * @public
 * @constant clientLogger
 * @description Logger para el lado del cliente (navegador).
 *              - En **desarrollo**, todos los niveles de log están activos para una depuración granular.
 *              - En **producción**, los logs `trace` e `info` se desactivan para no contaminar
 *                la consola del usuario y para optimizar el rendimiento.
 */
export const clientLogger =
  process.env.NODE_ENV === "development"
    ? {
        trace: createSafeConsoleMethod("debug", "🕵️ [TRACE]"),
        info: createSafeConsoleMethod("info", "ℹ️ [INFO]"),
        warn: createSafeConsoleMethod("warn", "⚠️ [WARN]"),
        error: createSafeConsoleMethod("error", "🔥 [ERROR]"),
      }
    : {
        trace: () => {},
        info: () => {},
        warn: createSafeConsoleMethod("warn", "⚠️ [WARN]"),
        error: createSafeConsoleMethod("error", "🔥 [ERROR]"),
      };
// src/lib/logger.ts
