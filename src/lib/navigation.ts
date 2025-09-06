// src/lib/navigation.ts
/**
 * @file src/lib/navigation.ts
 * @description Manifiesto de Enrutamiento y Única Fuente de Verdad (SSoT) para la Internacionalización.
 *              Define todos los locales soportados, el mapeo de rutas canónicas y exporta
 *              directamente los componentes y hooks de navegación de `next-intl`, garantizando
 *              una coherencia absoluta en todo el sistema de enrutamiento.
 * @author L.I.A. Legacy
 * @version 5.0.0
 * @see .docs-espejo/lib/navigation.ts.md
 */
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

/**
 * @public
 * @constant locales
 * @description SSoT para la lista de idiomas disponibles.
 */
export const locales = ["it-IT", "en-US", "es-ES", "pt-BR"] as const;

/**
 * @public
 * @type AppLocale
 * @description Tipo de utilidad que representa cualquiera de los locales soportados.
 */
export type AppLocale = (typeof locales)[number];

/**
 * @public
 * @constant defaultLocale
 * @description El `AppLocale` por defecto de la aplicación.
 */
export const defaultLocale: AppLocale = "es-ES";

/**
 * @public
 * @constant pathnames
 * @description SSoT para las rutas de navegación estáticas. Mapea rutas canónicas a sus
 *              equivalentes (no se usan URLs traducidas en esta implementación).
 */
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/privacy-policy": "/privacy-policy",
  "/terms-of-service": "/terms-of-service",
};

/**
 * @public
 * @type Pathname
 * @description Tipo de utilidad que representa cualquiera de las rutas canónicas.
 */
export type Pathname = keyof typeof pathnames;

/**
 * @public
 * @constant localePrefix
 * @description Define la estrategia para prefijar las rutas con el locale.
 *              'as-needed': no añade prefijo para el `defaultLocale`.
 */
export const localePrefix = "as-needed";

/**
 * @public
 * @description API de navegación de `next-intl`, pre-configurada con nuestra SSoT
 *              de locales y rutas para un enrutamiento tipo-seguro y consciente del idioma.
 */
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as Record<string, string>,
  });
// src/lib/navigation.ts
