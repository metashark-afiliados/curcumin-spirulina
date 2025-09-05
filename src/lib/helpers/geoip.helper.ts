// src/lib/helpers/geoip.helper.ts
/**
 * @file geoip.helper.ts
 * @description Aparato de infraestructura SSoT para la lógica de detección de
 *              GeoIP en el servidor (Edge). Es responsable de extraer el país
 *              de la petición y mapearlo a un locale soportado.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/helpers/geoip.helper.ts.md
 */
import "server-only";

import { type NextRequest } from "next/server";

import { COUNTRY_TO_LOCALE_MAP } from "@/config/geoip.config";
import { serverLogger } from "@/lib/server-logger"; // <-- CORREÇÃO: Importação corrigida.

/**
 * @public
 * @function lookupCountryFromRequest
 * @description Extrae el código de país (ISO 3166-1 Alpha-2) de la cabecera
 *              `x-vercel-ip-country` inyectada por Vercel.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {string | null} El código del país o null si no se encuentra.
 */
export function lookupCountryFromRequest(request: NextRequest): string | null {
  try {
    const country = request.headers.get("x-vercel-ip-country");
    if (country) {
      serverLogger.trace(
        { country },
        "[GeoIP Helper] País detectado via Vercel header."
      );
      return country;
    }
    serverLogger.trace("[GeoIP Helper] Header de Vercel não encontrado.");
    return null;
  } catch (error) {
    serverLogger.error(
      { err: error },
      "[GeoIP Helper] Erro ao detectar o país."
    );
    return null;
  }
}

/**
 * @public
 * @function mapCountryToLocale
 * @description Mapea un código de país a un `AppLocale` soportado, consumiendo
 *              la SSoT desde `geoip.config.ts`.
 * @param {string | null} countryCode - El código del país a mapear.
 * @returns {string | undefined} El `AppLocale` correspondiente o undefined si
 *              no hay un mapeo definido.
 */
export function mapCountryToLocale(
  countryCode: string | null
): string | undefined {
  if (!countryCode) return undefined;

  const locale = COUNTRY_TO_LOCALE_MAP[countryCode.toUpperCase()];

  if (locale) {
    serverLogger.trace(
      { countryCode, locale },
      "[GeoIP Helper] País mapeado para locale."
    );
  }
  return locale;
}
// src/lib/helpers/geoip.helper.ts
