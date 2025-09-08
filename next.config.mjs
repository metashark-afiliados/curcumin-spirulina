// next.config.mjs
/**
 * @file next.config.mjs
 * @description Manifiesto de configuración de Next.js. Corregido para utilizar
 *              la API moderna de `withSentryConfig`, eliminando la advertencia
 *              de obsolescencia y alineándose con las mejores prácticas.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/next.config.mjs.md
 */
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La propiedad `sentry` se elimina de aquí.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

// CORRECCIÓN: Las opciones de Sentry ahora se pasan como segundo
// argumento a `withSentryConfig`.
const sentryBuildOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  // Las opciones que antes estaban en `sentry` se mueven aquí.
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withSentryConfig(withNextIntl(nextConfig), sentryBuildOptions);
// next.config.mjs
