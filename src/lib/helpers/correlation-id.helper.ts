// src/lib/helpers/correlation-id.helper.ts
/**
 * @file correlation-id.helper.ts
 * @description Aparato de infraestructura atómico y SSoT para la gestión de
 *              IDs de correlación a través de `AsyncLocalStorage`. Permite la
 *              trazabilidad de logs de extremo a extremo en el servidor.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs/manifiesto-estructura-basica.md
 * @see .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 */
import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";
import { serverLogger } from "@/lib/logger";

/**
 * @private
 * @constant asyncStorage
 * @description Instancia de `AsyncLocalStorage` para almacenar el ID de correlación.
 *              El tipo genérico define la forma del "store" para cada contexto asíncrono.
 */
const asyncStorage = new AsyncLocalStorage<{ correlationId: string }>();

/**
 * @public
 * @function getCorrelationId
 * @description Obtiene el ID de correlación del contexto asíncrono actual.
 *              Es consumido por el formateador del logger para inyectar el ID en cada log.
 * @returns {string | undefined} El ID de correlación, o undefined si no está en el contexto.
 */
export function getCorrelationId(): string | undefined {
  return asyncStorage.getStore()?.correlationId;
}

/**
 * @public
 * @function withCorrelationId
 * @description Ejecuta una función dentro de un nuevo contexto asíncrono con un ID de correlación.
 *              Será utilizado por el middleware para envolver cada petición entrante.
 * @template R - El tipo de retorno de la función a ejecutar.
 * @param {() => R} fn - La función a ejecutar dentro del contexto.
 * @param {string} [correlationId] - Un ID de correlación existente. Si no se provee, se genera uno nuevo.
 * @returns {R} El resultado de la ejecución de la función `fn`.
 */
export function withCorrelationId<R>(fn: () => R, correlationId?: string): R {
  const id = correlationId || `req-${crypto.randomUUID()}`;
  serverLogger.trace(
    { correlationId: id },
    "[CorrelationId] Contexto de petición establecido."
  );
  return asyncStorage.run({ correlationId: id }, fn);
}
// src/lib/helpers/correlation-id.helper.ts
