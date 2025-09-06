// src/lib/edge-logger.ts
/**
 * @file src/lib/edge-logger.ts
 * @description Aparato de Logging de Élite, ultra-ligero y Única Fuente de Verdad (SSoT),
 *              diseñado específicamente para el **Edge Runtime**. No posee dependencias
 *              de Node.js y ofrece una API consistente con el `serverLogger` y `clientLogger`
 *              mediante la implementación de `ILogger`. Permite registrar logs estructurados
 *              en entornos Edge, inyectando el `correlationId` para trazabilidad.
 * @author L.I.A. Legacy
 * @version 2.4.0
 * @see .docs-espejo/lib/edge-logger.ts.md
 * @see src/lib/types/logging.ts (SSoT para `LogContext` y `ILogger`)
 * @see src/lib/helpers/correlation-id.helper.ts (Para `getCorrelationId` en el Edge)
 */

import { type ILogger, type LogContext } from "@/lib/types/logging";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper"; // Importar para usar en el Edge

/**
 * @private
 * @typedef {'trace' | 'info' | 'warn' | 'error'} LogLevel
 * @description Niveles de log soportados por el `edgeLogger`.
 */
type LogLevel = "trace" | "info" | "warn" | "error";

/**
 * @private
 * @function createEdgeLoggerMethod
 * @description Factoría para crear un método de logging específico para el Edge.
 *              Formatea el log como JSON e inyecta el `correlationId` si está disponible.
 *              Utiliza los métodos de `console` del Edge Runtime.
 * @param {LogLevel} level - El nivel de log (`'trace'`, `'info'`, etc.).
 * @returns {(context: LogContext, message: string) => void} Una función de logging
 *          que sigue la firma unificada `(context: LogContext, message: string)`.
 */
const createEdgeLoggerMethod =
  (level: LogLevel) => (context: LogContext, message: string) => {
    const timestamp = new Date().toISOString();
    const correlationId = getCorrelationId(); // Obtener correlationId para el Edge

    const logObject = {
      level: level.toUpperCase(),
      timestamp,
      message,
      service: "curcumin-spirulina-hub-edge", // Servicio específico para logs de Edge
      ...(correlationId && { correlationId }), // Inyecta correlationId si existe
      ...context, // Añade el contexto proporcionado
    };

    // En el Edge, usamos console.* para la salida. Vercel u otros proveedores
    // de Edge Runtime capturarán estos logs.
    switch (level) {
      case "error":
        console.error(JSON.stringify(logObject));
        break;
      case "warn":
        console.warn(JSON.stringify(logObject));
        break;
      case "info":
        console.info(JSON.stringify(logObject));
        break;
      default: // Para 'trace' y otros no mapeados explícitamente.
        console.log(JSON.stringify(logObject));
        break;
    }
  };

/**
 * @public
 * @constant edgeLogger
 * @description La instancia del logger de Edge Runtime. Esta es la Única Fuente de Verdad
 *              para emitir logs desde cualquier parte de la aplicación que se ejecute en el Edge.
 *              Implementa la interfaz `ILogger` para una API tipo-segura y unificada.
 */
export const edgeLogger: ILogger = {
  trace: createEdgeLoggerMethod("trace"),
  info: createEdgeLoggerMethod("info"),
  warn: createEdgeLoggerMethod("warn"),
  error: createEdgeLoggerMethod("error"),
};
// src/lib/edge-logger.ts
