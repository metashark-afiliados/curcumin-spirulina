import { useTranslations } from "next-intl";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente de UI atómico y de presentación puro. Muestra el precio
 *              original y el precio con descuento. Diseñado con una filosofía
 *              Mobile First.
 */

export interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice: number;
  locale: string;
}

export function PriceDisplay({
  originalPrice,
  discountedPrice,
  locale,
}: PriceDisplayProps) {
 const t = useTranslations("components.ui.OrderForm");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR", // Moneda base, el formato se adapta al locale.
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left p-4">
      {/* Precio Original */}
      <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
        <span className="text-sm font-medium text-gray-400">
          {t("originalPriceLabel")}
        </span>
        <span className="text-4xl font-light text-gray-400 line-through">
          {formatPrice(originalPrice)}
        </span>
      </div>

      {/* Precio con Descuento */}
      <div className="flex flex-col items-center md:items-end">
        <span className="text-sm font-medium text-gray-200">
          {t("discountedPriceLabel")}
        </span>
        <span className="text-6xl font-bold text-white">
          {formatPrice(discountedPrice)}
        </span>
      </div>
    </div>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - MOBILE FIRST DESIGN: O layout padrão é vertical (`flex-col`) e transita para horizontal (`md:flex-row`).
 * ((Implementada)) @version 1.0.0 - FORMATAÇÃO INTERNACIONALIZADA: Utiliza `Intl.NumberFormat` para formatar a moeda corretamente de acordo com o `locale`.
 * ((Implementada)) @version 1.0.0 - COMPONENTE PURO: 100% controlado por props para máxima reutilização.
 */
