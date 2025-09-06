// src/components/layout/_partials/MinimalHeader.tsx
/**
 * @file src/components/layout/_partials/MinimalHeader.tsx
 * @description Subcomponente de presentación puro y de cliente. Renderiza la
 *              variante minimalista del header. Es completamente agnóstico a la
 *              lógica de observabilidad, la cual es gestionada por su orquestador.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
 */
"use client";

import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/navigation";

export interface MinimalHeaderProps {
  ctaButtonText: string;
}

export const MinimalHeader = ({
  ctaButtonText,
}: MinimalHeaderProps): React.ReactElement => {
  return (
    <div className="container mx-auto flex h-full items-center justify-end">
      <Button asChild variant="accent" size="default">
        <Link href="/#order-form">{ctaButtonText}</Link>
      </Button>
    </div>
  );
};
// src/components/layout/_partials/MinimalHeader.tsx
