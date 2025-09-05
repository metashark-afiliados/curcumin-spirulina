// src/app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description "Mega-Orquestador" de Layout para la HomePage. Su única
 *              responsabilidad es ensamblar los aparatos de sección soberanos
 *              en el orden correcto para construir la landing page.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/page.tsx.md
 */
import "server-only";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";

import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { InfoSection } from "@/components/ui/InfoSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/ui/HeroSection";
import { serverLogger } from "@/lib/logger";
import { generateProductSchema } from "@/lib/schema";

/**
 * @function generateMetadata
 * @description Genera los metadatos de SEO para la página principal.
 *              Esta función sigue siendo soberana en la obtención de sus
 *              propias traducciones para el <head>.
 * @param {{ params: { locale: string } }} props - Las propiedades de la página.
 * @returns {Promise<Metadata>} El objeto de metadatos para Next.js.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.home.meta" });
  const productSchema = generateProductSchema();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
    },
    other: {
      "application/ld+json": JSON.stringify(productSchema),
    },
  };
}

/**
 * @page HomePage
 * @description El componente de servidor que orquesta el layout de la landing page.
 * @param {{ params: { locale: string } }} props - Las propiedades de la página.
 * @returns {Promise<React.ReactElement>} El elemento de la página renderizado.
 */
export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  serverLogger.info(`[HomePage] Ensamblando layout para o locale: ${locale}`);

  // El componente ahora es puramente declarativo. Cada componente hijo
  // es soberano y obtiene sus propias dependencias.
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <AnnouncementBar />
        <HeroSection />
        <BenefitsSection />
        <InfoSection />
        <TreatmentCycleSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
// src/app/[locale]/page.tsx
