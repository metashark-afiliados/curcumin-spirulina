// src/components/ui/InfoSection.tsx
/**
 * @file InfoSection.tsx
 * @description Aparato soberano, resiliente e de cliente. Renderiza um
 *              "mini-artigo" educacional, obtendo e VALIDANDO seu próprio
 *              conteúdo de i18n contra um schema Zod.
 * @version 6.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/InfoSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useId } from "react";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { clientLogger } from "@/lib/client-logger";
import {
  InfoSectionContentSchema,
  type InfoSectionContent,
} from "@/lib/validators/i18n/InfoSection.schema";

export function InfoSection(): React.ReactElement | null {
  const t = useTranslations("components.ui.InfoSection");
  const titleId = useId();
  let content: InfoSectionContent;

  try {
    const rawContent = t.raw(""); // Obter todo o namespace
    const validation = InfoSectionContentSchema.safeParse(rawContent);
    if (!validation.success) {
      throw new Error(
        `Validação de conteúdo de InfoSection falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "Erro ao obter ou validar conteúdo da InfoSection. A seção não será renderizada.",
      { error }
    );
    return null;
  }

  clientLogger.trace("Renderizando seção informativa soberana e validada.", {
    component: "InfoSection",
  });

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
