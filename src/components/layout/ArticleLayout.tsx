// src/components/blog/ArticleLayout.tsx
/**
 * @file ArticleLayout.tsx
 * @description Aparato de layout de apresentação puro e de servidor. Sua única
 *              responsabilidade é renderizar a estrutura visual de um
 *              artigo de blog, com uma estrutura semântica de topo.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/ArticleLayout.tsx.md
 */
import "server-only";

import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";

import { Link } from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger";

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
  };
}

export async function ArticleLayout({
  post,
  source,
  components,
  t,
}: ArticleLayoutProps): Promise<React.ReactElement> {
  serverLogger.trace(
    { component: "ArticleLayout", title: post.title },
    "Renderizando layout de apresentação de artigo em servidor."
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
            <User size={14} /> <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />{" "}
            <time dateTime={post.date}>{post.formattedDate}</time>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-12 max-w-5xl px-4">
        <article>
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-2xl md:h-[500px]">
            <Image
              src={post.featuredImage}
              alt={`Imagem de destaque para o artigo: ${post.title}`}
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
// src/components/blog/ArticleLayout.tsx
