// src/lib/validators/i18n/ValidationErrors.schema.ts
/**
 * @file ValidationErrors.schema.ts
 * @description Ensamblador de Schemas y SSoT para todos los errores de la
 *              aplicación. Construye el contrato maestro de errores
 *              componiendo todos los schemas de error atómicos.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see LIA-SSoT-IMPLEMENTATION-GUIDE-V1 (Manifiesto de Implementación)
 * @see src/lib/types/actions.ts (Consumidor Principal)
 */
import { z } from "zod";
import { GenericErrorsSchema } from "./errors/GenericErrors.schema";

/**
 * @public
 * @constant ValidationErrorsSchema
 * @description El schema Zod maestro que valida la estructura completa de todos
 *              los mensajes de error. Es la SSoT para el tipo `ValidationErrorKey`.
 */
export const ValidationErrorsSchema = z.object({
  generic: GenericErrorsSchema,
  // NOTA: A medida que se creen nuevos dominios de error (ej. OrderFormErrors),
  // se ensamblarán aquí.
  // orderForm: OrderFormErrorsSchema,
});
// src/lib/validators/i18n/ValidationErrors.schema.ts
