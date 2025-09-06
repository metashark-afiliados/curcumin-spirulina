// src/components/ui/PlaceholderSection.tsx
/**
 * @file src/components/ui/PlaceholderSection.tsx
 * @description Aparato de UI de desarrollo. Renderiza un placeholder para
 *              secciones no implementadas. Refactorizado para recibir el logger
 *              transaccional opcionalmente vía props, alineándose con la
 *              arquitectura de Inyección de Dependencias.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PlaceholderSection.tsx.md
 */
import "server-only";

import { Construction } from "lucide-react";
import type pino from "pino";
import { logger as fallbackLogger } from "@/lib/logger";
import { type ILogger } from "@/lib/types/logging";

interface PlaceholderSectionProps {
  title: string;
  description?: string;
  blueprintSection?: string;
  logger?: ILogger | pino.Logger; // Acepta la interfaz o la instancia de pino.
}

export function PlaceholderSection({
  title,
  description,
  blueprintSection,
  logger = fallbackLogger, // Utiliza el logger base como fallback.
}: PlaceholderSectionProps): React.ReactElement | null {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const baseContext = {
    component: "PlaceholderSection",
    title,
    blueprintSection,
  };

  logger.warn(
    baseContext,
    `Renderizando placeholder para la sección: "${title}"`
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-lg border-2 border-dashed border-yellow-500/50 bg-yellow-900/20 p-8 text-center text-yellow-300">
        <div className="flex flex-col items-center gap-4">
          <Construction className="h-12 w-12" />
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && (
            <p className="max-w-md text-yellow-300/80">{description}</p>
          )}
          {blueprintSection && (
            <p className="mt-4 rounded-md bg-yellow-900/50 px-3 py-1 text-xs font-semibold">
              Referencia del Blueprint: {blueprintSection}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/PlaceholderSection.tsx
