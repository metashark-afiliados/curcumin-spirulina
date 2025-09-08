// src/app/layout.tsx
/**
 * @file src/app/layout.tsx
 * @description Layout Raíz Mínimo y de Paso Puro (Pass-Through). Su única
 *              responsabilidad es actuar como un "delegador radical",
 *              renderizando sus `children` sin envolturas ni efectos secundarios.
 *              Delega el control total de `<html>` y `<body>` al layout de
 *              locale para una internacionalización correcta.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/app/layout.tsx.md
 */
import { type ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * @public
 * @component RootLayout
 * @description En la arquitectura canónica de `next-intl`, este layout es un
 *              "pass-through" puro. Actúa como el punto de entrada que Next.js
 *              requiere, y delega inmediatamente el control a los layouts anidados
 *              (ej. `/[locale]/layout.tsx`). No contiene lógica de UI ni
 *              efectos secundarios.
 * @param {RootLayoutProps} props - Propiedades del componente.
 * @returns {React.ReactElement} El contenido hijo renderizado directamente.
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return <>{children}</>;
}
// src/app/layout.tsx
