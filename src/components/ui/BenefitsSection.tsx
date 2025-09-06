// src/components/ui/BenefitsSection.tsx
/**
 * @file src/components/ui/BenefitsSection.tsx
 * @description Aparato de UI soberano, resiliente y de cliente. Orquesta la
 *              exhibición de los beneficios, obteniendo y VALIDANDO su propio contenido
 *              de i18n contra un schema Zod antes de renderizar. Se adhiere a la API
 *              de logging del cliente unificada para una observabilidad completa.
 * @version 6.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/BenefitsSection.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useTranslations } from "next-intl";
import { Leaf, ShieldCheck, Smile, type LucideIcon, Zap } from "lucide-react";
import React, { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { BenefitPill } from "@/components/ui/BenefitPill";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  BenefitsSectionContentSchema,
  type BenefitsSectionContent,
} from "@/lib/validators/i18n/BenefitsSection.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @private
 * @constant iconMap
 * @description Mapea nombres canónicos de iconos a componentes de LucideIcon.
 */
const iconMap: Record<string, LucideIcon> = {
  energy: Zap,
  metabolism: ShieldCheck,
  mood: Smile,
  natural: Leaf,
};

/**
 * @component BenefitsSection
 * @description Muestra una sección de beneficios del producto. Es un componente de cliente
 *              que obtiene y valida su propio contenido de i18n, orquestando la
 *              renderización de `BenefitPill`s.
 * @returns {React.ReactElement | null} El componente `BenefitsSection` si la validación es exitosa,
 *                                    o `null` si hay un error en la carga o validación del contenido.
 */
export function BenefitsSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.BenefitsSection");
  const titleId = useId();
  let content: BenefitsSectionContent;

  try {
    // CORREÇÃO: Construir explicitamente o objeto para validação.
    const rawContent = {
      mainTitle: t("mainTitle"),
      benefits: t.raw("benefits"), // Accedemos a la estructura compleja con t.raw()
    };
    const validation = BenefitsSectionContentSchema.safeParse(rawContent);

    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "BenefitsSection",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo de BenefitsSection falhou."
      );
      throw new Error(
        `Validação de conteúdo de BenefitsSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "BenefitsSection" },
      "Erro ao obter ou validar conteúdo da BenefitsSection. A seção não será renderizada."
    );
    return null; // Renderización resiliente.
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    {
      component: "BenefitsSection",
      benefitCount: content.benefits.length,
    },
    "Renderizando seção de benefícios soberana e validada."
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
              // OPORTUNIDAD DE ATOMIZACIÓN: Logear iconos no mapeados
              clientLogger.warn(
                {
                  component: "BenefitsSection",
                  benefitTitle: benefit.title,
                  iconName: benefit.iconName,
                  availableIcons: Object.keys(iconMap),
                },
                `Ícone '${benefit.iconName}' não encontrado no mapa de ícones para o benefício.`
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
