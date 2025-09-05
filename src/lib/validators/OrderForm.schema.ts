// src/lib/validators/OrderForm.schema.ts
/**
 * @file OrderForm.schema.ts
 * @description Factoría de Schemas y SSoT para la validación del OrderForm.
 * @version 2.1.0
 * @author L.I.A. Legacy
 */
import { type useTranslations } from "next-intl"; // <-- CORRECCIÓN: Importación cambiada
import { z } from "zod";

// CORRECCIÓN: Tipo extraído de `useTranslations`
type TFunction = ReturnType<typeof useTranslations<"validation">>;

export const getOrderFormSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(2, t("name.minLength"))
      .regex(/^[a-zA-Z\s'-]+$/, t("name.invalidChars")),
    phone: z
      .string()
      .min(9, t("phone.minLength"))
      .regex(/^[+]?[\d\s()-]+$/, t("phone.invalidFormat")),
  });

export type OrderFormData = z.infer<ReturnType<typeof getOrderFormSchema>>;
// src/lib/validators/OrderForm.schema.ts
