<!-- .docs-espejo/lib/navigation.ts.md -->
/**
 * @file .docs-espejo/lib/navigation.ts.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de navegación.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `lib/navigation.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa maestro y el motor del enrutamiento internacionalizado**. Actúa como la Única Fuente de Verdad (SSoT) canónica para la configuración de la internacionalización y la navegación. Sus responsabilidades son:

1.  **Definir `locales` Soportados:** Provee la lista autoritativa de idiomas.
2.  **Definir `pathnames`:** Mapea las rutas canónicas de la aplicación.
3.  **Exportar la API de Navegación:** Configura y exporta los componentes y hooks de `next-intl`.

Estratégicamente, centraliza toda la configuración de enrutamiento, haciendo que la aplicación sea robusta, mantenible y fácilmente extensible.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración puro.

```mermaid
graph TD
    A["`navigation.ts` (Define SSoT)"] --> B["`createLocalizedPathnamesNavigation`"];
    B -- "Genera y exporta" --> C["`Link`, `redirect`, `usePathname`, `useRouter`"];
    C -- "Son consumidos por" --> D["Toda la Aplicación"];
    A -- "Es consumido por" --> E["`middleware.ts`"];
    A -- "Es consumido por" --> F["`i18n.ts`"];
3. Contrato de API
locales: readonly AppLocale[]: La lista de todos los locales soportados.
defaultLocale: AppLocale: El locale de fallback.
pathnames: Record<...>: El mapeo de las rutas estáticas.
Link, redirect, usePathname, useRouter: Las utilidades de navegación de next-intl pre-configuradas.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Generación Automática de pathnames: Implementar un script que escanee src/app/[locale] para generar el objeto pathnames automáticamente, previniendo desincronizaciones manuales.
Configuración de Dominios por locale: Extender la configuración para soportar dominios específicos por idioma (ej. dominio.it, dominio.es) si el proyecto escala.
Validación de pathnames en CI/CD: Crear una prueba en el CI/CD que verifique que todas las rutas en pathnames corresponden a una página real en el sistema de archivos.
Tipado de Link href: Utilizar Pathname para reforzar el tipado del href en el componente Link, asegurando que solo se puedan usar rutas válidas.
URLs Traducidas: Implementar URLs traducidas en el objeto pathnames (ej. "/about": { "es-ES": "/sobre-nosotros" }) para un mejor SEO internacional.
<!-- .docs-espejo/lib/navigation.ts.md -->