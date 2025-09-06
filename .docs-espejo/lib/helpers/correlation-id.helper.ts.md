// src/lib/helpers/correlation-id.helper.ts
/**
 * @file src/lib/helpers/correlation-id.helper.ts
 * @description Aparato de infraestructura y SSoT para la observabilidad transaccional
 *              en el **entorno de servidor Node.js**. Provee un HOC (`withLogger`) que
 *              implementa el patrón de Inyección de Dependencias para el logging.
 *
 *              **ADVERTENCIA ARQUITECTÓNICA:** Este módulo sigue siendo **INCOMPATIBLE**
 *              con el Edge Runtime debido a su dependencia indirecta de `pino`.
 * @author L.I.A. Legacy
 * @version 5.0.0
 * @see .docs-espejo/lib/helpers/correlation-id.helper.ts.md
 */
import "server-only";

import { v4 as uuid } from "uuid";
import { type pino } from "pino";
import { logger as baseLogger } from "@/lib/logger";

type HandlerWithLogger<R extends (...args: any[]) => Promise<any>> = (
  logger: pino.Logger,
  ...args: Parameters<R>
) => ReturnType<R>;

/**
 * @public
 * @function withLogger
 * @description HOC (Higher-Order Component) que envuelve una función de servidor
 *              y le inyecta un `childLogger` transaccional como primer argumento.
 *              Este es el mecanismo SSoT para crear y propagar logs transaccionales.
 * @template R - El tipo de la función handler original.
 * @param {HandlerWithLogger<R>} handlerFn - La función de servidor a envolver. Su
 *               primer argumento debe ser de tipo `pino.Logger`.
 * @param {string} [initialRequestId] - Un `requestId` opcional para iniciar el contexto.
 * @returns {R} Una nueva función con la firma original, que internamente
 *              crea el logger y lo inyecta en el handler.
 */
export function withLogger<R extends (...args: any[]) => Promise<any>>(
  handlerFn: HandlerWithLogger<R>,
  initialRequestId?: string
): R {
  return (async (...args: Parameters<R>) => {
    const requestId = initialRequestId || uuid();
    const childLogger = baseLogger.child({ requestId });

    // Inyecta el childLogger como el primer argumento del handler original.
    return handlerFn(childLogger, ...args);
  }) as R;
}
// src/lib/helpers/correlation-id.helper.ts