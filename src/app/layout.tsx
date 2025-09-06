// src/app/layout.tsx
/**
 * @file src/app/layout.tsx
 * @description Layout Raíz Mínimo y SSoT. Su única responsabilidad es actuar
 *              como un "delegador radical", renderizando sus `children` sin
 *              envolturas. Delega el control total de `<html>` y `<body>` al
 *              layout de locale para una internacionalización correcta.
 *              Esta es la versión final y estable post-migración de la
 *              arquitectura de observabilidad.
 * @author L.I.A. Legacy
 * @version 3.0.0
 * @see .docs-espejo/app/layout.tsx.md
 */
import { type ReactNode } from "react";
import { logger } from "@/lib/logger";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  // Esta llamada al logger es intencional y actúa como un "no-op" seguro.
  // Se ejecuta fuera de un contexto transaccional, por lo que el logger
  // base no emitirá el log, previniendo errores en este nivel raíz.
  // Su propósito es de diagnóstico durante el desarrollo si fuera necesario
  // envolver este layout en un HOC en el futuro.
  logger.trace(
    { component: "RootLayout" },
    "Iniciando renderizado del layout raíz."
  );

  // En la arquitectura canónica de `next-intl`, este layout es un "pass-through" puro.
  // Actúa como el punto de entrada que Next.js requiere, y delega inmediatamente
  // el control a los layouts anidados (ej. `/[locale]/layout.tsx`).
  return <>{children}</>;
}
// src/app/layout.tsx
