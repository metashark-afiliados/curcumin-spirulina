<!-- .docs-espejo/next.config.mjs.md -->
/**
 * @file .docs-espejo/next.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Next.js.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `next.config.mjs`

## 1. Rol Estratégico y Propósito

El archivo `next.config.mjs` es la **Única Fuente de Verdad (SSoT) para el comportamiento del framework Next.js**. Define cómo se construye, se sirve y se enruta la aplicación. Su propósito es centralizar configuraciones críticas que afectan el rendimiento, la seguridad (`headers`), la observabilidad del build (`bundle-analyzer`) y la funcionalidad global.

Esta versión implementa una estrategia de **renderizado dinámico (Server-Side Rendering - SSR)**, eliminando la directiva `output: 'export'` para garantizar la compatibilidad con el middleware y otras funcionalidades dinámicas de la aplicación.

## 2. Arquitectura de la Configuración

La configuración se estructura para gestionar:

1.  **Estrategia de Build:** Configurado para SSR/dinámico.
2.  **Analizador de Bundles (`@next/bundle-analyzer`):** Integración opcional, activada por `ANALYZE=true`.
3.  **Compatibilidad de Logging (`experimental` y `webpack`):** Configuraciones clave para resolver los conflictos de `pino` con el entorno de build de Next.js.
4.  **Internacionalización (`next-intl`):** Integra el plugin de `next-intl` para el enrutamiento.
5.  **Cabeceras de Seguridad (`headers`):** Añade una capa de protección HTTP a nivel de aplicación.

## 3. Contrato de API

*   **Exportación por Defecto:** Un objeto de configuración de Next.js, envuelto por los plugins de `next-intl` y `bundle-analyzer`.
*   **Comportamiento del `build`:** Genera una salida para un entorno de servidor Node.js, lista para ser desplegada en plataformas como Vercel o un servidor propio.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **CONFIGURACIÓN DE CSP (Content Security Policy):** Extender la función `headers` para implementar una `Content Security Policy` (CSP) robusta, mejorando la seguridad contra ataques XSS.
*   **OPTIMIZACIÓN DE IMÁGENES EXTERNAS (`images.remotePatterns`):** Configurar `images.remotePatterns` para permitir la optimización de imágenes alojadas en dominios externos (ej. un Headless CMS).
*   **ESTRATEGIAS DE CACHEO (ISR):** Explorar la Regeneración Estática Incremental (ISR) para rutas específicas (como el blog) para balancear el rendimiento de un sitio estático con la capacidad de actualizar contenido dinámicamente.
*   **REDIRECCIONES Y REESCRITURAS (`redirects`, `rewrites`):** Implementar estas funciones para manejar la lógica de enrutamiento a nivel de servidor (ej., redirecciones 301 para SEO).
<!-- .docs-espejo/next.config.mjs.md -->