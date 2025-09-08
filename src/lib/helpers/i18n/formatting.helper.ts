// src/lib/helpers/i18n/formatting.helper.ts
/**
 * @file formatting.helper.ts
 * @description Módulo de helpers puros para la internacionalización de formatos
 *              (monedas, fechas, números). SSoT para la lógica de formato.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/lib/helpers/i18n/formatting.helper.ts.md
 */
"use client";

import { clientLogger } from "@/lib/client-logger";

/**
 * @public
 * @function formatPrice
 * @description Formatea un número a una cadena de moneda localizada, con
 *              manejo de errores resiliente.
 * @param {number} price - El valor numérico del precio.
 * @param {string} locale - El código de locale (ej. "it-IT").
 * @param {string} currency - El código de moneda ISO 4217 (ej. "EUR").
 * @returns {string} La cadena del precio formateado.
 */
export function formatPrice(
  price: number,
  locale: string,
  currency: string
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    clientLogger.error(
      "[formatPriceHelper]",
      "Fallo al formatear precio. Usando fallback.",
      {
        locale,
        currency,
        price,
        error,
      }
    );
    // Fallback simple y robusto en caso de error.
    return `${price} ${currency}`;
  }
}
// src/lib/helpers/i18n/formatting.helper.ts
