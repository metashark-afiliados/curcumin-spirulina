// src/app/[locale]/blog/page.tsx
/**
 * @file src/app/[locale]/blog/page.tsx
 * @description Orquestador soberano para la página de listado del blog.
 *              Obtiene los datos de los posts y su propio contenido de i18n,
 *              y ensambla los componentes de layout y de UI soberanos.
 *              Utiliza `serverLogger` para la observabilidad completa de su proceso de renderizado.
 * @version 3.3.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/[locale]/blog/page.tsx.md
 * @see src/lib/blog.ts (SSoT para la obtención de datos del blog)
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { getPostsData, type PostFrontmatter } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { AnimationWrapper } from "@/components/ui/AnimationWrapper";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @public
 * @function generateMetadata
 * @description Genera los metadatos SEO para la página de listado del blog.
 *              Utiliza el `serverLogger` para registrar su ejecución.
 * @param {object} params - Parámetros de la ruta.
 * @param {string} params.locale - El locale actual para la generación de metadatos.
 * @returns {Promise<Metadata>} Los metadatos de la página.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.blog.meta" });
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "BlogIndexPage", action: "generateMetadata", locale },
    "Generando metadatos para la página de blog."
  );
  return {
    title: t("title"),
    description: t("description"),
  };
}

/**
 * @public
 * @component BlogIndexPage
 * @description Componente de página para visualizar la lista de artículos del blog.
 *              Actúa como el orquestador de servidor, obteniendo los datos de todos
 *              los posts y delegando la presentación a `ArticleCard`.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.params.locale - El locale actual de la página.
 * @returns {Promise<JSX.Element>} La página de índice del blog renderizada.
 */
export default async function BlogIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    { locale, component: "BlogIndexPage" } as LogContext, // Aserción de tipo para LogContext
    `[BlogIndexPage] Ensamblando para o locale: ${locale}`
  );

  const t = await getTranslations("pages.blog");
  const posts = await getPostsData(locale);

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { locale, component: "BlogIndexPage", loadedPosts: posts.length },
    "Datos de posts del blog cargados."
  );

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
