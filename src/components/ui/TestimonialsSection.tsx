// src/components/ui/TestimonialsSection.tsx
/**
 * @file src/components/ui/TestimonialsSection.tsx
 * @description Aparato de UI de cliente (Organismo). Actúa como un "Layout
 *              Component" puro para el carrusel, recibiendo los `TestimonialCard`s
 *              ya renderizados como `children` para resolver el conflicto de `server-only`.
 * @author L.I.A. Legacy
 * @version 10.0.0
 * @see .docs-espejo/components/ui/TestimonialsSection.tsx.md
 */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback, useId } from "react";

import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/client-logger";

interface TestimonialsSectionProps {
  children: React.ReactNode;
}

export function TestimonialsSection({
  children,
}: TestimonialsSectionProps): React.ReactElement {
  const t = useTranslations("components.ui.TestimonialsSection");
  const titleId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      clientLogger.trace(
        "[TestimonialsSection]",
        "Navegado al testimonio anterior."
      );
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      clientLogger.trace(
        "[TestimonialsSection]",
        "Navegado al testimonio siguiente."
      );
    }
  }, [emblaApi]);

  clientLogger.trace(
    "[TestimonialsSection]",
    "Renderizando layout de carrusel de testimonios."
  );

  return (
    <section
      aria-labelledby={titleId}
      className="bg-brand-primary-dark/50 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2
            id={titleId}
            className="mb-12 text-center text-4xl font-bold text-white"
          >
            {t("mainTitle")}
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
