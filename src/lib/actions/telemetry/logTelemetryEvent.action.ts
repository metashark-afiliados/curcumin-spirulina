// src/lib/actions/telemetry/logTelemetryEvent.action.ts
/**
 * @file logTelemetryEvent.action.ts
 * @description Server Action soberana y blindada para la persistencia de eventos
 *              de telemetría. Actúa como la única puerta de entrada al backend
 *              para la recolección de datos de comportamiento del cliente.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
"use server";

import { serverLogger } from "@/lib/logger";
import { type ActionResult } from "@/lib/types/actions";
import {
  TelemetryEventSchema,
  type TelemetryEvent,
} from "@/lib/validators/TelemetryEvent.schema";

/**
 * @public
 * @action logTelemetryEvent
 * @description Recibe un objeto de evento de telemetría desde el cliente, lo
 *              valida rigurosamente contra el schema SSoT, y si es válido,
 *              lo registra usando el `serverLogger`.
 * @param {unknown} eventData - Los datos del evento crudos desde el cliente.
 * @returns {Promise<ActionResult<boolean>>} Un resultado simple de éxito/fracaso.
 *          El cliente no esperará esta respuesta ("fire-and-forget").
 */
export async function logTelemetryEvent(
  eventData: unknown
): Promise<ActionResult<boolean>> {
  const validation = TelemetryEventSchema.safeParse(eventData);

  if (!validation.success) {
    serverLogger.warn(
      {
        error: validation.error.flatten(),
        receivedData: eventData,
      },
      "[TelemetryAction] Evento de telemetría inválido recibido."
    );
    // Falla silenciosamente para el cliente, pero registra el error.
    return { success: false, error: "generic.error_invalid_data" };
  }

  const telemetryEvent = validation.data as TelemetryEvent;

  serverLogger.info(
    { telemetryEvent },
    `[Telemetry] Evento '${telemetryEvent.eventName}' registrado.`
  );

  return { success: true, data: true };
}
// src/lib/actions/telemetry/logTelemetryEvent.action.ts
