// src/lib/helpers/geoip.helper.ts
/**
 * @file src/lib/helpers/geoip.helper.ts
 * @description Aparato de infraestructura SSoT para la lógica de detección de
 *              GeoIP en el Edge Runtime. Es responsable de extraer el país
 *              de la petición y mapearlo a un locale soportado.
 *              **Ahora utiliza `edgeLogger` para la observabilidad,
 *              garantizando la compatibilidad con el Edge Runtime.**
 * @version 2.3.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/lib/helpers/geoip.helper.ts.md
 * @see src/config/geoip.config.ts (SSoT para el mapeo de GeoIP)
 * @see src/lib/edge-logger.ts (SSoT para el logger del Edge)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
// La directiva "server-only" se ha removido ya que este módulo se ejecuta en el Edge Runtime.
// No necesita "server-only" ni "use client".

import { type NextRequest } from "next/server";

import { COUNTRY_TO_LOCALE_MAP } from "@/config/geoip.config";
// IMPORTACIÓN CORREGIDA: Usar el logger específico para el Edge.
import { edgeLogger } from "@/lib/edge-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper"; // Para logs

/**
 * @public
 * @function lookupCountryFromRequest
 * @description Extrae el código de país (ISO 3166-1 Alpha-2) de la cabecera
 *              `x-vercel-ip-country` inyectada por Vercel.
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @returns {string | null} El código del país o null si no se encuentra.
 */
export function lookupCountryFromRequest(request: NextRequest): string | null {
  const currentCorrelationId = getCorrelationId(); // Obtener correlationId del contexto.
  try {
    const country = request.headers.get("x-vercel-ip-country");
    if (country) {
      // USO DE EDGELOGGER CORREGIDO: (context, message)
      edgeLogger.trace(
        {
          component: "GeoIPHelper",
          country,
          correlationId: currentCorrelationId,
        } as LogContext, // Aserción de tipo
        "[GeoIP Helper] País detectado vía Vercel header."
      );
      return country;
    }
    // USO DE EDGELOGGER CORREGIDO: (context, message)
    edgeLogger.trace(
      {
        component: "GeoIPHelper",
        correlationId: currentCorrelationId,
      } as LogContext,
      "[GeoIP Helper] Header de Vercel no encontrado."
    );
    return null;
  } catch (error) {
    // USO DE EDGELOGGER CORREGIDO: (context, message)
    edgeLogger.error(
      {
        component: "GeoIPHelper",
        err: error,
        correlationId: currentCorrelationId,
      } as LogContext,
      "[GeoIP Helper] Error al detectar el país."
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
  const currentCorrelationId = getCorrelationId(); // Obtener correlationId del contexto.
  if (!countryCode) {
    edgeLogger.trace(
      {
        component: "GeoIPHelper",
        correlationId: currentCorrelationId,
      } as LogContext,
      "[GeoIP Helper] No se proporcionó countryCode para mapear a locale."
    );
    return undefined;
  }

  const locale = COUNTRY_TO_LOCALE_MAP[countryCode.toUpperCase()];

  if (locale) {
    // USO DE EDGELOGGER CORREGIDO: (context, message)
    edgeLogger.trace(
      {
        component: "GeoIPHelper",
        countryCode,
        locale,
        correlationId: currentCorrelationId,
      } as LogContext,
      "[GeoIP Helper] País mapeado para locale."
    );
  } else {
    // USO DE EDGELOGGER CORREGIDO: (context, message)
    edgeLogger.trace(
      {
        component: "GeoIPHelper",
        countryCode,
        correlationId: currentCorrelationId,
      } as LogContext,
      `[GeoIP Helper] No se encontró mapeo para el país '${countryCode}'.`
    );
  }
  return locale;
}
// src/lib/helpers/geoip.helper.ts
