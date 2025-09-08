// src/lib/logger.ts
/**
 * @file src/lib/logger.ts
 * @description Aparato de Logging de Élite Unificado y SSoT. Integra `pino`
 *              con un transporte a Sentry (en producción) y `correlationId`
 *              automático para una observabilidad de nivel de producción.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/lib/logger.ts.md
 */
import "server-only";

import pino from "pino";
import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";

const logLevel: pino.Level =
  process.env.NODE_ENV === "development" ? "trace" : "info";

const pinoConfig: pino.LoggerOptions = {
  level: logLevel,
  base: {
    service: "curcumin-complex",
    pid: typeof process !== "undefined" ? process.pid : undefined,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
    log: (obj) => {
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
};

// Se evita pino.transport en desarrollo para prevenir conflictos con RSC.
// El formateo se delega al script 'dev' en package.json.
const transport =
  process.env.NODE_ENV === "production"
    ? pino.transport({
        targets: [
          {
            target: "pino-sentry-transport",
            options: {
              sentry: {
                dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
              },
              minLevel: "error", // Solo enviar errores y niveles superiores a Sentry
            },
          },
          {
            target: "pino/file", // Representa stdout
            options: {},
            level: logLevel,
          },
        ],
      })
    : undefined;

/**
 * @public
 * @constant logger
 * @description La instancia SSoT del logger de servidor. Debe ser utilizada
 *              en todos los módulos del lado del servidor (Server Components,
 *              Server Actions, Route Handlers, etc.).
 */
export const logger = transport
  ? pino(pinoConfig, transport)
  : pino(pinoConfig);
// src/lib/logger.ts
