// src/components/blog/CallToAction.tsx
/**
 * @file src/components/blog/CallToAction.tsx
 * @description Aparato de UI soberano, resiliente y de conversión. Nivelado a
 *              la arquitectura de logging de ConvertiKit e instrumentado con
 *              el sistema de telemetría de élite.
 * @author L.I.A. Legacy
 * @version 7.0.0
 * @see .docs-espejo/components/blog/CallToAction.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useId } from "react";

import { useTelemetry } from "@/hooks/useTelemetry";
import { clientLogger } from "@/lib/client-logger";
import { Link } from "@/lib/navigation";
import {
  CallToActionContentSchema,
  type CallToActionContent,
} from "@/lib/validators/i18n/CallToAction.schema";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";

/**
 * @component CallToAction
 * @description Un organismo de UI soberano diseñado para actuar como un puente
 *              entre el contenido informativo (blog) y el funnel de conversión principal.
 *              Obtiene, valida y renderiza su propio contenido, y registra
 *              las interacciones clave del usuario.
 * @returns {React.ReactElement | null} El componente renderizado o null si la
 *          validación del contenido falla.
 */
export function CallToAction(): React.ReactElement | null {
  const t = useTranslations("components.blog.CallToAction");
  const titleId = useId();
  const { trackEvent } = useTelemetry();
  let content: CallToActionContent;

  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      subtitle: t("subtitle"),
      ctaButton: t("ctaButton"),
      image: t.raw("image"),
    };
    const validation = CallToActionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      clientLogger.error(
        "[CallToAction]",
        "Fallo en la validación de contenido. No se renderizará.",
        { error: validation.error.flatten(), rawContent }
      );
      return null;
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "[CallToAction]",
      "Error al obtener contenido. No se renderizará.",
      { error }
    );
    return null;
  }

  /**
   * @function handleCtaClick
   * @description Callback para registrar el evento de telemetría cuando el
   *              usuario hace clic en el botón de llamada a la acción.
   */
  const handleCtaClick = useCallback(() => {
    trackEvent("CTA_CLICK", {
      source: "blog_call_to_action",
      destination: "/#order-form",
    });
  }, [trackEvent]);

  clientLogger.trace(
    "[CallToAction]",
    "Renderizando componente de CTA soberano, validado e instrumentado."
  );

  return (
    <AnimationWrapper>
      <section
        aria-labelledby={titleId}
        className="my-12 rounded-xl border border-brand-accent/50 bg-brand-primary-dark/50 p-8 shadow-lg"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="relative h-48 w-48 justify-self-center md:h-full md:w-full">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="text-center md:col-span-2 md:text-left">
            <h3 id={titleId} className="text-2xl font-bold text-white">
              {content.mainTitle}
            </h3>
            <p className="mt-2 text-white/80">{content.subtitle}</p>
            <Link
              href="/#order-form"
              className="mt-6 inline-block"
              onClick={handleCtaClick}
            >
              <Button
                size="lg"
                className="bg-brand-accent text-on_brand hover:bg-brand-accent-hover"
              >
                {content.ctaButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
// src/components/blog/CallToAction.tsx
