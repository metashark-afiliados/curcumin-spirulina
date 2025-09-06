// src/components/ui/AnnouncementBar.tsx
/**
 * @file src/components/ui/AnnouncementBar.tsx
 * @description Aparato de UI soberano, resiliente y accesible.
 *              Su propósito es mostrar un mensaje importante y conciso en la parte
 *              superior de la página, como ofertas o alertas. Obtiene y VALIDA
 *              su propio contenido de i18n contra un schema Zod antes de renderizar.
 *              Sincronizado con la SSoT de logging del cliente unificada y su API de élite.
 * @version 4.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/AnnouncementBar.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { useId } from "react";

// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import {
  AnnouncementBarContentSchema,
  type AnnouncementBarContent,
} from "@/lib/validators/i18n/AnnouncementBar.schema";

/**
 * @component AnnouncementBar
 * @description Muestra una barra de anuncios deslizante en la parte superior de la página.
 *              Es un componente de cliente que obtiene y valida su propio contenido de i18n,
 *              y registra errores de validación con el `clientLogger`.
 * @returns {React.ReactElement | null} El componente `AnnouncementBar` si la validación es exitosa,
 *                                    o `null` si hay un error en la carga o validación del contenido.
 */
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
    // USO DE CLIENTLOGGER CORREGIDO: (context, message) - La firma ya era compatible.
    clientLogger.error(
      { error, component: "AnnouncementBar" },
      "Erro ao obter ou validar conteúdo da AnnouncementBar. A seção não será renderizada."
    );
    return null; // Renderización resiliente.
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "AnnouncementBar" },
    "Renderizando componente de CTA soberano y validado."
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
