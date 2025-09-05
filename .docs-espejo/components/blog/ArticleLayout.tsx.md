// .docs-espejo/components/blog/ArticleLayout.tsx.md
/**
 * @file .docs-espejo/components/blog/ArticleLayout.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato ArticleLayout.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `ArticleLayout`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura y de servidor**. Su única responsabilidad es renderizar la estructura visual completa de un artículo de blog, incluyendo el encabezado, la imagen destacada, el cuerpo del contenido y el pie de página.

Actúa como un componente "tonto" que recibe todo su contenido y dependencias a través de `props`, garantizando un desacoplamiento total de la lógica de obtención de datos. Como Server Component, puede renderizar directamente contenido MDX complejo sin necesidad de serialización.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component de presentación puro.

```mermaid
graph TD
    A[Orquestador (`BlogArticlePage`)] -- "Pasa `ArticleLayoutProps`" --> B["`ArticleLayout`"];
    subgraph "Renderizado Interno en Servidor"
        B -- "Usa props para renderizar" --> C[Header, Imagen, Footer del Artículo];
        B -- "Usa `<MDXRemote/rsc>` para renderizar" --> D[Contenido MDX];
    end
    C & D --> E[HTML Final del Artículo];
3. Contrato de API
Props de Entrada (ArticleLayoutProps): Un único objeto que contiene los datos del post (post), el contenido MDX crudo (source), los componentes a inyectar en el MDX (components) y las traducciones (t) para textos estáticos.
Salida: El JSX.Element que representa el layout completo del artículo.
4. Zona de Melhorias Futuras
SKELETON LOADER PERSONALIZADO: Para mejorar la experiencia en navegación lenta, se podría envolver en un <Suspense> en la página padre con un esqueleto que imite la estructura del artículo.
INDICADOR DE PROGRESO DE LECTURA: Crear un componente de cliente que envuelva a ArticleLayout para añadir una barra de progreso que reaccione al scroll.
BOTONES PARA COMPARTIR EN REDES SOCIALES: Añadir una sección de botones flotantes o al final del artículo para compartir fácilmente en redes sociales.
NAVEGACIÓN "ANTERIOR/SIGUIENTE": Añadir enlaces al final del artículo para navegar al post anterior o siguiente.
// .docs-espejo/components/blog/ArticleLayout.tsx.md