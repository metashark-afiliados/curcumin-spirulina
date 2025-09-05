// .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de un artículo de blog.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `blog/[slug]/page.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador de servidor** para la visualización de un único artículo de blog. Es un pilar fundamental de la estrategia de SEO de contenido. Sus responsabilidades son:

1.  **Obtención de Datos:** Es la SSoT para invocar a `getPostBySlug` y obtener los datos completos (frontmatter + contenido) de un artículo específico para un `locale`.
2.  **Generación de Metadatos SEO:** Orquesta la llamada a `generateBlogPostingSchema` para crear datos estructurados `JSON-LD` de élite, maximizando la visibilidad en los motores de búsqueda.
3.  **Orquestación de Contenido:** Obtiene todas las traducciones necesarias para el layout (`Header`, `Footer`) y los componentes inyectados en el MDX (`CallToAction`).
4.  **Ensamblaje de UI:** Delega el 100% de la lógica de presentación al componente puro `ArticleLayout`, pasándole todos los datos y componentes necesarios como `props`.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Orquestador de Datos / Ensamblador de UI".

```mermaid
graph TD
    A[Request a /blog/mi-articulo] --> B{`BlogArticlePage`};
    B --> C["`getPostBySlug(slug, locale)`"];
    C --> D[Datos del Post];
    B --> E["`getTranslations()`"];
    E --> F[Objeto de Traducciones];

    subgraph "Fase de Renderizado"
        D & F -- "Pasa props a" --> G["`<ArticleLayout>`"];
        G -- "Renderiza el contenido MDX con" --> H["Componentes Inyectados (ej. `<CallToAction />`)"];
    end

    G & H --> I[HTML final de la página];
3. Contrato de API
Props de Entrada (BlogArticlePageProps):
params: { slug: string; locale: string; }: Proporcionado por el enrutador dinámico de Next.js.
Salida: Un React.ReactElement que representa la página completa del artículo.
4. Zona de Melhorias Futuras
SECCIÓN DE "ARTÍCULOS RELACIONADOS": Implementar una función en lib/blog.ts (getRelatedPosts(tags, currentSlug)) que este orquestador pueda llamar para obtener y pasar una lista de artículos relacionados al ArticleLayout.
OBTENCIÓN DE DATOS DE AUTOR: Expandir el frontmatter para que author sea un authorId. Este orquestador podría entonces obtener los datos completos del autor (bio, redes sociales) de un archivo content/authors.json y pasarlos a la UI.
BOTONES DE COMPARTIR SOCIAL: Calcular y pasar las URLs completas para compartir en redes sociales (Twitter, Facebook, LinkedIn) como props al ArticleLayout.
INDICADOR DE TIEMPO DE LECTURA: Implementar una función para calcular el tiempo de lectura del post.content y pasarlo como prop.
NAVEGACIÓN "ANTERIOR/SIGUIENTE": Obtener los slugs de los posts anterior y siguiente y pasarlos como props para que ArticleLayout pueda renderizar enlaces de navegación al final del artículo.
SOPORTE PARA COMENTARIOS: Integrar un sistema de comentarios (ej. Disqus, Commento) y pasar la configuración necesaria como props.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
PRUEBAS DE INTEGRACIÓN: Crear un arnés de pruebas que renderice esta página con un post simulado y verifique que todos los datos (título, autor, contenido) se muestran correctamente.
MANEJO DE ERRORES MÁS ROBUSTO: Si getPostBySlug falla, en lugar de un 404, se podría mostrar una página de error 500 más informativa.
PRECARGA DE RECURSOS CRÍTICOS: Utilizar rel="preload" para las fuentes o imágenes más importantes del artículo para optimizar aún más el LCP.
// .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md