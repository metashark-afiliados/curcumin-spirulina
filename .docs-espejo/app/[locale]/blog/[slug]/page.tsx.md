<!-- .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de un artículo de blog.
 * @author L.I.A. Legacy
 * @version 9.0.0
 */
# Manifiesto Conceptual: Aparato `blog/[slug]/page.tsx` (Página de Artículo)

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador de servidor soberano** para la visualización de un único artículo de blog. Sus responsabilidades son obtener los datos, orquestar los metadatos SEO y delegar el renderizado de la UI, todo dentro de un contexto de **observabilidad transaccional**.

La implementación de `unstable_setRequestLocale(locale)` y `withCorrelationId` garantiza la **Generación de Sitio Estático (SSG)** de estas páginas de forma robusta y trazable.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Orquestador de Datos / Ensamblador de UI", ejecutado dentro de un contexto de logging transaccional.

```mermaid
graph TD
    A[Proceso de Build] -- "Invoca `BlogArticlePage`" --> B["`withCorrelationId` (HOC)"];
    B -- "Establece contexto de logging" --> C{Lógica de Renderizado};
    subgraph "Lógica de Renderizado (con `correlationId`)"
        C -- "1. `getPostBySlug()`" --> D[Datos y Contenido del Post];
        C -- "2. `getTranslations()`" --> E[Contenido i18n];
        D & E -- "3. Renderiza..." --> F["`<ArticleLayout />`"];
    end
    F --> G[HTML final pre-renderizado];
3. Contrato de API
Props de Entrada: params: { slug: string; locale: string; }.
Salida: Un React.ReactElement que representa la página completa del artículo.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Deduplicación de Carga de Datos (React.cache): Envolver la llamada a getPostBySlug con React.cache para evitar lecturas de archivo redundantes entre generateMetadata y el componente de página, optimizando el rendimiento del build.
Sección de "Artículos Relacionados" Estática: Implementar una función getRelatedPosts en lib/blog.ts que se llame durante el build para generar una lista estática de artículos relacionados y pasarla como props a ArticleLayout.
Datos de Autor Enriquecidos: Expandir el frontmatter para que author sea un authorId. Este orquestador obtendría los datos completos del autor (biografía, imagen) de una fuente de datos centralizada (ej. content/authors.json) durante el build.
Navegación "Anterior/Siguiente" Estática: Obtener los slugs de los posts anterior y siguiente durante el build y pasarlos como props para renderizar los enlaces de navegación al final del artículo.
Generación de Tabla de Contenidos: Crear una utilidad que analice los encabezados (h2, h3) del post.content durante el build y genere una tabla de contenidos estática para el artículo.
<!-- .docs-espejo/app/[locale]/blog/[slug]/page.tsx.md -->```