// src/lib/helpers/correlation-id.helper.ts
/**
 * @file src/lib/helpers/correlation-id.helper.ts
 * @description Aparato de infraestructura atómico y SSoT para la gestión de
 *              IDs de correlación. Refactorizado a un wrapper de alto orden (HOC)
 *              genérico que preserva la firma de la función envuelta.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 */
import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";

const asyncStorage = new AsyncLocalStorage<{ correlationId: string }>();

/**
 * @public
 * @function getCorrelationId
 * @description Obtiene el ID de correlación del contexto asíncrono actual.
 * @returns {string | undefined} El ID de correlación, o undefined si no está en el contexto.
 */
export function getCorrelationId(): string | undefined {
  return asyncStorage.getStore()?.correlationId;
}

/**
 * @public
 * @function withCorrelationId
 * @description Wrapper de alto orden (HOC) que toma una función y devuelve una
 *              nueva función. Cuando la nueva función es llamada, ejecutará la
 *              original dentro de un contexto asíncrono con un ID de correlación único.
 * @template T - Un tipo de función que puede aceptar cualquier argumento y devolver cualquier valor.
 * @param {T} fn - La función a envolver.
 * @returns {(...args: Parameters<T>) => ReturnType<T>} Una nueva función con la
 *          misma firma que la original.
 */
export function withCorrelationId<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    // Un ID de correlación se genera para cada ejecución de la función envuelta.
    const id = `req-${crypto.randomUUID()}`;
    return asyncStorage.run({ correlationId: id }, () => fn(...args));
  };
}
// src/lib/helpers/correlation-id.helper.ts
