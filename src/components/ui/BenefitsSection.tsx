// src/components/ui/BenefitsSection.tsx
import {
  Apple,
  BrainCircuit,
  Flame,
  Scale,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { BenefitPill } from "@/components/ui/BenefitPill";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.2.0
 * @description Componente molecular que ensambla y muestra una cuadrícula
 *              de los beneficios clave del producto.
 */
export async function BenefitsSection() {
  const t = await getTranslations("components.ui.BenefitsSection");

  const benefits = [
    { icon: Scale, title: t("pill1.title"), subtitle: t("pill1.subtitle") },
    { icon: Flame, title: t("pill2.title"), subtitle: t("pill2.subtitle") },
    {
      icon: BrainCircuit,
      title: t("pill3.title"),
      subtitle: t("pill3.subtitle"),
    },
    {
      icon: ThumbsUp,
      title: t("pill4.title"),
      subtitle: t("pill4.subtitle"),
    },
    {
      icon: Apple,
      title: t("pill5.title"),
      subtitle: t("pill5.subtitle"),
    },
    {
      icon: Sparkles,
      title: t("pill6.title"),
      subtitle: t("pill6.subtitle"),
    },
  ];

  return (
    <section className="bg-white/10 py-16 backdrop-blur-md">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <BenefitPill
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              subtitle={benefit.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.2.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.2.0 - CORREÇÃO DE NAMESPACE CRÍTICA: A chamada `getTranslations` foi atualizada para usar o namespace aninhado completo (`components.ui.BenefitsSection`). Esta é a correção definitiva para o erro `MISSING_MESSAGE` durante o build, alinhando o componente com a arquitetura de i18n IMAS.
 * ((Implementada)) @version 1.1.0 - ARQUITETURA DE SERVER COMPONENT DE ÉLITE.
 */
