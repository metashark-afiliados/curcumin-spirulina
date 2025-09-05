// src/components/ui/AnnouncementBar.tsx
/**
 * @file AnnouncementBar.tsx
 * @description Aparato de UI soberano, resiliente e acessível. Obtém e VALIDA
 *              seu próprio conteúdo de i18n, e implementa uma animação de
 *              scroll que pode ser pausada com rato e teclado.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/AnnouncementBar.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { useId } from "react";
import { clientLogger } from "@/lib/client-logger";
import {
  AnnouncementBarContentSchema,
  type AnnouncementBarContent,
} from "@/lib/validators/i18n/AnnouncementBar.schema";

export function AnnouncementBar(): React.ReactElement | null {
  const t = useTranslations("components.ui.AnnouncementBar");
  const titleId = useId();
  let content: AnnouncementBarContent;

  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      message: t("message"),
    };
    const validation = AnnouncementBarContentSchema.safeParse(rawContent);
    if (!validation.success) {
      throw new Error(
        `Validação de conteúdo de AnnouncementBar falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      "Erro ao obter ou validar conteúdo da AnnouncementBar. A seção não será renderizada.",
      { error }
    );
    return null;
  }

  return (
    <section
      aria-labelledby={titleId}
      className="w-full overflow-hidden bg-gradient-to-r from-brand-accent to-red-800 text-sm font-medium italic text-white shadow-lg"
    >
      <h2 id={titleId} className="sr-only">
        {content.mainTitle}
      </h2>
      <div
        className="group flex whitespace-nowrap py-3 outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-brand-accent"
        tabIndex={0}
      >
        <div className="flex animate-infinite-scroll group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused]">
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{content.message}</p>
          </div>
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{content.message}</p>
          </div>
        </div>
        <div
          className="flex animate-infinite-scroll group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{content.message}</p>
          </div>
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{content.message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
// src/components/ui/AnnouncementBar.tsx
