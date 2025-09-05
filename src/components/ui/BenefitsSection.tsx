// src/components/ui/BenefitsSection.tsx
/**
 * @file BenefitsSection.tsx
 * @description Aparato de UI soberano (Organismo). Orquesta la
 *              exhibición de los principales beneficios del producto, obteniendo
 *              su propio contenido de i18n y delegando la presentación a las
 *              moléculas `BenefitPill`.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitsSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Leaf, ShieldCheck, Smile, type LucideIcon, Zap } from "lucide-react";
import React from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { BenefitPill } from "@/components/ui/BenefitPill";
import { clientLogger } from "@/lib/logger";

/**
 * @constant iconMap
 * @description SSoT para mapear chaves de string a componentes de ícone.
 *              Desacopla os dados de i18n da implementação de ícones.
 */
const iconMap: Record<string, LucideIcon> = {
  energy: Zap,
  metabolism: ShieldCheck,
  mood: Smile,
  natural: Leaf,
};

/**
 * @interface BenefitData
 * @description Contrato de datos interno para un único benefício, garantizando
 *              a consistência de tipos dos dados obtidos de `t.raw`.
 */
interface BenefitData {
  iconName: keyof typeof iconMap;
  title: string;
  description: string;
}

/**
 * @component BenefitsSection
 * @description O orquestrador soberano da seção de benefícios. Mapeia um array de
 *              dados de benefícios obtidos via i18n para as moléculas `BenefitPill`.
 * @returns {React.ReactElement} A seção de benefícios completa.
 */
export function BenefitsSection() {
  const t = useTranslations("components.ui.BenefitsSection");
  const mainTitle: string = t("mainTitle");
  const benefits: BenefitData[] = t.raw("benefits");

  clientLogger.trace(
    { component: "BenefitsSection", benefitCount: benefits.length },
    "Renderizando seção de benefícios soberana."
  );

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            {mainTitle}
          </h2>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName] || Leaf; // Fallback seguro
            return (
              <BenefitPill
                key={benefit.title}
                icon={IconComponent}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/BenefitsSection.tsx
