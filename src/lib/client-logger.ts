// src/lib/client-logger.ts
/**
 * @file client-logger.ts
 * @description Aparato de Logging de Cliente Híbrido y Soberano.
 *              Implementa un logger que enruta logs a la consola, a un buffer
 *              persistente en localStorage y a Sentry para eventos críticos.
 * @version 1.0.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/lib/client-logger.ts.md
 */
"use client";

import * as Sentry from "@sentry/nextjs";

// =====================================================================
//             NÚCLEO DE PERSISTENCIA LOCAL (CLIENTE)
// =====================================================================

/**
 * @interface LogEntry
 * @description Contrato de datos para una entrada de log persistente.
 */
interface LogEntry {
  timestamp: string;
  level: "trace" | "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
}

/**
 * @class LocalStorageLogManager
 * @description Gestor atómico para la persistencia de logs en `localStorage`.
 *              Encapsula toda la lógica de escritura, lectura y rotación.
 */
class LocalStorageLogManager {
  private static readonly STORAGE_KEY = "app_client_logs";
  private static readonly MAX_LOGS = 100;
  private static readonly LOG_TTL_MS = 7 * 24 * 60 * 60 * 1000;

  private static getLogs(): LogEntry[] {
    try {
      if (typeof window === "undefined") return [];
      const storedLogs = window.localStorage.getItem(this.STORAGE_KEY);
      return storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      console.error("[LocalStorageLogManager] Error al leer logs:", error);
      return [];
    }
  }

  private static saveLogs(logs: LogEntry[]): void {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error("[LocalStorageLogManager] Error al guardar logs:", error);
    }
  }

  public static add(newLog: Omit<LogEntry, "timestamp">): void {
    const now = new Date();
    const entry: LogEntry = {
      timestamp: now.toISOString(),
      ...newLog,
    };

    let logs = this.getLogs();
    logs = logs.filter(
      (log) =>
        now.getTime() - new Date(log.timestamp).getTime() < this.LOG_TTL_MS
    );
    logs.push(entry);
    if (logs.length > this.MAX_LOGS) {
      logs = logs.slice(logs.length - this.MAX_LOGS);
    }
    this.saveLogs(logs);
  }
}

// =====================================================================
//                   LOGGER DE CLIENTE HÍBRIDO
// =====================================================================

type LogLevel = "trace" | "info" | "warn" | "error" | "fatal";
type LogContext = Record<string, unknown>;

function createClientLoggerMethod(
  level: LogLevel
): (message: string, context?: LogContext) => void {
  const isDev = process.env.NODE_ENV === "development";
  const { logger: sentryLogger } = Sentry;

  return (message: string, context?: LogContext) => {
    if (isDev) {
      const consoleMethod =
        level === "error" || level === "fatal"
          ? console.error
          : level === "warn"
            ? console.warn
            : console.info;
      consoleMethod(`[${level.toUpperCase()}] ${message}`, context || "");
    }

    if (level !== "fatal") {
      LocalStorageLogManager.add({
        level: level as LogEntry["level"],
        message,
        context,
      });
    }

    switch (level) {
      case "warn":
        sentryLogger.warn(message, context);
        break;
      case "error":
        sentryLogger.error(message, context);
        Sentry.captureMessage(`Error: ${message}`, {
          level: "error",
          extra: context,
        });
        break;
      case "fatal":
        sentryLogger.fatal(message, context);
        Sentry.captureMessage(`Fatal: ${message}`, {
          level: "fatal",
          extra: context,
        });
        break;
      default:
        break;
    }
  };
}

/**
 * @public
 * @constant clientLogger
 * @description Logger híbrido para el lado del cliente (navegador).
 */
export const clientLogger = {
  trace: createClientLoggerMethod("trace"),
  info: createClientLoggerMethod("info"),
  warn: createClientLoggerMethod("warn"),
  error: createClientLoggerMethod("error"),
  fatal: createClientLoggerMethod("fatal"),
};
// src/lib/client-logger.ts
