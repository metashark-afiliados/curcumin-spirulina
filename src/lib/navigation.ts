// src/lib/navigation.ts
/**
 * @file src/lib/navigation.ts
 * @description Manifiesto de Enrutamiento y SSoT. Consume la configuración
 *              canónica de locales desde `locales.config.ts` para inicializar
 *              las utilidades de navegación de `next-intl`. Define los locales
 *              activos para este proyecto específico.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 6.0.0
 * @see .docs-espejo/lib/navigation.ts.md
 */
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { DEFAULT_LOCALE } from "@/config/locales.config";

/**
 * @public
 * @constant locales
 * @description SSoT para la lista de idiomas ACTIVOS en esta aplicación.
 *              Es un subconjunto curado de la lista exhaustiva en `locales.config.ts`.
 */
export const locales = ["it-IT", "pt-BR", "en-US", "es-ES"] as const;

/**
 * @public
 * @type AppLocale
 * @description Tipo de utilidad que representa cualquiera de los locales soportados.
 */
export type AppLocale = (typeof locales)[number];

/**
 * @public
 * @constant defaultLocale
 * @description El `AppLocale` por defecto de la aplicación, obtenido de la SSoT.
 */
export const defaultLocale: AppLocale = DEFAULT_LOCALE.code as AppLocale;

/**
 * @public
 * @constant pathnames
 * @description SSoT para las rutas de navegación estáticas de la aplicación.
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
