// src/components/layout/_partials/MinimalHeader.tsx
/**
 * @file MinimalHeader.tsx
 * @description Subcomponente de presentación puro y de cliente. Renderiza la
 *              variante minimalista del header para la landing page. Su único
 *              propósito es mostrar un Call-to-Action claro y enfocado en la
 *              conversión, eliminando distracciones de navegación.
 * @version 2.0.0
 * @author L.I.A. Legacy
 */
"use client";

import { Link } from "@/lib/navigation";

/**
 * @interface MinimalHeaderProps
 * @description Define el contrato de props para el componente MinimalHeader.
 */
export interface MinimalHeaderProps {
  ctaButtonText: string;
}

/**
 * @public
 * @component MinimalHeader
 * @description Renderiza una cabecera minimalista con solo un botón de CTA.
 * @param {MinimalHeaderProps} props - Las propiedades para configurar el componente.
 * @returns {React.ReactElement}
 */
export const MinimalHeader = ({
  ctaButtonText,
}: MinimalHeaderProps): React.ReactElement => (
  <div className="container mx-auto flex h-full items-center justify-end">
    <Link
      href="/#order-form"
      className="rounded-md bg-brand-accent px-4 py-2 text-sm font-bold text-on_brand shadow-lg transition-transform hover:scale-105 hover:bg-brand-accent-hover"
    >
      {ctaButtonText}
    </Link>
  </div>
);
// src/components/layout/_partials/MinimalHeader.tsx
