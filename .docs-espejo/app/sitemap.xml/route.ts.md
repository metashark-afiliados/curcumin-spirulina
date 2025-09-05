// .docs-espejo/app/sitemap.xml/route.ts.md
/\*\*

- @file .docs-espejo/app/sitemap.xml/route.ts.md
- @description Documento Espejo y SSoT conceptual para el generador de sitemap.xml.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `sitemap.xml/route.ts`

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar fundamental de la estrategia de SEO técnico**. Su única responsabilidad es generar dinámicamente un archivo `sitemap.xml` completo y válido que informe a los motores de búsqueda sobre todas las URLs canónicas y disponibles para indexar en la aplicación.

Estratégicamente, un sitemap preciso y actualizado acelera el descubrimiento y la indexación de nuestro contenido (especialmente los artículos del blog), mejora la visibilidad en los resultados de búsqueda y proporciona metadatos valiosos como la fecha de última modificación y la prioridad de cada página.

## 2. Arquitectura y Flujo de Ejecución

Es un **Route Handler** de Next.js que se ejecuta en el lado del servidor durante el proceso de build (para SSG) o en cada petición (para SSR). Su arquitectura es un pipeline de generación de datos y renderizado de texto.

```mermaid
graph TD
    A[Petición a /sitemap.xml] --> B["`GET()` handler"];
    B -- "Llama a" --> C["`generateStaticUrls()`"];
    C -- "Retorna URLs estáticas" --> F[Array `allUrls`];
    B -- "Llama a" --> D["`generateBlogUrls()`"];
    D -- "Llama a `getPostsData` y maneja errores" --> D;
    D -- "Retorna URLs de blog" --> F;
    F -- "Es mapeado a" --> G[Strings XML `<url>`];
    G -- "Son unidas en" --> H[Template XML final];
    H --> I[Retorna `new Response()` con `Content-Type: application/xml`];
La arquitectura es resiliente: si la obtención de las URLs del blog falla, la generación del sitemap continúa con las URLs estáticas, evitando un fallo completo del build.
3. Contrato de API
Endpoint: GET /sitemap.xml
Salida: Una Response con el Content-Type establecido en application/xml y el cuerpo conteniendo el XML del sitemap.
4. Zona de Melhorias Futuras
SITEMAP INDEX: Cuando el número de URLs exceda el límite de los motores de búsqueda (ej. 50,000), refactorizar este aparato para que genere un "sitemap index" que apunte a múltiples sitemaps más pequeños (ej. sitemap-pages.xml, sitemap-blog-it.xml).
SITEMAP DE IMÁGENES: Generar un sitemap específico para las imágenes del blog y del producto para mejorar su indexación en Google Images.
GENERACIÓN DE lastModified DINÁMICA: Para las páginas estáticas, obtener la fecha de lastModified del último commit de Git para ese archivo, en lugar de usar la fecha actual.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
EXCLUSIÓN DE PÁGINAS noindex: Integrar con los metadatos de las páginas para excluir automáticamente del sitemap cualquier página que esté marcada con robots: "noindex".
SOPORTE PARA xhtml:alternate: Reintroducir la lógica de xhtml:alternate si se determina que es beneficioso para el SEO, pero obteniendo las URLs alternativas de una fuente canónica para evitar la lógica de replace manual.
VALIDACIÓN DE SITEMAP: Añadir un paso en las pruebas de integración o en el CI/CD que obtenga el sitemap generado y lo valide contra un schema de sitemap XML para prevenir errores de formato.
PAGINACIÓN DEL BLOG: Cuando se implemente la paginación en el blog, esta lógica deberá ser actualizada para incluir las URLs de las páginas de paginación (ej. /blog/page/2).
CACHEADO DE SITEMAP: Implementar cacheado en Vercel KV o en el Edge para el sitemap generado, para reducir la carga del servidor en un entorno SSR.
CONFIGURACIÓN EXTERNA DE PRIORIDAD: Mover los valores de priority y changeFrequency a un archivo de configuración central para una gestión más sencilla.
// .docs-espejo/app/sitemap.xml/route.ts.md
```
