// src/lib/logging.ts
// import * as Sentry from "@sentry/nextjs"; // Descomentar al integrar Sentry

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Aparato de Logging de Élite y Desacoplado.
 *              Proporciona dos loggers distintos: `logger` para el entorno de
 *              servidor y `clientLogger` para el entorno de cliente.
 *              Preparado para integración con Sentry en producción.
 */

type LogLevel = "trace" | "info" | "warn" | "error";

// --- LOGGER DE SERVIDOR ---

function logToServer(level: LogLevel, message: string, ...context: any[]) {
  // En producción, los logs de info/warn podrían enviarse a Sentry como breadcrumbs
  if (process.env.NODE_ENV === "production") {
    if (level === "error") {
      // Sentry.captureMessage(message, { level: "error", extra: { context } });
    }
    // No hacer log a consola en producción para evitar ruido, excepto errores críticos
    if (level !== "error") return;
  }

  const timestamp = new Date().toISOString();
  const logMessage = `[${level.toUpperCase()}] [${timestamp}] ${message}`;

  const consoleMethod = {
    trace: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
  consoleMethod[level](logMessage, ...context);
}

export const logger = {
  trace: (message: string, ...context: any[]) => {
    logToServer("trace", message, ...context);
  },
  info: (message: string, ...context: any[]) => {
    logToServer("info", message, ...context);
  },
  warn: (message: string, ...context: any[]) => {
    logToServer("warn", message, ...context);
  },
  error: (message: string, ...context: any[]) => {
    logToServer("error", message, ...context);
  },
};

// --- LOGGER DE CLIENTE ---

export const clientLogger = {
  trace: console.debug.bind(console, "[CLIENT TRACE]"),
  info: console.info.bind(console, "[CLIENT INFO]"),
  warn: console.warn.bind(console, "[CLIENT WARN]"),
  error: console.error.bind(console, "[CLIENT ERROR]"),
};
