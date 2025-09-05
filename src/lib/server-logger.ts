// src/lib/server-logger.ts
/**
 * @file server-logger.ts
 * @description Aparato de Logging de Servidor de Élite. Implementa `pino` para
 *              un logging de alto rendimiento, estructurado y seguro, con
 *              inyección automática de ID de correlación.
 * @version 1.0.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/lib/server-logger.ts.md
 */
import "server-only";

import pino from "pino";
import type { LoggerOptions, TransportTargetOptions } from "pino";

import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";

/**
 * @description Configuración de transporte condicional para Pino v9+.
 *              En desarrollo, usa `pino-pretty` para logs legibles.
 *              En producción, no se define un transporte, permitiendo que
 *              Pino emita JSON a stdout para ser consumido por Vercel Log Drains.
 */
const transport: TransportTargetOptions | undefined =
  process.env.NODE_ENV === "development"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname,service",
        },
      }
    : undefined;

const pinoConfig: LoggerOptions = {
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
  ...(transport && { transport }),
};

export const serverLogger = pino(pinoConfig);

serverLogger.info(
  `Sistema de logging del servidor inicializado. Nivel de log: ${pinoConfig.level}.`
);
// src/lib/server-logger.ts
