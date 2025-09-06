// src/components/ui/InfoSection.tsx
/**
 * @file src/components/ui/InfoSection.tsx
 * @description Aparato soberano, resiliente y de cliente. Renderiza un
 *              "mini-artículo" educacional, obteniendo y VALIDANDO su propio
 *              contenido de i18n contra un schema Zod. Se adhiere a la API
 *              de logging del cliente unificada para una observabilidad completa.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/InfoSection.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  InfoSectionContentSchema,
  type InfoSectionContent,
} from "@/lib/validators/i18n/InfoSection.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component InfoSection
 * @description Muestra una sección informativa con una narrativa "Problema -> Agitación -> Solución".
 *              Es un componente de cliente que obtiene y valida su propio contenido de i18n,
 *              incluyendo HTML enriquecido, y registra errores de validación.
 * @returns {React.ReactElement | null} La Info Section renderizada o `null` si falla la validación.
 */
export function InfoSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.InfoSection");
  const titleId = useId();
  let content: InfoSectionContent;

  try {
    const rawContent = t.raw(""); // Obtenemos todo el namespace para validación.
    const validation = InfoSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "InfoSection",
          error: validation.error.flatten(),
          rawContent,
        },
        "Validação de conteúdo de InfoSection falhou."
      );
      throw new Error(
        `Validação de conteúdo de InfoSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      { error, component: "InfoSection" } as LogContext, // Aserción de tipo para LogContext
      "Erro ao obter ou validar conteúdo da InfoSection. A seção não será renderizada."
    );
    return null;
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "InfoSection", title: content.problem.title },
    "Renderizando seção informativa soberana e validada."
  );

  return (
    <section
      aria-labelledby={titleId}
      className="bg-brand-primary-dark/50 py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <AnimationWrapper>
            <h2
              id={titleId}
              className="text-3xl font-bold text-white md:text-4xl"
            >
              {content.problem.title}
            </h2>
            <p
              className="mt-4 text-lg text-white/80"
              dangerouslySetInnerHTML={{ __html: content.problem.paragraph1 }}
            />
            <p
              className="mt-4 text-white/80"
              dangerouslySetInnerHTML={{ __html: content.problem.paragraph2 }}
            />

            <div className="my-12 w-full overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/img/imagem-ciencia-ingredientes.jpg"
                alt={content.imageAlt}
                width={800}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>

            <h3 className="mt-12 text-2xl font-bold text-white md:text-3xl">
              {content.solution.title}
            </h3>
            <p
              className="mt-4 text-lg text-white/80"
              dangerouslySetInnerHTML={{ __html: content.solution.paragraph1 }}
            />
            <blockquote className="mt-6 border-l-4 border-brand-accent bg-white/5 p-4 italic text-white/90">
              <p dangerouslySetInnerHTML={{ __html: content.solution.quote }} />
              <a
                href={content.solution.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-2 flex items-center text-sm text-brand-accent transition-colors hover:text-white hover:underline"
              >
                {content.solution.sourceLink}{" "}
                <ExternalLink size={14} className="ml-1.5" />
              </a>
            </blockquote>
            <p
              className="mt-6 text-white/80"
              dangerouslySetInnerHTML={{ __html: content.solution.paragraph2 }}
            />
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
// src/components/ui/InfoSection.tsx
