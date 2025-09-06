// src/lib/logger.ts
/**
 * @file src/lib/logger.ts
 * @description Aparato de Logging de Élite y Única Fuente de Verdad (SSoT) para el lado del **servidor**.
 *              Utiliza `pino` para un rendimiento óptimo y logs estructurados en JSON.
 *              Integra funcionalidades clave de observabilidad como la censura de datos sensibles
 *              (`redact`) y la trazabilidad de peticiones mediante el `correlationId`.
 *              Provee una API unificada a través de la interfaz `ILogger`.
 *              **Esta versión implementa un patrón de inicialización lazy para `pino`
 *              para garantizar la compatibilidad con React Server Components (RSC) y
 *              evitar `TypeError: Invalid value used as weak map key` en el entorno
 *              de Next.js durante el SSR/SSG.**
 * @author L.I.A. Legacy
 * @version 5.5.0
 * @see .docs-espejo/lib/logger.ts.md
 * @see src/config/logger.config.ts (SSoT para `REDACTED_PATHS`)
 * @see src/lib/helpers/correlation-id.helper.ts (SSoT para `getCorrelationId`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext` y `ILogger`)
 */
"server-only"; // Directiva para asegurar que este módulo solo se compile en el servidor (Node.js).

import pino from "pino";
import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { type ILogger, type LogContext } from "@/lib/types/logging";

/**
 * @private
 * @type PinoInstance
 * @description Tipo auxiliar para la instancia de Pino o `null` si no inicializada.
 */
type PinoInstance = pino.Logger | null;

/**
 * @private
 * @var _loggerInstance
 * @description Variable interna que almacena la instancia singleton de Pino, inicializada de forma lazy.
 */
let _loggerInstance: PinoInstance = null;

// Variables de entorno para detectar el entorno de ejecución de Next.js
const isMainNodeJsRuntime =
  typeof process !== "undefined" &&
  typeof process.env.NEXT_RUNTIME === "undefined"; // Main Node.js thread (e.g. `next dev` server)
const isTestEnvironment = process.env.NODE_ENV === "test";

/**
 * @private
 * @function initializePino
 * @description Inicializa la instancia de Pino con la configuración definida.
 *              Se asegura de que Pino utilice un destino síncrono para `stdout`,
 *              lo cual es vital para la compatibilidad con RSC.
 * @returns {pino.Logger} La instancia de Pino inicializada.
 */
function initializePino(): pino.Logger {
  // Opciones de configuración para la instancia de Pino.
  const pinoConfig: pino.LoggerOptions = {
    level:
      isTestEnvironment || process.env.NODE_ENV === "development"
        ? "trace"
        : "info",
    base: {
      service: "curcumin-spirulina-hub", // Nombre canónico del servicio
    },
    timestamp: pino.stdTimeFunctions.isoTime, // Formato de tiempo ISO 8601
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }), // Nivel de log en mayúsculas
      log: (obj) => {
        // Inyecta el correlationId en cada log si está disponible en el contexto.
        const correlationId = getCorrelationId();
        if (correlationId) {
          return { ...obj, correlationId };
        }
        return obj;
      },
    },
    // Configuración de censura para PII, utilizando la SSoT de REDACTED_PATHS.
    redact: {
      paths: [...REDACTED_PATHS],
      censor: "[REDACTED]", // Valor de reemplazo para los datos censurados.
    },
  };

  // Se utiliza `pino.destination({ sync: true })` para forzar un transporte
  // síncrono a `stdout`. Esto es crucial para la compatibilidad con RSC
  // en Next.js, evitando el uso de worker threads que causaban errores.
  const pinoDestination = pino.destination({ sync: true });

  return pino(pinoConfig, pinoDestination);
}

/**
 * @private
 * @function getPinoInstance
 * @description Retorna la instancia singleton de Pino, inicializándola si es necesario.
 *              **Incluye una comprobación de entorno para evitar la inicialización
 *              en worker threads problemáticos (ej., durante la fase de build/prerrenderizado de RSC).**
 *              Si el entorno no es compatible con la inicialización completa de Pino,
 *              devuelve una instancia de logger dummy que usa `console`.
 * @returns {pino.Logger} La instancia de Pino (real o dummy).
 */
function getPinoInstance(): pino.Logger {
  if (!_loggerInstance) {
    // Si estamos en el entorno principal de Node.js (servidor real) y no en un entorno de prueba,
    // inicializamos la instancia real de Pino.
    if (isMainNodeJsRuntime && !isTestEnvironment) {
      _loggerInstance = initializePino();
      // No logueamos la inicialización aquí para evitar recursión
      // o intentos de logging durante una fase de build donde los logs no están listos.
    } else {
      // En entornos de worker de build (RSC/SSG), Edge (donde tenemos edgeLogger) o tests,
      // usamos un logger dummy para evitar errores como `WeakMap key` o fallos de `worker thread`.
      _loggerInstance = {
        trace: (context, message) => {
          /* console.debug("[DUMMY_LOGGER_TRACE]", message, context); */
        },
        info: (context, message) => {
          /* console.info("[DUMMY_LOGGER_INFO]", message, context); */
        },
        warn: (context, message) => {
          /* console.warn("[DUMMY_LOGGER_WARN]", message, context); */
        },
        error: (context, message) => {
          console.error("[DUMMY_LOGGER_ERROR]", message, context);
        }, // Los errores críticos se loguean a console.error.
      } as pino.Logger; // Aserción para compatibilidad de tipo con pino.Logger.
    }
  }
  return _loggerInstance;
}

/**
 * @public
 * @constant serverLogger
 * @description La instancia explícita del logger de servidor. Provee una API de logging
 *              que delega las llamadas a una instancia de Pino (real o dummy) obtenida
 *              de forma lazy. Emite logs JSON estructurados de forma síncrona a `stdout`
 *              (o a la consola en modo dummy).
 *              Implementa la interfaz `ILogger` para una API tipo-segura y unificada.
 */
export const serverLogger: ILogger = {
  trace: (context, message) => getPinoInstance().trace(context, message),
  info: (context, message) => getPinoInstance().info(context, message),
  warn: (context, message) => getPinoInstance().warn(context, message),
  error: (context, message) => getPinoInstance().error(context, message),
};

/**
 * @public
 * @constant logger
 * @description Alias canónico para `serverLogger`. Debe ser utilizado por defecto
 *              en todo el código de servidor para una mayor consistencia y legibilidad,
 *              adhiriéndose a la interfaz `ILogger`.
 */
export const logger: ILogger = serverLogger;
// src/lib/logger.ts
