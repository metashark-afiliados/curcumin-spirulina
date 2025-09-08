// src/components/ui/BenefitsSection.tsx
/**
 * @file src/components/ui/BenefitsSection.tsx
 * @description Aparato de UI soberano. Corregido para resolver el error de
 *              build `ts1005` y `ts2304` causado por una sintaxis de importación
 *              inválida en la refactorización anterior.
 * @author L.I.A. Legacy
 * @version 8.0.2
 * @see .docs-espejo/components/ui/BenefitsSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Leaf, ShieldCheck, Smile, type LucideIcon, Zap } from "lucide-react";
// CORRECCIÓN: Se rectifica la sintaxis de la importación para resolver los errores de compilación.
import React, { useId } from "react";

import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { BenefitPill } from "@/components/ui/BenefitPill";
import { clientLogger } from "@/lib/client-logger";
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

type TFunction = ReturnType<
  typeof useTranslations<"components.ui.BenefitsSection">
>;

/**
 * @private
 * @function loader
 * @description Orquestador de datos soberano y resiliente.
 * @param {TFunction} t - La función de traducción con el tipo correcto.
 * @returns {BenefitsSectionContent | null} El contenido validado o null en caso de fallo.
 */
function loader(t: TFunction): BenefitsSectionContent | null {
  const baseContext = { component: "BenefitsSectionLoader" };
  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      benefits: t.raw("benefits"),
    };
    const validation = BenefitsSectionContentSchema.safeParse(rawContent);

    if (!validation.success) {
      clientLogger.error(
        "[BenefitsSectionLoader]",
        "Fallo en la validación de contenido. La sección no será renderizada.",
        {
          error: validation.error.flatten(),
          rawContent,
        }
      );
      return null;
    }

    clientLogger.trace(
      "[BenefitsSectionLoader]",
      "Contenido cargado y validado con éxito.",
      { benefitCount: validation.data.benefits.length }
    );
    return validation.data;
  } catch (error) {
    clientLogger.error(
      "[BenefitsSectionLoader]",
      "Error fatal al obtener contenido. La sección no será renderizada.",
      { error }
    );
    return null;
  }
}

/**
 * @public
 * @component BenefitsSection
 * @description Componente de presentación que consume el loader para obtener
 *              sus datos y orquesta el renderizado de la sección de beneficios.
 * @returns {React.ReactElement | null}
 */
export function BenefitsSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.BenefitsSection");
  const titleId = useId();
  const content = loader(t);

  if (!content) {
    return null;
  }

  clientLogger.trace(
    "[BenefitsSection]",
    "Renderizando sección de beneficios con contenido validado."
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
                "[BenefitsSection]",
                `Ícono '${benefit.iconName}' no encontrado. Usando fallback.`,
                {
                  benefitTitle: benefit.title,
                  iconName: benefit.iconName,
                  availableIcons: Object.keys(iconMap),
                }
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
