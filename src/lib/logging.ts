// src/lib/logging.ts
/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Aparato de Logging de Élite y Desacoplado.
 *              Proporciona dos loggers distintos: `logger` para el entorno de
 *              servidor y `clientLogger` para el entorno de cliente.
 *              Esta separación previene que dependencias de servidor se empaqueten
 *              en el bundle del cliente.
 */

type LogLevel = "trace" | "info" | "warn" | "error";

// --- LOGGER DE SERVIDOR ---

function logToServerConsole(
  level: LogLevel,
  message: string,
  ...context: any[]
) {
  if (process.env.NODE_ENV !== "development") return;
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

/**
 * @public
 * @constant logger
 * @description Logger canónico para uso en **entornos de servidor** (Server Components,
 *              Server Actions, API Routes, Middleware).
 */
export const logger = {
  trace: (message: string, ...context: any[]) => {
    logToServerConsole("trace", message, ...context);
  },
  info: (message: string, ...context: any[]) => {
    logToServerConsole("info", message, ...context);
    // Futuro: Sentry.captureMessage(message, { level: 'info', extra: { context } });
  },
  warn: (message: string, ...context: any[]) => {
    logToServerConsole("warn", message, ...context);
    // Futuro: Sentry.captureMessage(message, { level: 'warning', extra: { context } });
  },
  error: (message: string, ...context: any[]) => {
    logToServerConsole("error", message, ...context);
    // Futuro: Sentry.captureException(error, { extra: { context } });
  },
};

// --- LOGGER DE CLIENTE ---

/**
 * @public
 * @constant clientLogger
 * @description Logger ligero para uso exclusivo en **Client Components**.
 *              Es un wrapper de `console` sin dependencias de servidor.
 */
export const clientLogger = {
  trace: console.debug.bind(console, "[TRACE]"),
  info: console.info.bind(console, "[INFO]"),
  warn: console.warn.bind(console, "[WARN]"),
  error: console.error.bind(console, "[ERROR]"),
};

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - INTEGRAÇÃO COM SENTRY: Integrar completamente o Sentry SDK para capturar e reportar erros em produção, descomentando as chamadas `Sentry.captureMessage` e `Sentry.captureException`.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - ARQUITETURA DE DUPLO LOGGER: A separação entre `logger` (servidor) e `clientLogger` (cliente) estabelece um padrão de observabilidade robusto e otimizado para o Next.js App Router.
 * ((Implementada)) @version 1.0.0 - LOGGING ESTRUTURADO EM DESENVOLVIMENTO: O `logToServerConsole` fornece logs claros, com timestamp e nível, melhorando a experiência de depuração local.
 */
