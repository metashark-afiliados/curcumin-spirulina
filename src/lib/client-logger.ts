// src/lib/client-logger.ts
/**
 * @file src/lib/client-logger.ts
 * @description Aparato de Logging de Élite y Única Fuente de Verdad (SSoT) para el lado del **cliente**.
 *              Provee una API de logging segura, ultra-ligera y consistente, diseñada
 *              exclusivamente para el entorno del navegador. Utiliza `console` de forma
 *              controlada y se adhiere a la interfaz `ILogger` para una API unificada.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @see .docs-espejo/lib/client-logger.ts.md
 * @see src/lib/types/logging.ts (SSoT para `LogContext` y `ILogger`)
 */
"use client"; // Directiva para asegurar que este módulo solo se compile en el cliente.

import { type ILogger, type LogContext } from "@/lib/types/logging";

/**
 * @private
 * @function createSafeConsoleMethod
 * @description Crea una función de logging segura que envuelve un método de `console`
 *              existente. Garantiza que el logging solo ocurra en entornos donde
 *              `console` y el método especificado están disponibles, previniendo errores.
 *              Formatea el output para incluir un prefijo y el contexto.
 * @param {"log" | "info" | "warn" | "error" | "debug"} method - El método de `console` a envolver.
 * @param {string} prefix - Un prefijo para añadir al mensaje de log en la consola.
 * @returns {(context: LogContext, message: string) => void} Una función de logging que
 *          sigue la firma unificada `(context: LogContext, message: string)`.
 */
const createSafeConsoleMethod = (
  method: "log" | "info" | "warn" | "error" | "debug",
  prefix: string
): ((context: LogContext, message: string) => void) => {
  // Asegura que 'console' y el método existen antes de intentar usarlos.
  if (typeof console !== "undefined" && typeof console[method] === "function") {
    return (context: LogContext, message: string) => {
      // Formatea el mensaje para la consola del navegador.
      // Aquí el contexto se imprime como un objeto separado después del mensaje.
      (console[method] as Function)(`${prefix} ${message}`, context);
    };
  }
  // En entornos donde el console no está disponible o el método falta,
  // devuelve una función vacía para evitar errores.
  return () => {};
};

/**
 * @public
 * @constant clientLogger
 * @description La instancia del logger de cliente. Esta es la Única Fuente de Verdad
 *              para emitir logs desde cualquier Client Component o lógica del navegador.
 *              Implementa la interfaz `ILogger` para una API tipo-segura y unificada.
 *              Sus métodos `trace`, `info`, `warn`, `error` esperan `(context: LogContext, message: string)`.
 */
export const clientLogger: ILogger = {
  // `trace` se mapea a `console.debug` por convención en el navegador.
  trace: createSafeConsoleMethod("debug", "[CLIENT_TRACE]"),
  info: createSafeConsoleMethod("info", "[CLIENT_INFO]"),
  warn: createSafeConsoleMethod("warn", "[CLIENT_WARN]"),
  error: createSafeConsoleMethod("error", "[CLIENT_ERROR]"),
};
// src/lib/client-logger.ts
