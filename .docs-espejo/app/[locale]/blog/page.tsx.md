<!-- .docs-espejo/app/[locale]/blog/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/blog/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de índice del blog.
 * @author L.I.A. Legacy
 * @version 3.3.0
 */
# Manifiesto Conceptual: Aparato `blog/page.tsx` (Página de Índice del Blog)

## 1. Rol Estratégico y Propósito

Este aparato es el **hub de contenido soberano** de la estrategia de SEO. Su propósito es servir como la página de índice para todos los artículos del blog, presentando una visión general atractiva y organizada.

Como Server Component, sus responsabilidades son:

1.  **Obtención de Datos Primarios:** Es la Única Fuente de Verdad (SSoT) para invocar a `getPostsData` y obtener la lista de todos los artículos de blog, filtrados por el `locale` actual.
2.  **Obtención de Contenido Propio de UI:** Obtiene las traducciones para su propio contenido (`mainTitle`, `subtitle`) de forma optimizada.
3.  **Ensamblaje de Layout:** Compone los aparatos de layout soberanos (`Header`, `Footer`) y mapea la lista de artículos para renderizar un componente `ArticleCard` para cada uno, envuelto en `AnimationWrapper`.
4.  **Generación de Metadatos SEO:** Provee metadatos (`title`, `description`) para la página de índice del blog.
5.  **Observabilidad de Élite:** Utiliza `serverLogger` (con la API unificada `(context, message)`) para registrar el flujo de su renderizado, la carga de datos y la generación de metadatos, asegurando una trazabilidad completa.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Orquestador de Datos / Ensamblador de Layout".

```mermaid
graph TD
    A[Request a /blog] --> B{`BlogIndexPage`};
    B -- "1. `unstable_setRequestLocale()`" --> C["Contexto de Locale"];
    B -- "2. `serverLogger.info()` (Inicio Ensamblaje)" --> D[Registro de Observabilidad];
    B -- "3. `getTranslations('pages.blog')`" --> E[Traducciones Propias];
    B -- "4. `getPostsData(locale)`" --> F[Array de Posts];
    B -- "5. `serverLogger.trace()` (Posts Cargados)" --> D;

    subgraph "Generación de Metadata"
        B -- "Llama a `generateMetadata()`" --> G{`generateMetadata`};
        G -- "Llama a `getTranslations()`" --> E;
        G -- "Utiliza `serverLogger.trace()`" --> D;
        G --> H[Retorna `Metadata` en `<head>`];
    end

    subgraph "Fase de Renderizado"
        B -- "Renderiza directamente" --> I["`<Header />` (Soberano)"];
        B -- "Renderiza directamente" --> J["`<Footer />` (Soberano)"];
        E --> K["`<AnimationWrapper>` (Título, Subtítulo)"];
        F -- "Es mapeado y cada post renderiza" --> L["`<AnimationWrapper>` (Múltiples `<ArticleCard />`)"];
    end

    I & J & K & L --> M[HTML final de la página];
Esta arquitectura elimina el prop drilling y optimiza la obtención de datos, adhiriéndose a los principios de soberanía y observabilidad.
3. Contrato de API
Entrada (Props):
params: { locale: string; }: Proporcionado por el enrutador dinámico.
Salida:
Un React.ReactElement que representa la página de índice del blog.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
PAGINACIÓN AVANZADA Y OPTIMIZADA: La mejora más crítica. Implementar paginación (utilizando parámetros de búsqueda en la URL o un hook useSearchParams) para evitar cargar todos los posts a la vez. Esto mejoraría el rendimiento para blogs con muchos artículos y la experiencia del usuario.
FILTROS Y ORDENAMIENTO POR CATEGORÍA/TAG: Añadir una UI de filtrado y ordenamiento que permita a los usuarios ver artículos por categoría o tag (ej. categoría: 'bienestar', orden: 'más reciente'). Esto se integraría con la obtención de datos en getPostsData.
ARTÍCULO DESTACADO (FEATURED POST) CONFIGURABLE: Permitir que un artículo sea marcado como "destacado" en su frontmatter. Este orquestador podría entonces renderizar ese artículo con un layout visualmente diferente y más prominente en la parte superior de la página.
BÚSQUEDA INTERNA FUZZY: Implementar una funcionalidad de búsqueda interna para que los usuarios encuentren artículos por palabras clave. Esto requeriría una lógica de búsqueda en src/lib/blog.ts (quizás con una biblioteca como fuse.js para fuzzy matching) y una UI de búsqueda en esta página.
GENERACIÓN DE RSS FEED: Añadir una ruta dinámica (/rss.xml/route.ts) que genere un feed RSS de los artículos del blog, permitiendo a los usuarios suscribirse al contenido y mejorando la distribución.
<!-- .docs-espejo/app/[locale]/blog/page.tsx.md -->