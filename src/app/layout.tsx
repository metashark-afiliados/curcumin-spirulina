// src/app/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz Mínimo da aplicação. Sua única responsabilidade é
 *              renderizar os componentes filhos que o Next.js fornece. Delega
 *              a responsabilidade de renderizar as tags <html> e <body> para
 *              o layout de locale para uma internacionalização correta.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { type ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * @component RootLayout
 * @description Um componente "pass-through" que renderiza seus filhos diretamente.
 *              Este padrão permite que layouts aninhados (como o de locale)
 *              controlem a totalidade da estrutura HTML.
 * @param {RootLayoutProps} props - As propriedades do componente.
 * @returns {React.ReactElement}
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  // Na arquitetura canônica da next-intl, este layout não renderiza
  // nada por si só, apenas atua como um ponto de entrada para os
  // layouts aninhados que controlam a estrutura HTML completa.
  return <>{children}</>;
}
// src/app/layout.tsx
