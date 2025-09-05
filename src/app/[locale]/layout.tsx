// src/app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout Raíz Funcional y Orquestador de Proveedores. Su
 *              responsabilidad es ensamblar la estructura HTML (`<html>`, `<body>`),
 *              configurar la i18n, y envolver la aplicación en todos los
 *              proveedores de contexto del lado del cliente, incluyendo Telemetría.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 */
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import { GeoIPProvider } from "@/components/diagnostic/GeoIPLocator";
import { TelemetryProvider } from "@/components/telemetry/TelemetryProvider";
import { locales } from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * @interface LocaleLayoutProps
 * @description Contrato de props para el layout de locale.
 */
interface LocaleLayoutProps {
  /** Los componentes hijos que renderizará este layout. */
  children: ReactNode;
  /** Parámetros de la ruta, incluyendo el locale activo. */
  params: { locale: string };
}

/**
 * @function generateStaticParams
 * @description Genera los parámetros estáticos para cada locale soportado.
 *              Es una optimización para la Generación de Sitios Estáticos (SSG).
 * @returns {Array<{ locale: string }>} Un array de objetos con los locales.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * @component LocaleLayout
 * @description El componente principal del layout. Orquesta la estructura HTML
 *              y la composición de todos los proveedores de contexto globales.
 * @param {LocaleLayoutProps} props - Las propiedades del componente.
 * @returns {Promise<JSX.Element>} El elemento JSX del layout completo.
 */
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
              <TelemetryProvider>
                {children}
                <Toaster position="top-center" />
              </TelemetryProvider>
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
