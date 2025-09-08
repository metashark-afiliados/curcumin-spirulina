// src/hooks/useHeader.ts
/**
 * @file useHeader.ts
 * @description Hook soberano que encapsula toda la lógica de negocio y de
 *              presentación para el aparato Header.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

import { clientLogger } from "@/lib/client-logger";
import { usePathname } from "@/lib/navigation";
import {
  type FullHeaderProps,
  type MinimalHeaderProps,
} from "@/components/layout/Header";

interface UseHeaderReturn {
  isLandingPage: boolean;
  fullHeaderProps: FullHeaderProps;
  minimalHeaderProps: MinimalHeaderProps;
}

/**
 * @hook useHeader
 * @description Hook soberano que centraliza la lógica del Header. Determina la
 *              variante a mostrar, obtiene las traducciones y ensambla las props
 *              necesarias para los subcomponentes de presentación.
 * @returns {UseHeaderReturn} El estado y las props para renderizar el Header.
 */
export function useHeader(): UseHeaderReturn {
  const pathname = usePathname();
  const t = useTranslations("components.layout.Header");

  const isLandingPage = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    clientLogger.trace(
      "[HeaderOrchestrator]",
      "Lógica de orquestador de Header ejecutada.",
      {
        path: pathname,
        variant: isLandingPage ? "Minimal" : "Full",
      }
    );
  }, [pathname, isLandingPage]);

  const fullHeaderProps: FullHeaderProps = useMemo(
    () => ({
      navItems: t.raw("navItems"),
      brandName: t("brandName"),
      translations: {
        ctaButtonText: t("ctaButtonText"),
        openMenuAriaLabel: t("openMenuAriaLabel"),
      },
    }),
    [t]
  );

  const minimalHeaderProps: MinimalHeaderProps = useMemo(
    () => ({
      ctaButtonText: t("ctaButtonText"),
    }),
    [t]
  );

  return { isLandingPage, fullHeaderProps, minimalHeaderProps };
}
// src/hooks/useHeader.ts
