<!-- .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de un artículo de blog.
 * @author L.I.A. Legacy
 * @version 7.1.0
 */
# Manifiesto Conceptual: Aparato `blog/[slug]/page.tsx` (Página de Artículo)

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador de servidor soberano** para la visualización de un único artículo de blog. Es un pilar fundamental de la estrategia de SEO de contenido y la experiencia del usuario. Sus responsabilidades son:

1.  **Obtención de Datos:** Es la Única Fuente de Verdad (SSoT) para invocar a `getPostBySlug` y obtener los datos completos (frontmatter + contenido) de un artículo específico para un `locale`. Redirige a la página 404 si el post no se encuentra.
2.  **Generación de Metadatos SEO:** Orquesta la llamada a `generateBlogPostingSchema` para crear datos estructurados `JSON-LD` de élite, maximizando la visibilidad en los motores de búsqueda y permitiendo "rich snippets".
3.  **Orquestación de Contenido y Layout:** Obtiene todas las traducciones necesarias para el layout (`Header`, `Footer`) y los componentes inyectados en el MDX (`CallToAction`). Delega el 100% de la lógica de presentación al componente puro `ArticleLayout`, pasándole todos los datos y componentes necesarios como `props`.
4.  **Observabilidad de Élite:** Utiliza `serverLogger` (con la API unificada `(context, message)`) para registrar cada etapa de su proceso (generación de static params, metadatos, carga de post, renderizado), asegurando una trazabilidad completa.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Orquestador de Datos / Ensamblador de UI".

```mermaid
graph TD
    A[Request a /blog/mi-articulo] --> B{`BlogArticlePage`};
    B -- "1. `unstable_setRequestLocale()`" --> C["Contexto de Locale"];
    B -- "2. `serverLogger.info()` (Inicio Orquestación)" --> D[Registro de Observabilidad];
    B -- "3. `getPostBySlug(slug, locale)`" --> E{Datos del Post};
    alt Post No Encontrado
        E -- No --> F["`serverLogger.warn()`"];
        F --> G["`notFound()`"];
    end
    E -- Sí --> H[Datos del Post];
    B -- "4. `getTranslations()`" --> I[Objeto de Traducciones];
    B -- "5. `formatDate()`" --> J[Fecha Formateada];
    B -- "6. `serverLogger.info()` (Fin Orquestación)" --> D;
    
    subgraph "Generación de Metadata"
        B -- "Llama a `generateMetadata()`" --> K{`generateMetadata`};
        K -- "Llama a `getPostBySlug()`" --> H;
        K -- "Llama a `getTranslations()`" --> I;
        K -- "Llama a `generateBlogPostingSchema()`" --> L[Schema JSON-LD];
        K -- "Utiliza `serverLogger.trace/warn()`" --> D;
        K --> M[Retorna `Metadata` con `JSON-LD` en `<head>`];
    end

    subgraph "Fase de Renderizado"
        B -- "Renderiza directamente" --> N["`<Header />` (Soberano)"];
        B -- "Renderiza directamente" --> O["`<Footer />` (Soberano)"];
        H & I & J -- "Pasa props a" --> P["`<ArticleLayout>`"];
        P -- "Renderiza el contenido MDX con" --> Q["Componentes Inyectados (ej. `<CallToAction />`)"];
    end

    P & Q --> R[HTML final de la página];
3. Contrato de API
Props de Entrada (BlogArticlePageProps):
params: { slug: string; locale: string; }: Proporcionado por el enrutador dinámico de Next.js.
Salida:
Un React.ReactElement que representa la página completa del artículo.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
SECCIÓN DE "ARTÍCULOS RELACIONADOS" INTELIGENTE: Implementar una función en src/lib/blog.ts (ej. getRelatedPosts(tags, currentSlug)) que este orquestador pueda llamar para obtener una lista de artículos relacionados (basados en etiquetas, categoría o relevancia) y pasarla al ArticleLayout. Esto mejoraría la retención de usuarios y el SEO interno.
OBTENCIÓN Y VISUALIZACIÓN DE DATOS DE AUTOR COMPLETOS: Expandir el frontmatter de los artículos para que author sea un authorId. Este orquestador podría entonces obtener los datos completos del autor (biografía, imagen de perfil, enlaces a redes sociales) de una fuente de datos centralizada (ej. content/authors.json o un CMS) y pasarlos al ArticleLayout para una visualización enriquecida.
BOTONES DE COMPARTIR SOCIAL DINÁMICOS: Calcular y pasar las URLs completas para compartir el artículo en redes sociales específicas (Twitter, Facebook, LinkedIn) como props al ArticleLayout. Esto facilitaría a los usuarios compartir el contenido y aumentaría la visibilidad.
INDICADOR DE TIEMPO DE LECTURA PRECISO: Implementar una función en src/lib/blog.ts para calcular el tiempo de lectura estimado del post.content. Este valor se pasaría como prop al ArticleLayout y se mostraría prominentemente en el encabezado del artículo para gestionar las expectativas del usuario.
NAVEGACIÓN "ANTERIOR/SIGUIENTE" CON PRE-RENDERIZADO: Obtener los slugs de los posts anterior y siguiente (desde src/lib/blog.ts) y pasarlos como props al ArticleLayout. Esto permitiría al layout renderizar enlaces de navegación al final del artículo y, potencialmente, precargar el siguiente artículo para una experiencia de usuario más fluida.
<!-- .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md -->