// src/config/logger.config.ts
/**
 * @file logger.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              el sistema de logging. Centraliza las claves de datos sensibles que
 *              deben ser censuradas automáticamente en todos los logs de la aplicación,
 *              actuando como un guardián de la seguridad de los datos.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/config/logger.config.ts.md
 */
import "server-only";

/**
 * @public
 * @constant REDACTED_PATHS
 * @description Una lista inmutable y canónica de rutas de claves a ser censuradas.
 *              El motor de logging (Pino) usará esta lista para reemplazar los valores
 *              correspondientes por "[REDACTED]", previniendo la fuga de Información
 *              de Identificación Personal (PII) a los sistemas de logging.
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
