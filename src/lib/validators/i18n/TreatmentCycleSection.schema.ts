// src/lib/validators/i18n/TreatmentCycleSection.schema.ts
/**
 * @file TreatmentCycleSection.schema.ts
 * @description Aparato de Contrato de Dados y SSoT para o conteúdo da
 *              TreatmentCycleSection.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";
export const TreatmentCycleSectionContentSchema = z.object({
  mainTitle: z.string().min(1),
  subtitle: z.string().min(1),
  cycles: z
    .array(
      z.object({
        duration: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(1),
});
export type TreatmentCycleSectionContent = z.infer<
  typeof TreatmentCycleSectionContentSchema
>;
// src/lib/validators/i18n/TreatmentCycleSection.schema.ts
