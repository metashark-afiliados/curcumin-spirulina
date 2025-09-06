// src/components/layout/_partials/MinimalHeader.tsx
/**
 * @file src/components/layout/_partials/MinimalHeader.tsx
 * @description Subcomponente de presentación puro y de cliente.
 *              Renderiza la variante minimalista del header, adhiriéndose a los principios
 *              de Atomic Design al componer el átomo `Button`.
 *              Sincronizado con la SSoT de logging del cliente unificada.
 * @version 3.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { Button } from "@/components/ui/Button";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext
import { Link } from "@/lib/navigation";

/**
 * @interface MinimalHeaderProps
 * @description Propiedades del componente `MinimalHeader`.
 */
export interface MinimalHeaderProps {
  /**
   * @property {string} ctaButtonText - El texto para el botón principal de llamada a la acción.
   */
  ctaButtonText: string;
}

/**
 * @component MinimalHeader
 * @description Componente de presentación que muestra un header minimalista con un
 *              único botón CTA, ideal para páginas de aterrizaje (`landing pages`)
 *              donde se busca minimizar las distracciones.
 * @param {MinimalHeaderProps} props - Propiedades del componente.
 * @returns {React.ReactElement}
 */
export const MinimalHeader = ({
  ctaButtonText,
}: MinimalHeaderProps): React.ReactElement => {
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    { component: "MinimalHeader" },
    "Renderizando header minimalista."
  );

  return (
    <div className="container mx-auto flex h-full items-center justify-end">
      <Button asChild variant="accent" size="default">
        <Link href="/#order-form">{ctaButtonText}</Link>
      </Button>
    </div>
  );
};
// src/components/layout/_partials/MinimalHeader.tsx
