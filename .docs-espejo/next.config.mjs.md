// .docs-espejo/next.config.mjs.md
/**
 * @file .docs-espejo/next.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para el aparato `next.config.mjs`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `next.config.mjs`

## 1. Rol Estratégico y Propósito

El aparato `next.config.mjs` es el **centro de control neurálgico del proyecto**. Su propósito es definir y orquestar el comportamiento del framework Next.js durante el build y en tiempo de ejecución. Actúa como la SSoT para:

*   **Seguridad:** Define la Política de Seguridad de Contenido (CSP) para mitigar ataques XSS.
*   **Internacionalización (i18n):** Integra el plugin de `next-intl` para habilitar el enrutamiento y la carga de traducciones.
*   **Observabilidad:** Envuelve la configuración con el HOC de Sentry para habilitar la subida de source maps y el monitoreo de errores.
*   **Optimización de Activos:** Configura los dominios permitidos para la optimización de imágenes con `next/image`.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura de este aparato se basa en el patrón de **composición de plugins (wrappers)**, donde la configuración base es enriquecida secuencialmente.

```mermaid
graph TD
    A[nextConfig (Objeto Base con CSP e Imágenes)] --> B(Plugin `withNextIntl`);
    B --> C(HOC `withSentryConfig`);
    C --> D[Exportación Final];
Generación de Headers (CSP): En cada petición, la función asíncrona headers() se ejecuta en el servidor, generando un nonce criptográficamente seguro y una cabecera Content-Security-Policy estricta.
Envoltura de i18n: El objeto nextConfig es pasado al plugin withNextIntl, que inyecta la lógica necesaria para manejar el enrutamiento basado en locales.
Envoltura de Observabilidad: El resultado anterior es envuelto por withSentryConfig, que modifica la configuración de Webpack durante el build para subir los source maps a Sentry.
3. Contrato de API
Entradas:
Variables de Entorno (process.env): SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NEXT_PUBLIC_SUPABASE_URL.
Salidas:
Un objeto de configuración de Next.js, listo para ser consumido por el framework.
Cabeceras HTTP en cada respuesta del servidor (Content-Security-Policy, x-nonce).
4. Zona de Melhorias Futuras
CSP Dinámica: Externalizar las directivas de la CSP a un archivo de configuración separado (csp.config.mjs) para una mayor mantenibilidad.
Análisis de Bundle: Integrar @next/bundle-analyzer para generar un reporte visual del tamaño de los bundles de JavaScript, activable mediante una variable de entorno.
Configuración PWA: Añadir un plugin como next-pwa para habilitar funcionalidades de Progressive Web App (instalación, service workers, etc.).
Cabeceras de Seguridad Adicionales: Implementar otras cabeceras de seguridad recomendadas por OWASP (X-Content-Type-Options, Strict-Transport-Security, etc.) en la función headers.
Optimización de Fuentes: Configurar next/font para optimizar la carga de fuentes locales o de Google Fonts, mejorando el rendimiento (Core Web Vitals).
Redirecciones SEO: Utilizar la función redirects de Next.js para manejar redirecciones 301 permanentes para rutas obsoletas o cambios de URL.
Configuración Multi-Entorno: Implementar una lógica que ajuste la configuración (ej. deshabilitar Sentry) basándose en process.env.NODE_ENV para diferenciar development, preview y production.
Dominios de Imágenes Dinámicos: Cargar los remotePatterns para las imágenes desde una fuente externa (ej. una variable de entorno o un servicio de configuración) en lugar de tenerlos codificados.
Soporte para MDX: Integrar @next/mdx para permitir el uso de componentes de React dentro de archivos Markdown, enriqueciendo el contenido del blog.
Internacionalización de Dominios: Configurar la opción domains en el plugin de next-intl si el proyecto escala para usar un dominio diferente por cada idioma.
// .docs-espejo/next.config.mjs.md