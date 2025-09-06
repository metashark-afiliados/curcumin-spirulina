// src/components/ui/AnnouncementBar.tsx
/**
 * @file src/components/ui/AnnouncementBar.tsx
 * @description Aparato de UI soberano, resiliente y accesible.
 *              Nivelado para una adherencia estricta a la API de logging del
 *              cliente unificada y un enriquecimiento de contexto de error superior.
 * @version 5.0.0
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
import { type LogContext } from "@/lib/types/logging";

export function AnnouncementBar(): React.ReactElement | null {
  const t = useTranslations("components.ui.AnnouncementBar");
  const titleId = useId();
  const baseContext: LogContext = { component: "AnnouncementBar" };
  let content: AnnouncementBarContent;

  try {
    const rawContent = {
      mainTitle: t("mainTitle"),
      message: t("message"),
    };
    const validation = AnnouncementBarContentSchema.safeParse(rawContent);

    if (!validation.success) {
      // Se enriquece el contexto de error con los datos que fallaron.
      clientLogger.error(
        {
          ...baseContext,
          error: validation.error.flatten(),
          rawContent,
        },
        "Fallo en la validación de contenido. No se renderizará."
      );
      return null;
    }
    content = validation.data;
  } catch (error) {
    clientLogger.error(
      { ...baseContext, error },
      "Error al obtener contenido. No se renderizará."
    );
    return null;
  }

  clientLogger.trace(
    baseContext,
    "Renderizando componente soberano y validado."
  );

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
