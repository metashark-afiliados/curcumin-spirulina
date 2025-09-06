// src/components/ui/BenefitsSection.tsx
/**
 * @file src/components/ui/BenefitsSection.tsx
 * @description Aparato de UI soberano, resiliente y de cliente. Orquesta la
 *              exhibición de los beneficios. Nivelado para una adherencia
 *              estricta a la API de logging unificada y un enriquecimiento
 *              de contexto de error superior.
 * @version 7.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitsSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Leaf, ShieldCheck, Smile, type LucideIcon, Zap } from "lucide-react";
import React, { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { BenefitPill } from "@/components/ui/BenefitPill";
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging";
import {
  BenefitsSectionContentSchema,
  type BenefitsSectionContent,
} from "@/lib/validators/i18n/BenefitsSection.schema";

const iconMap: Record<string, LucideIcon> = {
  energy: Zap,
  metabolism: ShieldCheck,
  mood: Smile,
  natural: Leaf,
};

export function BenefitsSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.BenefitsSection");
  const titleId = useId();
  const baseContext: LogContext = { component: "BenefitsSection" };
  let content: BenefitsSectionContent;

  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      benefits: t.raw("benefits"),
    };
    const validation = BenefitsSectionContentSchema.safeParse(rawContent);

    if (!validation.success) {
      clientLogger.error(
        {
          ...baseContext,
          error: validation.error.flatten(),
          rawContent,
        },
        "Fallo en la validación de contenido. No se renderizará."
      );
      return null;
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      { ...baseContext, error },
      "Error al obtener contenido. No se renderizará."
    );
    return null;
  }

  clientLogger.trace(
    { ...baseContext, benefitCount: content.benefits.length },
    "Renderizando sección de beneficios soberana y validada."
  );

  return (
    <section aria-labelledby={titleId} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h2
            id={titleId}
            className="mb-12 text-center text-4xl font-bold text-white"
          >
            {content.mainTitle}
          </h2>
        </AnimationWrapper>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName] || Leaf;
            if (!iconMap[benefit.iconName]) {
              clientLogger.warn(
                {
                  ...baseContext,
                  benefitTitle: benefit.title,
                  iconName: benefit.iconName,
                  availableIcons: Object.keys(iconMap),
                },
                `Ícono '${benefit.iconName}' no encontrado. Usando fallback.`
              );
            }
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
