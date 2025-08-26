import {
  Apple,
  BrainCircuit,
  Flame,
  Scale,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { BenefitPill } from "@/components/ui/BenefitPill";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente molecular que ensambla y muestra una cuadrícula
 *              de los beneficios clave del producto.
 */
export function BenefitsSection() {
  const t = useTranslations("BenefitsSection");

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
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - ORIGEN DE DATOS CENTRALIZADO: Mover la matriz `benefits` a un archivo de configuración central para desacoplar aún más los datos de la presentación.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.1 ENSAMBLAJE DE COMPONENTES ATÓMICOS: Orquesta múltiples `BenefitPill` en un layout responsive (`grid`), demostrando la filosofía LEGO en acción.
 * ((Implementada)) @version 1.0.0 - FULL INTERNACIONALIZACIÓN: Todos los textos se consumen desde la capa de i18n, permitiendo una fácil traducción.
 */
