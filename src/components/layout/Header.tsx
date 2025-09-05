// src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Aparato de layout soberano, inteligente y adaptativo. Actúa como
 *              un orquestrador que obtiene sus propias dependencias de i18n y
 *              renderiza condicionalmente una variante de cabecera basada en
 *              la ruta actual, garantizando la experiencia de navegação ideal
 *              para cada contexto.
 * @version 2.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "@/lib/navigation";
import { clientLogger } from "@/lib/client-logger"; // <-- CORREÇÃO: Importação corrigida.
import { FullHeader } from "./_partials/FullHeader";
import { MinimalHeader } from "./_partials/MinimalHeader";

export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const t = useTranslations("components.layout.Header");

  useEffect(() => {
    clientLogger.trace("Renderizando orquestrador soberano de Header.", {
      component: "Header",
      path: pathname,
      variant: isLandingPage ? "Minimal" : "Full",
    });
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
