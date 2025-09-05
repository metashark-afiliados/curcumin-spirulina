// src/app/sitemap.xml/route.ts
/**
 * @file route.ts
 * @description Route handler para generar dinámicamente el sitemap.xml.
 *              Implementa la estrategia de élite de SEO multilingüe usando
 *              etiquetas <xhtml:link alternate>, y está blindado con un
 *              manejo de errores robusto.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/sitemap.xml/route.ts.md
 */
import "server-only";

import { getPostsData } from "@/lib/blog";
import { locales, pathnames } from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface AlternateLink {
  href: string;
  hreflang: string;
}

interface SitemapEntry {
  lastModified: string;
  alternates: AlternateLink[];
}

/**
 * @description Genera las entradas del sitemap para las páginas estáticas.
 */
function generateStaticEntries(): SitemapEntry[] {
  return Object.keys(pathnames).map((path) => {
    const alternates = locales.map((locale) => ({
      href: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
      hreflang: locale,
    }));
    return {
      lastModified: new Date().toISOString(),
      alternates,
    };
  });
}

/**
 * @description Genera las entradas del sitemap para los artículos del blog.
 */
async function generateBlogEntries(): Promise<SitemapEntry[]> {
  const postsBySlug: Record<
    string,
    { lastModified: string; paths: Set<string> }
  > = {};

  for (const locale of locales) {
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
      // Actualiza la fecha de modificación si se encuentra una más reciente
      if (new Date(post.date) > new Date(postsBySlug[post.slug].lastModified)) {
        postsBySlug[post.slug].lastModified = new Date(post.date).toISOString();
      }
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
 * @description Renderiza el array de entradas en un string XML válido.
 */
function renderSitemap(entries: SitemapEntry[]): string {
  const urlsXml = entries
    .map((entry) => {
      // Usamos la primera alternativa como la URL <loc> canónica para esta entrada.
      const canonicalUrl = entry.alternates[0]?.href || "";
      if (!canonicalUrl) return "";

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

export async function GET(): Promise<Response> {
  try {
    serverLogger.info("[Sitemap] Iniciando generación del sitemap.xml.");

    const staticEntries = generateStaticEntries();
    const blogEntries = await generateBlogEntries();
    const allEntries = [...staticEntries, ...blogEntries];

    const sitemap = renderSitemap(allEntries);

    serverLogger.info(
      `[Sitemap] Sitemap generado con éxito con ${allEntries.length} entradas canónicas.`
    );

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    serverLogger.error(
      { err: error },
      "[Sitemap] Error crítico durante la generación del sitemap."
    );
    return new Response("Error interno del servidor", { status: 500 });
  }
}
// src/app/sitemap.xml/route.ts
