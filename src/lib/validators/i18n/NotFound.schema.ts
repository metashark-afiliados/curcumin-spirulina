// src/lib/validators/i18n/NotFound.schema.ts
/**
 * @file NotFound.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para o conteúdo da
 *              página 404.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";
export const NotFoundContentSchema = z.object({
  meta: z.object({ title: z.string().min(1) }),
  title: z.string().min(1),
  description: z.string().min(1),
  backToHomeButton: z.string().min(1),
});
export type NotFoundContent = z.infer<typeof NotFoundContentSchema>;
// src/lib/validators/i18n/NotFound.schema.ts