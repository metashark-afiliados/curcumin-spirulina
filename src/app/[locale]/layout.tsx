// src/app/[locale]/layout.tsx
/**
 * @file src/app/[locale]/layout.tsx
 * @description Layout Raíz Funcional y SSoT de la estructura HTML.
 *              Orquesta los proveedores de contexto globales, la configuración
 *              de i18n, la inyección de scripts y la inyección del `requestId`
 *              para la trazabilidad del cliente.
 * @author L.I.A. Legacy
 * @version 8.0.0
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 */
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

import "@/app/globals.css";
import { GeoIPProvider } from "@/components/diagnostic/GeoIPLocator";
import { TelemetryProvider } from "@/components/telemetry/TelemetryProvider";
import { locales, type AppLocale } from "@/lib/navigation";
// NOTA: Se elimina la importación del logger. Este componente ya no loguea directamente.

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// Lógica de `generateStaticParams` se mantiene simple, sin HOC de logging.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps): Promise<React.ReactElement> {
  // 1. Generación del ID de Trazabilidad
  const requestId = uuid();

  // 2. Validación de Locale
  if (!locales.includes(locale as AppLocale)) {
    // Si el locale es inválido, se delega a la página 404.
    // El logger de `not-found.tsx` registrará este evento.
    notFound();
  }
  unstable_setRequestLocale(locale);

  // 3. Obtención de Mensajes (Puro)
  const messages = await getMessages();

  // 4. Renderizado y Orquestación de Proveedores
  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/*
         * Inyección del `requestId` en un meta tag.
         * Esta es la SSoT para la correlación entre el renderizado del servidor y
         * la sesión de logging del cliente. El `clientLogger` leerá este valor.
         */}
        <meta name="correlation-id" content={requestId} />
      </head>
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

        {/* Inyección de scripts de terceros */}
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
