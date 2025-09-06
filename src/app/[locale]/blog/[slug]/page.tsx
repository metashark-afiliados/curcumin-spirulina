// src/app/[locale]/blog/[slug]/page.tsx
/**
 * @file src/app/[locale]/blog/[slug]/page.tsx
 * @description Orquestador de servidor para un artículo de blog. Nivelado para
 *              propagar correctamente el logger transaccional a todos sus
 *              componentes hijos dependientes (`ArticleLayout`), resolviendo
 *              la brecha en la cadena de dependencias y completando la
 *              migración de la funcionalidad del blog.
 * @author L.I.A. Legacy
 * @version 12.1.0
 * @see .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 */
import "server-only";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import type pino from "pino";

import { CallToAction } from "@/components/blog/CallToAction";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { getPostBySlug, getPostsData, formatDate } from "@/lib/blog";
import { withLogger } from "@/lib/helpers/with-logger.helper";
import { generateBlogPostingSchema } from "@/lib/schema";

interface BlogArticlePageProps {
  params: { slug: string; locale: string };
}

async function generateStaticParamsHandler(
  logger: pino.Logger
): Promise<{ slug: string; locale: string }[]> {
  logger.info(
    { component: "BlogArticlePage", action: "generateStaticParams" },
    "Iniciando generación de parámetros estáticos para todos los posts."
  );
  const allPosts = await Promise.all(
    ["it-IT", "es-ES"].map(async (locale) => {
      const posts = await getPostsData(logger, locale);
      return posts.map((post) => ({ slug: post.slug, locale }));
    })
  );
  return allPosts.flat();
}
export const generateStaticParams = withLogger(generateStaticParamsHandler);

async function generateMetadataHandler(
  logger: pino.Logger,
  { params: { slug, locale } }: BlogArticlePageProps
): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const post = await getPostBySlug(logger, slug, locale);
  if (!post) notFound();

  const blogPostingSchema = generateBlogPostingSchema(logger, post, locale);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    other: { "application/ld+json": JSON.stringify(blogPostingSchema) },
  };
}
export const generateMetadata = withLogger(generateMetadataHandler);

async function BlogArticlePageHandler(
  logger: pino.Logger,
  { params }: BlogArticlePageProps
): Promise<JSX.Element> {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  const baseContext = { component: "BlogArticlePage", slug, locale };

  logger.info(baseContext, "Iniciando orquestación de la página del artículo.");

  const post = await getPostBySlug(logger, slug, locale);
  if (!post) notFound();

  const t = await getTranslations("pages.blog.article");
  const formattedDate = formatDate(logger, post.date, locale);

  return (
    <ArticleLayout
      logger={logger} // CORRECCIÓN: Se propaga explícitamente el logger.
      post={{ ...post, formattedDate }}
      source={post.content}
      components={{ CallToAction }}
      t={{ backToBlogLink: t("backToBlogLink") }}
    />
  );
}
export default withLogger(BlogArticlePageHandler);
// src/app/[locale]/blog/[slug]/page.tsx
