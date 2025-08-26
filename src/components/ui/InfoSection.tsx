import { useTranslations } from "next-intl";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente molecular que renderiza una sección de contenido
 *              informativo con títulos y párrafos, diseñada para explicar
 *              aspectos clave del producto.
 */
export function InfoSection() {
  const t = useTranslations("InfoSection");

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
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - ILUSTRACIONES O ÍCONOS: Añadir elementos visuales (íconos o pequeñas ilustraciones) junto a cada subtítulo para romper la monotonía del texto y mejorar la retención de la información.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - JERARQUÍA VISUAL CLARA: Utiliza una estructura semántica de `h2` y `h3` y consume los colores del Manifiesto de Branding para crear una jerarquía de información fácil de escanear por el usuario.
 * ((Implementada)) @version 1.0.0 - FULL INTERNACIONALIZACIÓN: Todo el contenido textual se obtiene de la capa de i18n.
 */
