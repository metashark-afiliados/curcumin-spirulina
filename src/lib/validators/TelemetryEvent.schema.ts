// src/lib/validators/TelemetryEvent.schema.ts
/**
 * @file TelemetryEvent.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para eventos de telemetría.
 *              Esta versión expande el vocabulario para incluir eventos de
 *              negocio específicos del ciclo de vida del formulario de pedido.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.2.0
 * @see .docs-espejo/lib/validators/TelemetryEvent.schema.ts.md
 */
import "server-only";
import { z } from "zod";

/**
 * @public
 * @constant TelemetryEventNames
 * @description SSoT para los nombres de eventos canónicos. Usar un enum de Zod
 *              previene errores de tipeo y garantiza la consistencia.
 */
export const TelemetryEventNames = z.enum([
  "PAGE_VIEW",
  "CTA_CLICK",
  "SCROLL_DEPTH",
  "SESSION_START",
  "LANGUAGE_SELECTED",
  "BENEFIT_HOVER",
  // MEJORA: Nuevos eventos para el funil de conversión.
  "FORM_VIEW",
  "FORM_SUBMIT_SUCCESS",
  "FORM_SUBMIT_INVALID",
]);

/**
 * @public
 * @constant TelemetryEventSchema
 * @description El schema Zod maestro que valida la estructura completa de un
 *              evento de telemetría antes de ser registrado.
 */
export const TelemetryEventSchema = z.object({
  sessionId: z
    .string()
    .uuid()
    .describe("ID único que agrupa todos los eventos de una misma sesión."),
  eventName: TelemetryEventNames.describe(
    "El nombre canónico del evento que ocurrió."
  ),
  payload: z
    .record(z.any())
    .optional()
    .describe(
      "Un objeto de datos flexible para contener información contextual del evento."
    ),
  timestamp: z
    .string()
    .datetime()
    .describe("Timestamp ISO 8601 de cuándo ocurrió el evento."),
});

/**
 * @public
 * @type TelemetryEvent
 * @description Infiere el tipo de TypeScript a partir del schema, creando una
 *              SSoT tipo-segura para ser usada en toda la aplicación.
 */
export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
// src/lib/validators/TelemetryEvent.schema.ts
