// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css"; // Inyección de estilos globales

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.2.0
 * @description Layout específico del locale. Su responsabilidad es configurar
 *              los proveedores de contexto para i18n y notificaciones,
 *              establecer la tipografía e inyectar los estilos globales.
 */

// Configuración de la fuente global con optimización de next/font
const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 2.2.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.2.0 - INYECCIÓN DE ESTILOS GLOBALES: Se ha añadido la importación de `'@/app/globals.css'`. Esta es la corrección crítica que resuelve la falla de renderizado visual, asegurando que los estilos de Tailwind CSS se apliquen a toda la aplicación.
 * ((Implementada)) @version 2.1.0 - TIPOGRAFÍA GLOBAL DE ÉLITE.
 * ((Implementada)) @version 2.0.0 - ARQUITECTURA DE PROVEEDORES DE ÉLITE.
 * ((Implementada)) @version 2.0.0 - INTEGRACIÓN DE FEEDBACK DE USUARIO.
 */
