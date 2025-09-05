// src/components/layout/_partials/MinimalHeader.tsx
/**
 * @file MinimalHeader.tsx
 * @description Subcomponente de presentación puro y de cliente. Renderiza la
 *              variante minimalista del header, adhiriéndose a los principios
 *              de Atomic Design al componer el átomo `Button`.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/_partials/MinimalHeader.tsx.md
 */
"use client";

import { Button } from "@/components/ui/Button";
import { clientLogger } from "@/lib/client-logger";
import { Link } from "@/lib/navigation";

export interface MinimalHeaderProps {
  ctaButtonText: string;
}

export const MinimalHeader = ({ ctaButtonText }: MinimalHeaderProps) => {
  clientLogger.trace("Renderizando header minimalista.", {
    component: "MinimalHeader",
  });

  return (
    <div className="container mx-auto flex h-full items-center justify-end">
      <Button asChild variant="accent" size="default">
        <Link href="/#order-form">{ctaButtonText}</Link>
      </Button>
    </div>
  );
};
// src/components/layout/_partials/MinimalHeader.tsx
