// src/lib/validators/i18n/OrderFormContent.schema.ts
/**
 * @file OrderFormContent.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido del
 *              componente OrderForm. Define la estructura canónica que el
 *              componente espera de su archivo de mensajes i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

/**
 * @public
 * @constant OrderFormContentSchema
 * @description El schema Zod que valida la totalidad del contenido que el
 *              componente OrderForm consume desde su archivo de mensajes.
 */
export const OrderFormContentSchema = z.object({
  ctaButton: z.string().min(1),
  namePlaceholder: z.string().min(1),
  phonePlaceholder: z.string().min(1),
  contactlessDelivery: z.string().min(1),
  freeDelivery: z.string().min(1),
  validation: z.object({
    name: z.object({
      minLength: z.string().min(1),
      invalidChars: z.string().min(1),
    }),
    phone: z.object({
      minLength: z.string().min(1),
      invalidFormat: z.string().min(1),
    }),
  }),
});

/**
 * @public
 * @type OrderFormContent
 * @description Infiere el tipo de TypeScript a partir del schema.
 */
export type OrderFormContent = z.infer<typeof OrderFormContentSchema>;
// src/lib/validators/i18n/OrderFormContent.schema.ts
