// src/lib/validators/OrderForm.schema.ts
/**
 * @file OrderForm.schema.ts
 * @description Factoría de Schemas y SSoT para la validación de ENTRADA DE
 *              USUARIO del OrderForm. Implementa el patrón IMAS-E.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/validators/OrderForm.schema.ts.md
 */
import { z } from "zod";
import { type OrderFormContent } from "./i18n/OrderFormContent.schema";

/**
 * @public
 * @function getOrderFormSchema
 * @description Factoría que construye un schema de validación de Zod.
 * @param {OrderFormContent['validation']} messages - Un objeto con las cadenas
 *              de error localizadas, extraído del contenido validado.
 * @returns {z.ZodObject<any, any, any>} Un schema de Zod configurado.
 */
export const getOrderFormSchema = (messages: OrderFormContent["validation"]) =>
  z.object({
    name: z
      .string()
      .min(2, messages.name.minLength)
      .regex(/^[a-zA-Z\s'-]+$/, messages.name.invalidChars),
    phone: z
      .string()
      .min(9, messages.phone.minLength)
      .regex(/^[+]?[\d\s()-]+$/, messages.phone.invalidFormat),
  });

/**
 * @public
 * @type OrderFormData
 * @description Infiere el tipo de los datos del formulario desde el schema.
 */
export type OrderFormData = z.infer<ReturnType<typeof getOrderFormSchema>>;
// src/lib/validators/OrderForm.schema.ts
