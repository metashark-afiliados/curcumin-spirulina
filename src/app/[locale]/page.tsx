import { GeoIPLocator } from "@/components/diagnostic/GeoIPLocator";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { FooterSection } from "@/components/ui/FooterSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Orquestador principal de la página de aterrizaje. Ensambla la página completa.
 */
export default function Home() {
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
 * @version 2.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - ENSAMBLAJE COMPLETO: Todos los placeholders han sido reemplazados por los componentes de producción, completando la construcción de la estructura visual de la página.
 */
