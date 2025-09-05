// src/lib/blog.ts
/**
 * @file blog.ts
 * @description Módulo de Acceso a Datos (DAL) asíncrono y SSoT de lógica para
 *              el contenido del blog. Blindado para ejecución exclusiva en servidor.
 *              Utiliza Zod para validación, garantizando la integridad de los datos,
 *              y proporciona helpers con observabilidad y resiliencia de élite.
 * @version 6.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/blog.ts.md
 */
import "server-only";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { serverLogger } from "@/lib/logger";

const frontmatterSchema = z.object({
  title: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato AAAA-MM-DD"),
  excerpt: z.string(),
  author: z.string(),
  featuredImage: z.string(),
  tags: z.array(z.string()),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface PostData extends PostFrontmatter {
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

/**
 * @async
 * @description Obtém e valida os metadados de todos os posts para um locale.
 *              Filtra silenciosamente posts com frontmatter inválido.
 */
export async function getPostsData(
  locale: string
): Promise<Array<PostFrontmatter & { slug: string }>> {
  const localeDirectory = path.join(postsDirectory, locale);
  serverLogger.info(
    { locale },
    "[BlogDAL] Iniciando obtenção de metadados de posts."
  );

  try {
    const fileNames = await fs.readdir(localeDirectory);
    const postPromises = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(localeDirectory, fileName);
        try {
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data } = matter(fileContents);
          const validation = frontmatterSchema.safeParse(data);

          if (!validation.success) {
            serverLogger.warn(
              { slug, locale, error: validation.error.flatten() },
              `[BlogDAL] Frontmatter inválido. O post será ignorado.`
            );
            return null;
          }
          return { slug, ...validation.data };
        } catch (readError) {
          serverLogger.error(
            { err: readError, slug, locale },
            `[BlogDAL] Falha ao ler ou analisar o arquivo do post.`
          );
          return null;
        }
      });

    const allPostsData = (await Promise.all(postPromises)).filter(
      (post): post is PostFrontmatter & { slug: string } => post !== null
    );

    const sortedPosts = allPostsData.sort((a, b) =>
      new Date(a.date) < new Date(b.date) ? 1 : -1
    );

    serverLogger.info(
      { locale, count: sortedPosts.length },
      "[BlogDAL] Metadados de posts obtidos e validados com sucesso."
    );
    return sortedPosts;
  } catch (error) {
    serverLogger.error(
      { err: error, locale },
      `[BlogDAL] Erro crítico ao ler o diretório do blog.`
    );
    return [];
  }
}

/**
 * @async
 * @description Obtém e valida os dados completos de um único post.
 */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);
  serverLogger.info(
    { slug, locale },
    "[BlogDAL] Obtendo dados de post individual."
  );

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const validation = frontmatterSchema.safeParse(data);

    if (!validation.success) {
      serverLogger.error(
        { slug, locale, error: validation.error.flatten() },
        `[BlogDAL] Frontmatter inválido para post individual.`
      );
      return null;
    }

    serverLogger.info({ slug, locale }, `[BlogDAL] Post obtido com sucesso.`);
    return { slug, content, ...validation.data };
  } catch (error) {
    serverLogger.error(
      { err: error, slug, locale, path: fullPath },
      `[BlogDAL] Não foi possível encontrar ou ler o arquivo do post.`
    );
    return null;
  }
}

/**
 * @description Formata uma data para um formato legível, respeitando o locale.
 */
export function formatDate(dateInput: string | Date, locale: string): string {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) throw new Error("Data de entrada inválida.");
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    serverLogger.error(
      { err: error, dateInput, locale },
      `[BlogHelper:formatDate] Falha ao formatar a data.`
    );
    return "";
  }
}
// src/lib/blog.ts
