// src/lib/client-logger.ts
/**
 * @file src/lib/client-logger.ts
 * @description Aparato de Logging de Cliente. Proporciona una API de logging
 *              consistente y ligera para el entorno del navegador.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/lib/client-logger.ts.md
 */
"use client";

/**
 * @private
 * @function createSafeConsoleMethod
 * @description Factoría que crea una función de logging segura. Si el método
 *              `console` no existe, devuelve una función no-op para evitar
 *              errores en entornos no estándar.
 * @param {'log' | 'info' | 'warn' | 'error' | 'debug'} method - El método de consola a envolver.
 * @param {string} prefix - El prefijo a añadir a cada mensaje de log.
 * @returns {(...args: any[]) => void} La función de logging segura.
 */
const createSafeConsoleMethod = (
  method: "log" | "info" | "warn" | "error" | "debug",
  prefix: string
): ((...args: any[]) => void) => {
  if (typeof console !== "undefined" && typeof console[method] === "function") {
    return console[method].bind(console, prefix);
  }
  return () => {}; // No-op function
};

/**
 * @public
 * @constant clientLogger
 * @description La instancia SSoT del logger de cliente. Debe ser utilizada
 *              en todos los módulos del lado del cliente (`"use client"`).
 */
export const clientLogger = {
  trace: createSafeConsoleMethod("debug", "[TRACE]"),
  info: createSafeConsoleMethod("info", "[INFO]"),
  warn: createSafeConsoleMethod("warn", "[WARN]"),
  error: createSafeConsoleMethod("error", "[ERROR]"),
  fatal: createSafeConsoleMethod("error", "[FATAL]"),
};
// src/lib/client-logger.ts
