import { getTranslations } from "next-intl/server";
import { AnimationWrapper } from "./AnimationWrapper";

export async function InfoSection() {
  const t = await getTranslations("components.ui.InfoSection");

  return (
    <AnimationWrapper>
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl text-gray-800">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-brand-primary">
                {t("block1.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{t("block1.p1")}</p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-brand-primary-dark">
                {t("block2.title")}
              </h3>
              <p className="text-lg leading-relaxed">{t("block2.p1")}</p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-brand-primary-dark">
                {t("block3.title")}
              </h3>
              <p className="text-lg leading-relaxed">{t("block3.p1")}</p>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
