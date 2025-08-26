// src/components/ui/InfoSection.tsx
import { getTranslations } from "next-intl/server";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.2.0
 * @description Componente molecular que renderiza una sección de contenido
 *              informativo con títulos y párrafos, diseñada para explicar
 *              aspectos clave del producto.
 */
export async function InfoSection() {
  const t = await getTranslations("components.ui.InfoSection");

  return (
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
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.2.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.2.0 - CORREÇÃO DE NAMESPACE CRÍTICA: A chamada `getTranslations` foi atualizada para usar o namespace aninhado completo (`components.ui.InfoSection`), alinhando o componente com a arquitetura IMAS e corrigindo o erro `MISSING_MESSAGE` durante o build.
 * ((Implementada)) @version 1.1.0 - ARQUITETURA DE SERVER COMPONENT DE ÉLITE.
 */
