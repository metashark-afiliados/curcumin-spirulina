// src/components/blog/CallToAction.tsx
/**
 * @file src/components/blog/CallToAction.tsx
 * @description Aparato de UI soberano, resiliente y de conversión. Nivelado para
 *              una adherencia estricta a la API de logging unificada y un
 *              enriquecimiento de contexto de error superior, garantizando una
 *              observabilidad de élite.
 * @version 6.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/CallToAction.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useId, useCallback } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging";
import {
  CallToActionContentSchema,
  type CallToActionContent,
} from "@/lib/validators/i18n/CallToAction.schema";
import { Link } from "@/lib/navigation";
import { useTelemetry } from "@/hooks/useTelemetry";

export function CallToAction(): React.ReactElement | null {
  const t = useTranslations("components.blog.CallToAction");
  const titleId = useId();
  const { trackEvent } = useTelemetry();
  const baseContext: LogContext = { component: "CallToAction" };
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
      // Se enriquece el contexto de error con los datos que fallaron.
      clientLogger.error(
        {
          ...baseContext,
          error: validation.error.flatten(),
          rawContent,
        },
        "Fallo en la validación de contenido. No se renderizará."
      );
      return null;
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      { ...baseContext, error },
      "Error al obtener contenido. No se renderizará."
    );
    return null;
  }

  const handleCtaClick = useCallback(() => {
    trackEvent("CTA_CLICK", {
      source: "blog_call_to_action",
      destination: "/#order-form",
    });
  }, [trackEvent]);

  clientLogger.trace(
    baseContext,
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
