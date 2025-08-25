// src/app/layout.tsx
import React from "react";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Layout raíz de la aplicación. Su única responsabilidad es
 *              renderizar los 'children', que serán gestionados por los
 *              layouts anidados (como el `LocaleLayout`).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - LAYOUT RAÍZ MÍNIMO: Este layout cumple con la estructura requerida por Next.js App Router sin duplicar las etiquetas `<html>` y `<body>`, delegando esa responsabilidad al `LocaleLayout`.
 */
