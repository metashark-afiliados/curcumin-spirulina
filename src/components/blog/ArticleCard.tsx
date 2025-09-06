// src/components/blog/ArticleCard.tsx
/**
 * @file ArticleCard.tsx
 * @description Aparato de UI soberano, semántico y de servidor. Renderiza la
 *              previsualización de un artículo de blog. Refactorizado para
 *              aceptar un logger transaccional explícitamente a través de
 *              props, asegurando su participación en la observabilidad.
 * @version 6.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/blog/ArticleCard.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import type pino from "pino";

import { type PostFrontmatter, formatDate } from "@/lib/blog";
import { Link, type Pathname } from "@/lib/navigation";

// La firma del componente se actualiza para incluir el logger.
interface ArticleCardProps extends PostFrontmatter {
  slug: string;
  locale: string;
  logger: pino.Logger;
}

export async function ArticleCard({
  slug,
  title,
  date,
  excerpt,
  featuredImage,
  tags,
  locale,
  logger, // El logger ahora es una dependencia explícita.
}: ArticleCardProps): Promise<React.ReactElement> {
  const t = await getTranslations("components.blog.ArticleCard");
  const baseContext = { component: "ArticleCard", title, locale };

  // La llamada a `getCorrelationId()` es eliminada. Se usa el logger inyectado.
  logger.trace(baseContext, "Renderizando card para el post.");

  const formattedDate = formatDate(logger, date, locale); // Propagación del logger a la utilidad.
  const href = `/blog/${slug}` as Pathname;

  return (
    <article
      aria-labelledby={`article-title-${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-brand-accent"
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
          <h3
            id={`article-title-${slug}`}
            className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-brand-accent"
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
