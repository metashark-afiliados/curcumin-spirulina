<!-- .docs-espejo/app/[locale]/page.tsx.md -->
/**
 * @file .docs-espejo/app/[locale]/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página principal.
 * @author L.I.A. Legacy
 * @version 7.0.0
 */
# Manifiesto Conceptual: Aparato `page.tsx` (HomePage)

## 1. Rol Estratégico y Propósito

Este aparato es el **"Mega-Orquestador de Layout"** de la landing page. Su propósito es ensamblar todas las secciones soberanas de la UI y orquestar los datos necesarios, adhiriéndose a una arquitectura de Server Components resiliente y con observabilidad de élite.

Sus responsabilidades son:
1.  **Observabilidad Transaccional:** Envuelve su ciclo de vida (`generateMetadata`, `HomePage`) con `withCorrelationId` para garantizar una trazabilidad completa.
2.  **Habilitar SSG:** Implementa `unstable_setRequestLocale(locale)` para permitir la Generación de Sitio Estático.
3.  **Escudo de Resiliencia:** Obtiene datos de contenido complejo (testimonios) y los **valida rigurosamente contra un schema Zod** antes de pasarlos a los componentes hijos. Si la validación falla, la página se renderiza de forma segura sin la sección defectuosa.
4.  **Composición de Componentes:** Orquesta el ensamblaje de todos los organismos de UI que conforman la landing page.

## 2. Arquitectura y Flujo de Ejecución

Sigue el patrón canónico de "Orquestador de Servidor / Compositor de UI" blindado.

```mermaid
graph TD
    subgraph "Fase de Build (SSG) / Render"
        A[Next.js invoca `HomePage`] -- "1. Envuelto por `withCorrelationId`" --> B[Contexto de Logging];
        B --> C["2. Llama a `getTranslations` y `t.raw('testimonials')`"];
        C --> D["3. Valida datos contra `TestimonialsSchema`"];
    end

    subgraph "Fase de Renderizado Estático"
        D -- Validación OK --> E["Renderiza `<TestimonialsSection>` con datos"];
        D -- Validación Fallida --> F["`serverLogger.error()` y Renderiza sin sección"];
        A -- "Renderiza directamente" --> G["...otras secciones soberanas"];
        E & F & G --> H[HTML final pre-renderizado];
    end
3. Contrato de API
Props de Entrada: params: { locale: string }.
Salida: El JSX.Element que representa la página completa, pre-renderizada estáticamente.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Pruebas A/B Estáticas: Generar múltiples variantes de la página en el build (ej. /page-v1, /page-v2) y usar reescrituras a nivel de CDN o Edge para dirigir el tráfico a cada versión y probar diferentes ensamblajes de secciones.
Carga Perezosa (Lazy Loading) de Secciones: Utilizar next/dynamic para cargar de forma perezosa los componentes de sección que están "below the fold", mejorando el FCP y el LCP.
Componente MainLayout: Extraer la estructura repetitiva (AnnouncementBar, Header, main, Footer) a un componente MainLayout.tsx para mejorar la adherencia a DRY.
SEO de Imágenes Avanzado: Implementar generateImageMetadata de Next.js para generar opengraph-image y twitter-image dinámicamente durante el build.
Regeneración Estática Incremental (ISR): Si se pasa a una estrategia híbrida, configurar la opción revalidate en el fetch de datos (si se usa un CMS) para habilitar ISR.
<!-- .docs-espejo/app/[locale]/page.tsx.md -->