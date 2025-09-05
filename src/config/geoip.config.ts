// src/config/geoip.config.ts
/**
 * @file geoip.config.ts
 * @description Manifiesto de Configuración y SSoT para el mapeo de GeoIP.
 *              Define la relación canónica entre los códigos de país de Vercel
 *              y los locales soportados por la aplicación.
 * @version 1.0.0
 * @author L.I.A. Legacy
 * @see src/lib/helpers/geoip.helper.ts (Consumidor)
 * @see src/lib/navigation.ts (Fuente de Verdad para AppLocale)
 */
import "server-only";

import { type AppLocale } from "@/lib/navigation";

/**
 * @public
 * @constant COUNTRY_TO_LOCALE_MAP
 * @description SSoT para el mapeo de códigos de país (ISO 3166-1 Alpha-2) a
 *              los `AppLocale` soportados. Este mapa está fuertemente tipado
 *              para garantizar que solo se puedan mapear locales válidos definidos
 *              en `navigation.ts`.
 */
export const COUNTRY_TO_LOCALE_MAP: Record<string, AppLocale> = {
  // Mapeo a Italiano
  IT: "it-IT",

  // Mapeo a Inglés (US)
  US: "en-US",
  GB: "en-US",

  // Mapeo a Español
  ES: "es-ES",
  MX: "es-ES",
  AR: "es-ES",
  CO: "es-ES",

  // Mapeo a Portugués (BR)
  BR: "pt-BR",
  PT: "pt-BR",
};
// src/config/geoip.config.ts
