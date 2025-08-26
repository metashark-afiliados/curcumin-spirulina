// src/components/ui/TreatmentCycleSection.tsx
import { getTranslations } from "next-intl/server";

import { TreatmentCycleCard } from "@/components/ui/TreatmentCycleCard";
import { AnimationWrapper } from "./AnimationWrapper";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Componente molecular que ensambla y muestra una cuadrícula
 *              de los diferentes ciclos de tratamiento del producto. Ahora
 *              integra la animación de entrada para una experiencia de
 *              usuario moderna, respetando la arquitectura RSC.
 */
export async function TreatmentCycleSection() {
  const t = await getTranslations("components.ui.TreatmentCycleSection");

  const cycles = [
    {
      days: 30,
      title: t("cycle1.title"),
      description: t("cycle1.description"),
      variant: "default",
    },
    {
      days: 90,
      title: t("cycle2.title"),
      description: t("cycle2.description"),
      variant: "default",
    },
    {
      days: 150,
      title: t("cycle3.title"),
      description: t("cycle3.description"),
      variant: "success",
    },
  ] as const;

  return (
    <AnimationWrapper>
      <section className="py-16">
        <div className="container text-center">
          <h2 className="mb-12 text-4xl font-bold text-white">
            {t("mainTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {cycles.map((cycle) => (
              <TreatmentCycleCard
                key={cycle.days}
                days={cycle.days}
                title={cycle.title}
                description={cycle.description}
                variant={cycle.variant}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
