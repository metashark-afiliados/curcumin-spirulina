// src/lib/helpers/geoip.helper.ts
/**
 * @file src/lib/helpers/geoip.helper.ts
 * @description Aparato de infraestructura atómico para la lógica de
 *              detección de GeoIP. Implementa una lógica pura, resiliente y
 *              simplificada para determinar la ubicación geográfica de un
 *              visitante a través de su IP.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/lib/helpers/geoip.helper.ts.md
 */
import "server-only";

import { type NextRequest } from "next/server";
import { COUNTRY_TO_LOCALE_MAP } from "@/config/geoip.config";
import { logger } from "@/lib/logger";

/**
 * @private
 * @function isPrivateIpAddress
 * @description Verifica si una dirección IP es privada (LAN).
 * @param {string} ip - La dirección IP a verificar.
 * @returns {boolean} `true` si la IP es privada.
 */
function isPrivateIpAddress(ip: string): boolean {
  const privateIpRegex =
    /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3})|(172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})|(192\.168\.\d{1,3}\.\d{1,3})|(127\.0\.0\.1)$/;
  return privateIpRegex.test(ip);
}

/**
 * @public
 * @async
 * @function getLocaleFromGeoIP
 * @description Determina un locale de la aplicación a partir de los datos
 *              geográficos de la dirección IP de la petición.
 * @param {NextRequest} request - El objeto de la petición entrante de Next.js.
 * @returns {Promise<string | undefined>} El locale mapeado (ej. "it-IT") o undefined
 *          si la detección falla o la IP no es relevante.
 */
export async function getLocaleFromGeoIP(
  request: NextRequest
): Promise<string | undefined> {
  const ip = request.ip;
  const context = { ip };

  if (!ip || isPrivateIpAddress(ip)) {
    logger.trace(
      context,
      "[GeoIPHelper] IP privada o inválida. Saltando lookup."
    );
    return undefined;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // Timeout agresivo

    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode`,
      {
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API response status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "fail" || !data.countryCode) {
      logger.warn(
        { ...context, reason: data.message },
        "[GeoIPHelper] API de GeoIP devolvió un fallo."
      );
      return undefined;
    }

    const countryCode = data.countryCode.toUpperCase();
    const locale = COUNTRY_TO_LOCALE_MAP[countryCode];

    if (locale) {
      logger.trace(
        { ...context, countryCode, detectedLocale: locale },
        "[GeoIPHelper] Locale detectado por GeoIP."
      );
    }

    return locale;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      logger.warn(context, "[GeoIPHelper] Lookup abortado por timeout.");
    } else {
      logger.error(
        { err: error, ...context },
        "[GeoIPHelper] Error de red en lookup."
      );
    }
    return undefined;
  }
}
// src/lib/helpers/geoip.helper.ts
