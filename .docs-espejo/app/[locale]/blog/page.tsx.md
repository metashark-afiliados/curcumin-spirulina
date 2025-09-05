// .docs-espejo/app/[locale]/blog/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/blog/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de índice del blog.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `blog/page.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es el **hub de contenido soberano** de la estrategia de SEO. Su propósito es servir como la página de índice para todos los artículos del blog.

Como Server Component, sus responsabilidades son:

1.  **Obtención de Datos Primarios:** Es la SSoT para invocar a `getPostsData` y obtener la lista de todos los artículos de blog.
2.  **Obtención de Contenido Propio:** Obtiene las traducciones para su propio contenido (`mainTitle`, `subtitle`) de forma optimizada.
3.  **Ensamblaje de Layout:** Compone los aparatos de layout soberanos (`Header`, `Footer`) y mapea la lista de artículos para renderizar un componente `ArticleCard` para cada uno.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Orquestador de Datos / Ensamblador de Layout".

```mermaid
graph TD
    A[Request a /blog] --> B{`BlogIndexPage`};
    B --> C["`getPostsData(locale)`"];
    C --> D[Array de Posts];
    B --> E["`getTranslations('pages.blog')`"];
    E --> F[Traducciones Propias];

    subgraph "Fase de Renderizado"
        B -- "Renderiza directamente" --> G["`<Header />` (Soberano)"];
        B -- "Renderiza directamente" --> H["`<Footer />` (Soberano)"];
        D -- "Es mapeado y renderiza" --> I["Múltiples `<ArticleCard />`"];
    end

    G & H & I --> J[HTML final de la página];
Esta arquitectura elimina el prop drilling y optimiza la obtención de datos, adhiriéndose a los principios de soberanía.
3. Contrato de API
Entrada (Props):
params: { locale: string; }: Proporcionado por el enrutador dinámico.
Salida: Un React.ReactElement que representa la página de índice del blog.
4. Zona de Melhorias Futuras
PAGINACIÓN: La mejora más crítica. Implementar paginación para evitar cargar todos los posts a la vez.
FILTROS POR CATEGORÍA/TAG: Añadir una UI de filtrado que permita a los usuarios ver artículos de una categoría específica.
ARTÍCULO DESTACADO (FEATURED POST): Permitir que un artículo sea marcado como "destacado" en el frontmatter y renderizarlo con un layout especial.
BÚSQUEDA INTERNA: Implementar una funcionalidad de búsqueda para que los usuarios encuentren artículos por palabras clave.
// .docs-espejo/app/[locale]/blog/page.tsx.md