// src/lib/validators/i18n/Footer.schema.ts
/**
 * @file Footer.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para el contenido del Footer.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

export const FooterContentSchema = z.object({
  brandName: z.string().min(1),
  brandDescription: z.string().min(1),
  legalTitle: z.string().min(1),
  legalLinks: z.array(z.object({ href: z.string(), label: z.string() })).min(1),
  disclaimerTitle: z.string().min(1),
  affiliateDisclaimer: z.object({
    title: z.string().min(1),
    text: z.string().min(1),
  }),
  scientificDisclaimer: z.string().min(1),
  copyright: z.string().min(1),
  contact: z.object({ email: z.string().email() }),
});

export type FooterContent = z.infer<typeof FooterContentSchema>;
// src/lib/validators/i18n/Footer.schema.ts
