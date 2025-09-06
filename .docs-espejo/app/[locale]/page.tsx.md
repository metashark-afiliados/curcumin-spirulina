<!-- .docs-espejo/app/[locale]/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página principal.
 * @author L.I.A. Legacy
 * @version 5.2.0
 */
# Manifiesto Conceptual: Aparato `page.tsx` (HomePage)

## 1. Rol Estratégico y Propósito

Este aparato es el **"Mega-Orquestador de Layout"** de la landing page. Actúa como el principal Componente de Servidor, y su responsabilidad es doble:

1.  **Ensamblar Secciones Soberanas:** Compone los aparatos de sección (`HeroSection`, `Footer`, etc.) en el orden correcto. Estos aparatos son soberanos y obtienen su propio contenido.
2.  **Orquestar Datos para "Cáscaras de Cliente":** Es la SSoT para obtener los datos necesarios para componentes de cliente puros (como `TestimonialsSection`) y pasarles los hijos ya renderizados en el servidor.

Su rol es puramente estructural y de orquestación de datos, adhiriéndose al más alto nivel del Principio de Responsabilidad Única. Utiliza `serverLogger` para una observabilidad completa de su proceso de renderizado y la generación de metadatos.

## 2. Arquitectura y Flujo de Ejecución

Sigue el patrón canónico de "Orquestador de Servidor / Compositor de UI".

```mermaid
graph TD
    subgraph "Fase de Build/SSR"
        A[Next.js invoca `generateMetadata`] --> B["Llama a `getTranslations` y `generateProductSchema`"];
        B --> C[Retorna objeto `Metadata` con JSON-LD];
        C --> D[Inyectado en `<head>`];
        A -- "Utiliza `serverLogger.trace()`" --> E[Registro de Observabilidad];

        F[Next.js invoca `HomePage`];
        F --> G["Obtiene datos de testimonios (`t.raw('testimonials')`)"];
        G -- "Utiliza `serverLogger.trace()`" --> E;
    end

    subgraph "Fase de Renderizado"
        F -- "Renderiza directamente" --> H["`<Header />` (Soberano)"];
        G -- "Mapea y renderiza" --> I["`<TestimonialCard />` (Server Component)"];
        I -- "Pasado como `children` a" --> J["`<TestimonialsSection />` (Client Shell)"];
        F -- "Renderiza directamente" --> K["...otras secciones soberanas"];
        H & J & K --> L[HTML final de la página];
    end
Esta arquitectura es el pináculo del desacoplamiento y el rendimiento, aprovechando al máximo los React Server Components.
3. Contrato de API
Props de Entrada:
params: { locale: string }: Proporcionado por el App Router de Next.js.
Salida:
El JSX.Element que representa la página completa, compuesta por aparatos soberanos y "cáscaras de cliente" con hijos pre-renderizados.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
CONTENIDO DINÁMICO VÍA CMS Y ORDENAMIENTO FLEXIBLE: Refactorizar la obtención de datos para que el orden y la presencia de las secciones en la HomePage provengan de un Headless CMS (ej. Contentful, Strapi). Esto permitiría al equipo de marketing reordenar la página, habilitar/deshabilitar secciones o incluso crear nuevas variantes de landing pages sin necesidad de un deploy de código.
PRUEBAS A/B DE COMPONENTES CON feature flags: Integrar con un servicio de feature flags (ej. LaunchDarkly, Split.io) para poder renderizar diferentes versiones de una sección (ej. <HeroSectionV1 /> vs <HeroSectionV2 />) a segmentos de usuarios y medir cuál convierte mejor, directamente desde la configuración del CMS.
CARGA PEREZOSA (LAZY LOADING) DE SECCIONES FUERA DE VISTA: Utilizar next/dynamic para cargar de forma perezosa los componentes de sección que están "below the fold" (fuera de la vista inicial). Esto mejoraría significativamente el "First Contentful Paint" (FCP) y el "Largest Contentful Paint" (LCP), métricas críticas de rendimiento para SEO y UX.
PERSONALIZACIÓN DE PÁGINA POR SEGMENTO (CON edge functions): Obtener datos sobre el visitante (ej. desde parámetros UTM, GeoIP, o un edge function de personalización) y usar esta información para reordenar, mostrar/ocultar o incluso modificar el contenido de las secciones dinámicamente, personalizando la experiencia de la página para diferentes segmentos de audiencia en el Edge.
GENERACIÓN DINÁMICA DE TestimonialCards con t.raw() y Zod: Aunque ya usamos t.raw(), se podría introducir un schema Zod específico para validar el array testimonialsData en page.tsx antes de pasarlo al .map(). Esto añadiría una capa de resiliencia extra en caso de que el JSON de testimonios estuviera mal formado.
<!-- .docs-espejo/app/[locale]/page.tsx.md -->