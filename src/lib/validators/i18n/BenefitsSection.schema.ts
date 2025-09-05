// src/lib/validators/i18n/BenefitsSection.schema.ts
/**
 * @file BenefitsSection.schema.ts
 * @description Aparato de Contrato de Dados e SSoT para o conteúdo da
 *              BenefitsSection. Define a estrutura canónica que o componente
 *              espera de seu arquivo de mensagens i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { z } from "zod";

// SSoT para os nomes de ícones válidos. Garante que o conteúdo não pode
// referenciar um ícone que não existe no `iconMap` do componente.
const validIconNames = z.enum(["energy", "metabolism", "mood", "natural"]);

/**
 * @public
 * @constant BenefitsSectionContentSchema
 * @description O schema Zod que valida a totalidade do conteúdo que o componente
 *              BenefitsSection consome de seu arquivo de mensagens.
 */
export const BenefitsSectionContentSchema = z.object({
  mainTitle: z
    .string()
    .min(1, "O título principal não pode estar vazio.")
    .describe("O título principal (H2) da seção."),
  benefits: z
    .array(
      z.object({
        iconName: validIconNames.describe("O nome canónico do ícone a exibir."),
        title: z.string().min(1, "O título do benefício não pode estar vazio."),
        description: z
          .string()
          .min(1, "A descrição do benefício não pode estar vazia."),
      })
    )
    .min(1, "Deve haver pelo menos um benefício.")
    .describe("Um array de objetos, cada um representando um benefício."),
});

/**
 * @public
 * @type BenefitsSectionContent
 * @description Infiere el tipo de TypeScript a partir del schema.
 */
export type BenefitsSectionContent = z.infer<
  typeof BenefitsSectionContentSchema
>;
// src/lib/validators/i18n/BenefitsSection.schema.ts
