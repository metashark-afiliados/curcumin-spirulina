// src/components/ui/HeroSection.tsx
/**
 * @file HeroSection.tsx
 * @description Aparato de layout y presentación soberano para la sección "Hero".
 *              Como Server Component, obtiene su propio contenido de i18n de
 *              forma asíncrona y orquesta la composición de sus subcomponentes
 *              de presentación.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/HeroSection.tsx.md
 */
import "server-only";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { OrderForm } from "@/components/ui/OrderForm";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { serverLogger } from "@/lib/logger";

/**
 * @private
 * @component HeroImage
 * @description Subcomponente de presentación puro, optimizado para renderizar la
 *              imagen principal del producto. Utiliza `next/image` con `priority`
 *              para optimizar el Largest Contentful Paint (LCP).
 * @returns {React.ReactElement} La imagen del producto optimizada.
 */
const HeroImage = () => {
  serverLogger.trace("[HeroImage] Renderizando imagem principal otimizada.");
  return (
    <div className="relative flex items-center justify-center">
      <AnimationWrapper
        variant="scaleIn"
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Image
          src="/img/produto-curcuma-hero.png"
          alt="Frasco do produto Curcumin Spirulina Complex em destaque."
          width={500}
          height={500}
          priority // CRÍTICO: Informa ao Next.js para carregar esta imagem com alta prioridade.
          className="h-auto w-full max-w-sm drop-shadow-2xl"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </AnimationWrapper>
    </div>
  );
};

/**
 * @public
 * @async
 * @component HeroSection
 * @description El orquestrador soberano de la sección "acima da dobra". Define el
 *              layout, obtiene su propio contenido de copywriting, y
 *              compone los subcomponentes `HeroImage` y `OrderForm`.
 * @returns {Promise<React.ReactElement>} El componente de sección principal completo.
 */
export async function HeroSection(): Promise<React.ReactElement> {
  const t = await getTranslations("components.ui.HeroSection");
  serverLogger.trace("[HeroSection] Renderizando seção principal soberana.");

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Coluna de Conteúdo e Imagem */}
        <div className="space-y-8 text-center lg:text-left">
          <AnimationWrapper>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("mainTitle")}
            </h1>
            <p className="mt-4 text-lg text-white/80 md:text-xl">
              {t("subtitle")}
            </p>
          </AnimationWrapper>
          <HeroImage />
        </div>

        {/* Coluna do Formulário de Pedido */}
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
