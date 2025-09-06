// src/lib/helpers/geoip.helper.ts
/**
 * @file src/lib/helpers/geoip.helper.ts
 * @description Aparato de infraestructura atómico y SSoT para la lógica de
 *              detección de GeoIP en el Edge Runtime. Su única responsabilidad
 *              es extraer la información de geolocalización de una petición y
 *              mapearla a un `locale`, utilizando `edgeLogger` y un `correlationId`
 *              propagado explícitamente para una observabilidad completa.
 * @author L.I.A. Legacy
 * @version 4.0.0
 * @see .docs-espejo/lib/helpers/geoip.helper.ts.md
 */
import { type NextRequest } from "next/server";
import { COUNTRY_TO_LOCALE_MAP } from "@/config/geoip.config";
import { edgeLogger } from "@/lib/edge-logger";
import { type LogContext } from "@/lib/types/logging";
import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @function lookupCountryFromRequest
 * @description Extrae el código de país (ISO 3166-1 Alpha-2) de la cabecera
 *              `x-vercel-ip-country` inyectada por Vercel. Es resiliente a fallos.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @param {string} correlationId - El ID de correlación para el logging.
 * @returns {string | null} El código del país o `null` si no se encuentra o hay un error.
 */
export function lookupCountryFromRequest(
  request: NextRequest,
  correlationId: string
): string | null {
  const baseContext: LogContext = { component: "GeoIPHelper", correlationId };
  try {
    const country = request.headers.get("x-vercel-ip-country");
    if (country) {
      edgeLogger.trace(
        { ...baseContext, country },
        "[GeoIPHelper] País detectado vía Vercel header."
      );
      return country;
    }
    edgeLogger.trace(
      baseContext,
      "[GeoIPHelper] Header de Vercel no encontrado."
    );
    return null;
  } catch (error) {
    edgeLogger.error(
      { ...baseContext, err: error },
      "[GeoIPHelper] Error al intentar leer headers para detectar el país."
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
 * @param {string} correlationId - El ID de correlación para el logging.
 * @returns {AppLocale | undefined} El `AppLocale` correspondiente o `undefined` si
 *          no hay un mapeo definido.
 */
export function mapCountryToLocale(
  countryCode: string | null,
  correlationId: string
): AppLocale | undefined {
  const baseContext: LogContext = {
    component: "GeoIPHelper",
    countryCode,
    correlationId,
  };

  if (!countryCode) {
    return undefined;
  }

  const locale = COUNTRY_TO_LOCALE_MAP[countryCode.toUpperCase()];

  if (locale) {
    edgeLogger.trace(
      { ...baseContext, locale },
      `[GeoIPHelper] País '${countryCode}' mapeado a locale '${locale}'.`
    );
  } else {
    edgeLogger.trace(
      baseContext,
      `[GeoIPHelper] No se encontró mapeo de locale para el país '${countryCode}'.`
    );
  }
  return locale;
}
// src/lib/helpers/geoip.helper.ts
