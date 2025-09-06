// src/components/ui/TestimonialsSection.tsx
/**
 * @file src/components/ui/TestimonialsSection.tsx
 * @description Aparato de UI de cliente (Organismo). Actúa como una "casca de carrossel"
 *              de presentación pura. Recibe los slides ya renderizados como `children`
 *              y aplica la lógica de interatividad del carrusel.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa de las interacciones con el carrusel.
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/TestimonialsSection.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface TestimonialsSectionProps
 * @description Propiedades del componente `TestimonialsSection`.
 */
interface TestimonialsSectionProps {
  /**
   * @property {string} title - El título principal de la sección de testimonios.
   */
  title: string;
  /**
   * @property {React.ReactNode} children - Los slides individuales del carrusel (ej., `TestimonialCard`s).
   */
  children: React.ReactNode;
}

/**
 * @component TestimonialsSection
 * @description Componente de sección que muestra testimonios de clientes en un carrusel interactivo.
 *              Gestiona la lógica del carrusel y proporciona navegación.
 *              Es un Client Component.
 * @param {TestimonialsSectionProps} props - Las propiedades para configurar la sección de testimonios.
 * @returns {React.ReactElement}
 */
export function TestimonialsSection({
  title,
  children,
}: TestimonialsSectionProps): React.ReactElement {
  const t = useTranslations("components.ui.TestimonialsSection");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  /**
   * @private
   * @function scrollPrev
   * @description Desplaza el carrusel al slide anterior.
   */
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      // OPORTUNIDAD DE ATOMIZACIÓN: Loggear navegación
      clientLogger.trace(
        { component: "TestimonialsSection", action: "scrollPrev" },
        "Navegado al testimonio anterior."
      );
    }
  }, [emblaApi]);

  /**
   * @private
   * @function scrollNext
   * @description Desplaza el carrusel al slide siguiente.
   */
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      // OPORTUNIDAD DE ATOMIZACIÓN: Loggear navegación
      clientLogger.trace(
        { component: "TestimonialsSection", action: "scrollNext" },
        "Navegado al testimonio siguiente."
      );
    }
  }, [emblaApi]);

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "TestimonialsSection", title },
    "Renderizando casca de carrossel de depoimentos."
  );

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
            // CLASE DUPLICADA Y CONFLICTIVA CORREGIDA: Eliminado 'translate-x-1/2' redundante
            className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-sm"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
// src/components/ui/TestimonialsSection.tsx
