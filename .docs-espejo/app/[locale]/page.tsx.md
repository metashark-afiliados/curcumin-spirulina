// .docs-espejo/app/[locale]/page.tsx.md
/**
 * @file .docs-espejo/app/[locale]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página principal.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `page.tsx` (HomePage)

## 1. Rol Estratégico y Propósito

Este aparato es el **"Mega-Orquestador de Layout"** de la landing page. Actúa como el principal Server Component, y su única responsabilidad es **ensamblar los aparatos de sección soberanos** en el orden correcto.

No obtiene ni pasa contenido para sus hijos. Su rol es puramente estructural y declarativo, adhiriéndose al más alto nivel del Principio de Responsabilidad Única.

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component que sigue el patrón "Ensamblador de Layout".

```mermaid
graph TD
    subgraph "Fase de Build/SSR"
        A[Next.js invoca `generateMetadata`] --> B["Llama a `getTranslations` y `generateProductSchema`"];
        B --> C[Retorna objeto `Metadata` con JSON-LD];
        C --> D[Inyectado en `<head>`];

        E[Next.js invoca `HomePage`];
    end

    subgraph "Fase de Renderizado"
        E -- "Renderiza directamente" --> H["`<Header />` (Soberano)"];
        E -- "Renderiza directamente" --> I["`<HeroSection />` (Soberano)"];
        E -- "Renderiza directamente" --> J["...y así sucesivamente"];
        H & I & J --> K[HTML final de la página];
    end
Esta arquitectura es el pináculo de la simplicidad y el desacoplamiento. HomePage solo se preocupa por el qué (qué componentes mostrar y en qué orden), mientras que cada componente individual se preocupa por el cómo (cómo obtener su contenido y renderizarse).
3. Contrato de API
Props de Entrada:
params: { locale: string }: Proporcionado por el App Router de Next.js.
Salida: El JSX.Element que representa la página completa, compuesta por aparatos soberanos.
4. Zona de Melhorias Futuras
CONTENIDO DINÁMICO VÍA CMS: Refactorizar la obtención de datos para que el orden y la presencia de las secciones provengan de un Headless CMS, permitiendo al equipo de marketing reordenar la página sin deploys.
PRUEBAS A/B DE COMPONENTES: Integrar con un servicio de feature flags para renderizar diferentes versiones de una sección (ej. <HeroSectionV1 /> vs <HeroSectionV2 />) y medir cuál convierte mejor.
CARGA PEREZOSA DE SECCIONES (LAZY LOADING): Utilizar next/dynamic para cargar de forma perezosa los componentes que están "below the fold" (ej. TestimonialsSection, Footer), mejorando el First Contentful Paint (FCP).
PERSONALIZACIÓN DE PÁGINA POR SEGMENTO: Obtener datos sobre el visitante (ej. desde parámetros UTM o GeoIP) y reordenar o mostrar/ocultar secciones dinámicamente para personalizar la página.
// .docs-espejo/app/[locale]/page.tsx.md