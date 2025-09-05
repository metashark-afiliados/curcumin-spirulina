// src/app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Mega-Orquestador de Layout Soberano para a HomePage.
 *              Este aparato é a SSoT para a montagem da landing page. Como
 *              Server Component, ele orquestra a obtenção de metadados,
 *              conteúdo de i18n, e a composição sequencial de todos os
 *              aparatos de seção que formam a página de conversão.
 * @version 5.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/page.tsx.md
 */
import "server-only";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import React from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import {
  TestimonialCard,
  type TestimonialData,
} from "@/components/ui/TestimonialCard";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";
import { generateProductSchema } from "@/lib/schema";
import { serverLogger } from "@/lib/server-logger";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.home.meta" });
  const productSchema = generateProductSchema();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
    },
    other: {
      "application/ld+json": JSON.stringify(productSchema),
    },
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  serverLogger.info(
    `[HomePage] Iniciando orquestração da landing page para o locale: ${locale}`
  );

  // Pré-renderiza os filhos para a "casca de cliente" TestimonialsSection
  const tTestimonials = await getTranslations(
    "components.ui.TestimonialsSection"
  );
  const testimonialsData: TestimonialData[] = tTestimonials.raw("testimonials");

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <InfoSection />
        <TreatmentCycleSection />
        <TestimonialsSection title={tTestimonials("mainTitle")}>
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.author}
              className="embla__slide min-w-0 flex-[0_0_100%]"
            >
              <div className="p-4">
                <TestimonialCard {...testimonial} />
              </div>
            </div>
          ))}
        </TestimonialsSection>
      </main>
      <Footer />
    </>
  );
}
// src/app/[locale]/page.tsx
