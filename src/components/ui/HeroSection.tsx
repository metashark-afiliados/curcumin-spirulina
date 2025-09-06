// src/components/ui/HeroSection.tsx
/**
 * @file src/components/ui/HeroSection.tsx
 * @description Aparato orquestador soberano, resiliente y accesible para la
 *              sección "Hero". Valida su contenido y utiliza semántica HTML de
 *              primer nivel para una experiencia de usuario superior. Como Server
 *              Component, utiliza el `serverLogger` para la observabilidad y se
 *              asegura de que sus subcomponentes auxiliares (`HeroContent`, `HeroImage`)
 *              no dependan directamente de lógica de cliente de logging.
 * @version 7.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/HeroSection.tsx.md
 * @see src/lib/logger.ts (SSoT para el logger de servidor)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import "server-only"; // Este componente es estrictamente del lado del servidor.

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { useId } from "react"; // `useId` es compatible con Server Components en Next.js 14
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { OrderForm } from "@/components/ui/OrderForm";
import {
  HeroSectionContentSchema,
  type HeroSectionContent,
} from "@/lib/validators/i18n/HeroSection.schema";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @private
 * @component HeroContent
 * @description Subcomponente de presentación puro que renderiza el título y subtítulo
 *              de la Hero Section. Envuelto en `AnimationWrapper`.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.mainTitle - El título principal de la sección.
 * @param {string} props.subtitle - El subtítulo que acompaña al título principal.
 * @param {string} props.titleId - El ID para la accesibilidad (`aria-labelledby`).
 * @returns {React.ReactElement}
 */
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

/**
 * @private
 * @component HeroImage
 * @description Subcomponente de presentación puro que renderiza la imagen principal
 *              de la Hero Section. Envuelto en `AnimationWrapper` para una entrada visual.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.src - La URL de la imagen.
 * @param {string} props.alt - El texto alternativo para la imagen (accesibilidad).
 * @returns {React.ReactElement}
 */
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

/**
 * @public
 * @component HeroSection
 * @description Componente orquestador de la sección "Hero" de la página.
 *              Como Server Component, se encarga de obtener y validar su contenido
 *              de internacionalización, y de componer los subcomponentes de
 *              presentación y el `OrderForm`. Utiliza `serverLogger` para registrar
 *              su proceso de renderizado.
 * @returns {Promise<JSX.Element | null>} La Hero Section renderizada o `null` si falla la validación.
 */
export async function HeroSection(): Promise<JSX.Element | null> {
  const titleId = useId(); // useId es compatible con Server Components.
  let content: HeroSectionContent;

  try {
    const t = await getTranslations("components.ui.HeroSection");
    const rawContent = t.raw(""); // Obtener todo el namespace de i18n.
    const validation = HeroSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE SERVERLOGGER: (context, message)
      serverLogger.error(
        {
          component: "HeroSection",
          error: validation.error.flatten(),
          rawContent,
        },
        "Erro ao obter ou validar o conteúdo da HeroSection."
      );
      throw new Error(
        `Validação de conteúdo da HeroSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE SERVERLOGGER: (context, message)
    serverLogger.error(
      { error, component: "HeroSection" } as LogContext, // Aserción de tipo para LogContext
      "Erro fatal ao carregar ou validar o conteúdo da HeroSection. A seção não será renderizada."
    );
    return null;
  }

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "HeroSection", mainTitle: content.mainTitle },
    "Renderizando HeroSection soberana e validada."
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
          {/* El OrderForm es un Client Component soberano que gestiona su propia lógica */}
          <div id="order-form" className="scroll-mt-24">
            <OrderForm />
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}
// src/components/ui/HeroSection.tsx
