// next.config.mjs
/**
 * @file next.config.mjs
 * @description Manifiesto de configuración de Next.js de élite. Esta es la Única
 *              Fuente de Verdad (SSoT) para el comportamiento del framework,
 *              definiendo la estrategia de build, la compatibilidad del logger,
 *              la internacionalización y las cabeceras de seguridad.
 *              Esta versión implementa una estrategia de renderizado dinámico (SSR).
 * @author L.I.A. Legacy
 * @version 6.0.0
 * @see .docs-espejo/next.config.mjs.md
 */
import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // NOTA ARQUITECTÓNICA: La directiva `output: 'export'` ha sido eliminada.
  // La aplicación utiliza middleware y otras funciones dinámicas que son
  // incompatibles con una exportación estática. La estrategia es Server-Side Rendering (SSR).

  // SSoT de Compatibilidad para Pino Logger con React Server Components (RSC).
  // Estas configuraciones instruyen a Next.js para que no intente empaquetar
  // ciertas dependencias de `pino` que dependen de APIs nativas de Node.js,
  // resolviendo así errores de build en el entorno de RSC.
  experimental: {
    serverComponentsExternalPackages: [
      "pino",
      "pino-pretty",
      "thread-stream",
      "async_hooks",
    ],
  },

  webpack: (config) => {
    // Silencia warnings conocidos de dependencias de Sentry.
    config.ignoreWarnings = [
      { module: /node_modules\/@opentelemetry/ },
      { module: /node_modules\/require-in-the-middle/ },
    ];

    // Trata 'thread-stream' como un módulo externo para pino-pretty.
    if (!config.externals) {
      config.externals = [];
    }
    config.externals.push({
      "thread-stream": "commonjs thread-stream",
    });

    return config;
  },

  // SSoT para Cabeceras de Seguridad HTTP.
  // Añade una capa de protección básica a nivel de aplicación.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

// El orden de los wrappers es importante:
// 1. `withNextIntl` envuelve la configuración base.
// 2. `withBundleAnalyzer` envuelve el resultado para el análisis opcional.
export default withBundleAnalyzer(withNextIntl(nextConfig));
// next.config.mjs
