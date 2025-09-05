// .docs-espejo/lib/schema.ts.md
/**
 * @file .docs-espejo/lib/schema.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería de schemas SEO.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `lib/schema.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **SSoT para la inteligencia de SEO Técnico**. Su única responsabilidad es actuar como una factoría que genera objetos de datos estructurados (JSON-LD) válidos y conformes con el vocabulario de `Schema.org`.

Estratégicamente, este módulo es fundamental para comunicar la semántica de nuestro contenido a los motores de búsqueda de una manera que puedan entender inequívocamente. La correcta implementación de estos schemas es lo que habilita la aparición de "rich snippets" (estrellas, precios, artículos) en los resultados de búsqueda.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor (`"server-only"`) que exporta funciones puras. No tiene estado ni efectos secundarios, más allá del logging.

```mermaid
graph TD
    A[Componente de Servidor <br> (ej. `HomePage`, `BlogArticlePage`)] -- "Llama a" --> B["`generate...Schema()`"];
    B -- "Construye objeto JSON-LD" --> B;
    B -- "Retorna el schema" --> A;
    A -- "Inyecta el schema en el" --> D[HTML Head];
3. Contrato de API
generateProductSchema(): object: Genera el schema para el producto principal.
generateReviewSchema(data: ReviewData): object: Genera el schema para una reseña de producto.
generateBlogPostingSchema(post: PostData, locale: string): object: Genera el schema para un artículo de blog.
4. Zona de Melhorias Futuras
DADOS DINÂMICOS: Fazer com que os valores codificados em generateProductSchema (como price) sejam dinâmicos, recebendo-os como argumentos.
SCHEMA BreadcrumbList: Criar uma função generateBreadcrumbSchema para as páginas aninhadas para melhorar a navegação nos resultados de busca.
SCHEMA FAQPage: Criar uma função generateFaqSchema que gere o schema correspondente para habilitar os rich snippets de FAQ.
VALIDAÇÃO DE SCHEMAS: Integrar um passo no build ou nos testes que valide a saída destas funções contra o validador oficial do Google (Rich Results Test) através de sua API.
TIPAGEM AVANÇADA: Utilizar a biblioteca schema-dts para ter tipos de TypeScript fortemente tipados para os objetos de Schema.org.
// .docs-espejo/lib/schema.ts.md