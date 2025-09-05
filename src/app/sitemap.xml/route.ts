// src/app/sitemap.xml/route.ts
/**
 * @file route.ts
 * @description Route handler para generar dinámicamente el sitemap.xml.
 *              Consume la SSoT de `navigation.ts` para garantizar que todas las
 *              rutas y locales se incluyan automáticamente.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/sitemap.xml/route.ts.md
 */
import "server-only";

import { getPostsData } from "@/lib/blog";
import { serverLogger } from "@/lib/logger";
import { locales, pathnames } from "@/lib/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface SitemapUrl {
  loc: string;
  lastModified: string;
}

/**
 * @description Factoría que genera las URLs para las páginas estáticas.
 */
async function generateStaticUrls(): Promise<SitemapUrl[]> {
  const urls = locales.flatMap((locale) =>
    Object.keys(pathnames).map((path) => ({
      loc: `${BASE_URL}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date().toISOString(),
    }))
  );
  return urls;
}

/**
 * @description Factoría que genera las URLs para los artículos del blog.
 */
async function generateBlogUrls(): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = [];
  for (const locale of locales) {
    try {
      const posts = await getPostsData(locale);
      posts.forEach((post) => {
        urls.push({
          loc: `${BASE_URL}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.date).toISOString(),
        });
      });
    } catch (error) {
      serverLogger.error(
        { err: error, locale },
        "[Sitemap] Falha ao gerar URLs do blog para um locale."
      );
    }
  }
  return urls;
}

/**
 * @description Renderiza el array de URLs en un string XML válido.
 */
function renderSitemap(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastModified}</lastmod>
    </url>
  `
    )
    .join("")}
</urlset>`;
}

export async function GET(): Promise<Response> {
  serverLogger.info("[Sitemap] Iniciando geração do sitemap.xml.");

  const staticUrls = await generateStaticUrls();
  const blogUrls = await generateBlogUrls();
  const allUrls = [...staticUrls, ...blogUrls];

  const sitemap = renderSitemap(allUrls);

  serverLogger.info(
    `[Sitemap] Sitemap gerado com sucesso com ${allUrls.length} URLs.`
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
// src/app/sitemap.xml/route.ts
