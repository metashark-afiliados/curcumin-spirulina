// .docs-espejo/lib/blog.ts.md
/**
 * @file .docs-espejo/lib/blog.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería del blog.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `lib/blog.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **Capa de Acceso a Datos (DAL) asíncrona y la SSoT de lógica para el dominio del blog**. Ha sido blindado para **ejecución exclusiva en servidor** (`server-only`). Su única responsabilidad es interactuar con el sistema de archivos (`content/blog/`) para leer, analizar (`parse`), validar y servir los datos de los artículos del blog de forma performante y resiliente.

Centraliza toda la lógica de manipulación de archivos MDX, incluyendo la validación del `frontmatter` con Zod. Actúa como una barrera de resiliencia que garantiza que solo los datos de posts válidos y bien formados lleguen a la capa de presentación.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo `server-only` que exporta funciones asíncronas para la obtención de datos.

```mermaid
graph TD
    A[Página de Blog (Server Component)] -- "Llama a `await getPostsData()`"] --> B["`getPostsData`"];
    subgraph "Processamento Paralelo"
        B -- "Usa `Promise.all` para ler, analisar e validar" --> C["Múltiples archivos .mdx"];
    end
    C -- OK --> D[Retorna `Promise<PostData[]>`];
    C -- Error --> E[Registra erro e filtra post];
    D --> A;
3. Contrato de API
getPostsData(locale): Promise<Array<PostFrontmatter & { slug }>>: Devuelve una promesa que resuelve a los metadatos validados de todos los posts.
getPostBySlug(slug, locale): Promise<PostData | null>: Devuelve una promesa que resuelve a los datos completos de un post específico, o null si no se encuentra o es inválido.
formatDate(dateInput, locale): string: Formatea una fecha para el locale especificado.
4. Zona de Melhorias Futuras
CACHEADO DE POSTS: Implementar una capa de cacheado (React.cache o Vercel KV) para getPostsData y getPostBySlug para evitar leer del sistema de archivos en cada petición, mejorando drásticamente el rendimiento en producción.
SOPORTE PARA MÚLTIPLES AUTORES: Refactorizar el frontmatter para que author sea un authorId que se relacione con una nueva fuente de datos de autores (ej. content/authors.json), permitiendo perfiles de autor más ricos.
CÁLCULO DE TIEMPO DE LECTURA: Crear una función calculateReadingTime(content) que se llame dentro de getPostBySlug y añada una propiedad readingTimeMinutes a PostData.
NAVEGACIÓN ENTRE POSTS: Crear una función getPrevNextPosts(slug) que devuelva los posts anterior y siguiente para añadir enlaces de navegación al final de cada artículo.
// .docs-espejo/lib/blog.ts.md