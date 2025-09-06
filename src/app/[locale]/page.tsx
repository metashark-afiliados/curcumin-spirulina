// src/app/[locale]/page.tsx
/**
 * @file src/app/[locale]/page.tsx
 * @description Mega-Orquestador de Layout Soberano para la HomePage.
 *              Este aparato es la SSoT para la montagem de la landing page. Como
 *              Server Component, él orquestra la obtención de metadatos,
 *              contenido de i18n, y la composición secuencial de todos los
 *              aparatos de sección que forman la página de conversión.
 *              Utiliza `serverLogger` para la observabilidad de su proceso de renderizado.
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/page.tsx.md
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import "server-only"; // Este componente es estrictamente del lado del servidor.

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import React from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import {
  TestimonialCard,
  type TestimonialData,
} from "@/components/ui/TestimonialCard";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";
import { generateProductSchema } from "@/lib/schema";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @public
 * @function generateMetadata
 * @description Genera los metadatos SEO para la HomePage.
 *              Utiliza el `serverLogger` para registrar su ejecución.
 * @param {object} params - Parámetros de la ruta.
 * @param {string} params.locale - El locale actual para la generación de metadatos.
 * @returns {Promise<Metadata>} Los metadatos de la página.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.home.meta" });
  const productSchema = generateProductSchema();

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "HomePage", action: "generateMetadata", locale },
    "Generando metadatos para la HomePage."
  );

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
 * @public
 * @component HomePage
 * @description Componente principal de la Landing Page. Actúa como el orquestador
 *              de todas las secciones de la página, cargando datos y componiendo
 *              los componentes hijos. Utiliza `serverLogger` para una observabilidad
 *              completa del flujo de renderizado del lado del servidor.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.params.locale - El locale actual de la página.
 * @returns {Promise<JSX.Element>} La HomePage renderizada.
 */
export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    { locale, component: "HomePage" } as LogContext, // Aserción de tipo para LogContext
    `[HomePage] Iniciando orquestração da landing page para o locale: ${locale}`
  );

  // Pré-renderiza os filhos para a "casca de cliente" TestimonialsSection
  const tTestimonials = await getTranslations(
    "components.ui.TestimonialsSection"
  );
  // Acceso a datos complejos con t.raw(), la validación con Zod se espera
  // que ocurra en el componente hijo (TestimonialsSection).
  const testimonialsData: TestimonialData[] = tTestimonials.raw("testimonials");

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    {
      locale,
      component: "HomePage",
      loadedTestimonials: testimonialsData.length,
    },
    "Datos de testimonios pre-renderizados para TestimonialsSection."
  );

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <InfoSection />
        <TreatmentCycleSection />
        <TestimonialsSection title={tTestimonials("mainTitle")}>
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.author}
              className="embla__slide min-w-0 flex-[0_0_100%]"
            >
              <div className="p-4">
                <TestimonialCard {...testimonial} />
              </div>
            </div>
          ))}
        </TestimonialsSection>
      </main>
      <Footer />
    </>
  );
}
// src/app/[locale]/page.tsx
