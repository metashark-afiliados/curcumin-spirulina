<!-- .docs-espejo/lib/blog.ts.md -->
/**
 * @file .docs-espejo/lib/blog.ts.md
 * @description Documento Espejo y SSoT conceptual para la librería del blog.
 * @author L.I.A. Legacy
 * @version 8.0.0
 */
# Manifiesto Conceptual: Aparato `lib/blog.ts` (Data Access Layer - DAL)

## 1. Rol Estratégico y Propósito

Este aparato es la **Capa de Acceso a Datos (DAL) y SSoT de lógica para el dominio del blog**. Blindado para **ejecución exclusiva en servidor**, su responsabilidad es interactuar con el sistema de archivos para leer, analizar, validar y servir los datos de los artículos.

Como participante de la arquitectura de observabilidad, **detecta el `correlationId` del contexto de ejecución** e inyecta este valor en todos sus logs, permitiendo que sus operaciones sean trazadas como parte de una transacción de renderizado mayor.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo `server-only` que exporta funciones asíncronas para la obtención de datos, participando en el contexto de logging establecido por su invocador.

```mermaid
graph TD
    A[Página de Blog (con `correlationId`)] -- "1. Llama a `await getPostsData(locale)`" --> B["`getPostsData`"];
    subgraph "Lógica Interna Contextual"
      B -- "2. `getCorrelationId()`" --> C[Contexto de Logging];
      B -- "3. Lee y valida archivos MDX" --> D{Datos de Posts};
      C & D -- "4. Llama a `serverLogger.info(context, ...)`" --> E[Log Enriquecido];
    end
    D --> A[Retorna datos de posts];
3. Contrato de API
getPostsData(locale: string): Promise<Array<...>>: Recupera los metadatos de todos los posts para un locale.
getPostBySlug(slug: string, locale: string): Promise<PostData | null>: Recupera los datos completos de un post específico.
formatDate(dateInput: string | Date, locale: string): string: Formatea una fecha a una cadena localizada.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Cacheo de Posts (React.cache): Implementar una capa de cacheo para getPostsData y getPostBySlug utilizando React.cache para evitar lecturas redundantes del sistema de archivos dentro del mismo ciclo de renderizado (ej. entre generateMetadata y la página).
Soporte para Múltiples Autores: Refactorizar el frontmatter para que author sea un authorId que se relacione con una nueva fuente de datos de autores (ej. content/authors.json).
Cálculo de Tiempo de Lectura: Crear una función calculateReadingTime(content) que se llame dentro de getPostBySlug y añada una propiedad readingTimeMinutes a PostData.
Navegación "Anterior/Siguiente": Crear una función getPrevNextPosts(slug, locale) que devuelva los posts anterior y siguiente para añadir enlaces de navegación en cada artículo.
<!-- .docs-espejo/lib/blog.ts.md -->