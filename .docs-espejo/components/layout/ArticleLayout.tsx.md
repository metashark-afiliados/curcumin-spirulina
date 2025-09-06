<!-- .docs-espejo/components/layout/ArticleLayout.tsx.md -->
/**
 * @file .docs-espejo/components/layout/ArticleLayout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ArticleLayout.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `ArticleLayout`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura y de servidor**. Su única responsabilidad es renderizar la estructura visual completa de un artículo de blog, incluyendo encabezado, imagen destacada y cuerpo del contenido, participando en la **observabilidad transaccional**.

Actúa como un componente "tonto" que recibe todo su contenido a través de `props`, garantizando un desacoplamiento total de la lógica de obtención de datos.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component de presentación que se ejecuta dentro de un contexto de logging transaccional.

```mermaid
graph TD
    A[Orquestador (`BlogArticlePage`)] -- "Pasa `ArticleLayoutProps`" --> B["`ArticleLayout`"];
    subgraph "Lógica Interna Contextual"
        B -- "1. `getCorrelationId()`" --> C[Contexto de Logging];
        C -- "2. Enriquece el log" --> D["`serverLogger.trace()`"];
        B -- "3. Usa `<MDXRemote/rsc>`" --> E[Renderiza Contenido MDX];
    end
    E --> F[HTML Final del Artículo];
3. Contrato de API
Props de Entrada (ArticleLayoutProps): Un único objeto que contiene los datos del post, el source MDX, los components a inyectar y las traducciones t.
Salida: El JSX.Element que representa el layout completo del artículo.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Indicador de Progreso de Lectura: Crear un componente de cliente que envuelva a ArticleLayout para añadir una barra de progreso que reaccione al scroll.
Botones para Compartir en Redes Sociales: Añadir una sección de botones flotantes o al final del artículo para compartir fácilmente en redes sociales.
Navegación "Anterior/Siguiente": Añadir enlaces al final del artículo para navegar al post anterior o siguiente, pasados como props desde el orquestador.
Componente CallToAction Reutilizable: Asegurar que el componente CallToAction, inyectado vía MDX, sea completamente soberano y reutilizable.
<!-- .docs-espejo/components/layout/ArticleLayout.tsx.md -->