// src/lib/actions/telemetry/logTelemetryEvent.action.ts
/**
 * @file logTelemetryEvent.action.ts
 * @description Server Action soberana y blindada para la persistencia de eventos
 *              de telemetría. Refactorizada para consumir el HOC genérico
 *              `withCorrelationId`, resolviendo el error de tipo TS2345.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/lib/actions/telemetry/logTelemetryEvent.action.ts.md
 */
"use server";

import { withCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { logger } from "@/lib/logger";
import { type ActionResult } from "@/lib/types/actions";
import { TelemetryEventSchema } from "@/lib/validators/TelemetryEvent.schema";

/**
 * @private
 * @async
 * @function logTelemetryEventHandler
 * @description Lógica interna de la Server Action. Valida y registra un
 *              único evento de telemetría.
 * @param {unknown} eventData - Los datos del evento crudos recibidos desde el cliente.
 * @returns {Promise<ActionResult<boolean>>} Un resultado simple de éxito/fracaso.
 */
async function logTelemetryEventHandler(
  eventData: unknown
): Promise<ActionResult<boolean>> {
  const baseContext = { component: "TelemetryAction" };

  const validation = TelemetryEventSchema.safeParse(eventData);

  if (!validation.success) {
    logger.warn(
      {
        ...baseContext,
        error: validation.error.flatten(),
        receivedData: eventData,
      },
      "Evento de telemetría inválido recibido. La acción falló."
    );
    return { success: false, error: "generic.error_invalid_data" };
  }

  const telemetryEvent = validation.data;

  logger.info(
    { ...baseContext, telemetryEvent },
    `Evento '${telemetryEvent.eventName}' registrado con éxito.`
  );

  return { success: true, data: true };
}

/**
 * @public
 * @action logTelemetryEvent
 * @description Server Action pública. Es la SSoT para registrar eventos de
 *              telemetría desde el cliente. Envuelve la lógica de negocio con
 *              un contexto de correlación.
 */
export const logTelemetryEvent = withCorrelationId(logTelemetryEventHandler);
// src/lib/actions/telemetry/logTelemetryEvent.action.ts
