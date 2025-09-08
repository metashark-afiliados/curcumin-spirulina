// src/config/logger.config.ts
/**
 * @file src/config/logger.config.ts
 * @description Manifiesto de Configuración y SSoT para el sistema de logging.
 *              Define de forma declarativa las claves que deben ser censuradas
 *              automáticamente en todos los logs de la aplicación.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/config/logger.config.ts.md
 */
import "server-only";

/**
 * @public
 * @constant REDACTED_PATHS
 * @description Array de solo lectura que contiene las rutas de claves de objeto
 *              que serán censuradas por Pino. Sigue el formato de `pino-redact`.
 *              Esta lista previene la fuga de Información Personal Identificable (PII)
 *              y otras credenciales sensibles a los logs.
 */
export const REDACTED_PATHS: readonly string[] = [
  // --- Información Personal Identificable (PII) ---
  "name",
  "phone",
  "email",
  "address",
  "*.email",
  "payload.email",
  "context.payload.email",
  "user.name",
  "user.phone",

  // --- Credenciales y Tokens (Buenas Prácticas de Seguridad) ---
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "apiKey",
  "secret",
  "*.password",
  "*.token",
  "*.apiKey",
  "*.secret",

  // --- Cabeceras HTTP Sensibles ---
  "req.headers.authorization",
  "req.headers.cookie",
];
// src/config/logger.config.ts
