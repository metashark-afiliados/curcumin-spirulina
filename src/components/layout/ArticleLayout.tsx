// src/components/layout/ArticleLayout.tsx
/**
 * @file ArticleLayout.tsx
 * @description Aparato de layout de presentación puro y de servidor. Nivelado
 *              para eliminar la última dependencia de tipo de logging obsoleta
 *              y para implementar una internacionalización completa de sus
 *              cadenas de texto internas.
 * @author L.I.A. Legacy
 * @version 7.0.0
 * @see .docs-espejo/components/layout/ArticleLayout.tsx.md
 */
import "server-only";

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import React from "react";

import { logger } from "@/lib/logger";
import { Link } from "@/lib/navigation";

export interface ArticleLayoutProps {
  post: {
    title: string;
    tags: string[];
    author: string;
    date: string;
    formattedDate: string;
    featuredImage: string;
  };
  source: string;
  components: MDXRemoteProps["components"];
  t: {
    backToBlogLink: string;
    imageAltText: string;
    authorLabel: string;
  };
}

/**
 * @component ArticleLayout
 * @description Un componente de servidor de presentación puro que renderiza la
 *              estructura completa de un artículo de blog. Recibe todos sus datos
 *              y contenido de UI a través de props.
 * @param {ArticleLayoutProps} props Las propiedades del componente.
 * @returns {Promise<React.ReactElement>} El layout del artículo renderizado.
 */
export async function ArticleLayout({
  post,
  source,
  components,
  t,
}: ArticleLayoutProps): Promise<React.ReactElement> {
  const baseContext = {
    component: "ArticleLayout",
    title: post.title,
  };
  logger.trace(
    baseContext,
    "Renderizando layout de presentación de artículo en servidor."
  );

  return (
    <div className="py-16 md:py-24">
      <header className="container mx-auto max-w-3xl px-4 text-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
          {post.tags.map((tag) => (
            <span key={tag} className="font-semibold text-brand-accent">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <User size={14} aria-hidden="true" />
            <span aria-label={t.authorLabel}>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} aria-hidden="true" />
            <time dateTime={post.date}>{post.formattedDate}</time>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-12 max-w-5xl px-4">
        <article>
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-2xl md:h-[500px]">
            <Image
              src={post.featuredImage}
              alt={t.imageAltText.replace("{title}", post.title)}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert mx-auto mt-12 max-w-3xl prose-lg prose-p:text-white/80 prose-headings:text-white prose-strong:text-white prose-a:text-brand-accent hover:prose-a:text-brand-accent-hover">
            <MDXRemote source={source} components={components} />
          </div>
        </article>
      </main>

      <footer className="container mx-auto mt-16 max-w-3xl px-4 border-t border-white/10 pt-8 text-center">
        <p className="text-white/70">
          <Link
            href="/blog"
            className="font-bold text-brand-accent hover:underline"
          >
            {t.backToBlogLink}
          </Link>
        </p>
      </footer>
    </div>
  );
}
// src/components/layout/ArticleLayout.tsx
