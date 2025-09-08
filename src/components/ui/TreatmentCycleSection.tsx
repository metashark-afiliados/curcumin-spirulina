// src/components/ui/TreatmentCycleSection.tsx
/**
 * @file src/components/ui/TreatmentCycleSection.tsx
 * @description Aparato soberano, resiliente y de cliente. Orquesta la exhibición
 *              de las fases del tratamiento. Nivelado a la arquitectura de
 *              logging de ConvertiKit con datos estructurados.
 * @author L.I.A. Legacy
 * @version 8.1.0
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
    const rawContent = t.raw("");
    const validation = TreatmentCycleSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      clientLogger.error(
        "[TreatmentCycleSection]",
        "Fallo en la validación de contenido. No se renderizará.",
        { error: validation.error.flatten(), rawContent }
      );
      return null;
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "[TreatmentCycleSection]",
      "Error al obtener contenido. No se renderizará.",
      { error }
    );
    return null;
  }

  // Firma de logging de ConvertiKit: contexto estático, datos como objeto.
  clientLogger.trace(
    "[TreatmentCycleSection]",
    "Renderizando sección de ciclos de tratamiento soberana y validada.",
    { cycleCount: content.cycles.length }
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
