// src/lib/logger.ts
/**
 * @file src/lib/logger.ts
 * @description Aparato de Logging de Élite y SSoT para el lado del **servidor**.
 *              Esta versión corrige los tipos de la configuración del transporte
 *              de Pino para una integración tipo-segura y robusta con Sentry.
 * @author L.I.A. Legacy
 * @version 10.2.0
 * @see .docs-espejo/lib/logger.ts.md
 */
import "server-only";

import pino from "pino";
import pinoSentryTransport from "pino-sentry-transport";
import { REDACTED_PATHS } from "@/config/logger.config";
import { serverLogLevel } from "@/config";
import { type ILogger, type LogContext } from "@/lib/types/logging";

const transport =
  process.env.NODE_ENV === "production"
    ? pino.transport({
        targets: [
          // Target 1: Enviar logs de nivel 'error' y 'fatal' a Sentry.
          {
            target: "pino-sentry-transport",
            options: {
              sentry: {
                dsn: process.env.SENTRY_DSN,
              },
              minLevel: 50, // CORRECCIÓN: 'error' (50) y 'fatal' (60)
            },
            level: "error", // Filtra los mensajes que llegan a este target.
          },
          // Target 2: Escribir todos los logs al stdout.
          {
            target: "pino/file",
            options: { destination: 1 },
            level: serverLogLevel, // Respeta el nivel de log general.
          },
        ],
      })
    : pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname,service",
        },
      });

export const basePinoLogger: pino.Logger = pino(
  {
    level: serverLogLevel,
    base: {
      service: "curcumin-spirulina-hub",
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    redact: {
      paths: [...REDACTED_PATHS],
      censor: "[REDACTED]",
    },
  },
  transport
);

export const logger: ILogger = {
  trace: (context: LogContext, message: string) =>
    basePinoLogger.trace(context, message),
  info: (context: LogContext, message: string) =>
    basePinoLogger.info(context, message),
  warn: (context: LogContext, message: string) =>
    basePinoLogger.warn(context, message),
  error: (context: LogContext, message: string) =>
    basePinoLogger.error(context, message),
  fatal: (context: LogContext, message: string) =>
    basePinoLogger.fatal(context, message),
};
// src/lib/logger.ts
