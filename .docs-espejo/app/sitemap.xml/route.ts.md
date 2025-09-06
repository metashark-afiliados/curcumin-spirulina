<!-- .docs-espejo/app/sitemap.xml/route.ts.md -->
/**
 * @file .docs-espejo/app/sitemap.xml/route.ts.md
 * @description Documento Espejo y SSoT conceptual para el generador de sitemap.xml.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `sitemap.xml/route.ts` (Route Handler)

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar del SEO técnico multilingüe**. Su única responsabilidad es generar un archivo `sitemap.xml` de élite que se prerrenderiza estáticamente durante el build (`force-static`).

Implementa la mejor práctica de SEO para sitios multilingües, utilizando la etiqueta `<xhtml:link rel="alternate" />`. Su observabilidad está garantizada al envolver la lógica del handler `GET` con `withCorrelationId`, lo que activa el logging transaccional.

## 2. Arquitectura y Flujo de Ejecución

Es un **Route Handler** de Next.js que se ejecuta dentro de un contexto de logging transaccional.

```mermaid
graph TD
    A[Proceso de Build de Next.js] -- "Invoca `GET` handler" --> B["`withCorrelationId` (HOC)"];
    B -- "1. Establece contexto de logging" --> C{Lógica de Generación};
    subgraph "Lógica de Generación (con `correlationId`)"
        C -- "2. `generateStaticEntries()`" --> D[Entradas Estáticas];
        C -- "3. `generateBlogEntries()`" --> E[Entradas de Blog];
        D & E --> F[Array `allEntries`];
        F -- "4. `renderSitemap()`" --> G[Template XML final];
    end
    G --> H[Retorna `new Response()` con `Content-Type: application/xml`];
    C -- En caso de fallo --> I["`serverLogger.error()` y retorna `Response` 500"];
3. Contrato de API
Endpoint: GET /sitemap.xml
Salida:
Éxito: Una Response con Content-Type: application/xml y el cuerpo conteniendo el XML del sitemap.
Fallo: Una Response con status: 500.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
SITEMAP INDEX PARA ESCALABILIDAD: Si el número de URLs excede los límites, refactorizar para generar un "sitemap index" que apunte a múltiples sitemaps más pequeños (ej. sitemap-pages.xml, sitemap-blog.xml).
SITEMAP DE IMÁGENES: Generar un sitemap específico para las imágenes destacadas, mejorando su indexación en Google Images.
lastModified DINÁMICA (GIT-BASED): Para las páginas estáticas, obtener la fecha de lastModified del último commit de Git para ese archivo, proporcionando una fecha más precisa.
EXCLUSIÓN INTELIGENTE DE PÁGINAS noindex: Integrar la lógica para excluir automáticamente del sitemap cualquier página marcada con robots: "noindex".
VALIDACIÓN EXTERNA DEL SITEMAP EN CI/CD: Añadir un paso en el CI/CD que valide el sitemap generado contra la API de Google Search Console o una herramienta similar.
<!-- .docs-espejo/app/sitemap.xml/route.ts.md -->