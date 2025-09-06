// src/app/[locale]/blog/[slug]/page.tsx
/**
 * @file src/app/[locale]/blog/[slug]/page.tsx
 * @description Orquestador de servidor soberano para un artículo de blog. Su
 *              responsabilidad es obtener los datos del post, orquestar los
 *              metadatos SEO y delegar el 100% del renderizado de la UI al
 *              componente de presentación puro `ArticleLayout`.
 *              Utiliza `serverLogger` para la observabilidad completa de su proceso.
 * @version 7.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 * @see src/lib/blog.ts (SSoT para la obtención de datos del blog)
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getPostBySlug, getPostsData, formatDate } from "@/lib/blog";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { generateBlogPostingSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CallToAction } from "@/components/blog/CallToAction";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface BlogArticlePageProps
 * @description Propiedades del componente `BlogArticlePage`.
 */
interface BlogArticlePageProps {
  /**
   * @property {object} params - Parámetros de la ruta.
   * @property {string} params.slug - El slug del artículo del blog (identificador único en la URL).
   * @property {string} params.locale - El locale actual de la página.
   */
  params: {
    slug: string;
    locale: string;
  };
}

/**
 * @public
 * @function generateStaticParams
 * @description Genera las rutas estáticas para todos los artículos del blog en cada locale.
 *              Crucial para la Generación de Sitios Estáticos (SSG).
 * @param {object} props - Propiedades de la función.
 * @param {object} props.params - Parámetros de la ruta.
 * @param {string} props.params.locale - El locale para el cual generar los parámetros.
 * @returns {Promise<{ slug: string }[]>} Un array de objetos con los slugs de los posts.
 */
export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<{ slug: string }[]> {
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "BlogArticlePage", action: "generateStaticParams", locale },
    `Generando static params para blog en locale: ${locale}.`
  );
  const posts = await getPostsData(locale);
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * @public
 * @function generateMetadata
 * @description Genera los metadatos SEO para un artículo de blog específico.
 *              Incluye título, descripción, OpenGraph y Schema.org (`BlogPosting`).
 * @param {BlogArticlePageProps} params - Parámetros de la ruta que contienen el `slug` y `locale`.
 * @returns {Promise<Metadata>} Los metadatos de la página.
 */
export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug, locale } = params;
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "BlogArticlePage", action: "generateMetadata", slug, locale },
    `Generando metadatos para el artículo: ${slug}.`
  );
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({
      locale,
      namespace: "app.notFound.meta",
    });
    // USO DE SERVERLOGGER: (context, message)
    serverLogger.warn(
      {
        component: "BlogArticlePage",
        action: "generateMetadata",
        slug,
        locale,
      },
      "Post no encontrado para metadatos. Usando fallback de 404."
    );
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

/**
 * @public
 * @component BlogArticlePage
 * @description Componente de página para visualizar un único artículo de blog.
 *              Actúa como el orquestador de servidor, obteniendo los datos del post
 *              y delegando la presentación a `ArticleLayout`.
 * @param {BlogArticlePageProps} props - Propiedades de la página, incluyendo `slug` y `locale`.
 * @returns {Promise<JSX.Element>} El artículo de blog renderizado.
 */
export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps): Promise<JSX.Element> {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale); // Asegura el locale para Server Components.

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    { slug, locale, component: "BlogArticlePage" } as LogContext, // Aserción de tipo para LogContext
    "[BlogArticlePage] Iniciando orquestración de artículo."
  );

  const post = await getPostBySlug(slug, locale);

  if (!post) {
    // USO DE SERVERLOGGER: (context, message)
    serverLogger.warn(
      { slug, locale, component: "BlogArticlePage" } as LogContext, // Aserción de tipo para LogContext
      "[BlogArticlePage] Post no encontrado. Redirigiendo a 404."
    );
    notFound(); // Redirige a la página 404 si el post no existe.
  }

  const t = await getTranslations("pages.blog.article");
  const formattedDate = formatDate(post.date, locale);

  const mdxComponents = {
    CallToAction, // Componente de cliente inyectado en MDX.
    Image, // Componente Image de Next.js inyectado en MDX.
  };

  // Prepara un objeto `postForLayout` con solo las propiedades necesarias para `ArticleLayout`.
  const postForLayout = {
    title: post.title,
    tags: post.tags,
    author: post.author,
    date: post.date,
    formattedDate: formattedDate,
    featuredImage: post.featuredImage,
  };

  // Prepara un objeto `translationsForLayout` con solo las traducciones necesarias.
  const translationsForLayout = {
    backToBlogLink: t("backToBlogLink"),
  };

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    { slug, locale, component: "BlogArticlePage" } as LogContext, // Aserción de tipo para LogContext
    "[BlogArticlePage] Orquestración de artículo concluida. Delegando a ArticleLayout."
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
