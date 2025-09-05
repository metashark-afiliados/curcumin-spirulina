// .docs-espejo/app/sitemap.xml/route.ts.md
/**
 * @file .docs-espejo/app/sitemap.xml/route.ts.md
 * @description Documento Espejo y SSoT conceptual para el generador de sitemap.xml.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */

# Manifiesto Conceptual: Aparato `sitemap.xml/route.ts`

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar fundamental de la estrategia de SEO técnico multilingüe**. Su única responsabilidad es generar dinámicamente un archivo `sitemap.xml` de élite, que informa a los motores de búsqueda sobre todas las URLs canónicas y sus traducciones disponibles.

La arquitectura implementa la mejor práctica de SEO para sitios multilingües, utilizando la etiqueta `<xhtml:link rel="alternate" />` para agrupar las versiones de idioma de cada página. Esto consolida la autoridad de la página y ayuda a Google a servir la versión correcta al usuario correcto.

## 2. Arquitectura y Flujo de Ejecución

Es un **Route Handler** de Next.js blindado y resiliente, que agrupa las URLs por entidad canónica en lugar de por `locale`.

```mermaid
graph TD
    A[Petición a /sitemap.xml] --> B["`GET()` handler"];
    B -- "Inicia bloque `try/catch`" --> C{Lógica de Generación};
    subgraph "Lógica de Generación"
        C -- "Agrupa páginas estáticas por ruta" --> D["`generateStaticEntries()`"];
        C -- "Agrupa posts por slug" --> E["`generateBlogEntries()`"];
        D & E --> F[Array `allEntries`];
        F -- "Es renderizado por" --> G["`renderSitemap()`"];
    end
    G --> H[Template XML final con `<xhtml:link>`];
    H --> I[Retorna `new Response()` con `Content-Type: application/xml`];
    C -- En caso de fallo --> J["`serverLogger.error()`"];
    J --> K[Retorna `new Response()` con `status: 500`];
La arquitectura es ahora resiliente a fallos completos, evitando entregar un sitemap corrupto o incompleto.
3. Contrato de API
Endpoint: GET /sitemap.xml
Salida (Éxito): Una Response con Content-Type: application/xml y el cuerpo conteniendo el XML del sitemap.
Salida (Fallo): Una Response con status: 500 y un mensaje de error genérico.
4. Zona de Melhorias Futuras
SITEMAP INDEX: Cuando el número de URLs exceda el límite, refactorizar para que genere un "sitemap index" que apunte a múltiples sitemaps más pequeños.
SITEMAP DE IMÁGENES: Generar un sitemap específico para las imágenes del blog y del producto para mejorar su indexación en Google Images.
GENERACIÓN DE lastModified DINÁMICA: Para las páginas estáticas, obtener la fecha de lastModified del último commit de Git para ese archivo.
EXCLUSIÓN DE PÁGINAS noindex: Integrar con los metadatos de las páginas para excluir automáticamente del sitemap cualquier página que esté marcada con robots: "noindex".
VALIDACIÓN DE SITEMAP: Añadir un paso en las pruebas de integración o en el CI/CD que obtenga el sitemap generado y lo valide contra un schema de sitemap XML.
// .docs-espejo/app/sitemap.xml/route.ts.md