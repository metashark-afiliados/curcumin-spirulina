// .docs-espejo/lib/schema.ts.md
/**
 * @file .docs-espejo/lib/schema.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería de schemas SEO.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `lib/schema.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT para la inteligencia de SEO Técnico**. Su única responsabilidad es actuar como una factoría que genera objetos de datos estructurados (JSON-LD) válidos y conformes con el vocabulario de `Schema.org`.

Estratégicamente, este módulo es fundamental para comunicar la semántica de nuestro contenido a los motores de búsqueda de una manera que puedan entender inequívocamente. La correcta implementación de estos schemas es lo que habilita la aparición de "rich snippets" (estrellas, precios, artículos) en los resultados de búsqueda, lo que impacta directamente en el CTR y la visibilidad orgánica.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor (`"server-only"`) que exporta funciones puras. No tiene estado ni efectos secundarios, más allá del logging.

```mermaid
graph TD
    A[Componente de Servidor <br> (ej. `HomePage`, `BlogArticlePage`)] -- "Llama a" --> B["`generate...Schema()`"];
    B -- "Construye objeto JSON-LD" --> B;
    B -- "Retorna el schema" --> A;
    A -- "Inyecta el schema en el" --> D[HTML Head];
3. Contrato de API
generateProductSchema(): object:
Entrada: Ninguna.
Salida: Un objeto JSON-LD que representa el Product principal.
generateReviewSchema(data: ReviewData): object:
Entrada: Un objeto ReviewData con los datos del testimonio.
Salida: Un objeto JSON-LD que representa una Review.
generateBlogPostingSchema(post: PostData): object:
Entrada: Un objeto PostData con los datos del artículo.
Salida: Un objeto JSON-LD que representa un BlogPosting.
4. Zona de Melhorias Futuras
DATOS DINÁMICOS: Hacer que los valores hardcodeados en generateProductSchema (como price y reviewCount) sean dinámicos, recibiéndolos como argumentos desde una fuente de datos.
SCHEMA BreadcrumbList: Crear una función generateBreadcrumbSchema para las páginas anidadas (como los artículos de blog) para mejorar la navegación en los resultados de búsqueda.
SCHEMA FAQPage: Crear una función generateFaqSchema que tome un array de preguntas y respuestas y genere el schema correspondiente para habilitar los rich snippets de FAQ.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
VALIDACIÓN DE SCHEMAS: Integrar un paso en el build o en las pruebas que valide la salida de estas funciones contra el validador oficial de Google (Rich Results Test) a través de su API.
TIPADO AVANZADO: Utilizar librerías como schema-dts para tener tipos de TypeScript fuertemente tipados para los objetos de Schema.org, en lugar de object.
CONFIGURACIÓN CENTRALIZADA: Mover datos comunes (como el nombre del producto o la marca) a un archivo de configuración central (site.config.ts) para que sean consumidos desde ahí.
SCHEMA Article: Extender generateBlogPostingSchema para que también genere un schema de tipo Article, que es más genérico y puede ser beneficioso.
INCLUSIÓN DE KEYWORDS: Mejorar generateBlogPostingSchema para que incluya un campo keywords derivado de los tags del post.
MANEJO DE dateModified: Añadir una propiedad opcional modified_date al frontmatter del blog y usarla para el campo dateModified en el schema para un SEO más preciso.
// .docs-espejo/lib/schema.ts.md