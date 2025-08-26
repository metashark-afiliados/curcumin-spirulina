// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { locales } from "@/lib/navigation";
import "@/app/globals.css";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.5.0
 * @description Layout específico del locale. Habilita la renderización estática
 *              y configura los proveedores de contexto, tipografía y estilos.
 */

const inter = Inter({ subsets: ["latin"] });

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
 * @version 2.5.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.5.0 - RESTAURAÇÃO DO PADRÃO CANÔNICO: A lógica de `pick` foi removida. O provedor `NextIntlClientProvider` agora recebe o objeto `messages` completo, conforme a implementação padrão e robusta de `next-intl`. Esta simplificação resolve a causa raiz dos erros `MISSING_MESSAGE` em Client Components durante o build.
 */
