// src/lib/types/logging.ts
/**
 * @file src/lib/types/logging.ts
 * @description Aparato de Contratos de Datos (SSoT) y "Constitución" para la
 *              arquitectura de logging unificada. Define los tipos `LogContext` y
 *              la interfaz `ILogger`, que son fundamentales para garantizar la
 *              consistencia y el tipado estricto en todos los loggers de la
 *              aplicación (servidor, cliente y edge).
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see .docs-espejo/lib/types/logging.ts.md
 */

/**
 * @public
 * @type LogContext
 * @description Define la estructura del objeto de contexto que acompaña a cada log.
 *              Permite añadir datos relevantes (ej. `userId`, `component`, `path`)
 *              de forma flexible, enriqueciendo la observabilidad sin acoplar
 *              el logger a un esquema de datos rígido.
 * @example
 * ```typescript
 * { component: "HeroSection", userId: "abc-123", traceId: "xyz-789" }
 * ```
 */
export type LogContext = Record<string, unknown>;

/**
 * @public
 * @interface ILogger
 * @description Define la interfaz canónica y unificada para todos los loggers
 *              de la aplicación. Cada método de logging (trace, info, warn, error, fatal)
 *              debe adherirse a la firma `(context: LogContext, message: string)`.
 *              Esto garantiza la coherencia en la forma de emitir logs y blinda
 *              la consistencia entre el `serverLogger`, `clientLogger` y `edgeLogger`.
 */
export interface ILogger {
  trace: (context: LogContext, message: string) => void;
  info: (context: LogContext, message: string) => void;
  warn: (context: LogContext, message: string) => void;
  error: (context: LogContext, message: string) => void;
  fatal: (context: LogContext, message: string) => void;
}
// src/lib/types/logging.ts
