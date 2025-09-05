// src/lib/validators/i18n/ValidationErrors.schema.ts
/**
 * @file ValidationErrors.schema.ts
 * @description Ensamblador de Schemas y SSoT para todos los errores de la
 *              aplicación. Construye el contrato maestro de errores
 *              componiendo todos los schemas de error atómicos expuestos
 *              en el manifiesto de `errors/index.ts`.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/validators/i18n/ValidationErrors.schema.ts.md
 * @see src/lib/types/actions.ts (Consumidor Principal)
 */
import { z } from "zod";
import * as ErrorSchemas from "./errors"; // Importa el manifiesto de schemas

/**
 * @public
 * @constant ValidationErrorsSchema
 * @description El schema Zod maestro que valida la estructura completa de todos
 *              los mensajes de error. Es la SSoT para el tipo `ValidationErrorKey`.
 *              Su estructura se deriva dinámicamente de los schemas exportados
 *              en el directorio `./errors`.
 */
export const ValidationErrorsSchema = z.object({
  // Cada clave aquí corresponde a un namespace de error.
  // El valor es el schema importado del manifiesto.
  generic: ErrorSchemas.GenericErrorsSchema,

  // NOTA: Para añadir un nuevo dominio de error (ej. 'orderForm'):
  // 1. Cree `errors/OrderFormErrors.schema.ts`.
  // 2. Exporte-o de `errors/index.ts`.
  // 3. Añada `orderForm: ErrorSchemas.OrderFormErrorsSchema` a este objeto.
});
// src/lib/validators/i18n/ValidationErrors.schema.ts
