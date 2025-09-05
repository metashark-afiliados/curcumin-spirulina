// next.config.mjs
/**
 * @file next.config.mjs
 * @description Manifiesto de configuración de Next.js de élite. Instrumenta el framework
 *              con internacionalización, políticas de seguridad de contenido (CSP),
 *              y la integración de Sentry.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
import crypto from "crypto";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTA ARQUITECTÓNICA: La directiva `output: "export"` ha sido eliminada
  // para soportar renderizado dinámico (SSR/ISR), requerido por el middleware
  // y los Route Handlers dinámicos como sitemap.xml.

  // Política de Seguridad de Imágenes: Lista blanca de dominios permitidos.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "it4.curcumacomplex.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Generación de Cabeceras de Seguridad
  async headers() {
    const nonce = crypto.randomBytes(16).toString("base64");

    const cspDirectives = {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        // Permite la evaluación de scripts inline en desarrollo para HMR.
        process.env.NODE_ENV === "production"
          ? `'nonce-${nonce}'`
          : "'unsafe-eval'",
        "'unsafe-inline'", // Necesario para algunas librerías
      ],
      "worker-src": ["'self'", "blob:"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "it4.curcumacomplex.com"],
      "font-src": ["'self'"],
      "connect-src": [
        "'self'",
        "https://*.sentry.io",
        "https://ipapi.co", // Para GeoIP
      ],
      "frame-src": ["'self'"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": [
        "'self'",
        process.env.NEXT_PUBLIC_PRODUCER_ENDPOINT || "",
      ],
      "frame-ancestors": ["'none'"],
    };

    const cspHeader = Object.entries(cspDirectives)
      .map(([key, value]) => `${key} ${value.join(" ")}`)
      .join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
          // Pasamos el nonce para que el layout raíz pueda acceder a él.
          { key: "x-nonce", value: nonce },
        ],
      },
    ];
  },
};

// Configuración para el plugin de Sentry
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suprime el output detallado en el build
};

// Ensamblaje final de la configuración, envolviendo con los plugins.
const finalConfig = withSentryConfig(
  withNextIntl(nextConfig),
  sentryWebpackPluginOptions,
  {
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);

export default finalConfig;
// next.config.mjs
