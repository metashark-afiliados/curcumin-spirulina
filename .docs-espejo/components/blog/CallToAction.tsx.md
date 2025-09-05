// .docs-espejo/components/blog/CallToAction.tsx.md
/**
 * @file .docs-espejo/components/blog/CallToAction.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato CallToAction.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `CallToAction`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de conversión**. Su propósito es servir como una "rampa de salida" estratégica desde el contenido informativo del blog hacia el funnel de conversión principal (el formulario de pedido en la `HomePage`).

Está diseñado para ser visualmente distinto del contenido del artículo para captar la atención, y presenta una propuesta de valor concisa y una llamada a la acción clara. Como componente de presentación puro, puede ser reutilizado con diferente contenido para adaptarse a distintos artículos o contextos.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**. Se convierte en cliente para poder ser envuelto en `AnimationWrapper` y para futuras interacciones de tracking.

```mermaid
graph TD
    A[Página Padre (ej. `BlogArticlePage`)] -- "Obtiene contenido del CTA de i18n" --> B;
    B -- "Pasa `CallToActionProps`" --> C["`CallToAction.tsx`"];
    C -- "Renderiza" --> D[Layout de Grid];
    D -- "Compone" --> E["`<Image>`"];
    D -- "Compone" --> F["Texto (`mainTitle`, `subtitle`)"];
    D -- "Compone" --> G["`<Button>` con `<Link href='/#order-form'>`"];
La arquitectura desacopla completamente el contenido de la presentación, permitiendo que este CTA sea altamente configurable.
3. Contrato de API
Props de Entrada (CallToActionProps):
mainTitle: string: El título principal del CTA.
subtitle: string: El texto de apoyo.
ctaButtonText: string: El texto del botón.
image: { src: string; alt: string; }: La información para la imagen del producto.
4. Zona de Melhorias Futuras
TESTES A/B DE COPYWRITING: El componente de página padre podría obtener diferentes versiones de CallToActionProps desde un servicio de feature flags para probar qué titular convierte mejor.
VARIANTES DE DISEÑO (cva): Crear variantes que alteren el layout (ej. image-right, text-center) para evitar la fatiga visual.
SEGUIMIENTO DE EVENTOS DE CONVERSIÓN: Añadir un evento de tracking (trackEvent('cta_blog_click')) al onClick del botón para medir su efectividad en herramientas de analítica.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
CONTENIDO DESDE CMS: La página padre podría obtener el contenido para este CTA desde un Headless CMS, permitiendo a marketing actualizarlo sin un deploy.
IMAGEN PERSONALIZABLE POR ARTÍCULO: La prop image permite pasar una imagen diferente, adaptando el CTA al contexto del contenido.
PRUEBAS DE UI CON PLAYWRIGHT: Crear una prueba que verifique que el Link en el botón apunta correctamente a la sección #order-form de la página principal.
FONDO PERSONALIZABLE: Aceptar una prop backgroundColor o gradient para personalizar el fondo.
ICONO EN EL BOTÓN: Permitir pasar una prop opcional ctaButtonIcon?: LucideIcon para añadir un icono al botón.
TÍTULO SECUNDARIO (SUBHEADING): Añadir una prop subheading?: string para renderizar un pequeño texto por encima del mainTitle, como "Oferta Especial".
// .docs-espejo/components/blog/CallToAction.tsx.md