// src/app/[locale]/page.tsx
import { unstable_setRequestLocale } from "next-intl/server";

import { GeoIPLocator } from "@/components/diagnostic/GeoIPLocator";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { FooterSection } from "@/components/ui/FooterSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.1.0
 * @description Orquestador principal de la página de aterrizaje. Ensambla la página completa.
 */
export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Valida y "congela" el locale para el renderizado estático
  unstable_setRequestLocale(locale);

  return (
    <main className="bg-gradient-to-b from-brand-primary to-brand-primary-dark">
      <GeoIPLocator />
      <HeroSection />
      <BenefitsSection />
      <InfoSection />
      <TreatmentCycleSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 2.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.1.0 - SUPORTE A RENDERIZAÇÃO ESTÁTICA (SSG): Adicionada a chamada a `unstable_setRequestLocale`. Esta é uma medida de conformidade necessária para garantir que a página possa ser gerada estaticamente pelo layout pai, resolvendo o erro de build em Vercel.
 * ((Implementada)) @version 2.0.0 - ENSAMBLAJE COMPLETO.
 */
