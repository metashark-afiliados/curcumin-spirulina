// src/lib/validators/i18n/SelectLanguage.schema.ts
/**
 * @file SelectLanguage.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para o conteúdo da
 *              página de seleção de idioma.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";
export const SelectLanguageContentSchema = z.object({
  title: z.string().min(1),
  countdownText: z.string().min(1),
  selectLanguageAriaLabel: z.string().min(1),
  languages: z.record(z.string().min(1)),
});
export type SelectLanguageContent = z.infer<typeof SelectLanguageContentSchema>;
// src/lib/validators/i18n/SelectLanguage.schema.ts
