// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto de Enrutamiento y SSoT para la Internacionalización.
 *              Define todos los locales soportados, el mapeo de rutas y exporta
 *              directamente los componentes y hooks de navegación de `next-intl`,
 *              confiando en sus tipos robustos.
 * @version 4.2.0
 * @author L.I.A. Legacy
 */
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { serverLogger } from "@/lib/logger";

export const locales = ["it-IT", "en-US", "es-ES", "pt-BR"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es-ES";

// SSoT para las rutas estáticas de la aplicación.
export const pathnames = {
  "/": "/",
  "/blog": "/blog",
  "/privacy-policy": "/privacy-policy",
  "/terms-of-service": "/terms-of-service",
  "/select-language": "/select-language",
};

export type Pathname = keyof typeof pathnames;

export const localePrefix = "as-needed";

serverLogger.info(
  {
    defaultLocale,
    supportedLocales: locales,
  },
  `[I18n SSoT] Configuração de navegação inicializada.`
);

// Exportar directamente los componentes y hooks. La librería gestiona
// la flexibilidad de la prop `href` de forma interna y correcta.
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames: pathnames as Record<string, string>,
  });
// src/lib/navigation.ts
