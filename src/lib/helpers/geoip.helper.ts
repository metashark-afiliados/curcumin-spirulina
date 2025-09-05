// src/lib/helpers/geoip.helper.ts
/**
 * @file geoip.helper.ts
 * @description Aparato de infraestructura SSoT para la detección de GeoIP en
 *              el servidor (Edge).
 * @version 1.1.0
 * @author L.I.A. Legacy
 */
import "server-only";

import { type NextRequest } from "next/server";
import { serverLogger } from "@/lib/logger";

const countryToLocaleMap: Record<string, string> = {
  IT: "it-IT",
  US: "en-US",
  GB: "en-US",
  ES: "es-ES",
  MX: "es-ES",
  AR: "es-ES",
  CO: "es-ES",
  BR: "pt-BR", // Mapeo añadido
  PT: "pt-BR", // Mapeo añadido
};

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

export function mapCountryToLocale(
  countryCode: string | null
): string | undefined {
  if (!countryCode) return undefined;
  const locale = countryToLocaleMap[countryCode.toUpperCase()];
  if (locale) {
    serverLogger.trace(
      { countryCode, locale },
      "[GeoIP Helper] País mapeado para locale."
    );
  }
  return locale;
}
// src/lib/helpers/geoip.helper.ts
