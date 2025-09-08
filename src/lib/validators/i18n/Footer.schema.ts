// src/lib/validators/i18n/Footer.schema.ts
/**
 * @file Footer.schema.ts
 * @description Aparato de Contrato de Datos y SSoT para el contenido del Footer.
 *              Esta versión añade un array opcional `socialLinks` para soportar
 *              la nueva funcionalidad de enlaces a redes sociales.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
import { z } from "zod";

// SSoT para los nombres de íconos de redes sociales válidos.
const validSocialIconNames = z.enum(["facebook", "instagram", "twitter"]);

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
  socialLinks: z
    .array(
      z.object({
        name: z.string().min(1),
        href: z.string().url(),
        icon: validSocialIconNames,
      })
    )
    .optional(),
});

export type FooterContent = z.infer<typeof FooterContentSchema>;
// src/lib/validators/i18n/Footer.schema.ts
