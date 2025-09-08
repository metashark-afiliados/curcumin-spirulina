// src/components/ui/PlaceholderSection.tsx
/**
 * @file src/components/ui/PlaceholderSection.tsx
 * @description Aparato de UI de desarrollo. Renderiza un placeholder para
 *              secciones no implementadas. Nivelado a la arquitectura de
 *              logging de ConvertiKit, consumiendo el logger soberano.
 * @version 4.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PlaceholderSection.tsx.md
 */
import "server-only";

import { Construction } from "lucide-react";
import { logger } from "@/lib/logger";

interface PlaceholderSectionProps {
  title: string;
  description?: string;
  blueprintSection?: string;
}

export function PlaceholderSection({
  title,
  description,
  blueprintSection,
}: PlaceholderSectionProps): React.ReactElement | null {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  // Firma de logging de ConvertiKit: contexto como objeto, mensaje separado.
  logger.warn(
    {
      component: "PlaceholderSection",
      title,
      blueprintSection,
    },
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
