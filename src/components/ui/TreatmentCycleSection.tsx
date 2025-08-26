import { useTranslations } from "next-intl";

import { TreatmentCycleCard } from "@/components/ui/TreatmentCycleCard";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente molecular que ensambla y muestra una cuadrícula
 *              de los diferentes ciclos de tratamiento del producto.
 */
export function TreatmentCycleSection() {
  const t = useTranslations("TreatmentCycleSection");

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
  ] as const; // `as const` para inferir `variant` como string literal

  return (
    <section className="py-16">
      <div className="container text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
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
  );
}
