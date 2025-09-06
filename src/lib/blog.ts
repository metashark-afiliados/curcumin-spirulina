// src/lib/blog.ts
/**
 * @file src/lib/blog.ts
 * @description Módulo de Acceso a Datos (DAL) asíncrono y Única Fuente de Verdad (SSoT) de lógica para
 *              el contenido del blog. Blindado para ejecución exclusiva en servidor.
 *              Utiliza Zod para la validación del `frontmatter`, garantizando la integridad de los datos,
 *              y `serverLogger` para una observabilidad completa de las operaciones de lectura y procesamiento.
 * @version 7.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/blog.ts.md
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import "server-only"; // Asegura que este módulo solo se ejecute en el servidor.

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { serverLogger } from "@/lib/logger"; // SSoT del logger de servidor
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @private
 * @constant frontmatterSchema
 * @description Schema Zod para validar la estructura y tipos del `frontmatter`
 *              de los archivos MDX del blog. Esta es la SSoT para los metadatos de los posts.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1, "El título del post no puede estar vacío."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
  excerpt: z.string().min(1, "El extracto del post no puede estar vacío."),
  author: z.string().min(1, "El autor del post no puede estar vacío."),
  featuredImage: z.string().min(1, "La imagen destacada no puede estar vacía."),
  tags: z.array(z.string().min(1)).min(1, "Debe haber al menos una etiqueta."),
});

/**
 * @public
 * @type PostFrontmatter
 * @description Tipo de TypeScript inferido del `frontmatterSchema`.
 *              Representa los metadatos de un post de blog.
 */
export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

/**
 * @public
 * @interface PostData
 * @description Interfaz que extiende `PostFrontmatter` para incluir el slug
 *              y el contenido completo del post.
 */
export interface PostData extends PostFrontmatter {
  slug: string;
  content: string;
}

/**
 * @private
 * @constant postsDirectory
 * @description Ruta absoluta al directorio donde se almacenan los posts del blog.
 */
const postsDirectory = path.join(process.cwd(), "content/blog");

/**
 * @public
 * @async
 * @function getPostsData
 * @description Obtiene los metadatos (`frontmatter`) de todos los posts del blog
 *              para un `locale` específico. Lee el sistema de archivos, parsea el
 *              `frontmatter` y lo valida con Zod. Los posts con errores de validación
 *              o lectura se omiten y se registran como advertencias.
 * @param {string} locale - El locale para el cual obtener los posts (ej. "it-IT").
 * @returns {Promise<Array<PostFrontmatter & { slug: string }>>} Una promesa que resuelve
 *          a un array de metadatos de posts válidos, incluyendo su slug.
 */
export async function getPostsData(
  locale: string
): Promise<Array<PostFrontmatter & { slug: string }>> {
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    { component: "BlogDAL", action: "getPostsData", locale } as LogContext, // Aserción de tipo
    `[BlogDAL] Iniciando obtención de datos de posts para el locale: ${locale}.`
  );

  const localePostsDirectory = path.join(postsDirectory, locale);
  let fileNames: string[];
  try {
    fileNames = await fs.readdir(localePostsDirectory);
    serverLogger.trace(
      {
        component: "BlogDAL",
        action: "readdir",
        locale,
        fileCount: fileNames.length,
      } as LogContext, // Aserción de tipo
      `[BlogDAL] Encontrados ${fileNames.length} archivos en '${localePostsDirectory}'.`
    );
  } catch (error) {
    // USO DE SERVERLOGGER: (context, message)
    serverLogger.error(
      {
        component: "BlogDAL",
        action: "readdir",
        locale,
        directory: localePostsDirectory,
        err: error,
      } as LogContext, // Aserción de tipo
      `[BlogDAL] Error al leer el directorio de posts para el locale '${locale}'.`
    );
    return []; // Si el directorio no existe o hay un error, devuelve un array vacío.
  }

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      if (!fileName.endsWith(".mdx")) return null; // Ignorar archivos que no son MDX.

      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(localePostsDirectory, fileName);
      let fileContents: string;
      try {
        fileContents = await fs.readFile(fullPath, "utf8");
      } catch (error) {
        serverLogger.error(
          {
            component: "BlogDAL",
            action: "readFile",
            slug,
            locale,
            path: fullPath,
            err: error,
          } as LogContext, // Aserción de tipo
          `[BlogDAL] Error al leer el archivo del post '${slug}' para el locale '${locale}'.`
        );
        return null;
      }

      const { data } = matter(fileContents);
      const validation = frontmatterSchema.safeParse(data);

      if (!validation.success) {
        serverLogger.warn(
          {
            component: "BlogDAL",
            action: "validateFrontmatter",
            slug,
            locale,
            errors: validation.error.flatten(),
            rawData: data,
          } as LogContext, // Aserción de tipo
          `[BlogDAL] Fallo en la validación del frontmatter del post '${slug}' para el locale '${locale}'. Se omitirá.`
        );
        return null;
      }

      return {
        slug,
        ...validation.data,
      };
    })
  );

  const validPosts = allPostsData.filter(Boolean) as Array<
    PostFrontmatter & { slug: string }
  >;

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    {
      component: "BlogDAL",
      action: "getPostsData",
      locale,
      validPostsCount: validPosts.length,
    } as LogContext, // Aserción de tipo
    `[BlogDAL] Obtención de datos de posts para '${locale}' completada. ${validPosts.length} posts válidos.`
  );

  return validPosts.sort((a, b) => (a.date < b.date ? 1 : -1)); // Ordenar por fecha más reciente.
}

