<!-- .docs-espejo/lib/schema.ts.md -->
/**
 * @file .docs-espejo/lib/schema.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería de schemas SEO.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `lib/schema.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT para la inteligencia de SEO Técnico**. Su única responsabilidad es actuar como una factoría que genera objetos de datos estructurados (JSON-LD) válidos y conformes con el vocabulario de `Schema.org`.

Como aparato de élite, participa en la **observabilidad transaccional**: detecta si está siendo ejecutado dentro de un contexto con `correlationId` y enriquece sus logs con él, permitiendo la trazabilidad de la generación de schemas.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor (`"server-only"`) que exporta funciones puras. No tiene estado ni efectos secundarios, más allá del logging contextual.

```mermaid
graph TD
    A[Componente de Servidor (ej. `HomePage`)] -- "Llama a `generate...Schema()`" --> B["`lib/schema.ts`"];
    subgraph "Lógica Interna Contextual"
        B -- "1. Llama a `getCorrelationId()`" --> C[Contexto de Logging];
        B -- "2. Construye objeto JSON-LD" --> D;
        C & D -- "3. Llama a `serverLogger.trace(context, ...)`" --> E[Log Enriquecido];
    end
    D --> F[Retorna el schema a A];
3. Contrato de API
generateProductSchema(): object: Genera el schema para el producto principal.
generateReviewSchema(data: ReviewData): object: Genera el schema para una reseña de producto.
generateBlogPostingSchema(post: PostData, locale: string): object: Genera el schema para un artículo de blog.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Datos Dinámicos desde CMS: Hacer que los valores codificados (como price) provengan de un CMS, pasándolos como argumentos a las funciones.
Schema BreadcrumbList: Crear una función generateBreadcrumbSchema para las páginas anidadas para mejorar la navegación en los resultados de búsqueda.
Schema FAQPage: Crear una función generateFaqSchema para habilitar los rich snippets de FAQ.
Validación de Schemas en Build: Integrar un paso en el build que valide la salida de estas funciones contra el validador oficial de Google (Rich Results Test).
Tipado Avanzado con schema-dts: Utilizar la biblioteca schema-dts para tener tipos de TypeScript fuertemente tipados para los objetos de Schema.org.
<!-- .docs-espejo/lib/schema.ts.md -->