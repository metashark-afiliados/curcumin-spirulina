<!-- .docs-espejo/lib/navigation.ts.md -->
/**
 * @file .docs-espejo/lib/navigation.ts.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de navegación.
 * @author L.I.A. Legacy
 * @version 4.5.0
 */
# Manifiesto Conceptual: Aparato `lib/navigation.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa maestro y el motor del enrutamiento internacionalizado**. Actúa como la Única Fuente de Verdad (SSoT) canónica para la configuración de la internacionalización y la navegación en toda la aplicación. Sus responsabilidades son:

1.  **Definición de Locales Soportados:** Provee la lista completa y autoritativa de todos los idiomas que la aplicación soporta (`locales`) y el idioma por defecto (`defaultLocale`).
2.  **Mapeo de Rutas Canónicas:** Define un manifiesto de todas las rutas estáticas conocidas (`pathnames`), incluyendo la posibilidad de URLs traducidas para optimización SEO.
3.  **API de Navegación Internacionalizada:** Configura y exporta directamente los componentes y hooks (`Link`, `useRouter`, etc.) de `next-intl`, asegurando que toda la navegación en la aplicación sea consciente del `locale` actual.

Estratégicamente, este archivo centraliza toda la configuración de enrutamiento, haciendo que la aplicación sea robusta, mantenible y fácilmente extensible para soportar nuevos idiomas o estructuras de rutas, sin introducir inconsistencias.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración puro que exporta constantes y las funciones de navegación generadas por `next-intl`. No contiene lógica de ejecución compleja ni efectos secundarios, más allá de configurar el sistema de enrutamiento.

```mermaid
graph TD
    A["`src/lib/navigation.ts`"] -- Define `locales`, `defaultLocale`, `pathnames` --> B["`createLocalizedPathnamesNavigation`"];
    B -- "Genera y exporta" --> C["`Link`, `redirect`, `usePathname`, `useRouter`"];
    C -- "Son consumidos por" --> D["Toda la Aplicación (Client & Server Components)"];
    A -- "También es consumido por" --> E["`src/middleware.ts` (Detección de Locale)"];
    A -- "También es consumido por" --> F["`src/i18n.ts` (Validación de Locale)"];
    A -- "También es consumido por" --> G["`src/app/sitemap.xml/route.ts` (Generación de Sitemap)"];
La arquitectura es declarativa y confía en los tipos robustos proporcionados por la librería next-intl.
3. Contrato de API
locales: readonly AppLocale[]:
Propósito: Un array inmutable de strings que representa todos los identificadores de locales soportados (ej. ["it-IT", "en-US"]). Es la SSoT para la disponibilidad de idiomas.
AppLocale: type:
Propósito: Un tipo de unión de literales ("it-IT" | "en-US" | ...) inferido de locales, proporcionando tipado estricto para los identificadores de idioma.
defaultLocale: AppLocale:
Propósito: El locale predeterminado de la aplicación, utilizado como fallback.
pathnames: Record<string, string | Record<AppLocale, string>>:
Propósito: Un objeto que mapea rutas "canónicas" (sin locale) a sus versiones internacionalizadas. Puede contener strings directas para rutas no traducidas o objetos anidados para rutas con traducciones específicas por locale. Es la SSoT para la estructura de URLs.
Pathname: type:
Propósito: Un tipo de unión de literales inferido de las claves de pathnames, útil para tipar parámetros href en los componentes de navegación.
localePrefix: "always" | "as-needed" | "never":
Propósito: Configura cómo next-intl debe manejar el prefijo de locale en las URLs. "as-needed" es ideal para no mostrar el prefijo en el defaultLocale.
Link, redirect, usePathname, useRouter:
Propósito: Son las utilidades de navegación de next-intl, pre-configuradas con los locales, localePrefix y pathnames definidos en este archivo. Garantizan una navegación fluida y consciente del idioma en toda la aplicación.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Generación Automática de pathnames: Implementar un script (ej. pnpm gen:i18n:pathnames) que escanee las rutas del App Router (src/app/[locale]/...) y/o un archivo de configuración de rutas (routes.config.json) para generar automáticamente el objeto pathnames. Esto prevendría desincronizaciones manuales y errores al añadir nuevas páginas o locales.
Configuración de Dominios por Locale: Si el proyecto escalara a usar dominios específicos por idioma (ej. curcumin.it, curcumin.es), la configuración de next-intl en este archivo podría extenderse para soportar domains en lugar de (o además de) localePrefix.
Validación de pathnames en CI/CD: Crear una prueba que, durante el proceso de CI/CD, verifique que todas las rutas definidas en pathnames realmente existen en el sistema de archivos del App Router y que no hay rutas sin pathname asociado, garantizando la integridad.
Manejo Avanzado de fallbackLocale: En lugar de un único defaultLocale, next-intl permite configurar fallbackLocale como un objeto que mapea locales a otros locales (ej. {"fr": "en-US"}), lo cual podría ser útil si se introduce un idioma con menos soporte de traducción.
Integración con Sitemaps Dinámicos: Asegurar que src/app/sitemap.xml/route.ts importe directamente locales y pathnames de este archivo (lo cual ya hace) para una fuente de verdad única y consistente, mejorando la robustez del SEO técnico.
<!-- .docs-espejo/lib/navigation.ts.md -->