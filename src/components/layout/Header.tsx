// src/components/layout/Header.tsx
/**
 * @file src/components/layout/Header.tsx
 * @description Aparato de layout soberano y adaptativo.
 *              Actúa como un orquestador que selecciona y renderiza la variante
 *              de header adecuada (`MinimalHeader` o `FullHeader`) basándose
 *              en la ruta actual. Se sincroniza con la SSoT de logging del cliente
 *              unificada para una observabilidad completa.
 * @version 4.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Header.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { usePathname } from "@/lib/navigation";
import { FullHeader } from "./_partials/FullHeader";
import { MinimalHeader } from "./_partials/MinimalHeader";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component Header
 * @description Componente principal del header de la aplicación.
 *              Detecta la ruta actual para renderizar un header minimalista (en la Home)
 *              o un header completo (en otras páginas), y registra esta decisión.
 * @returns {React.ReactElement}
 */
export function Header(): React.ReactElement {
  const pathname = usePathname();
  // Determina si la página actual es la Home (ruta raíz).
  const isLandingPage = pathname === "/";
  const t = useTranslations("components.layout.Header");

  // Efecto para loggear la variante del header que se está renderizando.
  useEffect(() => {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.trace(
      {
        component: "Header",
        path: pathname,
        variant: isLandingPage ? "Minimal" : "Full",
      },
      "Renderizando orquestrador soberano de Header."
    );
  }, [pathname, isLandingPage]); // Se re-loguea si la ruta o la variante cambian.

  // Objeto de contenido para pasar a los subcomponentes del header,
  // obtenido de las traducciones.
  const headerContent = {
    navItems: t.raw("navItems"), // Asumimos que navItems puede ser una estructura compleja, se accederá con t.raw()
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
