// .docs-espejo/app/[locale]/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página principal.
 * @author L.I.A. Legacy
 * @version 5.1.0
 */
# Manifiesto Conceptual: Aparato `page.tsx` (HomePage)

## 1. Rol Estratégico y Propósito

Este aparato es el **"Mega-Orquestador de Layout"** de la landing page. Actúa como el principal Componente de Servidor, y su responsabilidad es doble:

1.  **Ensamblar Secciones Soberanas:** Compone los aparatos de sección (`HeroSection`, `Footer`, etc.) en el orden correcto. Estos aparatos son soberanos y obtienen su propio contenido.
2.  **Orquestar Datos para "Cáscaras de Cliente":** Es la SSoT para obtener los datos necesarios para componentes de cliente puros (como `TestimonialsSection`) y pasarles los hijos ya renderizados en el servidor.

Su rol es puramente estructural y de orquestación de datos, adhiriéndose al más alto nivel del Principio de Responsabilidad Única.

## 2. Arquitectura y Flujo de Ejecución

Sigue el patrón canónico de "Orquestador de Servidor / Compositor de UI".

```mermaid
graph TD
    subgraph "Fase de Build/SSR"
        A[Next.js invoca `generateMetadata`] --> B["Llama a `getTranslations` y `generateProductSchema`"];
        B --> C[Retorna objeto `Metadata` con JSON-LD];
        C --> D[Inyectado en `<head>`];

        E[Next.js invoca `HomePage`];
        E --> F["Obtiene datos de testimonios"];
    end

    subgraph "Fase de Renderizado"
        E -- "Renderiza directamente" --> H["`<Header />` (Soberano)"];
        F -- "Mapea y renderiza" --> I["`<TestimonialCard />` (Server Component)"];
        I -- "Pasado como `children` a" --> J["`<TestimonialsSection />` (Client Shell)"];
        E -- "Renderiza directamente" --> K["...otras secciones soberanas"];
        H & J & K --> L[HTML final de la página];
    end
Esta arquitectura es el pináculo del desacoplamiento y el rendimiento, aprovechando al máximo los React Server Components.
3. Contrato de API
Props de Entrada:
params: { locale: string }: Proporcionado por el App Router de Next.js.
Salida:
El JSX.Element que representa la página completa, compuesta por aparatos soberanos y "cáscaras de cliente" con hijos pre-renderizados.
4. Zona de Melhorias Futuras
CONTENIDO DINÁMICO VÍA CMS: Refactorizar la obtención de datos para que el orden y la presencia de las secciones provengan de un Headless CMS, permitiendo al equipo de marketing reordenar la página sin deploys.
PRUEBAS A/B DE COMPONENTES: Integrar con un servicio de feature flags para renderizar diferentes versiones de una sección (ej. <HeroSectionV1 /> vs <HeroSectionV2 />) y medir cuál convierte mejor.
CARGA PEREZOSA DE SECCIONES (LAZY LOADING): Utilizar next/dynamic para cargar de forma perezosa los componentes que están "below the fold", mejorando el First Contentful Paint (FCP).
PERSONALIZACIÓN DE PÁGINA POR SEGMENTO: Obtener datos sobre el visitante (ej. desde parámetros UTM o GeoIP) y reordenar o mostrar/ocultar secciones dinámicamente para personalizar la página.
// .docs-espejo/app/[locale]/page.tsx.md