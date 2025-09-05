// src/components/blog/CallToAction.tsx
/**
 * @file CallToAction.tsx
 * @description Aparato de UI soberano, resiliente e acessível. Obtém e VALIDA
 *              seu próprio conteúdo de i18n e atua como uma ponte estratégica
 *              do conteúdo informativo para o funil de conversão.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/CallToAction.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/client-logger";
import {
  CallToActionContentSchema,
  type CallToActionContent,
} from "@/lib/validators/i18n/CallToAction.schema";
import { Link } from "@/lib/navigation";

export function CallToAction(): React.ReactElement | null {
  const t = useTranslations("components.blog.CallToAction");
  const titleId = useId();
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
      throw new Error(
        `Validação de conteúdo de CallToAction falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "Erro ao obter ou validar conteúdo do CallToAction. O componente não será renderizado.",
      { error }
    );
    return null;
  }

  clientLogger.trace("Renderizando componente de CTA soberano e validado.", {
    component: "CallToAction",
  });

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
            <Link href="/#order-form" className="mt-6 inline-block">
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
