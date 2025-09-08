// src/components/blog/ArticleCard.tsx
/**
 * @file ArticleCard.tsx
 * @description Aparato de UI soberano, semántico y de servidor. Renderiza la
 *              previsualización de un artículo de blog. Corregido para
 *              consumir la lógica y tipos desde la nueva SSoT en `lib/blog.ts`.
 * @version 8.0.0
 * @author IA Ingeniera de Software Senior v2.0
 * @see .docs-espejo/components/blog/ArticleCard.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";

// CORRECCIÓN: Las importaciones ahora se resuelven correctamente desde la SSoT.
import { formatDate, type PostFrontmatter } from "@/lib/blog";
import { logger } from "@/lib/logger";
import { Link, type Pathname } from "@/lib/navigation";

// CORRECCIÓN: La interfaz ahora extiende un tipo válido.
interface ArticleCardProps extends PostFrontmatter {
  slug: string;
  locale: string;
}

export async function ArticleCard({
  slug,
  title,
  date,
  excerpt,
  featuredImage,
  tags,
  locale,
}: ArticleCardProps): Promise<React.ReactElement> {
  const t = await getTranslations("components.blog.ArticleCard");
  const baseContext = { component: "ArticleCard", title, locale };

  logger.trace(baseContext, "Renderizando card para el post.");

  const formattedDate = formatDate(date, locale);
  const href = `/blog/${slug}` as Pathname;

  return (
    <article
      aria-labelledby={`article-title-${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-brand-cta-red"
    >
      <Link href={href} className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={featuredImage}
            alt={t("imageAltText", { title })}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-brand-cta-red" />
            {/* CORRECCIÓN: `tags` ahora tiene el tipo `string[]`, por lo que `tag` es `string`. */}
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider text-brand-cta-red"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            id={`article-title-${slug}`}
            className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-brand-cta-red"
          >
            {title}
          </h3>
          <p className="flex-1 text-sm text-white/70">{excerpt}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
            <Calendar size={14} />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
// src/components/blog/ArticleCard.tsx
