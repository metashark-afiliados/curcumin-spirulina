// src/app/[locale]/layout.tsx
/**
 * @file src/app/[locale]/layout.tsx
 * @description Layout de Locale. Corregido para incluir el `CookiesProvider`
 *              necesario para el funcionamiento de `next-client-cookies`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.1.0
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 */
import "server-only";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
// CORRECCIÓN: Se importa el CookiesProvider.
import { CookiesProvider } from "next-client-cookies/server";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  GlobalTelemetryOrchestrator,
  TelemetryProvider,
} from "@/components/telemetry";
import { logger } from "@/lib/logger";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps): React.ReactElement {
  const messages = useMessages();
  logger.trace({ component: "LocaleLayout", locale }, "Renderizando layout.");

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <body className="bg-brand-background font-sans text-white">
        {/* CORRECCIÓN: Se envuelve la aplicación con el CookiesProvider. */}
        <CookiesProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TelemetryProvider>
              <GlobalTelemetryOrchestrator>
                <Header />
                <main>{children}</main>
                <Footer />
              </GlobalTelemetryOrchestrator>
            </TelemetryProvider>
          </NextIntlClientProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
// src/app/[locale]/layout.tsx
