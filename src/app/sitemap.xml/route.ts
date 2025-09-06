// src/app/sitemap.xml/route.ts
/**
 * @file src/app/sitemap.xml/route.ts
 * @description Route handler para generar dinámicamente el `sitemap.xml`.
 *              Implementa la estrategia de élite de SEO multilingüe usando
 *              etiquetas `<xhtml:link alternate>`, y está blindado con un
 *              manejo de errores robusto y logging completo.
 *              **Configurado para forzar la estaticidad para permitir SSG,
 *              evitando el uso de `request.url` en contextos dinámicos.**
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/sitemap.xml/route.ts.md
 * @see src/lib/blog.ts (SSoT para obtener datos de posts)
 * @see src/lib/navigation.ts (SSoT para `locales` y `pathnames`)
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import "server-only"; // Este Route Handler se ejecuta estrictamente en el servidor.

import { getPostsData } from "@/lib/blog";
import { locales, pathnames } from "@/lib/navigation";
import { serverLogger } from "@/lib/logger";
import { type LogContext } from "@/lib/types/logging";

// IMPORTANTE: Para forzar la estaticidad de este Route Handler para SSG.
// Si se usa `request.url` o `request.headers` de una manera que Next.js no puede
// determinar como estática en tiempo de build, la ruta se marca como dinámica.
// Al declararlo explícitamente, indicamos que se debe prerrenderizar.
// Para el sitemap, `BASE_URL` debe ser una variable de entorno definida en tiempo de build.
export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * @interface AlternateLink
 * @description Representa un enlace alternativo para un `hreflang` específico en el sitemap.
 */
interface AlternateLink {
  href: string;
  hreflang: string;
}

/**
 * @interface SitemapEntry
 * @description Representa una entrada individual en el sitemap, con su fecha de
 *              última modificación y sus enlaces alternativos por idioma.
 */
interface SitemapEntry {
  lastModified: string;
  alternates: AlternateLink[];
}

/**
 * @private
 * @function generateStaticEntries
 * @description Genera las entradas del sitemap para las páginas estáticas
 *              definidas en `src/lib/navigation.ts`.
 * @returns {SitemapEntry[]} Un array de entradas de sitemap para páginas estáticas.
 */
function generateStaticEntries(): SitemapEntry[] {
  serverLogger.trace(
    { component: "SitemapRoute", action: "generateStaticEntries" },
    "Generando entradas para páginas estáticas."
  );
  return Object.keys(pathnames).map((path) => {
    const alternates = locales.map((locale) => ({
      href: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
      hreflang: locale,
    }));
    return {
      lastModified: new Date().toISOString(), // Esto debería ser una fecha de build o la última modificación real del archivo.
      alternates,
    };
  });
}

/**
 * @private
 * @async
 * @function generateBlogEntries
 * @description Genera las entradas del sitemap para los artículos del blog,
 *              agrupando las versiones de idioma de cada post.
 * @returns {Promise<SitemapEntry[]>} Una promesa que resuelve a un array de
 *          entradas de sitemap para artículos del blog.
 */
async function generateBlogEntries(): Promise<SitemapEntry[]> {
  serverLogger.trace(
    { component: "SitemapRoute", action: "generateBlogEntries" },
    "Generando entradas para artículos del blog."
  );
  const postsBySlug: Record<
    string,
    { lastModified: string; paths: Set<string> }
  > = {};

  for (const locale of locales) {
    try {
      const posts = await getPostsData(locale);
      for (const post of posts) {
        if (!postsBySlug[post.slug]) {
          postsBySlug[post.slug] = {
            lastModified: new Date(post.date).toISOString(),
            paths: new Set(),
          };
        }
        postsBySlug[post.slug].paths.add(
          `${BASE_URL}/${locale}/blog/${post.slug}`
        );
        if (new Date(post.date) > new Date(postsBySlug[post.slug].lastModified)) {
          postsBySlug[post.slug].lastModified = new Date(post.date).toISOString();
        }
      }
    } catch (error) {
      serverLogger.error(
        { component: "SitemapRoute", action: "generateBlogEntries", locale, err: error } as LogContext,
        `Error al obtener posts para el locale '${locale}' al generar el sitemap. Se ignorará este locale.`
      );
    }
  }

  return Object.values(postsBySlug).map((group) => {
    const alternates = Array.from(group.paths).map((path) => {
      const locale = locales.find((loc) => path.includes(`/${loc}/`)) || "";
      return { href: path, hreflang: locale };
    });
    return {
      lastModified: group.lastModified,
      alternates,
    };
  });
}

/**
 * @private
 * @function renderSitemap
 * @description Renderiza un array de entradas de sitemap en un string XML válido,
 *              incluyendo las etiquetas `<xhtml:link alternate>`.
 * @param {SitemapEntry[]} entries - El array de entradas de sitemap.
 * @returns {string} El contenido del sitemap en formato XML.
 */
function renderSitemap(entries: SitemapEntry[]): string {
  serverLogger.trace(
    { component: "SitemapRoute", action: "renderSitemap", entryCount: entries.length },
    "Renderizando sitemap en formato XML."
  );
  const urlsXml = entries
    .map((entry) => {
      const canonicalUrl = entry.alternates[0]?.href || "";
      if (!canonicalUrl) {
        serverLogger.warn(
          { component: "SitemapRoute", entry },
          "Entrada de sitemap sin URL canónica. Se omitirá."
        );
        return "";
      }

      const alternatesXml = entry.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
        )
        .join("\n");

      return `
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${entry.lastModified}</lastmod>
${alternatesXml}
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlsXml}
</urlset>`;
}

/**
 * @public
 * @async
 * @function GET
 * @description Route Handler principal para la ruta `/sitemap.xml`.
 *              Genera y devuelve el sitemap completo en formato XML.
 *              Incluye un manejo de errores robusto para prevenir que un sitemap
 *              corrupto o fallido sea servido.
 * @param {Request} request - El objeto de la petición.
 * @returns {Promise<Response>} Una promesa que resuelve a una `Response` con el sitemap XML
 *          o un error 500 si la generación falla.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // CORRECCIÓN: Usar BASE_URL en lugar de request.url para la estaticidad
    serverLogger.info(
      { component: "SitemapRoute", requestUrl: BASE_URL },
      "[Sitemap] Iniciando generación del sitemap.xml."
    );

    const staticEntries = generateStaticEntries();
    const blogEntries = await generateBlogEntries();
    const allEntries = [...staticEntries, ...blogEntries];

    const sitemap = renderSitemap(allEntries);

    serverLogger.info(
      { component: "SitemapRoute", count: allEntries.length },
      `[Sitemap] Sitemap generado con éxito con ${allEntries.length} entradas canónicas.`
    );

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    serverLogger.error(
      { component: "SitemapRoute", err: error } as LogContext,
      "[Sitemap] Error crítico durante la generación del sitemap."
    );
    return new Response("Error interno del servidor al generar sitemap", { status: 500 });
  }
}
// src/app/sitemap.xml/route.ts