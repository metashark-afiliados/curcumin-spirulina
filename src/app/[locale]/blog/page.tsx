// src/app/[locale]/blog/page.tsx
/**
 * @file src/app/[locale]/blog/page.tsx
 * @description Orquestador soberano para la página de listado del blog.
 *              Restaurado a su versión estable, totalmente alineada con la
 *              arquitectura de Inyección de Dependencias Explícita.
 * @author L.I.A. Legacy
 * @version 8.1.0
 * @see .docs-espejo/app/[locale]/blog/page.tsx.md
 */
import "server-only";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import type pino from "pino";

import { ArticleCard } from "@/components/blog/ArticleCard";
import { getPostsData } from "@/lib/blog";
import { withLogger } from "@/lib/helpers/with-logger.helper";

/**
 * @private
 * @function generateMetadataHandler
 * @description Lógica interna para generar metadatos, aceptando un logger inyectado.
 */
async function generateMetadataHandler(
  logger: pino.Logger,
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.blog.meta" });

  logger.trace(
    { component: "BlogIndexPage", action: "generateMetadata", locale },
    "Generando metadatos para la página de índice del blog."
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/blog` },
  };
}
export const generateMetadata = withLogger(generateMetadataHandler);

/**
 * @private
 * @function BlogIndexPageHandler
 * @description Lógica interna para renderizar la página, aceptando un logger inyectado.
 */
async function BlogIndexPageHandler(
  logger: pino.Logger,
  { params: { locale } }: { params: { locale: string } }
): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const baseContext = { component: "BlogIndexPage", locale };

  logger.info(baseContext, `Ensamblando BlogIndexPage.`);

  const t = await getTranslations("pages.blog");
  const posts = await getPostsData(logger, locale);

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            {t("mainTitle")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
            {t("subtitle")}
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              logger={logger}
              locale={locale}
              {...post}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
export default withLogger(BlogIndexPageHandler);
// src/app/[locale]/blog/page.tsx
