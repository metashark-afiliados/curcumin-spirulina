// src/components/ui/TestimonialsSection.tsx
/**
 * @file TestimonialsSection.tsx
 * @description Aparato de UI de cliente (Organismo). Atua como uma "casca de carrossel"
 *              de apresentação pura. Recebe os slides já renderizados como `children`
 *              e aplica a lógica de interatividade do carrossel.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialsSection.tsx.md
 */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/client-logger";

interface TestimonialsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function TestimonialsSection({
  title,
  children,
}: TestimonialsSectionProps) {
  const t = useTranslations("components.ui.TestimonialsSection");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  clientLogger.trace("Renderizando casca de carrossel de depoimentos.", {
    component: "TestimonialsSection",
  });

  return (
    <section className="bg-brand-primary-dark/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            {title}
          </h2>
        </AnimationWrapper>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">{children}</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            aria-label={t("previousTestimonialAriaLabel")}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label={t("nextTestimonialAriaLabel")}
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
