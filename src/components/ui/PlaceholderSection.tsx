// src/components/ui/PlaceholderSection.tsx
/**
 * @file PlaceholderSection.tsx
 * @description Aparato de UI de desarrollo. Renderiza un placeholder visualmente
 *              distinto para secciones de la página que están planificadas
 *              pero aún no han sido implementadas. Es una herramienta clave
 *              para la planificación visual y la comunicación del roadmap.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PlaceholderSection.tsx.md
 */
import "server-only";

import { Construction } from "lucide-react";
import { serverLogger } from "@/lib/logger";

/**
 * @interface PlaceholderSectionProps
 * @description Define el contrato de props para el componente PlaceholderSection.
 */
interface PlaceholderSectionProps {
  /** El título de la sección en construcción. */
  title: string;
  /** Una breve descripción del propósito o funcionalidad que tendrá esta sección. */
  description?: string;
  /** (Opcional) La referencia a la sección correspondiente en el Blueprint & Roadmap. */
  blueprintSection?: string;
}

/**
 * @public
 * @component PlaceholderSection
 * @description Renderiza un placeholder informativo y visualmente claro.
 * @param {PlaceholderSectionProps} props - Las propiedades del componente.
 * @returns {React.ReactElement} El componente de placeholder.
 */
export function PlaceholderSection({
  title,
  description,
  blueprintSection,
}: PlaceholderSectionProps): React.ReactElement {
  serverLogger.warn(
    `[PlaceholderSection] Renderizando placeholder para a seção: "${title}"`
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
              Referência do Blueprint: {blueprintSection}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
// src/components/ui/PlaceholderSection.tsx
