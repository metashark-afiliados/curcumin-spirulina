// src/lib/blog.ts
/**
 * @file blog.ts
 * @description Módulo de negocio y SSoT para toda la lógica del blog.
 *              Encapsula la lectura de archivos, el parsing de frontmatter y
 *              las utilidades de formato de datos.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/lib/blog.ts.md
 */
import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { logger } from "@/lib/logger";

/**
 * @public
 * @interface PostFrontmatter
 * @description Contrato de datos para los metadatos (frontmatter) de un post
 *              en formato MDX.
 */
export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  featuredImage: string;
  tags: string[];
}

/**
 * @public
 * @interface PostData
 * @description Contrato de datos para un post completo, incluyendo el slug y
 *              el contenido en formato string.
 */
export interface PostData extends PostFrontmatter {
  slug: string;
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content", "blog");

/**
 * @public
 * @async
 * @function getAllPosts
 * @description Obtiene todos los posts para un locale específico.
 * @param {string} locale - El locale para el cual obtener los posts.
 * @returns {Promise<PostData[]>} Un array de objetos PostData.
 */
export async function getAllPosts(locale: string): Promise<PostData[]> {
  const localeDirectory = path.join(contentDirectory, locale);
  const context = { component: "getAllPosts", locale };

  try {
    const filenames = await fs.readdir(localeDirectory);
    const mdxFiles = filenames.filter((file) => file.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(localeDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug: filename.replace(/\.mdx$/, ""),
          ...(data as PostFrontmatter),
          content,
        };
      })
    );

    // Ordenar posts por fecha, del más reciente al más antiguo.
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    logger.error(
      { err: error, ...context },
      `No se pudo leer el directorio de posts o procesar los archivos. Es posible que el directorio para el locale '${locale}' no exista.`
    );
    return []; // Devolver un array vacío en caso de error para no romper la UI.
  }
}

/**
 * @public
 * @function formatDate
 * @description Formatea una cadena de fecha a un formato localizado.
 * @param {string} dateString - La fecha en formato YYYY-MM-DD.
 * @param {string} locale - El locale a utilizar para el formato.
 * @returns {string} La fecha formateada.
 */
export function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}
// src/lib/blog.ts
