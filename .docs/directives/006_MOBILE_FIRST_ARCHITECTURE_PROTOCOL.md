// .docs/directives/006_MOBILE_FIRST_ARCHITECTURE_PROTOCOL.md
/**
 * @file .docs/directives/006_MOBILE_FIRST_ARCHITECTURE_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 006. Establece la
 *              filosofía y los requisitos técnicos para una arquitectura Mobile-First.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 4/5
 */
# Directiva 006: Protocolo de Arquitectura Mobile-First

## 1. Principio Fundamental

La vasta mayoría del tráfico objetivo accederá al sitio a través de dispositivos móviles. Por lo tanto, la experiencia del usuario en pantallas pequeñas no es una adaptación, sino el **caso de uso primario y la máxima prioridad**. El rendimiento y la usabilidad en móviles son innegociables.

## 2. Reglas Mandatorias

1.  **Desarrollo Visual y CSS:** Todo nuevo componente de UI debe ser diseñado y estilizado comenzando por la vista móvil más pequeña (ej. 320px) y luego escalando hacia arriba (`min-width`) para tablets y desktops. El uso de breakpoints `max-width` está restringido a casos excepcionales y justificados.

2.  **Rendimiento de Carga:** Los Largest Contentful Paint (LCP) para dispositivos móviles deben ser el foco principal de la optimización de imágenes y la carga de scripts. Se debe priorizar el `lazy loading` para todos los activos que no estén "above the fold" en la vista móvil.

3.  **Interacción:** Todas las interacciones deben ser diseñadas y probadas para su uso en pantallas táctiles (botones grandes, espaciado adecuado, ausencia de efectos dependientes de `hover`).

## 3. Justificación

Esta directiva asegura que el producto final ofrezca una experiencia de usuario de élite al segmento de mercado más grande y crítico. Garantiza altas puntuaciones en Core Web Vitals de Google, lo que impacta positivamente el ranking de SEO y el coste de las campañas de Google Ads.
// .docs/directives/006_MOBILE_FIRST_ARCHITECTURE_PROTOCOL.md