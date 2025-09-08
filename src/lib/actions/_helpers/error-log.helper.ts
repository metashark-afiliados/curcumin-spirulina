// src/lib/actions/_helpers/error-log.helper.ts
/**
 * @file error-log.helper.ts
 * @description Aparato de ayuda atómico y especializado para la orquestación
 *              del registro de errores. Su única responsabilidad es generar un
 *              ID de error único y registrar el error de forma estructurada
 *              utilizando la SSoT de logging.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/lib/actions/_helpers/error-log.helper.ts.md
 */
"use server";
import "server-only";

import { logger } from "@/lib/logger";

/**
 * @public
 * @function logAndGenerateErrorId
 * @description Orquesta el registro de un error del servidor y genera un ID
 *              único para su trazabilidad. Es una función síncrona y resiliente.
 * @param {string} source - El nombre de la función/módulo donde se originó el error.
 * @param {Error} error - El objeto de error capturado.
 * @param {Record<string, any>} [metadata={}] - Datos contextuales adicionales para la depuración.
 * @returns {string} Un ID de error único generado (UUID v4).
 */
export function logAndGenerateErrorId(
  source: string,
  error: Error,
  metadata: Record<string, any> = {}
): string {
  const errorId = crypto.randomUUID();
  const context = {
    errorId,
    source,
    errorName: error.name,
    errorMessage: error.message,
    stack: error.stack,
    metadata,
  };

  // El serverLogger ya está configurado para enviar errores a Sentry en producción.
  // Esta única llamada cumple con la persistencia y la notificación.
  logger.error(context, `[${source}] Error de servidor capturado.`);

  return errorId;
}
// src/lib/actions/_helpers/error-log.helper.ts
