<!-- .docs-espejo/components/blog/ArticleCard.tsx.md -->
/**
 * @file .docs-espejo/components/blog/ArticleCard.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ArticleCard.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `ArticleCard`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI soberana y de servidor**. Su única responsabilidad es renderizar la tarjeta de previsualización para un único artículo de blog de una manera performante, accesible y **observable**.

Como componente soberano, obtiene su propio contenido de UI (textos `alt`, etc.) y participa en la observabilidad transaccional al enriquecer sus logs con el `correlationId` del contexto de renderizado.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component asíncrono** que se ejecuta dentro de un contexto de logging transaccional.

```mermaid
graph TD
    A[Orquestador (ej. `BlogIndexPage`)] -- "Pasa `ArticleCardProps`" --> B["`ArticleCard.tsx`"];
    subgraph "Lógica Interna Contextual"
        B -- "1. `getCorrelationId()`" --> C[Contexto de Logging];
        B -- "2. `getTranslations()`" --> D[Contenido UI];
        C & D -- "3. `serverLogger.trace()`" --> E[Log Enriquecido];
    end
    B -- "Renderiza" --> F[HTML Final del Card];
3. Contrato de API
Props de Entrada (ArticleCardProps): slug, locale, y todos los datos del frontmatter del post.
Salida: Un React.ReactElement que representa la tarjeta completa.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Indicador de Tiempo de Lectura: Calcular y mostrar el tiempo de lectura estimado del artículo en la tarjeta.
Badge de "Nuevo" o "Popular": Añadir lógica para mostrar un badge visual si el post fue publicado recientemente o es popular.
Hover-Effect en Tags: Añadir un efecto de hover a los tags para que actúen como enlaces a una futura página de filtrado por tags.
Pruebas de Integración: Crear pruebas que verifiquen que el componente renderiza correctamente todos los datos del frontmatter y que el enlace generado es correcto.
<!-- .docs-espejo/components/blog/ArticleCard.tsx.md -->
