// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.1.0
 * @description Configuración de Next.js para el proyecto. Este archivo
 *              instrumenta la configuración base con el plugin de `next-intl`
 *              y define la política de seguridad para dominios de imágenes externos.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

/**
 * MEJORA CONTINUA
 *
 * @version 2.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.1.0 - POLÍTICA DE IMÁGENES EXTERNAS: Se ha añadido la configuración `images.remotePatterns` para autorizar explícitamente el dominio `placehold.co`. Esto resuelve un error crítico de ejecución y alinea el proyecto con las mejores prácticas de seguridad y optimización de `next/image`.
 * ((Implementada)) @version 2.0.0 - INTEGRACIÓN DE I18N A NIVEL DE FRAMEWORK.
 */
