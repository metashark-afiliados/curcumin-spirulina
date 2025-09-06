// src/components/ui/PlaceholderSection.tsx
/**
 * @file src/components/ui/PlaceholderSection.tsx
 * @description Aparato de UI de desarrollo. Renderiza un placeholder visualmente
 *              distinto para secciones de la página que están planificadas
 *              pero aún no han sido implementadas. Es una herramienta clave
 *              para la planificación visual y la comunicación del roadmap.
 *              Como Server Component, utiliza el `serverLogger` para registrar
 *              su renderizado y advertencias, contribuyendo a la observabilidad
 *              del lado del servidor.
 * @version 3.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PlaceholderSection.tsx.md
 * @see src/lib/logger.ts (SSoT para el logger de servidor)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import "server-only"; // Este componente es estrictamente del lado del servidor.

import { Construction } from "lucide-react";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface PlaceholderSectionProps
 * @description Propiedades del componente `PlaceholderSection`.
 */
interface PlaceholderSectionProps {
  /**
   * @property {string} title - El título de la sección pendiente a implementar.
   */
  title: string;
  /**
   * @property {string} [description] - Una descripción opcional de la funcionalidad futura.
   */
  description?: string;
  /**
   * @property {string} [blueprintSection] - Una referencia opcional a la sección
   *           correspondiente en el documento del Blueprint (ej., `PARTE I, 2.1`).
   */
  blueprintSection?: string;
}

/**
 * @component PlaceholderSection
 * @description Componente que actúa como un marcador de posición visual para secciones
 *              en desarrollo. Solo se renderiza en entornos que no sean de producción,
 *              y registra una advertencia con `serverLogger` cuando se utiliza.
 * @param {PlaceholderSectionProps} props - Las propiedades para configurar el placeholder.
 * @returns {React.ReactElement | null} El placeholder renderizado o `null` si el entorno es de producción.
 */
export function PlaceholderSection({
  title,
  description,
  blueprintSection,
}: PlaceholderSectionProps): React.ReactElement | null {
  // Renderizado resiliente: no muestra placeholders en producción.
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  // USO DE SERVERLOGGER CORREGIDO: (context, message)
  serverLogger.warn(
    { component: "PlaceholderSection", title, blueprintSection } as LogContext, // Aserción de tipo para LogContext
    `[PlaceholderSection] Renderizando placeholder para la sección: "${title}"`
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
