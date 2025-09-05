// src/components/blog/ArticleLayout.tsx
/**
 * @file ArticleLayout.tsx
 * @description Aparato de layout de apresentação puro e atômico. Sua única
 *              responsabilidade é renderizar a estrutura visual completa de um
 *              artigo de blog, recebendo todo o seu conteúdo via props.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { type MDXRemoteProps } from "next-mdx-remote/rsc";
import { Link } from "@/lib/navigation";
import { clientLogger } from "@/lib/logger";

/**
 * @interface ArticleLayoutProps
 * @description Contrato de propriedades para o layout do artigo.
 */
export interface ArticleLayoutProps {
  post: {
    title: string;
    tags: string[];
    author: string;
    date: string;
    formattedDate: string;
    featuredImage: string;
    content: string;
  };
  components: MDXRemoteProps["components"];
  t: {
    backToBlogLink: string;
  };
}

/**
 * @component ArticleLayout
 * @description Renderiza o layout completo de um artigo de blog.
 * @param {ArticleLayoutProps} props - As propriedades para configurar o layout.
 * @returns {React.ReactElement}
 */
export function ArticleLayout({ post, components, t }: ArticleLayoutProps) {
  // `MDXRemote` precisa ser importado dinamicamente no cliente.
  const MDXRemote = require("next-mdx-remote/rsc").MDXRemote;

  clientLogger.trace(
    { component: "ArticleLayout", title: post.title },
    "Renderizando layout do artigo."
  );

  return (
    <article className="py-16 md:py-24">
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

      <div className="container mx-auto mt-12 max-w-5xl px-4">
        <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-2xl md:h-[500px]">
          <Image
            src={post.featuredImage}
            alt={`Imagem de destaque para o artigo: ${post.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4">
        <div className="prose prose-invert mx-auto mt-12 max-w-none prose-lg prose-p:text-white/80 prose-headings:text-white prose-strong:text-white prose-a:text-brand-accent hover:prose-a:text-brand-accent-hover">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>

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
    </article>
  );
}
// src/components/blog/ArticleLayout.tsx
