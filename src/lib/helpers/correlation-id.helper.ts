// src/lib/helpers/correlation-id.helper.ts
/**
 * @file src/lib/helpers/correlation-id.helper.ts
 * @description Aparato de infraestructura atómico y SSoT para la gestión de IDs de correlación.
 *              Provee un mecanismo para rastrear peticiones de principio a fin en el servidor
 *              mediante un identificador único (`correlationId`). Es un pilar de la observabilidad,
 *              permitiendo la correlación de logs y eventos a través de diferentes capas de la aplicación.
 *              No utiliza la directiva "server-only", confiando en el tree-shaking para la separación
 *              de bundles debido a la naturaleza isomórfica de algunas partes del sistema de logging.
 * @author L.I.A. Legacy
 * @version 2.1.0
 * @see src/lib/types/logging.ts (Define la estructura del LogContext)
 * @see src/lib/logger.ts (Utiliza `getCorrelationId` para inyectar el ID en los logs del servidor)
 */
import { AsyncLocalStorage } from "node:async_hooks";

// Se utiliza AsyncLocalStorage para mantener el correlationId a través de llamadas asíncronas
// en el mismo hilo de ejecución de la petición.
const asyncStorage = new AsyncLocalStorage<{ correlationId: string }>();

/**
 * @public
 * @function getCorrelationId
 * @description Obtiene el `correlationId` del contexto de ejecución asíncrono actual.
 *              Si no hay un `correlationId` establecido, devuelve `undefined`.
 * @returns {string | undefined} El ID de correlación actual o `undefined`.
 */
export function getCorrelationId(): string | undefined {
  return asyncStorage.getStore()?.correlationId;
}

/**
 * @public
 * @function withCorrelationId
 * @description Ejecuta una función dentro de un nuevo contexto de `AsyncLocalStorage`,
 *              estableciendo un `correlationId` para esa rama de ejecución asíncrona.
 *              Si se proporciona un `correlationId` existente, lo reutiliza; de lo contrario,
 *              genera uno nuevo.
 * @template R - El tipo de retorno de la función `fn`.
 * @param {() => R} fn - La función a ejecutar dentro del contexto del `correlationId`.
 * @param {string} [correlationId] - Un ID de correlación opcional a reutilizar. Si no se
 *                                   proporciona, se generará uno nuevo con un prefijo `req-`.
 * @returns {R} El resultado de la ejecución de la función `fn`.
 */
export function withCorrelationId<R>(fn: () => R, correlationId?: string): R {
  const id = correlationId || `req-${crypto.randomUUID()}`;
  return asyncStorage.run({ correlationId: id }, fn);
}
// src/lib/helpers/correlation-id.helper.ts
