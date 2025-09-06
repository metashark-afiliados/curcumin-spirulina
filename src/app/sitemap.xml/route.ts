// src/app/sitemap.xml/route.ts
/**
 * @file src/app/sitemap.xml/route.ts
 * @description Route handler para generar el `sitemap.xml` estáticamente.
 *              Refactorizado para usar el HOC `withLogger` y la Inyección
 *              de Dependencias explícita para una observabilidad transaccional
 *              robusta y estable durante el proceso de build.
 * @version 7.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/sitemap.xml/route.ts.md
 */
import "server-only";

import type pino from "pino";
import { getPostsData } from "@/lib/blog";
import { withLogger } from "@/lib/helpers/with-logger.helper";
import { locales, pathnames } from "@/lib/navigation";

export const dynamic = "force-static";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// --- Tipos de Datos Internos ---
interface AlternateLink {
  href: string;
  hreflang: string;
}
interface SitemapEntry {
  lastModified: string;
  alternates: AlternateLink[];
}

// --- Funciones de Generación de Entradas (Ahora reciben el logger explícitamente) ---
function generateStaticEntries(logger: pino.Logger): SitemapEntry[] {
  logger.trace(
    { component: "SitemapGenerator", action: "generateStaticEntries" },
    "Generando entradas para páginas estáticas."
  );

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

async function generateBlogEntries(
  logger: pino.Logger
): Promise<SitemapEntry[]> {
  logger.trace(
    { component: "SitemapGenerator", action: "generateBlogEntries" },
    "Generando entradas para artículos del blog."
  );
  const postsBySlug: Record<
    string,
    { lastModified: string; paths: Set<string> }
  > = {};

  for (const locale of locales) {
    try {
      // Propaga el logger a la capa de acceso a datos (DAL).
      const posts = await getPostsData(logger, locale);
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
        if (
          new Date(post.date) > new Date(postsBySlug[post.slug].lastModified)
        ) {
          postsBySlug[post.slug].lastModified = new Date(
            post.date
          ).toISOString();
        }
      }
    } catch (error) {
      logger.error(
        {
          component: "SitemapGenerator",
          action: "generateBlogEntries",
          locale,
          err: error,
        },
        `Error al obtener posts para el locale '${locale}'. Se ignorará.`
      );
    }
  }

  return Object.values(postsBySlug).map((group) => {
    const alternates = Array.from(group.paths).map((path) => {
      const locale = locales.find((loc) => path.includes(`/${loc}/`)) || "";
      return { href: path, hreflang: locale };
    });
    return { lastModified: group.lastModified, alternates };
  });
}

// --- Función de Renderizado (Ahora recibe el logger explícitamente) ---
function renderSitemap(logger: pino.Logger, entries: SitemapEntry[]): string {
  const baseContext = {
    component: "SitemapGenerator",
    action: "renderSitemap",
  };
  logger.trace(
    { ...baseContext, entryCount: entries.length },
    "Renderizando sitemap en formato XML."
  );

  const urlsXml = entries
    .map((entry) => {
      const canonicalUrl = entry.alternates[0]?.href || "";
      if (!canonicalUrl) {
        logger.warn(
          { ...baseContext, entry },
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

// --- Route Handler ---
async function getSitemap(logger: pino.Logger): Promise<Response> {
  const baseContext = { component: "SitemapRoute" };
  try {
    logger.info(
      baseContext,
      "[Sitemap] Iniciando generación del sitemap.xml."
    );

    const staticEntries = generateStaticEntries(logger);
    const blogEntries = await generateBlogEntries(logger);
    const allEntries = [...staticEntries, ...blogEntries];

    const sitemap = renderSitemap(logger, allEntries);

    logger.info(
      { ...baseContext, count: allEntries.length },
      `[Sitemap] Sitemap generado con éxito con ${allEntries.length} entradas.`
    );

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    logger.error(
      { ...baseContext, err: error },
      "[Sitemap] Error crítico durante la generación del sitemap."
    );
    return new Response("Error interno del servidor al generar sitemap", {
      status: 500,
    });
  }
}

export const GET = withLogger(getSitemap);
// src/app/sitemap.xml/route.ts```
