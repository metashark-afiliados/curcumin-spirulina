// src/components/blog/CallToAction.tsx
/**
 * @file CallToAction.tsx
 * @description Aparato de UI soberano (Organismo) de conversión. Obtiene su
 *              propio contenido de i18n y actúa como un puente estratégico del
 *              contenido informativo hacia el funnel de conversión.
 * @version 3.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/CallToAction.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/logger";
import { Link } from "@/lib/navigation";

/**
 * @public
 * @component CallToAction
 * @description Renderiza un bloque de llamada a la acción soberano. Obtiene
 *              todo su contenido de la capa de i18n y no recibe props.
 * @returns {React.ReactElement} El componente de llamada a la acción.
 */
export function CallToAction(): React.ReactElement {
  const t = useTranslations("components.blog.CallToAction");

  clientLogger.trace(
    { component: "CallToAction" },
    "Renderizando componente de CTA soberano."
  );

  return (
    <AnimationWrapper>
      <div className="my-12 rounded-xl border border-brand-accent/50 bg-brand-primary-dark/50 p-8 shadow-lg">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          {/* Columna de la Imagen */}
          <div className="relative h-48 w-48 justify-self-center md:h-full md:w-full">
            <Image
              src={t("image.src")}
              alt={t("image.alt")}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>

          {/* Columna de Contenido y Acción */}
          <div className="text-center md:col-span-2 md:text-left">
            <h3 className="text-2xl font-bold text-white">{t("mainTitle")}</h3>
            <p className="mt-2 text-white/80">{t("subtitle")}</p>
            <Link href="/#order-form" className="mt-6 inline-block">
              <Button
                size="lg"
                className="bg-brand-accent text-on_brand hover:bg-brand-accent-hover"
              >
                {t("ctaButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
// src/components/blog/CallToAction.tsx
