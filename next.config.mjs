// next.config.mjs
/**
 * @file next.config.mjs
 * @description Manifiesto de configuración de Next.js de élite.
 *              Integra el plugin de `next-intl` para la internacionalización
 *              y configura `webpack` para suprimir warnings específicos
 *              relacionados con Sentry/OpenTelemetry, resultando en un build limpio.
 * @author L.I.A. Legacy
 * @version 2.1.0
 * @see .docs-espejo/next.config.mjs.md
 * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
 */
import createNextIntlPlugin from "next-intl/plugin";

// El plugin necesita la ruta al orquestador de i18n.
const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de Webpack para suprimir warnings específicos.
  // Esto es necesario para limpiar el output del build de Next.js
  // de advertencias provenientes de librerías de instrumentación como Sentry.
  webpack: (config, { isServer }) => {
    // Suprime warnings relacionados con 'Critical dependency' en módulos de Sentry/OpenTelemetry.
    // Estos warnings son comunes en librerías que realizan instrumentación dinámica
    // y no afectan la funcionalidad en producción, pero ensucian el log del build.
    config.ignoreWarnings = [
      {
        module: /node_modules\/@opentelemetry/,
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
      {
        module: /node_modules\/require-in-the-middle/,
        message:
          /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      },
      // Puedes añadir más reglas de supresión de warnings aquí si aparecen otras
      // advertencias no deseadas que no son críticas para la funcionalidad.
    ];

    // Importante: Retorna siempre la configuración de Webpack modificada.
    return config;
  },

  // Aquí irían otras configuraciones de Next.js
  // Por ejemplo:
  // images: {
  //   remotePatterns: [...]
  // }
};

export default withNextIntl(nextConfig);
// next.config.mjs
