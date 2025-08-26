// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { locales } from "@/lib/navigation";
import "@/app/globals.css";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.3.0
 * @description Layout específico del locale. Habilita la renderización estática
 *              y configura los proveedores de contexto, tipografía y estilos.
 */

const inter = Inter({ subsets: ["latin"] });

// Habilita la generación estática para todos los locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Valida y "congela" el locale para el renderizado estático
  unstable_setRequestLocale(locale);
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
 * @version 2.3.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.3.0 - RENDERIZAÇÃO ESTÁTICA DE ÉLITE (SSG): Foram adicionadas `generateStaticParams` e `unstable_setRequestLocale`. Esta combinação resolve o erro crítico de build em Vercel, instruindo Next.js a gerar estaticamente uma versão da página para cada idioma suportado, garantindo performance máxima e compatibilidade com o deploy.
 * ((Implementada)) @version 2.2.0 - INYECCIÓN DE ESTILOS GLOBALES.
 */
