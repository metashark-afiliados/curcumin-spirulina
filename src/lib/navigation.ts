// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto de Enrutamiento y SSoT para la Internacionalización.
 *              Define todos los locales soportados, el mapeo de rutas y exporta
 *              directamente los componentes y hooks de navegación de `next-intl`.
 * @version 4.4.0
 * @author L.I.A. Legacy
 */
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["it-IT", "en-US", "es-ES", "pt-BR"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es-ES";

export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/privacy-policy": "/privacy-policy",
  "/terms-of-service": "/terms-of-service",
  "/select-language": "/select-language",
};

export type Pathname = keyof typeof pathnames;
export const localePrefix = "as-needed";

// O logging foi removido para manter este módulo puro e compatível com o cliente.

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as Record<string, string>,
  });
// src/lib/navigation.ts
