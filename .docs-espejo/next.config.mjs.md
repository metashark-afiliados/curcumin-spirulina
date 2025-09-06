// .docs-espejo/next.config.mjs.md
/**
 * @file .docs-espejo/next.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Next.js.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `next.config.mjs`

## 1. Rol Estratégico y Propósito
El archivo `next.config.mjs` es la **SSoT para el comportamiento del framework Next.js**. Define cómo se construye, se sirve y se enruta la aplicación. Su propósito es centralizar configuraciones críticas que afectan el rendimiento, la seguridad y la funcionalidad global. La refactorización actual lo integra con el plugin de `next-intl`, un paso crucial para la arquitectura de internacionalización.

## 2. Arquitectura y Flujo de Ejecución
Este archivo no tiene un flujo de ejecución en tiempo de ejecución, sino en tiempo de **construcción y arranque**.

```mermaid
graph TD
    A[pnpm run build] --> B{next.config.mjs};
    B -- Carga Plugins --> C[withNextIntl];
    C -- Modifica Config de Webpack --> D[Build Optimizado para i18n];
3. Contrato de API
Exportación por Defecto: Un objeto de configuración de Next.js, posiblemente envuelto en uno o más plugins de alto orden.
4. Zona de Melhorias Futuras
Integrar withSentryConfig: Para el reporte automático de sourcemaps a Sentry.
Integrar @next/bundle-analyzer: Para auditar el tamaño de los bundles.
Añadir headers para CSP: Para mejorar la seguridad de la aplicación.
Configurar images.remotePatterns: Para la optimización de imágenes externas.
Integrar next-pwa: Para añadir capacidades de Progressive Web App.
Añadir redirects: Para manejar redirecciones 301 a nivel de servidor.
Añadir rewrites: Para mapear rutas internamente sin cambiar la URL.
Habilitar instrumentationHook: Para ejecutar código en el arranque del servidor.
Lógica por Entorno: Añadir condicionales para cargar diferentes configuraciones en development vs production.
Validación de Configuración: Utilizar Zod para validar las variables de entorno utilizadas en la configuración.
// .docs-espejo/next.config.mjs.md