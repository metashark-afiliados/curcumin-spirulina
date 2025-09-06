// src/config/logger.config.ts
/**
 * @file src/config/logger.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              la censura de datos sensibles (PII) en los logs del servidor.
 *              Esta configuración es utilizada por la instancia de `pino` para
 *              reemplazar automáticamente los valores de campos sensibles con `[REDACTED]`,
 *              actuando como el guardián de la privacidad en la observabilidad.
 * @author L.I.A. Legacy
 * @version 2.1.0
 * @see .docs-espejo/config/logger.config.ts.md
 * @see src/lib/logger.ts (Consumidor principal)
 */
import "server-only";

/**
 * @public
 * @constant REDACTED_PATHS
 * @description Una lista inmutable y canónica de rutas de claves a ser censuradas
 *              por el motor de logging (`pino`). Estas rutas se utilizan para interceptar
 *              y reemplazar automáticamente los valores de campos sensibles con `[REDACTED]`
 *              antes de que los logs sean emitidos. La notación de punto (`.`) se usa
 *              para anidamiento y el asterisco (`*`) como comodín.
 * @example
 * // "req.headers.authorization" censurará el token de autorización en los logs de la petición.
 * // "*.password" censurará cualquier clave 'password' en cualquier nivel del objeto de log.
 */
export const REDACTED_PATHS: readonly string[] = [
  // --- Credenciales y Tokens ---
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "*.password", // Comodín para contraseñas anidadas
  "*.token", // Comodín para tokens anidados

  // --- Información Personal Identificable (PII) ---
  "name",
  "phone",
  "email",
  "address",
  "*.email", // Comodín para emails anidados
  "payload.email",
  "context.payload.email",

  // --- Información de Red Sensible ---
  "ip",
  "req.ip",
  "res.ip",

  // --- Cabeceras HTTP Sensibles ---
  "req.headers.authorization",
  "req.headers.cookie",
  "req.headers['set-cookie']",
  "res.headers['set-cookie']",
];
// src/config/logger.config.ts
