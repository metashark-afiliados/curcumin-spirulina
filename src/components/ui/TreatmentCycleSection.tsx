// src/components/ui/TreatmentCycleSection.tsx
/**
 * @file TreatmentCycleSection.tsx
 * @description Aparato soberano (Organismo) y de cliente. Orquesta la
 *              exhibición de las fases del programa de bem-estar, obteniendo
 *              su propio contenido vía i18n y delegando la renderización a la
 *              molécula atómica `TreatmentCycleCard`.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import {
  TreatmentCycleCard,
  type TreatmentCycleCardProps,
} from "@/components/ui/TreatmentCycleCard";
import { clientLogger } from "@/lib/logger";

/**
 * @component TreatmentCycleSection
 * @description El orquestador soberano de la sección de ciclos de tratamiento.
 *              Obtiene sus datos de la capa de internacionalización y los
 *              renderiza en un layout de grid. No recibe props de contenido.
 * @returns {React.ReactElement} A seção de ciclos de tratamento completa.
 */
export function TreatmentCycleSection() {
  const t = useTranslations("components.ui.TreatmentCycleSection");
  const mainTitle: string = t("mainTitle");
  const subtitle: string = t("subtitle");
  const cycles: Omit<TreatmentCycleCardProps, "index">[] = t.raw("cycles");

  clientLogger.trace(
    { component: "TreatmentCycleSection", cycleCount: cycles.length },
    "Renderizando seção de ciclos de tratamento soberana."
  );

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            {mainTitle}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-white/80">
            {subtitle}
          </p>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cycles.map((cycle, index) => (
            <TreatmentCycleCard key={cycle.title} {...cycle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/TreatmentCycleSection.tsx
