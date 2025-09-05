// .docs-espejo/next.config.mjs.md
/**
 * @file .docs-espejo/next.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Next.js.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `next.config.mjs`

## 1. Rol Estratégico y Propósito

Este aparato es el **Manifiesto de Configuración del Framework**. Su única responsabilidad es instruir a Next.js sobre cómo debe compilar, servir y asegurar la aplicación. Actúa como la SSoT para:

1.  **Estrategia de Build y Despliegue:** Define si la aplicación se genera como un sitio estático (`output: 'export'`) o como una aplicación dinámica renderizada en el servidor (SSR/ISR).
2.  **Políticas de Seguridad:** Configura las cabeceras de seguridad HTTP, como la Política de Seguridad de Contenido (CSP), y define una lista blanca de dominios de imágenes permitidos (`remotePatterns`).
3.  **Integración de Plugins:** Orquesta la envoltura de la configuración con plugins de alto nivel como `next-intl` y `@sentry/nextjs`.

## 2. Arquitectura de la Configuración

La configuración es un objeto JavaScript que se exporta y es consumido por la CLI de Next.js. La arquitectura clave se basa en la **composición de configuraciones** a través de funciones de orden superior (wrappers):

```mermaid
graph TD
    A[Objeto `nextConfig` base] --> B["`withNextIntl()`"];
    B --> C["`withSentryConfig()`"];
    C --> D[Configuración Final Exportada];
nextConfig: Contiene las directivas nativas de Next.js (images, headers).
withNextIntl(nextConfig): Envuelve la configuración base, inyectando la lógica necesaria para el enrutamiento y renderizado internacionalizado.
withSentryConfig(...): Envuelve la configuración ya internacionalizada, inyectando la lógica para la subida de sourcemaps y la instrumentación de Sentry.
3. Contrato de API
Entrada: Variables de entorno (process.env) para configurar dinámicamente la CSP, Sentry, etc.
Salida: Un objeto de configuración final que la CLI de next utiliza para los comandos dev, build, y start.
4. Zona de Melhorias Futuras
Análisis de Bundle: Integrar @next/bundle-analyzer para generar un reporte visual del tamaño de los paquetes de JavaScript, ayudando a identificar oportunidades de optimización.
Redirecciones SEO: Implementar la función redirects() para configurar redirecciones 301 permanentes para rutas antiguas o URLs canónicas.
Manejo de CSP más Granular: Extraer la configuración de la CSP a un archivo separado (csp.config.mjs) para mejorar la mantenibilidad y permitir reglas más complejas por ruta.
Documentación en Español: Traducir este documento espejo al español.
Optimización de Fuentes: Configurar la opción fontLoaders si se utilizan fuentes locales de una manera que requiera optimización específica de Webpack.
Configuración de rewrites: Utilizar la función rewrites() para actuar como un proxy inverso, útil para integrar servicios externos bajo la misma URL del dominio.
Soporte para PWA: Integrar @ducanh2912/next-pwa para añadir capacidades de Progressive Web App.
Variables de Entorno Públicas Estrictas: Utilizar env en la configuración para validar que todas las variables de entorno necesarias estén presentes durante el build, previniendo fallos en producción.
Build Experimental Flags: Explorar y probar flags experimentales de Next.js (ej. para optimizaciones de compilador) en un entorno de staging.
Soporte para Múltiples Dominios: Implementar una lógica en la configuración que adapte las remotePatterns o la CSP basándose en el HOSTNAME del entorno, para soportar dominios de staging y producción.
// .docs-espejo/next.config.mjs.md