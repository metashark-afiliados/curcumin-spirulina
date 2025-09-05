// .docs-espejo/components/ui/HeroSection.tsx.md
/**
 * @file .docs-espejo/components/ui/HeroSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato HeroSection.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `HeroSection`

## 1. Rol Estratégico y Propósito

Este aparato es el **"gancho" soberano, visual y de conversión** de la landing page. Su propósito es capturar la atención del visitante en menos de 3 segundos y comunicar la propuesta de valor fundamental del producto, guiándolo directamente hacia la acción principal: el formulario de pedido.

Como **orquestador de presentación soberano y asíncrono**, su responsabilidad es obtener su propio contenido de i18n y ensamblar el copywriting, la imagen del producto y el `OrderForm` en un layout de alta conversión.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component asíncrono** que obtiene sus propias dependencias de contenido.

```mermaid
graph TD
    A["`HeroSection.tsx` (Componente Soberano)"] -- "Invoca `await getTranslations()`" --> B[Obtiene `mainTitle` y `subtitle` de su archivo JSON];
    B -- "Renderiza" --> C[Layout de Grid];
    subgraph "Contenido del Hero"
        C -- "Compone" --> E["Textos (`mainTitle`, `subtitle`)"];
        C -- "Compone" --> F["`HeroImage` (subcomponente optimizado)"];
        C -- "Compone" --> G["`OrderForm` (aparato soberano)"];
    end
Esta arquitectura elimina el prop drilling y se alinea con el patrón canónico de obtención de datos para Server Components.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
TESTE A/B DE COPYWRITING: Integrar con un servicio de feature flags para obtener diferentes versiones de mainTitle y subtitle y probar qué titular genera más conversiones.
IMAGEN DE FONDO DINÁMICA: Permitir pasar una backgroundImageUrl desde el CMS para añadir un fondo visualmente atractivo a la sección.
VÍDEO EN LUGAR DE IMAGEN: Añadir una prop videoUrl que, si se proporciona, renderice un componente de vídeo en lugar de la imagen estática.
PRUEBA SOCIAL INMEDIATA: Integrar una pequeña subsección de "logos de confianza" o una calificación por estrellas directamente debajo del subtítulo, con contenido obtenido desde i18n.
CTA SECUNDARIO: Añadir soporte para un botón de acción secundario opcional (ej. "Leer más sobre la ciencia") junto al formulario.
// .docs-espejo/components/ui/HeroSection.tsx.md