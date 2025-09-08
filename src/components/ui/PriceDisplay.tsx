// src/components/ui/PriceDisplay.tsx
/**
 * @file src/components/ui/PriceDisplay.tsx
 * @description Aparato de UI soberano (Molécula). Exibe o preço de forma
 *              persuasiva e acessível. Atomizado para delegar a lógica de
 *              formato a um helper especializado, focando-se apenas na apresentação.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 8.0.0
 * @see .docs-espejo/components/ui/PriceDisplay.tsx.md
 */
"use client";

import { useLocale, useTranslations } from "next-intl";

import { formatPrice } from "@/lib/helpers/i18n/formatting.helper";
import { clientLogger } from "@/lib/client-logger";

export interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice: number;
}

export function PriceDisplay({
  originalPrice,
  discountedPrice,
}: PriceDisplayProps): React.ReactElement {
  const t = useTranslations("components.ui.PriceDisplay");
  const locale = useLocale();
  const currency = t("currency");

  clientLogger.trace(
    "[PriceDisplay]",
    "Renderizando componente de presentación de precios.",
    { locale, currency, originalPrice, discountedPrice }
  );

  // LÓGICA: La lógica de formato ahora se consume desde el helper SSoT.
  const formattedOriginal = formatPrice(originalPrice, locale, currency);
  const formattedDiscounted = formatPrice(discountedPrice, locale, currency);

  return (
    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:gap-8">
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
