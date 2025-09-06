// src/lib/blog.ts
/**
 * @file src/lib/blog.ts
 * @description Módulo de Acceso a Datos (DAL) del blog. Nivelado a la versión
 *              final de la arquitectura de Inyección de Dependencias Explícita.
 *              Cada función recibe la instancia del logger que debe utilizar,
 *              y todas las llamadas de logging internas se adhieren estrictamente
 *              al contrato `ILogger`.
 * @version 10.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/blog.ts.md
 */
import "server-only";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type pino from "pino";

const frontmatterSchema = z.object({
  title: z.string().min(1, "El título no puede estar vacío."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe ser AAAA-MM-DD"),
  excerpt: z.string().min(1, "El extracto no puede estar vacío."),
  author: z.string().min(1, "El autor no puede estar vacío."),
  featuredImage: z.string().min(1, "La imagen destacada no puede estar vacía."),
  tags: z.array(z.string().min(1)).min(1, "Debe haber al menos una etiqueta."),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;
export interface PostData extends PostFrontmatter {
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export async function getPostsData(
  logger: pino.Logger,
  locale: string
): Promise<Array<PostFrontmatter & { slug: string }>> {
  const baseContext = { component: "BlogDAL", action: "getPostsData", locale };
  logger.info(
    baseContext,
    `Iniciando obtención de posts para locale: ${locale}.`
  );

  const localePostsDirectory = path.join(postsDirectory, locale);
  const filenames = await fs.readdir(localePostsDirectory);
  const mdxFiles = filenames.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const fullPath = path.join(localePostsDirectory, filename);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);
      const validation = frontmatterSchema.safeParse(data);

      if (!validation.success) {
        logger.warn(
          { ...baseContext, file: filename, error: validation.error.flatten() },
          `Frontmatter inválido en el archivo, será omitido.`
        );
        return null;
      }
      return { slug, ...validation.data };
    })
  );

  const validPosts = posts.filter(
    (post): post is PostFrontmatter & { slug: string } => post !== null
  );

  validPosts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  logger.info(
    { ...baseContext, count: validPosts.length },
    `Obtención de posts completada.`
  );
  return validPosts;
}

export async function getPostBySlug(
  logger: pino.Logger,
  slug: string,
  locale: string
): Promise<PostData | null> {
  const baseContext = {
    component: "BlogDAL",
    action: "getPostBySlug",
    slug,
    locale,
  };
  logger.info(baseContext, `Iniciando obtención de post por slug '${slug}'.`);

  const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const validation = frontmatterSchema.safeParse(data);

    if (!validation.success) {
      logger.error(
        { ...baseContext, path: fullPath, error: validation.error.flatten() },
        `Frontmatter inválido para el post.`
      );
      return null;
    }

    logger.info(
      { ...baseContext, path: fullPath },
      `Post encontrado y validado.`
    );
    return { slug, content, ...validation.data };
  } catch (error) {
    logger.warn(
      { ...baseContext, path: fullPath, err: error },
      `Archivo de post no encontrado o error de lectura.`
    );
    return null;
  }
}

export function formatDate(
  logger: pino.Logger,
  dateInput: string | Date,
  locale: string
): string {
  // CORRECCIÓN: La llamada al logger ahora sigue el contrato ILogger.
  logger.trace(
    { component: "BlogDAL", action: "formatDate", dateInput, locale },
    `Formateando fecha.`
  );
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}
// src/lib/blog.ts
