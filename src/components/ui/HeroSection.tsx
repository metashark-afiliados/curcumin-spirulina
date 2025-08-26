import { useTranslations } from "next-intl";

import { OrderForm } from "@/components/ui/OrderForm";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.1.0
 * @description Sección principal (Hero) de la página. Contiene el titular
 *              principal, la imagen del producto y el formulario de pedido.
 */
export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Columna de Texto y Título */}
        <div className="text-center md:text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg">{t("subtitle")}</p>
        </div>

        {/* Columna del Formulario */}
        <div>
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
