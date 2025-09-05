// src/components/ui/TreatmentCycleSection.tsx
/**
 * @file TreatmentCycleSection.tsx
 * @description Aparato soberano, resiliente e de cliente. Orquesta a exibição
 *              das fases do tratamento, obtendo e VALIDANDO seu próprio conteúdo
 *              de i18n contra um schema Zod antes de renderizar.
 * @version 6.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import React, { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { TreatmentCycleCard } from "@/components/ui/TreatmentCycleCard";
import { clientLogger } from "@/lib/client-logger";
import {
  TreatmentCycleSectionContentSchema,
  type TreatmentCycleSectionContent,
} from "@/lib/validators/i18n/TreatmentCycleSection.schema";

export function TreatmentCycleSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.TreatmentCycleSection");
  const titleId = useId();
  let content: TreatmentCycleSectionContent;

  try {
    // CORREÇÃO: Tipificar explicitamente o retorno de t.raw para ajudar a inferência.
    const rawContent = {
      mainTitle: t("mainTitle"),
      subtitle: t("subtitle"),
      cycles: t.raw("cycles") as TreatmentCycleSectionContent["cycles"],
    };
    const validation = TreatmentCycleSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      throw new Error(
        `Validação de conteúdo de TreatmentCycleSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "Erro ao obter ou validar conteúdo da TreatmentCycleSection. A seção não será renderizada.",
      { error }
    );
    return null;
  }

  clientLogger.trace(
    "Renderizando seção de ciclos de tratamento soberana e validada.",
    {
      component: "TreatmentCycleSection",
      cycleCount: content.cycles.length,
    }
  );

  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2
            id={titleId}
            className="mb-4 text-center text-4xl font-bold text-white"
          >
            {content.mainTitle}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-white/80">
            {content.subtitle}
          </p>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.cycles.map((cycle, index) => (
            <TreatmentCycleCard key={cycle.title} {...cycle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/TreatmentCycleSection.tsx
