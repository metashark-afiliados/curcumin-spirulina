import { getTranslations } from "next-intl/server";
import { AnimationWrapper } from "./AnimationWrapper";
import { TreatmentCycleCard } from "@/components/ui/TreatmentCycleCard";

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
              <TreatmentCycleCard key={cycle.days} {...cycle} />
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
