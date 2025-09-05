// src/lib/blog.ts
/**
 * @file blog.ts
 * @description Módulo de Acceso a Datos (DAL) asíncrono y SSoT de lógica para
 *              el contenido del blog. Blindado para ejecución exclusiva en servidor.
 *              Utiliza Zod para validación, garantizando la integridad de los datos.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/blog.ts.md
 */
import "server-only";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { serverLogger } from "@/lib/server-logger"; // <-- CORREÇÃO: Importação corrigida.

// ... (resto do código do blog.ts inalterado)
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

export async function getPostsData(
  locale: string
): Promise<Array<PostFrontmatter & { slug: string }>> {
  // ...
  return []; // Lógica omitida para brevidade
}

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<PostData | null> {
  // ...
  return null; // Lógica omitida para brevidade
}

export function formatDate(dateInput: string | Date, locale: string): string {
  // ...
  return ""; // Lógica omitida para brevidade
}
// src/lib/blog.ts
