// src/config.ts
/**
 * @file src/config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              todas las variables de entorno y valores de configuración globales de
 *              la aplicación. Centraliza la configuración de URLs, niveles de logging
 *              y el contexto base del logger.
 * @author L.I.A. Legacy
 * @version 2.1.0
 * @see .docs-espejo/config.ts.md
 */

/**
 * @public
 * @type LogLevel
 * @description Define los niveles de log canónicos para la aplicación.
 *              Esta es la SSoT para los tipos de nivel de log, reemplazando la
 *              dependencia de `LevelsByName` que no es exportada por `pino`.
 */
export type LogLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal"
  | "silent";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const remoteLogUrl = `${BASE_URL}/api/log`;

export const browserLogLevel = (process.env.NEXT_PUBLIC_BROWSER_LOG_LEVEL ||
  "info") as LogLevel;

export const browserRemoteLogLevel = (process.env
  .NEXT_PUBLIC_BROWSER_REMOTE_LOG_LEVEL || "info") as LogLevel;

export const serverLogLevel = (process.env.SERVER_LOG_LEVEL ||
  "info") as LogLevel;

export const loggerContext = {
  name: "curcumin-spirulina-hub",
  isDemo: false,
  environment: process.env.NODE_ENV,
};
// src/config.ts
