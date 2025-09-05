// postcss.config.mjs
/**
 * @file postcss.config.mjs
 * @description Manifiesto de Configuración y SSoT para PostCSS. Define el pipeline
 *              de transformaciones que se aplican al CSS de la aplicación.
 * @author L.I.A. Legacy
 * @version 2.0.0
 * @see https://postcss.org/
 * @see https://tailwindcss.com/docs/using-postcss
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    /**
     * @plugin tailwindcss
     * @description Procesa las directivas de Tailwind (`@tailwind`) y las clases de utilidad.
     */
    tailwindcss: {},
    /**
     * @plugin autoprefixer
     * @description Añade prefijos de proveedor (ej. `-webkit-`, `-moz-`) a las reglas CSS
     *              para garantizar la compatibilidad entre diferentes navegadores.
     */
    autoprefixer: {},
  },
};

export default config;
// postcss.config.mjs
