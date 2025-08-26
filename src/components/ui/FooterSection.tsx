// src/components/ui/FooterSection.tsx
import { getTranslations } from "next-intl/server";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.2.0
 * @description Componente molecular que renderiza el pie de página de la aplicación,
 *              conteniendo la información de copyright y los descargos de responsabilidad.
 */
export async function FooterSection() {
  const t = await getTranslations("components.ui.FooterSection");
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
 * @version 1.2.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.2.0 - CORREÇÃO DE NAMESPACE CRÍTICA: A chamada `getTranslations` foi atualizada para usar o namespace aninhado completo (`components.ui.FooterSection`), alinhando o componente com a arquitetura IMAS e corrigindo o erro `MISSING_MESSAGE` durante o build.
 * ((Implementada)) @version 1.1.0 - ARQUITETURA DE SERVER COMPONENT DE ÉLITE.
 */
