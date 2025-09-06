// src/config/logger.config.ts
/**
 * @file src/config/logger.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              el sistema de logging del servidor. Centraliza las claves de datos sensibles
 *              (Personal Identifiable Information - PII) que deben ser censuradas
 *              automáticamente en todos los logs de la aplicación. Es un pilar fundamental
 *              para la seguridad de los datos y el cumplimiento normativo.
 * @author L.I.A. Legacy
 * @version 1.1.0
 * @see .docs-espejo/config/logger.config.ts.md
 * @see src/lib/logger.ts (Consumidor principal de esta configuración para el `serverLogger`)
 */
import "server-only";

/**
 * @public
 * @constant REDACTED_PATHS
 * @description Una lista inmutable y canónica de rutas de claves a ser censuradas
 *              por el motor de logging (Pino). Estas rutas se utilizan para interceptar
 *              y reemplazar automáticamente los valores de campos sensibles con `[REDACTED]`
 *              antes de que los logs sean emitidos, previniendo la fuga de PII.
 *              Las rutas pueden ser anidadas (ej. `payload.email`) y usar comodines (ej. `*.password`).
 */
export const REDACTED_PATHS: readonly string[] = [
  "name",
  "phone",
  "email",
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "*.password",
  "*.email",
  "req.headers.authorization",
  "payload.email",
  "context.payload.email",
];
// src/config/logger.config.ts
