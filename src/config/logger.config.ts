// src/config/logger.config.ts
/**
 * @file logger.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              el sistema de logging. Centraliza las claves de datos sensibles que
 *              deben ser censuradas automáticamente en todos los logs de la aplicación,
 *              actuando como un guardián de la seguridad de los datos.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/config/logger.config.ts.md
 */
import "server-only";

/**
 * @public
 * @constant REDACTED_PATHS
 * @description Una lista inmutable y canónica de rutas de claves a ser censuradas
 *              por el motor de logging (Pino). Esta constante es el pilar de la
 *              prevención de fuga de Información de Identificación Personal (PII)
 *              hacia los sistemas de observabilidad.
 *
 *              La sintaxis sigue las convenciones de `pino-redact`:
 *              - `key`: Censura la clave `key` en el nivel raíz.
 *              - `*.key`: Censura la clave `key` en cualquier nivel de anidamiento.
 */
export const REDACTED_PATHS: readonly string[] = [
  // --- Datos de Formulario de Pedido ---
  // Se censuran explícitamente para proteger los datos del cliente.
  "name",
  "phone",

  // --- Credenciales y Datos de Autenticación Genéricos ---
  // Previenen la fuga de cualquier tipo de credencial o PII.
  "email",
  "password",
  "token",
  "accessToken",
  "refreshToken",

  // --- Patrones de Anidamiento Comunes ---
  // Aseguran la censura incluso si los datos están dentro de objetos anidados.
  "*.password",
  "*.email",
  "req.headers.authorization", // Censura el header de autorización completo
  "payload.email",
  "context.payload.email",
];
// src/config/logger.config.ts
