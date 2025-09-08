// src/app/[locale]/page.tsx
/**
 * @file src/app/[locale]/page.tsx
 * @description Página Principal (HomePage). Actúa como un orquestador de
 *              servidor que ensambla los organismos de UI en la secuencia
 *              correcta para formar la pre-lander de conversión.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/app/[locale]/page.tsx.md
 */
import "server-only";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import { SchemaInjector } from "@/components/ui/SchemaInjector";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";
import { logger } from "@/lib/logger";
import { generateProductSchema } from "@/lib/schema";
import { type TestimonialData } from "@/lib/validators/i18n/Testimonials.schema";

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({
  params: { locale },
}: HomePageProps): Promise<React.ReactElement> {
  unstable_setRequestLocale(locale);
  logger.trace({ component: "HomePage", locale }, "Renderizando HomePage.");

  const t = await getTranslations("components.ui.TestimonialsSection");
  const testimonials: TestimonialData[] = t.raw("testimonials");
  const productSchema = generateProductSchema();

  return (
    <>
      <SchemaInjector schema={productSchema} />

      <AnnouncementBar />
      <HeroSection />
      <InfoSection />
      <BenefitsSection />
      <TreatmentCycleSection />

      <TestimonialsSection>
        {testimonials.map((testimonial) => (
          <div key={testimonial.author} className="embla__slide p-4">
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </TestimonialsSection>
    </>
  );
}
// src/app/[locale]/page.tsx
