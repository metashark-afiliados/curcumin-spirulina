// src/lib/actions/telemetry/logTelemetryEvent.action.ts
/**
 * @file logTelemetryEvent.action.ts
 * @description Server Action soberana y blindada para la persistencia de eventos
 *              de telemetría. Refactorizada para usar el HOC `withLogger`,
 *              asegurando que su ejecución sea una transacción observable y
 *              atómica.
 * @version 2.0.0
 * @author L.I.A. Legacy
 */
"use server";

import type pino from "pino";
import { withLogger } from "@/lib/helpers/with-logger.helper";
import { type ActionResult } from "@/lib/types/actions";
import {
  TelemetryEventSchema,
  type TelemetryEvent,
} from "@/lib/validators/TelemetryEvent.schema";

/**
 * @private
 * @function logTelemetryEventHandler
 * @description Lógica interna de la Server Action. Recibe el logger inyectado.
 * @param {pino.Logger} logger - La instancia del logger transaccional.
 * @param {unknown} eventData - Los datos del evento crudos desde el cliente.
 * @returns {Promise<ActionResult<boolean>>} Un resultado simple de éxito/fracaso.
 */
async function logTelemetryEventHandler(
  logger: pino.Logger,
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
      "Evento de telemetría inválido recibido."
    );
    return { success: false, error: "generic.error_invalid_data" };
  }

  const telemetryEvent = validation.data as TelemetryEvent;

  logger.info(
    { ...baseContext, telemetryEvent },
    `Evento '${telemetryEvent.eventName}' registrado.`
  );

  return { success: true, data: true };
}

/**
 * @public
 * @action logTelemetryEvent
 * @description Server Action pública, envuelta por el HOC `withLogger` para
 *              garantizar una ejecución transaccional y observable.
 */
export const logTelemetryEvent = withLogger(logTelemetryEventHandler);
// src/lib/actions/telemetry/logTelemetryEvent.action.ts
