import { Apple, BrainCircuit, Flame, Scale, Sparkles, ThumbsUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BenefitPill } from "@/components/ui/BenefitPill";
import { AnimationWrapper } from "./AnimationWrapper"; // Importar el wrapper

export async function BenefitsSection() {
  const t = await getTranslations("components.ui.BenefitsSection");
  const benefits = [/* ... */]; // El contenido de benefits no cambia

  return (
    <AnimationWrapper>
      <section className="bg-white/10 py-16 backdrop-blur-md">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitPill key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
