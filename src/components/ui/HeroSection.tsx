// src/components/ui/HeroSection.tsx
/**
 * @file src/components/ui/HeroSection.tsx
 * @description Organismo de UI soberano, resiliente y atomizado. Actúa como un
 *              orquestador de layout que obtiene y valida su contenido para luego
 *              delegar el renderizado a subcomponentes atómicos.
 * @author L.I.A. Legacy
 * @version 9.0.0
 * @see .docs-espejo/components/ui/HeroSection.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { useId } from "react";

import { logger } from "@/lib/logger";
import {
  HeroSectionContentSchema,
  type HeroSectionContent,
} from "@/lib/validators/i18n/HeroSection.schema";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { OrderForm } from "@/components/ui/OrderForm";
import { HeroContent } from "./_partials/hero/HeroContent";
import { HeroImage } from "./_partials/hero/HeroImage";

async function loader(): Promise<HeroSectionContent | null> {
  const baseContext = { component: "HeroSectionLoader" };
  try {
    const t = await getTranslations("components.ui.HeroSection");
    const rawContent = t.raw("");
    const validation = HeroSectionContentSchema.safeParse(rawContent);

    if (!validation.success) {
      logger.error(
        { ...baseContext, error: validation.error.flatten(), rawContent },
        "Fallo en la validación del contenido de HeroSection."
      );
      return null;
    }

    logger.trace(baseContext, "Contenido de HeroSection cargado y validado.");
    return validation.data;
  } catch (error) {
    logger.error(
      { ...baseContext, err: error },
      "Error fatal al cargar el contenido de HeroSection."
    );
    return null;
  }
}

/**
 * @component HeroSection
 * @description Orquesta la sección principal de la página. Carga y valida
 *              el contenido, y luego compone los aparatos atómicos `HeroContent`,
 *              `HeroImage` y `OrderForm` para construir la UI final.
 * @returns {Promise<JSX.Element | null>}
 */
export async function HeroSection(): Promise<JSX.Element | null> {
  const content = await loader();

  if (!content) {
    return null;
  }

  const titleId = useId();
  logger.trace(
    { component: "HeroSection", mainTitle: content.mainTitle },
    "Renderizando orquestador HeroSection."
  );

  return (
    <section
      aria-labelledby={titleId}
      className="container mx-auto px-4 py-16 md:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8 text-center lg:text-left">
          <HeroContent
            mainTitle={content.mainTitle}
            subtitle={content.subtitle}
            titleId={titleId}
          />
          <HeroImage src={content.image.src} alt={content.image.alt} />
        </div>
        <AnimationWrapper transition={{ delay: 0.2 }}>
          <div id="order-form" className="scroll-mt-24">
            <OrderForm />
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
// src/components/ui/HeroSection.tsx
