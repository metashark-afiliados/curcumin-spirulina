// .docs-espejo/components/blog/ArticleCard.tsx.md
/**
 * @file .docs-espejo/components/blog/ArticleCard.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ArticleCard.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `ArticleCard`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI soberana y de servidor**. Su única responsabilidad es renderizar la tarjeta de previsualización para un único artículo de blog de una manera performante, accesible y optimizada para SEO.

Como componente soberano, **obtiene su propio contenido de UI** (cadenas de texto para atributos `alt`, etc.) de su archivo de mensajes espejo, mientras que los **datos dinámicos** del post (título, excerpt, etc.) los recibe a través de `props` desde su orquestador padre (la página de índice del blog).

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component asíncrono** que sigue el patrón "Componente de Presentación Enriquecido con Datos Soberanos de UI".

```mermaid
graph TD
    A[Orquestador (ej. `BlogIndexPage`)] -- "Pasa `ArticleCardProps`" --> B["`ArticleCard.tsx`"];
    subgraph "Lógica Interna Soberana"
        B -- "Invoca `await getTranslations()`" --> C[Obtiene `imageAltText` de su archivo JSON];
    end
    B -- "Renderiza" --> D[Layout de Tarjeta con Imagen, Título, etc.];
    C -- "Provee `alt` text para" --> D;
    D --> E[HTML Final Renderizado no Servidor];
Esta arquitectura garantiza que el componente sea reutilizable y mantenible, desacoplando completamente su contenido de UI de su contenido de datos.
3. Contrato de API
Props de Entrada (ArticleCardProps):
slug: string: El slug del post para la URL.
locale: string: El locale actual para la navegación.
...PostFrontmatter: Todos los datos del frontmatter del post.
Salida: Un React.ReactElement que representa la tarjeta completa.
## 4. Zona de Melhorias Futuras
HOVER-EFFECT EN TAGS: Añadir un efecto de hover a los tags individuales para que actúen como enlaces a una futura página de filtrado por tags.
INDICADOR DE TIEMPO DE LECTURA: Calcular y mostrar el tiempo de lectura estimado del artículo en la tarjeta para gestionar las expectativas del usuario.
BADGE DE "NUEVO" O "POPULAR": Añadir lógica para mostrar un badge visual si el post fue publicado recientemente o si tiene un alto número de vistas.
// .docs-espejo/components/blog/ArticleCard.tsx.md