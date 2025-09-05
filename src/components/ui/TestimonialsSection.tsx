// src/components/ui/TestimonialsSection.tsx
/**
 * @file TestimonialsSection.tsx
 * @description Aparato soberano (Organismo) y de cliente. Orquesta la
 *              exhibición de una colección de depoimentos en un carrusel
 *              interactivo, obtendo su propio contenido de i18n.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialsSection.tsx.md
 */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import {
  TestimonialCard,
  type TestimonialData,
} from "@/components/ui/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/logger";

/**
 * @component TestimonialsSection
 * @description O orquestrador soberano da seção de depoimentos. Renderiza um
 *              carrossel interativo de componentes `TestimonialCard`, obtendo
 *              todos os dados necessários da camada de internacionalização.
 * @returns {React.ReactElement} A seção de depoimentos completa.
 */
export function TestimonialsSection() {
  const t = useTranslations("components.ui.TestimonialsSection");
  const mainTitle: string = t("mainTitle");
  const testimonials: TestimonialData[] = t.raw("testimonials");
  const ariaLabels = {
    previous: t("previousTestimonialAriaLabel"),
    next: t("nextTestimonialAriaLabel"),
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  clientLogger.trace(
    { component: "TestimonialsSection", count: testimonials.length },
    "Renderizando seção de depoimentos soberana."
  );

  return (
    <section className="bg-brand-primary-dark/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            {mainTitle}
          </h2>
        </AnimationWrapper>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  className="min-w-0 flex-[0_0_100%] px-4"
                  key={`${testimonial.author}-${index}`}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            aria-label={ariaLabels.previous}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label={ariaLabels.next}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
// src/components/ui/TestimonialsSection.tsx
