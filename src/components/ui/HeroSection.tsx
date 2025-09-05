// src/components/ui/HeroSection.tsx
/**
 * @file HeroSection.tsx
 * @description Aparato orquestador soberano, resiliente y accesible para la
 *              sección "Hero". Valida su contenido y utiliza semántica HTML de
 *              primer nivel para una experiencia de usuario superior.
 * @version 7.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/HeroSection.tsx.md
 */
import "server-only";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { OrderForm } from "@/components/ui/OrderForm";
import {
  HeroSectionContentSchema,
  type HeroSectionContent,
} from "@/lib/validators/i18n/HeroSection.schema";
import { serverLogger } from "@/lib/server-logger";

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

export async function HeroSection(): Promise<JSX.Element | null> {
  const titleId = useId();
  let content: HeroSectionContent;

  try {
    const t = await getTranslations("components.ui.HeroSection");
    const rawContent = t.raw("");
    const validation = HeroSectionContentSchema.safeParse(rawContent);
    if (!validation.success) throw validation.error;
    content = validation.data;
  } catch (error) {
    // CORREÇÃO: Assinatura do logger corrigida para (contexto, mensagem).
    serverLogger.error(
      { error },
      "Erro ao obter ou validar o conteúdo da HeroSection."
    );
    return null;
  }

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
