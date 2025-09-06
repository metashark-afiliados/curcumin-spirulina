// src/components/ui/HeroSection.tsx
/**
 * @file src/components/ui/HeroSection.tsx
 * @description Aparato orquestador soberano y resiliente para la sección "Hero".
 *              Refactorizado para recibir el logger transaccional vía props y
 *              para separar la lógica de carga/validación de datos en una función
 *              `loader` dedicada, mejorando la adhesión al PRU y la legibilidad.
 * @version 8.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/HeroSection.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { useId } from "react";
import type pino from "pino";

import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { OrderForm } from "@/components/ui/OrderForm";
import {
  HeroSectionContentSchema,
  type HeroSectionContent,
} from "@/lib/validators/i18n/HeroSection.schema";

interface HeroSectionProps {
  logger: pino.Logger;
}

/**
 * @private
 * @function loader
 * @description Función pura de carga y validación de datos para HeroSection.
 * @param {pino.Logger} logger - La instancia del logger transaccional.
 * @returns {Promise<HeroSectionContent | null>} El contenido validado o null en caso de error.
 */
async function loader(logger: pino.Logger): Promise<HeroSectionContent | null> {
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

const HeroContent = ({
  mainTitle,
  subtitle,
  titleId,
}: Pick<HeroSectionContent, "mainTitle" | "subtitle"> & {
  titleId: string;
}) => (
  <AnimationWrapper>
    <h1
      id={titleId}
      className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
    >
      {mainTitle}
    </h1>
    <p className="mt-4 text-lg text-white/80 md:text-xl">{subtitle}</p>
  </AnimationWrapper>
);

const HeroImage = ({ src, alt }: HeroSectionContent["image"]) => (
  <div className="relative flex items-center justify-center">
    <AnimationWrapper
      variant="scaleIn"
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        priority
        className="h-auto w-full max-w-sm drop-shadow-2xl"
        sizes="(max-width: 768px) 100vw, 500px"
      />
    </AnimationWrapper>
  </div>
);

export async function HeroSection({
  logger,
}: HeroSectionProps): Promise<JSX.Element | null> {
  const content = await loader(logger);

  if (!content) {
    return null; // Renderizado resiliente.
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
