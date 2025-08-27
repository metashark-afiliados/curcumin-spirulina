import { getTranslations } from "next-intl/server";
import { AnimationWrapper } from "./AnimationWrapper";
import { OrderForm } from "@/components/ui/OrderForm";

export async function HeroSection() {
  const t = await getTranslations("components.ui.HeroSection");

  return (
    <AnimationWrapper>
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="text-center text-white md:text-left">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg">{t("subtitle")}</p>
          </div>
          <div>
            <OrderForm />
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
