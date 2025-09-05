// src/lib/validators/i18n/CallToAction.schema.ts
/**
 * @file CallToAction.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para el contenido del
 *              componente CallToAction. Define a estrutura canónica que o
 *              componente espera de seu arquivo de mensagens i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

export const CallToActionContentSchema = z.object({
  mainTitle: z.string().min(1),
  subtitle: z.string().min(1),
  ctaButton: z.string().min(1),
  image: z.object({
    src: z.string().startsWith("/"),
    alt: z.string().min(1),
  }),
});

export type CallToActionContent = z.infer<typeof CallToActionContentSchema>;
// src/lib/validators/i18n/CallToAction.schema.ts
