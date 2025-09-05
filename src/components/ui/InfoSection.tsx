// src/components/ui/InfoSection.tsx
/**
 * @file InfoSection.tsx
 * @description Aparato soberano y de cliente. Renderiza un "mini-artículo"
 *              educacional dentro da landing page, seguindo a jornada de
 *              "Problema -> Agitação -> Solução". Obtiene su propio contenido
 *              de i18n y soporta la renderización de HTML enriquecido.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/InfoSection.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { clientLogger } from "@/lib/logger";

/**
 * @component InfoSection
 * @description O orquestrador soberano da seção informativa. Renderiza o conteúdo
 *              textual e de imagem, utilizando `dangerouslySetInnerHTML` para
 *              permitir formatação de texto rica a partir da sua camada i18n.
 *              Não recebe props de conteúdo.
 * @returns {React.ReactElement} A seção informativa completa.
 */
export function InfoSection() {
  const t = useTranslations("components.ui.InfoSection");

  clientLogger.trace(
    { component: "InfoSection" },
    "Renderizando seção informativa soberana."
  );

  return (
    <section className="bg-brand-primary-dark/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <AnimationWrapper>
            {/* --- ETAPA 1: O PROBLEMA --- */}
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {t("problem.title")}
            </h2>
            <p
              className="mt-4 text-lg text-white/80"
              dangerouslySetInnerHTML={{ __html: t.raw("problem.paragraph1") }}
            />
            <p
              className="mt-4 text-white/80"
              dangerouslySetInnerHTML={{ __html: t.raw("problem.paragraph2") }}
            />

            <div className="my-12 w-full overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/img/imagem-ciencia-ingredientes.jpg"
                alt={t("imageAlt")}
                width={800}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* --- ETAPA 2: A SOLUÇÃO CIENTÍfica --- */}
            <h3 className="mt-12 text-2xl font-bold text-white md:text-3xl">
              {t("solution.title")}
            </h3>
            <p
              className="mt-4 text-lg text-white/80"
              dangerouslySetInnerHTML={{ __html: t.raw("solution.paragraph1") }}
            />
            <blockquote className="mt-6 border-l-4 border-brand-accent bg-white/5 p-4 italic text-white/90">
              <p
                dangerouslySetInnerHTML={{ __html: t.raw("solution.quote") }}
              />
              <a
                href={t("solution.sourceUrl")}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-2 flex items-center text-sm text-brand-accent transition-colors hover:text-white hover:underline"
              >
                {t("solution.sourceLink")}{" "}
                <ExternalLink size={14} className="ml-1.5" />
              </a>
            </blockquote>
            <p
              className="mt-6 text-white/80"
              dangerouslySetInnerHTML={{ __html: t.raw("solution.paragraph2") }}
            />
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
// src/components/ui/InfoSection.tsx
