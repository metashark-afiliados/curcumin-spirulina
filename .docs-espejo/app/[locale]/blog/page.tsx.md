<!-- .docs-espejo/app/[locale]/blog/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/blog/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de índice del blog.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `blog/page.tsx` (Página de Índice del Blog)

## 1. Rol Estratégico y Propósito

Este aparato es el **hub de contenido soberano** de la estrategia de SEO. Implementa el patrón de **"Aislamiento Contextual"** para garantizar una ejecución estable y trazable. Sus responsabilidades son:
1.  **Aislar `next-intl`:** Ejecuta `getTranslations` en un entorno puro.
2.  **Observabilidad Transaccional:** Establece un contexto de logging con `storage.run()` para el resto de la lógica.
3.  **Habilitar SSG:** Implementa `unstable_setRequestLocale(locale)`.
4.  **Orquestación de Datos y UI:** Obtiene los datos de los posts y compone la página con los `ArticleCard`.

## 2. Arquitectura de Flujo ("Aislamiento Contextual")

```mermaid
graph TD
    A[Build invoca `BlogIndexPage`] --> B["Fase 1: getTranslations (Pura)"];
    B --> C["Fase 2: Inicia `storage.run()`"];
    subgraph "Contexto Transaccional Activo"
      C --> D[Lógica de App: Logging, getPostsData, Renderizado];
    end
    D --> E[HTML Final];
3. Contrato de API
Entrada: params: { locale: string; }.
Salida: Un React.ReactElement que representa la página de índice del blog.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Paginación Estática: Implementar generateStaticParams para generar múltiples páginas de índice del blog (/blog/page/1, etc.) durante el build.
Páginas de Categoría/Tag Estáticas: Extender generateStaticParams para generar páginas de archivo estáticas para cada tag.
Artículo Destacado: Permitir marcar un artículo como "destacado" en su frontmatter y renderizarlo con un layout diferente.
Generación de Feed RSS: Añadir un route.ts que genere un rss.xml estático durante el build.
<!-- .docs-espejo/app/[locale]/blog/page.tsx.md -->