/**
 * @public
 * @async
 * @function getPostBySlug
 * @description Obtiene los datos completos (frontmatter y contenido MDX) de un post
 *              específico por su slug y locale.
 * @param {string} slug - El slug del post a buscar.
 * @param {string} locale - El locale del post.
 * @returns {Promise<PostData | null>} Una promesa que resuelve a los datos completos del post,
 *          o `null` si el post no se encuentra o es inválido.
 */
export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostData | null> {
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    {
      component: "BlogDAL",
      action: "getPostBySlug",
      slug,
      locale,
    } as LogContext, // Aserción de tipo
    `[BlogDAL] Iniciando obtención de post por slug '${slug}' para el locale: ${locale}.`
  );

  const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);
  let fileContents: string;

  try {
    fileContents = await fs.readFile(fullPath, "utf8");
  } catch (error) {
    serverLogger.warn(
      {
        component: "BlogDAL",
        action: "readFile",
        slug,
        locale,
        path: fullPath,
        err: error,
      } as LogContext, // Aserción de tipo
      `[BlogDAL] Archivo de post '${slug}' no encontrado o inaccesible para el locale '${locale}'.`
    );
    return null; // El post no existe o no se puede leer.
  }

  const { data, content } = matter(fileContents);
  const validation = frontmatterSchema.safeParse(data);

  if (!validation.success) {
    serverLogger.error(
      {
        component: "BlogDAL",
        action: "validateFrontmatter",
        slug,
        locale,
        errors: validation.error.flatten(),
        rawData: data,
      } as LogContext, // Aserción de tipo
      `[BlogDAL] Fallo crítico en la validación del frontmatter del post '${slug}' para el locale '${locale}'.`
    );
    return null; // El frontmatter es inválido.
  }

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.info(
    {
      component: "BlogDAL",
      action: "getPostBySlug",
      slug,
      locale,
    } as LogContext, // Aserción de tipo
    `[BlogDAL] Post '${slug}' obtenido y validado con éxito para el locale '${locale}'.`
  );

  return {
    slug,
    content,
    ...validation.data,
  };
}

/**
 * @public
 * @function formatDate
 * @description Formatea una fecha (`string` o `Date`) a una cadena localizada.
 * @param {string | Date} dateInput - La fecha a formatear.
 * @param {string} locale - El locale a utilizar para el formato.
 * @returns {string} La fecha formateada como cadena.
 */
export function formatDate(dateInput: string | Date, locale: string): string {
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    {
      component: "BlogDAL",
      action: "formatDate",
      dateInput,
      locale,
    } as LogContext, // Aserción de tipo
    `[BlogDAL] Formateando fecha para locale: ${locale}.`
  );
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}
// src/lib/blog.ts
