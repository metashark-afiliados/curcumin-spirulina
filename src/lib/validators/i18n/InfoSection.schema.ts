// src/lib/validators/i18n/InfoSection.schema.ts
/**
 * @file InfoSection.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para o conteúdo da
 *              InfoSection. Define a estrutura canónica que o componente
 *              espera de seu arquivo de mensagens i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

export const InfoSectionContentSchema = z.object({
  problem: z.object({
    title: z.string().min(1),
    paragraph1: z.string().min(1),
    paragraph2: z.string().min(1),
  }),
  solution: z.object({
    title: z.string().min(1),
    paragraph1: z.string().min(1),
    quote: z.string().min(1),
    sourceLink: z.string().min(1),
    sourceUrl: z.string().url(),
    paragraph2: z.string().min(1),
  }),
  imageAlt: z.string().min(1),
});

export type InfoSectionContent = z.infer<typeof InfoSectionContentSchema>;
// src/lib/validators/i18n/InfoSection.schema.ts
