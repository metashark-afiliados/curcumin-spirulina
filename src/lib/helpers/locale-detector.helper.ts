// src/lib/helpers/locale-detector.helper.ts
/**
 * @file src/lib/helpers/locale-detector.helper.ts
 * @description Aparato de lógica pura y SSoT para la detección del locale.
 *              Implementa una estrategia de detección en cascada y está diseñado
 *              para ser puro (recibe sus dependencias como argumentos) para
 *              romper ciclos de importación y maximizar la testeabilidad. Su
 *              firma de retorno está fuertemente tipada para resolver el
 *              error TS2322 en su consumidor.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/lib/helpers/locale-detector.helper.ts.md
 */
import "server-only";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest } from "next/server";

import { getLocaleFromGeoIP } from "@/lib/helpers/geoip.helper";
import { type AppLocale } from "@/lib/navigation";

function getLocaleFromHeaders(
  request: NextRequest,
  locales: AppLocale[],
  defaultLocale: AppLocale
): AppLocale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  try {
    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();
    return match(languages, locales, defaultLocale) as AppLocale;
  } catch (e) {
    return defaultLocale;
  }
}

/**
 * @public
 * @async
 * @function detectLocale
 * @description Orquesta la detección del locale siguiendo una cascada de prioridades.
 * @param {NextRequest} request - El objeto de la petición.
 * @param {readonly AppLocale[]} locales - La lista de locales soportados.
 * @param {AppLocale} defaultLocale - El locale de fallback.
 * @returns {Promise<{locale: AppLocale, method: 'cookie' | 'header' | 'geoip' | 'default'}>}
 *          Un objeto con el `locale` detectado y el `method` utilizado.
 */
export async function detectLocale(
  request: NextRequest,
  locales: readonly AppLocale[],
  defaultLocale: AppLocale
): Promise<{
  locale: AppLocale;
  method: "cookie" | "header" | "geoip" | "default";
}> {
  // 1. Detección por Cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as AppLocale)) {
    return { locale: cookieLocale as AppLocale, method: "cookie" };
  }

  // 2. Detección por GeoIP (Asíncrona)
  const geoLocale = await getLocaleFromGeoIP(request);
  if (geoLocale && locales.includes(geoLocale as AppLocale)) {
    return { locale: geoLocale as AppLocale, method: "geoip" };
  }

  // 3. Detección por Cabecera 'Accept-Language'
  const headerLocale = getLocaleFromHeaders(
    request,
    [...locales], // `match` requiere un array mutable
    defaultLocale
  );
  // El headerLocale siempre devuelve un valor, por lo que no necesita una comprobación de existencia
  if (headerLocale) {
    return { locale: headerLocale, method: "header" };
  }

  // 4. Fallback (Aunque la lógica de getLocaleFromHeaders ya lo maneja, es una salvaguarda)
  return { locale: defaultLocale, method: "default" };
}
// src/lib/helpers/locale-detector.helper.ts
