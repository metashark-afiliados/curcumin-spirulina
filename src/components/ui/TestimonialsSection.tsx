// src/components/ui/TestimonialsSection.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { AnimationWrapper } from "./AnimationWrapper";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Componente molecular que renderiza una sección de testimonios
 *              como un carrusel interactivo. Ahora integra la animación de
 *              entrada para una experiencia de usuario moderna, respetando la
 *              arquitectura RSC.
 */
export function TestimonialsSection() {
  const t = useTranslations("components.ui.TestimonialsSection");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    {
      beforeImageUrl: "https://placehold.co/200x300/orange/white?text=Antes",
      afterImageUrl: "https://placehold.co/200x300/green/white?text=Después",
      author: t("testimonial1.author"),
      text: t("testimonial1.text"),
    },
    // Se pueden añadir más testimonios aquí
  ];

  return (
    <AnimationWrapper>
      <section className="bg-white/10 py-16 backdrop-blur-md">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            {t("mainTitle")}
          </h2>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="min-w-0 flex-shrink-0 flex-grow-0 basis-full"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={scrollPrev}
              className="rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
              aria-label="Anterior testimonio"
            >
              &#8592;
            </button>
            <button
              onClick={scrollNext}
              className="rounded-full bg-white/20 p-3 text-white transition hover:bg-white/30"
              aria-label="Siguiente testimonio"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
