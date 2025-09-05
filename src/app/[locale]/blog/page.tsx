// src/app/[locale]/blog/page.tsx
/**
 * @file page.tsx
 * @description Orquestador soberano para la página de listado del blog.
 *              Obtiene los datos de los posts y su propio contenido de i18n,
 *              y ensambla los componentes de layout y de UI soberanos.
 * @version 3.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/blog/page.tsx.md
 */
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import { serverLogger } from "@/lib/server-logger"; // <-- RUTA CORREGIDA
import { getPostsData, type PostFrontmatter } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.blog.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  serverLogger.info(`[BlogIndexPage] Ensamblando para o locale: ${locale}`);

  const t = await getTranslations("pages.blog");
  const posts = await getPostsData(locale);

  return (
    <div className="flex min-h-screen flex-col bg-brand-background text-white">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-16">
        <AnimationWrapper>
          <h1 className="mb-4 text-center text-5xl font-extrabold text-white">
            {t("mainTitle")}
          </h1>
          <p className="mb-12 text-center text-xl text-white/80">
            {t("subtitle")}
          </p>
        </AnimationWrapper>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(
            (post: PostFrontmatter & { slug: string }, index: number) => (
              <AnimationWrapper
                key={post.slug}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard locale={locale} {...post} />
              </AnimationWrapper>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
// src/app/[locale]/blog/page.tsx
