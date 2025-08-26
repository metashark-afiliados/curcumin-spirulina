import { unstable_setRequestLocale } from "next-intl/server";

import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BenefitsSection } from "@/components/ui/BenefitsSection";
import { FooterSection } from "@/components/ui/FooterSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { InfoSection } from "@/components/ui/InfoSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { TreatmentCycleSection } from "@/components/ui/TreatmentCycleSection";
import { GeoIPLocator } from "@/components/diagnostic/GeoIPLocator";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main className="overflow-x-hidden bg-gradient-to-b from-brand-primary to-brand-primary-dark">
      <AnnouncementBar />
      <GeoIPLocator />

      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection>
        <BenefitsSection />
      </AnimatedSection>

      <AnimatedSection>
        <InfoSection />
      </AnimatedSection>

      <AnimatedSection>
        <TreatmentCycleSection />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>

      <FooterSection />
    </main>
  );
}
