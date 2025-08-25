// src/lib/navigation.ts
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.2.0
 * @description Manifiesto de Enrutamiento y SSoT para la Internacionalización.
 *              Define los locales soportados, el mapeo de rutas y exporta los
 *              componentes y hooks de navegación tipo-seguros para toda la aplicación.
 *
 * @see https://next-intl.vercel.app/docs/routing/navigation
 */

/**
 * @constant locales
 * @description La lista canónica de todos los idiomas soportados por la aplicación.
 */
export const locales = ["it-IT", "en-US", "es-ES", "pt-BR"] as const;

/**
 * @type AppLocale
 * @description Un tipo que representa un locale válido en la aplicación.
 */
export type AppLocale = (typeof locales)[number];

/**
 * @constant pathnames
 * @description Mapeo de rutas canónicas a rutas localizadas.
 */
export const pathnames = {
  "/": "/",
};

/**
 * @constant localePrefix
 * @description Define cómo se maneja el prefijo del locale en la URL.
 */
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

/**
 * @typedef Route
 * @description Un tipo de élite para garantizar la seguridad de tipos en toda la navegación.
 */
type PathnameKeys = keyof typeof pathnames;
export type Route =
  | PathnameKeys
  | {
      pathname: PathnameKeys;
      params?: Record<string, string | number>;
    };

/**
 * MEJORA CONTINUA
 *
 * @version 1.2.0
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.2.0 - EXPANSÃO DE LOCALES: Adicionado suporte para 'pt-BR' (Português do Brasil) e corrigido para 'es-ES' (Espanhol da Espanha), expandindo o alcance internacional do projeto.
 * ((Implementada)) @version 1.1.0 - ALINEACIÓN CON API VIGENTE (VAA): Se ha eliminado el tipo `Pathnames` obsoleto.
 * ((Implementada)) @version 1.0.0 - ÚNICA FONTE DE VERDADE (SSoT): Este aparato centraliza toda a configuração de rotas e internacionalização.
 * ((Implementada)) @version 1.0.0 - NAVEGAÇÃO TIPO-SEGURA: Exporta componentes y hooks tipo-seguros.
 *
 */
