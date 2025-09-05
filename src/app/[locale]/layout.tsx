// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz Funcional y Orquestador de Proveedores. Su
 *              responsabilidad es ensamblar la estructura HTML (`<html>`, `<body>`),
 *              configurar la i18n y envolver la aplicación en todos los
 *              proveedores de contexto del lado del cliente.
 * @version 3.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 */
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import Script from "next/script";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "next-client-cookies/server";
import { GeoIPProvider } from "@/components/diagnostic/GeoIPLocator";
import { serverLogger } from "@/lib/logger";
import { locales } from "@/lib/navigation";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  unstable_setRequestLocale(locale);
  serverLogger.trace(
    `[LocaleLayout] Renderizando layout raíz funcional para o locale: ${locale}`
  );
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-brand-background font-sans text-white">
        <CookiesProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <GeoIPProvider>
              {children}
              <Toaster position="top-center" />
            </GeoIPProvider>
          </NextIntlClientProvider>
        </CookiesProvider>

        <Script
          src="/js/jquery-3.5.1.min.js"
          strategy="beforeInteractive"
          id="jquery-script"
        />
        <Script
          src="/js/webvork.js"
          strategy="lazyOnload"
          id="webvork-script"
        />
      </body>
    </html>
  );
}
// src/app/[locale]/layout.tsx
