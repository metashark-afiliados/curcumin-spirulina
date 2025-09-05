// src/components/ui/PriceDisplay.tsx
/**
 * @file PriceDisplay.tsx
 * @description Aparato de UI soberano (Molécula). Exibe o preço de forma
 *              persuasiva e acessível, utilizando HTML semântico (<del>, <ins>)
 *              e atributos ARIA. Obtém todo o seu conteúdo de UI de i18n.
 * @version 6.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/PriceDisplay.tsx.md
 */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { clientLogger } from "@/lib/client-logger";

export interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice: number;
}

export function PriceDisplay({
  originalPrice,
  discountedPrice,
}: PriceDisplayProps) {
  const t = useTranslations("components.ui.PriceDisplay");
  const locale = useLocale();
  const currency = t("currency");

  clientLogger.trace("Renderizando componente soberano de preços.", {
    component: "PriceDisplay",
    locale,
    currency,
  });

  const formatPrice = (price: number): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (error) {
      clientLogger.error("Falha ao formatar preço.", {
        component: "PriceDisplay",
        locale,
        currency,
        price,
        error,
      });
      return `${price} ${currency}`;
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
