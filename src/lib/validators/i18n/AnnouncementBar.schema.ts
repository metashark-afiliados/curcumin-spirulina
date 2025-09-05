// src/lib/validators/i18n/AnnouncementBar.schema.ts
/**
 * @file AnnouncementBar.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para el contenido de la
 *              AnnouncementBar. Define a estrutura canónica que o componente
 *              espera de seu arquivo de mensagens i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

export const AnnouncementBarContentSchema = z.object({
  mainTitle: z
    .string()
    .min(1, "O título principal (para acessibilidade) não pode estar vazio."),
  message: z.string().min(1, "A mensagem de anúncio não pode estar vazia."),
});

export type AnnouncementBarContent = z.infer<
  typeof AnnouncementBarContentSchema
>;
// src/lib/validators/i18n/AnnouncementBar.schema.ts
