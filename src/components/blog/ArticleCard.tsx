// src/components/blog/ArticleCard.tsx
/**
 * @file ArticleCard.tsx
 * @description Componente de apresentação (Molécula) projetado para exibir um resumo
 *              de um artigo do blog. É um Server Component otimizado para performance e SEO.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import { type PostFrontmatter, formatDate } from "@/lib/blog";
import { serverLogger } from "@/lib/logger";
import { Link } from "@/lib/navigation";

interface ArticleCardProps extends PostFrontmatter {
  slug: string;
  locale: string;
}

export function ArticleCard({
  slug,
  title,
  date,
  excerpt,
  featuredImage,
  tags,
  locale,
}: ArticleCardProps): React.ReactElement {
  serverLogger.trace(
    { component: "ArticleCard", title },
    `Renderizando card para o post.`
  );

  const formattedDate = formatDate(date, locale);
  const href = `/blog/${slug}`;

  return (
    <Link
      href={href as any} // Aserción de tipo pragmática para ruta dinámica
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-brand-accent"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={featuredImage}
          alt={`Imagem de destaque para o artigo: ${title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-brand-accent" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold uppercase tracking-wider text-brand-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-brand-accent">
          {title}
        </h3>
        <p className="flex-1 text-sm text-white/70">{excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
          <Calendar size={14} />
          <time dateTime={date}>{formattedDate}</time>
        </div>
      </div>
    </Link>
  );
}
// src/components/blog/ArticleCard.tsx
