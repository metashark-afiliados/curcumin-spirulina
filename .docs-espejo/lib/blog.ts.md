<!-- .docs-espejo/lib/blog.ts.md -->
/**
 * @file .docs-espejo/lib/blog.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería del blog.
 * @author L.I.A. Legacy
 * @version 7.0.0
 */
# Manifiesto Conceptual: Aparato `lib/blog.ts` (Data Access Layer - DAL)

## 1. Rol Estratégico y Propósito

Este aparato es la **Capa de Acceso a Datos (DAL) asíncrona y la Única Fuente de Verdad (SSoT) de lógica para el dominio del blog**. Ha sido blindado para **ejecución exclusiva en servidor** (`server-only`). Su única responsabilidad es interactuar con el sistema de archivos (`content/blog/`) para leer, analizar (`parse`), validar (`Zod`) y servir los datos de los artículos del blog de forma performante y resiliente.

Centraliza toda la lógica de manipulación de archivos MDX, incluyendo la validación del `frontmatter` con Zod. Actúa como una barrera de resiliencia que garantiza que solo los datos de posts válidos y bien formados lleguen a la capa de presentación. La integración con `serverLogger` proporciona una observabilidad completa de todas las operaciones de lectura, parseo y validación, crucial para la depuración y el monitoreo de contenido.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo `server-only` que exporta funciones asíncronas para la obtención de datos.

```mermaid
graph TD
    A[Página de Blog (Server Component)] -- "1. Llama a `await getPostsData(locale)`" --> B["`getPostsData`"];
    B -- "2. `serverLogger.info()` (Inicio)" --> C[Registro de Observabilidad];
    B -- "3. `fs.readdir(localePostsDirectory)`" --> D{Archivos MDX};
    D -- Error Lectura Dir --> E["`serverLogger.error()` y Retorna `[]`"];
    D -- Éxito --> F[Nombres de Archivos];

    subgraph "Procesamiento Paralelo de Archivos"
        F -- "4. `Promise.all(fileNames.map(async...))`" --> G{Archivo MDX Individual};
        G -- "5. `fs.readFile()`" --> H{Contenido del Archivo};
        H -- Error Lectura Archivo --> I["`serverLogger.error()` y Retorna `null`"];
        H -- Éxito --> J[Contenido];
        J -- "6. `matter(fileContents)`" --> K{Data (frontmatter) & Content};
        K -- "7. `frontmatterSchema.safeParse(data)`" --> L{¿Frontmatter Válido?};
        L -- Sí --> M[Retorna `{ slug, ...data }`];
        L -- No --> N["`serverLogger.warn()` (Errores Zod) y Retorna `null`"];
    end

    G & I & M & N --> O[Array `allPostsData` (filtrado)];
    O -- "8. `serverLogger.info()` (Fin)" --> C;
    O --> P[Retorna `Array<PostFrontmatter & { slug }>` (ordenado)];
    P --> A;

    A -- "1'. Llama a `await getPostBySlug(slug, locale)`" --> Q["`getPostBySlug`"];
    Q -- "2'. `serverLogger.info()` (Inicio)" --> C;
    Q -- "3'. `fs.readFile(fullPath)`" --> R{Contenido del Archivo};
    R -- Error Lectura Archivo --> S["`serverLogger.warn()` y Retorna `null`"];
    R -- Éxito --> T[Contenido];
    T -- "4'. `matter(fileContents)`" --> U{Data (frontmatter) & Content};
    U -- "5'. `frontmatterSchema.safeParse(data)`" --> V{¿Frontmatter Válido?};
    V -- Sí --> W[Retorna `{ slug, content, ...data }`];
    V -- No --> X["`serverLogger.error()` (Errores Zod) y Retorna `null`"];
    W & X --> Y[Retorna `PostData` o `null`];
    Y --> A;
3. Contrato de API
getPostsData(locale: string): Promise<Array<PostFrontmatter & { slug: string }>>:
Propósito: Recupera los metadatos (frontmatter) de todos los posts del blog para un locale dado, ordenados por fecha. Incluye el slug.
Retorno: Una promesa que resuelve a un array de objetos PostFrontmatter extendidos con slug.
getPostBySlug(slug: string, locale: string): Promise<PostData | null>:
Propósito: Recupera los datos completos (frontmatter y contenido MDX) de un post específico por su slug y locale.
Retorno: Una promesa que resuelve a un objeto PostData o null si el post no se encuentra o es inválido.
formatDate(dateInput: string | Date, locale: string): string:
Propósito: Formatea una fecha a una cadena localizada, utilizando el Intl.DateTimeFormat nativo.
Retorno: La fecha formateada.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
CACHEO DE POSTS (React.cache o Vercel KV): Implementar una capa de cacheo para getPostsData y getPostBySlug (ej., utilizando React.cache si los datos no cambian entre builds o Vercel KV para invalidación granular). Esto evitaría leer del sistema de archivos en cada petición, mejorando drásticamente el rendimiento en producción para Server Components.
SOPORTE PARA MÚLTIPLES AUTORES (SSoT Externa): Refactorizar el frontmatterSchema para que author sea un authorId que se relacione con una nueva fuente de datos de autores (ej., un archivo content/authors.json o un Headless CMS). Esto permitiría perfiles de autor más ricos y detallados.
CÁLCULO DE TIEMPO DE LECTURA PRECISO: Crear una función calculateReadingTime(content: string) que se llame dentro de getPostBySlug y añada una propiedad readingTimeMinutes: number a PostData. Esta métrica es valiosa para la UX del blog.
NAVEGACIÓN ENTRE POSTS INTELIGENTE: Crear una función getPrevNextPosts(slug: string, locale: string) que, para un post dado, devuelva los posts anterior y siguiente ({ prev: PostFrontmatter | null, next: PostFrontmatter | null }). Esto se utilizaría para añadir enlaces de navegación al final de cada artículo, mejorando el flujo de lectura.
GENERACIÓN DE SITEMAPS HTML Y RSS: Además del sitemap.xml, implementar funciones para generar un sitemap HTML (para la navegación de usuario) y un RSS Feed (para suscripciones), ambos consumiendo los datos de getPostsData.
OPTIMIZACIÓN DE IMÁGENES DENTRO DE MDX: Integrar una solución para procesar y optimizar automáticamente las imágenes referenciadas dentro del contenido MDX (post.content), similar a cómo next/image maneja las imágenes, mejorando el rendimiento de carga del artículo.
<!-- .docs-espejo/lib/blog.ts.md -->