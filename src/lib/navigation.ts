// src/lib/navigation.ts
/**
 * @file src/lib/navigation.ts
 * @description Manifiesto de Enrutamiento y Única Fuente de Verdad (SSoT) para la Internacionalización.
 *              Define todos los locales soportados, el mapeo de rutas canónicas y exporta
 *              directamente los componentes y hooks de navegación de `next-intl`.
 *              Este aparato es fundamental para la coherencia del enrutamiento global y la
 *              pre-renderización estática (SSG) de páginas internacionalizadas.
 * @version 4.5.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/navigation.ts.md
 * @see src/middleware.ts (Consumidor principal para la detección y redirección de locale)
 * @see src/middleware/handlers/i18n/index.ts (Consumidor para la lógica de detección de locale en Edge)
 * @see src/i18n.ts (Consumidor principal para la validación y carga de mensajes)
 * @see src/app/sitemap.xml/route.ts (Consumidor para generar entradas de sitemap multilingües)
 */
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

/**
 * @public
 * @constant locales
 * @description Array inmutable que define todos los `AppLocale` soportados por la aplicación.
 *              Esta es la Única Fuente de Verdad (SSoT) para la lista de idiomas disponibles,
 *              garantizando coherencia en el middleware, i18n y la generación de rutas.
 */
export const locales = ["it-IT", "en-US", "es-ES", "pt-BR"] as const;

/**
 * @public
 * @type AppLocale
 * @description Tipo de utilidad que representa cualquiera de los locales definidos en `locales`.
 */
export type AppLocale = (typeof locales)[number];

/**
 * @public
 * @constant defaultLocale
 * @description El `AppLocale` por defecto de la aplicación. Se utiliza como fallback
 *              cuando no se puede determinar la preferencia de idioma del usuario.
 */
export const defaultLocale: AppLocale = "es-ES";

/**
 * @public
 * @constant pathnames
 * @description Objeto que mapea las rutas canónicas no-localizadas a sus equivalentes
 *              internacionalizados (si se requieren URLs traducidas). Para rutas
 *              no traducidas, la clave y el valor son idénticos.
 *              Esta es la SSoT para las rutas de navegación estáticas.
 * @example
 * ```typescript
 * {
 *   "/": "/",
 *   "/blog": "/blog", // Ruta no traducida
 *   "/about": {
 *     "en-US": "/about",
 *     "es-ES": "/nosotros", // Ejemplo de ruta traducida
 *   }
 * }
 * ```
 */
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/privacy-policy": "/privacy-policy",
  "/terms-of-service": "/terms-of-service",
  "/select-language": "/select-language",
};

/**
 * @public
 * @type Pathname
 * @description Tipo de utilidad que representa cualquiera de las rutas canónicas
 *              definidas en `pathnames`. Útil para tipar enlaces y redirecciones.
 */
export type Pathname = keyof typeof pathnames;

/**
 * @public
 * @constant localePrefix
 * @description Define la estrategia para prefijar las rutas con el locale.
 *              `"always"`: `example.com/en-US/page`
 *              `"as-needed"`: `example.com/page` (para el locale por defecto), `example.com/en-US/page`
 */
export const localePrefix = "as-needed"; // Usado para que el locale por defecto no tenga prefijo en la URL.

// Las funciones y componentes de navegación de `next-intl` son exportados directamente
// para ser utilizados en toda la aplicación, garantizando que siempre sean
// conscientes del locale. Este módulo no necesita logging interno, ya que
// su rol es puramente de configuración y las llamadas a estas utilidades
// se loguearán en los componentes que las consumen si es necesario.
/**
 * @public
 * @constant Link
 * @description Componente de `next-intl` que proporciona un `<Link>` para la navegación
 *              entre rutas internacionalizadas, manejando automáticamente los prefijos de locale.
 */
/**
 * @public
 * @constant redirect
 * @description Función de `next-intl` para realizar redirecciones de servidor
 *              hacia rutas internacionalizadas.
 */
/**
 * @public
 * @constant usePathname
 * @description Hook de `next-intl` para obtener la ruta actual sin el prefijo de locale.
 */
/**
 * @public
 * @constant useRouter
 * @description Hook de `next-intl` para acceder a la instancia del router,
 *              compatible con rutas internacionalizadas.
 */
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    // La conversión a `Record<string, string>` es necesaria debido a la
    // naturaleza de `pathnames` que puede tener objetos anidados para
    // rutas traducidas, y `createLocalizedPathnamesNavigation` espera
    // un formato más simple cuando no hay traducciones explícitas por cada locale.
    pathnames: pathnames as Record<string, string>,
  });
// src/lib/navigation.ts
