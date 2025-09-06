<!-- .docs-espejo/components/ui/TestimonialCard.tsx.md -->
/**
 * @file .docs-espejo/components/ui/TestimonialCard.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TestimonialCard.
 * @author L.I.A. Legacy
 * @version 7.0.0
 */
# Manifiesto Conceptual: Aparato `TestimonialCard`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de prueba social y construcción de confianza**. Su único propósito es presentar el testimonio de un cliente de una manera auténtica, creíble y observable.

Estratégicamente, no solo busca persuadir al usuario, sino también **mejorar el SEO** al inyectar datos estructurados de `Review` (Schema.org). Su observabilidad está integrada en el flujo transaccional de la renderización de la página.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component de presentación puro**. Es invocado por un orquestador (como `HomePage`) que ya ha establecido un contexto de logging transaccional.

```mermaid
graph TD
    A[Orquestador (`HomePage`)] -- "Pasa `TestimonialData`" --> B["`TestimonialCard`"];
    subgraph "Lógica Interna Contextual"
        B -- "1. Llama a `getCorrelationId()`" --> C[Contexto de Logging];
        B -- "2. Llama a `generateReviewSchema()`" --> D[Schema JSON-LD];
        C & D -- "3. Llama a `serverLogger.trace()`" --> E[Log Enriquecido];
        D -- "4. Pasa schema a" --> F["`SchemaInjector` (Client Component)"];
    end
    F -- "Renderiza `<script>` en el DOM" --> G[HTML Head];
    B -- "Renderiza el resto de la UI" --> H[HTML del Card];
3. Contrato de API
Props de Entrada (TestimonialData): Un objeto que cumple con el contrato definido en Testimonials.schema.ts.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Badge de "Cliente Verificado": Añadir una prop isVerified?: boolean que renderice un sello de "Cliente Verificado" para aumentar la percepción de autenticidad.
Animación de Estrellas: Animar las estrellas para que se "iluminen" una a una cuando el componente entre en el viewport.
Modal de Video Testimonio: Al hacer clic en la tarjeta, podría abrirse un modal para reproducir un video testimonio si se proporciona una videoUrl.
Fecha de la Reseña: Añadir una prop date para mostrarla en la tarjeta y enriquecer el Review schema.
<!-- .docs-espejo/components/ui/TestimonialCard.tsx.md -->