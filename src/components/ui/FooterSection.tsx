import { useTranslations } from "next-intl";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Componente molecular que renderiza el pie de página de la aplicación,
 *              conteniendo la información de copyright y los descargos de responsabilidad.
 */
export function FooterSection() {
  const t = useTranslations("FooterSection");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 py-8 text-white/70">
      <div className="container text-center text-sm">
        <p className="mb-4">{t("disclaimer")}</p>
        <p>
          &copy; {currentYear} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - CÁLCULO DINÁMICO DEL AÑO: El año del copyright se calcula dinámicamente, asegurando que siempre esté actualizado sin necesidad de mantenimiento manual.
 * ((Implementada)) @version 1.0.0 - FULL INTERNACIONALIZACIÓN: Todo el contenido textual se consume desde la capa de i18n.
 */
