// src/components/layout/Header.tsx
/**
 * @file src/components/layout/Header.tsx
 * @description Aparato de layout de presentación puro. Delega toda su lógica
 *              al hook soberano `useHeader` y se encarga únicamente de renderizar
 *              la variante de cabecera correcta (`MinimalHeader` o `FullHeader`).
 * @author L.I.A. Legacy
 * @version 6.0.0
 * @see .docs-espejo/components/layout/Header.tsx.md
 */
"use client";

import { useHeader } from "@/hooks/useHeader";
import { FullHeader } from "./_partials/FullHeader";
import { MinimalHeader } from "./_partials/MinimalHeader";
import { type NavItem } from "./_partials/FullHeader"; // Importación necesaria para el tipo

// Exportar los tipos de props para que el hook `useHeader` pueda construirlos.
export type { FullHeaderProps } from "./_partials/FullHeader";
export type { MinimalHeaderProps } from "./_partials/MinimalHeader";
export type { NavItem }; // Re-exportar tipo NavItem

/**
 * @component Header
 * @description Orquestador de UI para la cabecera de la aplicación.
 *              Consume el hook `useHeader` para obtener la lógica y los datos,
 *              y renderiza condicionalmente el subcomponente apropiado.
 * @returns {React.ReactElement}
 */
export function Header(): React.ReactElement {
  const { isLandingPage, fullHeaderProps, minimalHeaderProps } = useHeader();

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-white/10 bg-brand-primary-dark/80 backdrop-blur-lg">
      {isLandingPage ? (
        <MinimalHeader {...minimalHeaderProps} />
      ) : (
        <FullHeader {...fullHeaderProps} />
      )}
    </header>
  );
}
// src/components/layout/Header.tsx
