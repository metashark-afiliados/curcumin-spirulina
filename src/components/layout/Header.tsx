// src/components/layout/Header.tsx
/**
 * @file src/components/layout/Header.tsx
 * @description Aparato de layout soberano y adaptativo. Actúa como un orquestador
 *              que selecciona y renderiza la variante de header adecuada
 *              (`MinimalHeader` o `FullHeader`) basándose en la ruta actual,
 *              centralizando toda la lógica de observabilidad.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { clientLogger } from "@/lib/client-logger";
import { usePathname } from "@/lib/navigation";
import { FullHeader } from "./_partials/FullHeader";
import { MinimalHeader } from "./_partials/MinimalHeader";
import { type LogContext } from "@/lib/types/logging";

export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const t = useTranslations("components.layout.Header");

  useEffect(() => {
    // SSoT de Observabilidad: El orquestador es el único responsable de
    // registrar qué variante se está renderizando.
    clientLogger.trace(
      {
        component: "HeaderOrchestrator",
        path: pathname,
        variant: isLandingPage ? "Minimal" : "Full",
      } as LogContext,
      "Renderizando orquestador soberano de Header."
    );
  }, [pathname, isLandingPage]);

  const headerContent = {
    navItems: t.raw("navItems"),
    ctaButtonText: t("ctaButtonText"),
    brandName: t("brandName"),
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-brand-primary-dark/80 backdrop-blur-lg">
      {isLandingPage ? (
        <MinimalHeader ctaButtonText={headerContent.ctaButtonText} />
      ) : (
        <FullHeader {...headerContent} />
      )}
    </header>
  );
}
// src/components/layout/Header.tsx
