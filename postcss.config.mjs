// postcss.config.mjs
/**
 * @type {import('postcss-load-config').Config}
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description PostCSS configuration file for the Curcumin Spirulina project.
 *              Sets up the necessary plugins for processing CSS, primarily Tailwind CSS and Autoprefixer.
 *              This configuration is tailored for Tailwind CSS v3.
 * @see https://postcss.org/
 * @see https://tailwindcss.com/docs/using-postcss
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - CSSNANO INTEGRATION: Em um ambiente de produção mais complexo, considerar a adição do `cssnano` para minificação avançada do CSS, embora o Next.js já realize otimizações significativas.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - REFACTOR A V3: A configuração foi simplificada para a sintaxe padrão de plugins do PostCSS, removendo a referência `@tailwindcss/postcss` da v4 e definindo `tailwindcss` e `autoprefixer` explicitamente, que é o padrão canônico para a v3.
 *
 */
