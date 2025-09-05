// src/app/[locale]/blog/[slug]/page.tsx
/**
 * @file page.tsx
 * @description Orquestador de servidor soberano para un artículo de blog. Su
 *              responsabilidad es obtener los datos del post, orquestar los
 *              metadatos SEO y delegar el 100% del renderizado de la UI al
 *              componente de presentación puro `ArticleLayout`.
 * @version 7.0.1
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 */
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getPostBySlug, getPostsData, formatDate } from "@/lib/blog";
import { serverLogger } from "@/lib/server-logger";
import { generateBlogPostingSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallToAction } from "@/components/blog/CallToAction";
// CORREÇÃO: O caminho de importação foi corrigido para refletir a localização canónica do componente.
import { ArticleLayout } from "@/components/layout/ArticleLayout";

interface BlogArticlePageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await getPostsData(locale);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug, locale } = params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({
      locale,
      namespace: "app.notFound.meta",
    });
    return { title: t("title") };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const blogPostingSchema = generateBlogPostingSchema(post, locale);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [`${BASE_URL}${post.featuredImage}`],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    other: {
      "application/ld+json": JSON.stringify(blogPostingSchema),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  serverLogger.info(
    { slug, locale },
    "[BlogArticlePage] Iniciando orquestração."
  );

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    serverLogger.warn(
      { slug, locale },
      "[BlogArticlePage] Post não encontrado."
    );
    notFound();
  }

  const t = await getTranslations("pages.blog.article");
  const formattedDate = formatDate(post.date, locale);

  const mdxComponents = {
    CallToAction,
    Image,
  };

  const postForLayout = {
    title: post.title,
    tags: post.tags,
    author: post.author,
    date: post.date,
    formattedDate: formattedDate,
    featuredImage: post.featuredImage,
  };

  const translationsForLayout = {
    backToBlogLink: t("backToBlogLink"),
  };

  serverLogger.info(
    { slug, locale },
    "[BlogArticlePage] Orquestração concluída. Delegando para ArticleLayout."
  );

  return (
    <div className="flex min-h-screen flex-col bg-brand-background text-white">
      <Header />
      <main className="flex-grow">
        <ArticleLayout
          post={postForLayout}
          source={post.content}
          components={mdxComponents}
          t={translationsForLayout}
        />
      </main>
      <Footer />
    </div>
  );
}
// src/app/[locale]/blog/[slug]/page.tsx
