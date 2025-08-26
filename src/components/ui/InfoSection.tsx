// src/components/ui/InfoSection.tsx
import { getTranslations } from "next-intl/server";
import { AnimationWrapper } from "./AnimationWrapper";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Componente molecular que renderiza una sección de contenido
 *              informativo. Ahora integra la animación de entrada para una
 *              experiencia de usuario moderna, respetando la arquitectura RSC.
 */
export async function InfoSection() {
  const t = await getTranslations("components.ui.InfoSection");

  return (
    <AnimationWrapper>
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl text-gray-800">
          <div className="space-y-8">
            {/* Bloque 1: ¿Qué es la termogénesis? */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-brand-primary">
                {t("block1.title")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{t("block1.p1")}</p>
            </div>

            {/* Bloque 2: ¿Por qué es difícil activarla? */}
            <div>
              <h3 className="text-2xl font-bold text-brand-primary-dark mb-2">
                {t("block2.title")}
              </h3>
              <p className="text-lg leading-relaxed">{t("block2.p1")}</p>
            </div>

            {/* Bloque 3: ¿Cómo puede ayudar el complejo? */}
            <div>
              <h3 className="text-2xl font-bold text-brand-primary-dark mb-2">
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
