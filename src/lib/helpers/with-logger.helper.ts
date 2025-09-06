// src/lib/helpers/with-logger.helper.ts
/**
 * @file src/lib/helpers/with-logger.helper.ts
 * @description Aparato de infraestructura y SSoT para la observabilidad transaccional
 *              en el **entorno de servidor Node.js**. Provee un HOC (`withLogger`) que
 *              implementa el patrón de Inyección de Dependencias para el logging.
 *              Esta es la implementación canónica que resuelve el conflicto con RSC.
 * @author L.I.A. Legacy
 * @version 7.0.0
 * @see .docs/TODO.md
 */
import "server-only";

import { v4 as uuid } from "uuid";
import type pino from "pino";
import { basePinoLogger } from "@/lib/logger";

/**
 * @private
 * @type HandlerWithLogger
 * @description Define la firma de una función que acepta un logger como su primer argumento.
 * @template R - El tipo de la función handler original.
 */
type HandlerWithLogger<R extends (...args: any[]) => Promise<any>> = (
  logger: pino.Logger,
  ...args: Parameters<R>
) => ReturnType<R>;

/**
 * @public
 * @function withLogger
 * @description HOC (Higher-Order Component) que envuelve una función de servidor
 *              (Server Component, Server Action, Route Handler) y le inyecta un
 *              `childLogger` transaccional como primer argumento.
 * @template R - El tipo de la función handler original.
 * @param {HandlerWithLogger<R>} handlerFn - La función a envolver.
 * @returns {R} Una nueva función con la firma original del handler (excluyendo el logger),
 *              lista para ser exportada o usada por Next.js.
 */
export function withLogger<R extends (...args: any[]) => Promise<any>>(
  handlerFn: HandlerWithLogger<R>
): R {
  return (async (...args: Parameters<R>) => {
    const requestId = uuid();
    const childLogger = basePinoLogger.child({ requestId });

    // Inyección de Dependencia: El logger se pasa como el primer argumento.
    return handlerFn(childLogger, ...args);
  }) as R;
}
// src/lib/helpers/with-logger.helper.ts
