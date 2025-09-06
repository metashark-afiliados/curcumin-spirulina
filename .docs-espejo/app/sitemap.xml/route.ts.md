<!-- .docs-espejo/app/sitemap.xml/route.ts.md -->
/**
 * @file .docs-espejo/app/sitemap.xml/route.ts.md
 * @description Documento Espejo y SSoT conceptual para el generador de sitemap.xml.
 * @author L.I.A. Legacy
 * @version 5.3.0
 */

# Manifiesto Conceptual: Aparato `sitemap.xml/route.ts` (Route Handler)

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar fundamental de la estrategia de SEO técnico multilingüe**. Su única responsabilidad es generar dinámicamente un archivo `sitemap.xml` de élite, que informa a los motores de búsqueda sobre todas las URLs canónicas y sus traducciones disponibles.

La arquitectura implementa la mejor práctica de SEO para sitios multilingües, utilizando la etiqueta `<xhtml:link rel="alternate" />` para agrupar las versiones de idioma de cada página. Esto consolida la autoridad de la página y ayuda a Google a servir la versión correcta al usuario correcto. Además, su robusto sistema de logging (`serverLogger`) proporciona una observabilidad completa del proceso de generación. **Se ha configurado explícitamente para forzar la estaticidad (`export const dynamic = 'force-static';`) y no acepta el objeto `request` en su firma `GET()` para asegurar que Next.js lo prerrenderice estáticamente.**

## 2. Arquitectura y Flujo de Ejecución

Es un **Route Handler** de Next.js blindado y resiliente, que agrupa las URLs por entidad canónica en lugar de por `locale`.

```mermaid
graph TD
    A[Petición a /sitemap.xml] --> B["`GET()` handler"];
    B -- "1. `export const dynamic = 'force-static'`" --> B; // Directiva para Next.js
    B -- "2. `serverLogger.info()` (Inicio con `BASE_URL`)" --> C[Registro de Observabilidad];
    B -- "3. Inicia bloque `try/catch`" --> D{Lógica de Generación};
    subgraph "Lógica de Generación"
        D -- "4. `serverLogger.trace()` (Estáticas)" --> C;
        D -- "5. Agrupa páginas estáticas por ruta" --> E["`generateStaticEntries()`"];
        D -- "6. `serverLogger.trace()` (Blog)" --> C;
        D -- "7. Agrupa posts por slug" --> F["`generateBlogEntries()`"];
        F -- Errores por Locale de Blog --> G["`serverLogger.error()`"];
        E & F --> H[Array `allEntries`];
        H -- "8. `serverLogger.trace()` (Renderizado)" --> C;
        H -- "9. Es renderizado por" --> I["`renderSitemap()`"];
        I -- `canonicalUrl` ausente --> J["`serverLogger.warn()`"];
    end
    I --> K[Template XML final con `<xhtml:link>`];
    K --> L[Retorna `new Response()` con `Content-Type: application/xml`];
    L -- "10. `serverLogger.info()` (Éxito)" --> C;
    D -- En caso de fallo --> M["`serverLogger.error()`"];
    M --> N[Retorna `new Response()` con `status: 500`];
La arquitectura es ahora resiliente a fallos completos, evitando entregar un sitemap corrupto o incompleto, y proporcionando logs detallados para el diagnóstico.
3. Contrato de API
Endpoint:
GET /sitemap.xml
Salida:
Éxito: Una Response con Content-Type: application/xml y el cuerpo conteniendo el XML del sitemap.
Fallo: Una Response con status: 500 y un mensaje de error genérico ("Error interno del servidor al generar sitemap").
4. Zona de Mejoras Nuevas (Valor al Proyecto)
SITEMAP INDEX PARA ESCALABILIDAD: Cuando el número de URLs exceda el límite recomendado de 50,000 URLs o 50MB por sitemap, refactorizar la lógica para que genere un "sitemap index" (sitemap.xml) que apunte a múltiples sitemaps más pequeños (ej. sitemap-pages.xml, sitemap-blog.xml, etc.).
SITEMAP DE IMÁGENES ESPECÍFICO: Generar un sitemap específico para las imágenes destacadas del blog y del producto, utilizando el namespace image de Schema.org en el XML. Esto mejoraría su indexación en Google Images, crucial para productos visuales.
GENERACIÓN DE lastModified DINÁMICA (GIT-BASED): Para las páginas estáticas (no blog posts), obtener la fecha de lastModified del último commit de Git para el archivo fuente de esa página. Esto proporcionaría una fecha de modificación más precisa y automatizada que new Date().toISOString().
EXCLUSIÓN INTELIGENTE DE PÁGINAS noindex: Integrar la lógica del sitemap con los metadatos de las páginas para excluir automáticamente del sitemap cualquier página que esté marcada con robots: "noindex" en su generateMetadata, garantizando la coherencia de las directivas de indexación.
VALIDACIÓN EXTERNA DEL SITEMAP EN CI/CD: Añadir un paso en los tests de integración o en el pipeline de CI/CD que, después de generar el sitemap, lo obtenga y lo valide contra la API de Google Search Console o una herramienta de validación de sitemaps XML. Esto blindaría el sitemap contra errores de formato.
<!-- .docs-espejo/app/sitemap.xml/route.ts.md -->