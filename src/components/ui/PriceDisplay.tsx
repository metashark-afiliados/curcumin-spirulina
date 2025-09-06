// src/components/ui/PriceDisplay.tsx
/**
 * @file src/components/ui/PriceDisplay.tsx
 * @description Aparato de UI soberano (Molécula). Exibe el precio de forma
 *              persuasiva y accesible, utilizando HTML semántico (<del>, <ins>)
 *              y atributos ARIA. Obtiene todo el su contenido de UI de i18n.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa, registrando errores en el formateo de precios.
 * @version 6.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PriceDisplay.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useLocale, useTranslations } from "next-intl";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface PriceDisplayProps
 * @description Propiedades del componente `PriceDisplay`.
 */
export interface PriceDisplayProps {
  /**
   * @property {number} originalPrice - El precio original del producto sin descuento.
   */
  originalPrice: number;
  /**
   * @property {number} discountedPrice - El precio final del producto con descuento aplicado.
   */
  discountedPrice: number;
}

/**
 * @component PriceDisplay
 * @description Componente de presentación que muestra de forma destacada el precio
 *              original y el precio con descuento. Se encarga de formatear los
 *              precios según el locale y la moneda, y proporciona información de
 *              accesibilidad con atributos ARIA.
 * @param {PriceDisplayProps} props - Las propiedades para configurar la visualización de precios.
 * @returns {React.ReactElement}
 */
export function PriceDisplay({
  originalPrice,
  discountedPrice,
}: PriceDisplayProps): React.ReactElement {
  const t = useTranslations("components.ui.PriceDisplay");
  const locale = useLocale();
  const currency = t("currency");

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.trace(
    {
      component: "PriceDisplay",
      locale,
      currency,
      originalPrice,
      discountedPrice,
    },
    "Renderizando componente soberano de precios."
  );

  /**
   * @private
   * @function formatPrice
   * @description Formatea un número como una cadena de moneda según el locale actual.
   *              Incluye manejo de errores robusto.
   * @param {number} price - El valor numérico del precio a formatear.
   * @returns {string} El precio formateado como cadena de moneda.
   */
  const formatPrice = (price: number): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "PriceDisplay",
          locale,
          currency,
          price,
          error,
        } as LogContext, // Aserción de tipo para LogContext
        "Falha ao formatar preço."
      );
      return `${price} ${currency}`; // Fallback en caso de error.
    }
  };

  const formattedOriginal = formatPrice(originalPrice);
  const formattedDiscounted = formatPrice(discountedPrice);

  return (
    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:gap-8">
      {/* Preço Original */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/60">
          {t("originalPriceLabel")}
        </span>
        <del
          className="text-4xl font-light text-white/60"
          aria-label={t("originalPriceAriaLabel", {
            price: formattedOriginal,
          })}
        >
          {formattedOriginal}
        </del>
      </div>

      {/* Preço com Desconto */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/80">
          {t("discountedPriceLabel")}
        </span>
        <ins
          className="text-6xl font-bold text-white no-underline"
          aria-label={t("discountedPriceAriaLabel", {
            price: formattedDiscounted,
          })}
        >
          {formattedDiscounted}
        </ins>
      </div>
    </div>
  );
}
// src/components/ui/PriceDisplay.tsx
