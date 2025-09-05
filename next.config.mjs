// src/next.config.mjs
/**
 * @file next.config.mjs
 * @description Manifiesto de Configuración de Next.js de élite. Instrumenta el framework
 *              con internacionalización, políticas de seguridad de contenido (CSP),
 *              y la integración consolidada de Sentry.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/next.config.mjs.md
 */
import crypto from "crypto";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/**
 * @type {import('next').NextConfig}
 * @description Configuración base de Next.js. Define las políticas de imágenes y seguridad.
 */
const nextConfig = {
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
    // Nonce para la Política de Seguridad de Contenido (CSP)
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
        process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co", // Origen de GeoIP
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

/**
 * @description Ensamblaje final de la configuración, envolviendo la configuración base
 *              con los plugins de `next-intl` y `Sentry` en el orden correcto.
 */
const finalConfig = withNextIntl(nextConfig);

/**
 * @description Opciones de Sentry consolidadas en una única SSoT.
 * @see https://www.npmjs.com/package/@sentry/webpack-plugin#options
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */
export default withSentryConfig(
  finalConfig,
  {
    // Opciones del Webpack Plugin
    org: process.env.SENTRY_ORG || "metashark-tech",
    project: process.env.SENTRY_PROJECT || "javascript-nextjs",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI, // Suprime logs de subida de sourcemaps excepto en CI
  },
  {
    // Opciones del SDK de Sentry
    widenClientFileUpload: true, // Sube más sourcemaps para mejor trazabilidad
    hideSourceMaps: true, // Oculta sourcemaps de los navegadores de los usuarios
    disableLogger: true, // Desactiva logs de Sentry para reducir el tamaño del bundle
    automaticVercelMonitors: true, // Instrumenta automáticamente los Cron Jobs de Vercel
  }
);
// src/next.config.mjs
