// src/components/blog/CallToAction.tsx
/**
 * @file src/components/blog/CallToAction.tsx
 * @description Aparato de UI soberano, resiliente y accesible.
 *              Obtiene y VALIDA su propio contenido de i18n y actúa como una puente
 *              estratégica del contenido informativo hacia el funnel de conversión.
 *              Sincronizado con la SSoT de logging del cliente unificada y su API de élite.
 * @version 4.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/CallToAction.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Button } from "@/components/ui/Button";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  CallToActionContentSchema,
  type CallToActionContent,
} from "@/lib/validators/i18n/CallToAction.schema";
import { Link } from "@/lib/navigation";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component CallToAction
 * @description Muestra un Call-to-Action (CTA) persuasivo para dirigir a los usuarios
 *              del contenido del blog al formulario de conversión principal.
 *              Obtiene y valida su contenido de i18n y registra errores de validación.
 * @returns {React.ReactElement | null} El componente CTA si la validación es exitosa,
 *                                    o `null` si hay un error en la carga o validación del contenido.
 */
export function CallToAction(): React.ReactElement | null {
  const t = useTranslations("components.blog.CallToAction");
  const titleId = useId();
  let content: CallToActionContent;

  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      subtitle: t("subtitle"),
      ctaButton: t("ctaButton"),
      image: t.raw("image"), // Acceso a la estructura compleja con t.raw()
    };
    const validation = CallToActionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "CallToAction",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo de CallToAction falhou."
      );
      throw new Error(
        `Validação de conteúdo de CallToAction falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "CallToAction" } as LogContext, // Aserción de tipo para LogContext
      "Erro ao obter ou validar conteúdo do CallToAction. O componente não será renderizado."
    );
    return null;
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "CallToAction" },
    "Renderizando componente de CTA soberano y validado."
  );

  return (
    <AnimationWrapper>
      <section
        aria-labelledby={titleId}
        className="my-12 rounded-xl border border-brand-accent/50 bg-brand-primary-dark/50 p-8 shadow-lg"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="relative h-48 w-48 justify-self-center md:h-full md:w-full">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="text-center md:col-span-2 md:text-left">
            <h3 id={titleId} className="text-2xl font-bold text-white">
              {content.mainTitle}
            </h3>
            <p className="mt-2 text-white/80">{content.subtitle}</p>
            <Link href="/#order-form" className="mt-6 inline-block">
              <Button
                size="lg"
                className="bg-brand-accent text-on_brand hover:bg-brand-accent-hover"
              >
                {content.ctaButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
// src/components/blog/CallToAction.tsx
