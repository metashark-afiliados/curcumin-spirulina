// src/components/ui/PriceDisplay.tsx
/**
 * @file PriceDisplay.tsx
 * @description Aparato de UI soberano (Molécula). Exibe o preço original e
 *              com desconto. Obtém seu conteúdo de UI (etiquetas, moeda) de
 *              i18n e recebe apenas os dados de negócio (preços) via props.
 * @version 5.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PriceDisplay.tsx.md
 */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { clientLogger } from "@/lib/logger";

export interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice: number;
}

/**
 * @component PriceDisplay
 * @description Renderiza a seção de preços, formatando os valores monetários.
 * @param {PriceDisplayProps} props - As propriedades com os dados de preço.
 * @returns {React.ReactElement} O componente de exibição de preços.
 */
export function PriceDisplay({
  originalPrice,
  discountedPrice,
}: PriceDisplayProps) {
  const t = useTranslations("components.ui.PriceDisplay");
  const locale = useLocale();

  const originalPriceLabel = t("originalPriceLabel");
  const discountedPriceLabel = t("discountedPriceLabel");
  const currency = t("currency");

  clientLogger.trace(
    { component: "PriceDisplay", locale, currency },
    "Renderizando componente soberano."
  );

  /**
   * @function formatPrice
   * @description Encapsula a lógica de formatação de moeda usando a API Intl.
   * @param {number} price - O valor numérico a ser formatado.
   * @returns {string} O preço formatado como string.
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
      clientLogger.error(
        {
          component: "PriceDisplay",
          locale,
          currency,
          price,
          error,
        },
        "Falha ao formatar preço. Verifique se o código da moeda é válido."
      );
      return `${price} ${currency}`; // Fallback seguro
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:gap-8">
      {/* Preço Original */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/60">
          {originalPriceLabel}
        </span>
        <span className="text-4xl font-light text-white/60 line-through">
          {formatPrice(originalPrice)}
        </span>
      </div>

      {/* Preço com Desconto */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/80">
          {discountedPriceLabel}
        </span>
        <span className="text-6xl font-bold text-white">
          {formatPrice(discountedPrice)}
        </span>
      </div>
    </div>
  );
}
// src/components/ui/PriceDisplay.tsx
