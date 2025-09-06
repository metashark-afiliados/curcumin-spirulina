// src/app/[locale]/layout.tsx
/**
 * @file src/app/[locale]/layout.tsx
 * @description Layout Raíz Funcional. Actúa como el orquestador principal que ensambla
 *              todos los elementos globales necesarios para una página funcional y observable.
 *              Incluye la validación de `locale`, la configuración de proveedores de contexto,
 *              y la inyección de scripts críticos. Utiliza `serverLogger` para registrar
 *              eventos importantes de su ciclo de vida y asegurar la trazabilidad.
 * @version 4.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/layout.tsx.md
 * @see src/lib/navigation.ts (SSoT para `locales`)
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import { GeoIPProvider } from "@/components/diagnostic/GeoIPLocator";
import { TelemetryProvider } from "@/components/telemetry/TelemetryProvider";
import { locales, type AppLocale } from "@/lib/navigation"; // SSoT de locales
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * @interface LocaleLayoutProps
 * @description Propiedades del componente `LocaleLayout`.
 */
interface LocaleLayoutProps {
  /**
   * @property {ReactNode} children - El contenido de la página renderizada por el App Router.
   */
  children: ReactNode;
  /**
   * @property {object} params - Parámetros de la ruta.
   * @property {string} params.locale - El locale activo extraído de la URL.
   */
  params: { locale: string };
}

/**
 * @public
 * @function generateStaticParams
 * @description Función de Next.js para generar rutas estáticas para cada locale.
 *              Crucial para la Generación de Sitios Estáticos (SSG).
 * @returns {{ locale: AppLocale }[]} Un array de objetos con todos los locales soportados.
 */
export function generateStaticParams(): { locale: AppLocale }[] {
  serverLogger.trace(
    { component: "LocaleLayout" },
    "Generando static params para todos los locales."
  );
  return locales.map((locale) => ({ locale }));
}

/**
 * @public
 * @component LocaleLayout
 * @description Layout raíz funcional de la aplicación. Es el punto de entrada para
 *              la estructura HTML, la internacionalización (`NextIntlClientProvider`),
 *              los proveedores de contexto globales (`GeoIPProvider`, `TelemetryProvider`),
 *              y la inyección de scripts de terceros. Realiza una validación
 *              temprana del `locale` para asegurar la coherencia.
 * @param {LocaleLayoutProps} props - Las propiedades del layout, incluyendo `children` y `params.locale`.
 * @returns {Promise<React.ReactElement>}
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps): Promise<React.ReactElement> {
  // SOLUCIÓN: La validación del locale es ahora responsabilidad del layout raíz,
  // utilizando la SSoT de locales de `src/lib/navigation.ts`.
  if (!locales.includes(locale as AppLocale)) {
    serverLogger.error(
      { locale, component: "LocaleLayout" } as LogContext, // Aserción de tipo para LogContext
      "Layout raíz detectó locale inválido o no soportado. Retornando 404."
    );
    notFound(); // Invoca la página 404 de Next.js.
  }

  // Establece el locale para la petición actual, permitiendo a los Server Components
  // usar `getTranslations` sin especificar el locale.
  unstable_setRequestLocale(locale);
  serverLogger.trace(
    { locale, component: "LocaleLayout" },
    `[LocaleLayout] Renderizando layout raíz funcional para el locale: ${locale}.`
  );

  // Obtiene todos los mensajes de i18n para el cliente.
  // Después de las refactorizaciones previas, `getMessages()` ahora opera correctamente
  // con la arquitectura IMAS y los tipos `AbstractIntlMessages`.
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-brand-background font-sans text-white">
        <CookiesProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <GeoIPProvider>
              <TelemetryProvider>
                {children}
                <Toaster position="top-center" />{" "}
                {/* Componente de notificaciones toast */}
              </TelemetryProvider>
            </GeoIPProvider>
          </NextIntlClientProvider>
        </CookiesProvider>

        {/* Scripts de terceros */}
        {/* jQuery es a menudo un requisito de scripts de afiliados como Webvork. */}
        <Script
          src="/js/jquery-3.5.1.min.js"
          strategy="beforeInteractive" // Se carga antes de que la página se vuelva interactiva.
          id="jquery-script"
        />
        {/* webvork.js es crítico para la atribución de afiliados y el llenado de campos ocultos. */}
        <Script
          src="/js/webvork.js"
          strategy="lazyOnload" // Se carga de forma no bloqueante después de que la página haya cargado.
          id="webvork-script"
        />
      </body>
    </html>
  );
}
// src/app/[locale]/layout.tsx
