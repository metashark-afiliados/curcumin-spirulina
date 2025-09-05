// src/components/ui/BenefitsSection.tsx
/**
 * @file BenefitsSection.tsx
 * @description Aparato de UI soberano, resiliente e de cliente. Orquesta a
 *              exibição dos benefícios, obtendo e VALIDANDO seu próprio conteúdo
 *              de i18n contra um schema Zod antes de renderizar.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitsSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Leaf, ShieldCheck, Smile, type LucideIcon, Zap } from "lucide-react";
import React, { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { BenefitPill } from "@/components/ui/BenefitPill";
import { clientLogger } from "@/lib/client-logger";
import {
  BenefitsSectionContentSchema,
  type BenefitsSectionContent,
} from "@/lib/validators/i18n/BenefitsSection.schema";

const iconMap: Record<string, LucideIcon> = {
  energy: Zap,
  metabolism: ShieldCheck,
  mood: Smile,
  natural: Leaf,
};

export function BenefitsSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.BenefitsSection");
  const titleId = useId();
  let content: BenefitsSectionContent;

  try {
    // CORREÇÃO: Construir explicitamente o objeto para validação.
    const rawContent = {
      mainTitle: t("mainTitle"),
      benefits: t.raw("benefits"),
    };
    const validation = BenefitsSectionContentSchema.safeParse(rawContent);

    if (!validation.success) {
      throw new Error(
        `Validação de conteúdo de BenefitsSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "Erro ao obter ou validar conteúdo da BenefitsSection. A seção não será renderizada.",
      { error }
    );
    return null; // Renderização resiliente.
  }

  clientLogger.trace("Renderizando seção de benefícios soberana e validada.", {
    component: "BenefitsSection",
    benefitCount: content.benefits.length,
  });

  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2
            id={titleId}
            className="mb-12 text-center text-4xl font-bold text-white"
          >
            {content.mainTitle}
          </h2>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName] || Leaf;
            return (
              <BenefitPill
                key={benefit.title}
                icon={IconComponent}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/BenefitsSection.tsx
