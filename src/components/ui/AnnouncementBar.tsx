// src/components/ui/AnnouncementBar.tsx
/**
 * @file AnnouncementBar.tsx
 * @description Aparato de UI soberano para la barra de anuncios. Es un
 *              componente de cliente que obtiene su propio contenido de i18n.
 *              Utiliza una animación de scroll infinito basada en CSS que pausa
 *              al pasar el mouse para una UX y accesibilidad superiores.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/AnnouncementBar.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { clientLogger } from "@/lib/logger";

/**
 * @component AnnouncementBar
 * @description Renderiza una barra de anuncios con scroll infinito que pausa
 *              al recibir foco del mouse. Es un componente soberano que no
 *              recibe props de contenido.
 * @returns {React.ReactElement} El componente da barra de anuncios.
 */
export function AnnouncementBar(): React.ReactElement {
  const t = useTranslations("components.ui.AnnouncementBar");
  const message = t("message");

  clientLogger.trace(
    { component: "AnnouncementBar" },
    "Renderizando barra de anúncios soberana."
  );

  return (
    <div className="group w-full overflow-hidden bg-gradient-to-r from-brand-accent to-red-800 py-3 text-sm font-medium italic text-white shadow-lg">
      <div className="flex whitespace-nowrap">
        {/*
          El contenido se duplica para garantizar un preenchimento
          contínuo y sin fallos na animação de loop infinito.
        */}
        <div className="flex animate-infinite-scroll group-hover:[animation-play-state:paused]">
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{message}</p>
          </div>
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{message}</p>
          </div>
        </div>
        <div
          className="flex animate-infinite-scroll group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{message}</p>
          </div>
          <div className="mx-6 flex items-center">
            <Flame className="mr-3 h-4 w-4 flex-shrink-0 text-yellow-300" />
            <p className="text-shadow-md">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// src/components/ui/AnnouncementBar.tsx
