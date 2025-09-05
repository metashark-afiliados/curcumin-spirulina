// src/lib/helpers/correlation-id.helper.ts
/**
 * @file correlation-id.helper.ts
 * @description Aparato de infraestructura atómico, puro y SSoT para la gestión
 *              de IDs de correlación a través de `AsyncLocalStorage`. Es el
 *              fundamento de la trazabilidad de logs en el servidor.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 */
import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";

/**
 * @private
 * @constant asyncStorage
 * @description Instancia de `AsyncLocalStorage` que crea un "store" aislado para
 *              cada cadena de ejecución asíncrona (ej. una petición HTTP).
 *              Este es el mecanismo que permite que el `correlationId` esté
 *              disponible implícitamente en toda la lógica de servidor.
 */
const asyncStorage = new AsyncLocalStorage<{ correlationId: string }>();

/**
 * @public
 * @function getCorrelationId
 * @description Obtiene el ID de correlación del contexto asíncrono actual.
 *              Es consumido por el formateador del logger para inyectar el ID
 *              en cada log de forma automática y transparente.
 * @returns {string | undefined} El ID de correlación, o undefined si no se
 *              está ejecutando dentro de un contexto `withCorrelationId`.
 */
export function getCorrelationId(): string | undefined {
  return asyncStorage.getStore()?.correlationId;
}

/**
 * @public
 * @function withCorrelationId
 * @description Ejecuta una función dentro de un nuevo contexto asíncrono con un
 *              ID de correlación. Es utilizado por el `middleware` para envolver
 *              cada petición entrante, garantizando la trazabilidad.
 * @template R - El tipo de retorno de la función a ejecutar.
 * @param {() => R} fn - La función a ejecutar dentro del contexto.
 * @param {string} [correlationId] - Un ID de correlación existente. Si no se
 *              provee, se genera uno nuevo con el prefijo 'req-'.
 * @returns {R} El resultado de la ejecución de la función `fn`.
 */
export function withCorrelationId<R>(fn: () => R, correlationId?: string): R {
  const id = correlationId || `req-${crypto.randomUUID()}`;
  return asyncStorage.run({ correlationId: id }, fn);
}
// src/lib/helpers/correlation-id.helper.ts
