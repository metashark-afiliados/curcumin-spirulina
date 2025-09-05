// src/components/layout/Header.tsx
/**
 * @file Header.tsx
 * @description Aparato de layout soberano, inteligente y adaptativo. Actúa como
 *              un orquestrador que obtiene sus propias dependencias de i18n y
 *              renderiza condicionalmente una variante de cabecera basada en
 *              la ruta actual, garantizando la experiencia de navegação ideal
 *              para cada contexto.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "@/lib/navigation";
import { clientLogger } from "@/lib/logger";
import { FullHeader } from "./_partials/FullHeader";
import { MinimalHeader } from "./_partials/MinimalHeader";

/**
 * @component Header
 * @description El orquestrador soberano del cabecera. No recibe props de
 *              contenido. Utiliza `usePathname` para determinar la variante visual
 *              y `useTranslations` para obtener todo su contenido textual.
 * @returns {React.ReactElement} El componente de cabecera renderizado.
 */
export function Header(): React.ReactElement {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const t = useTranslations("components.layout.Header");

  useEffect(() => {
    clientLogger.trace(
      {
        component: "Header",
        path: pathname,
        variant: isLandingPage ? "Minimal" : "Full",
      },
      "Renderizando orquestrador soberano de Header."
    );
  }, [pathname, isLandingPage]);

  // Construcción de props para los subcomponentes de presentación puros.
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
