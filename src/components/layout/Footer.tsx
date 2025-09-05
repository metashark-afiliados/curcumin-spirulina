// src/components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Aparato de layout soberano y de servidor. Actúa como un
 *              "Pie de Página de Confianza", obteniendo su propio contenido de i18n
 *              de forma asíncrona y renderizándolo de forma consistente.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Footer.tsx.md
 */
import "server-only";
import { getTranslations } from "next-intl/server";
import { Mail, Shield } from "lucide-react";
import { Link, type Pathname } from "@/lib/navigation";
import { serverLogger } from "@/lib/logger";

interface FooterLink {
  href: Pathname;
  label: string;
}

/**
 * @component Footer
 * @description Renderiza el pie de página completo de la aplicación. Es un
 *              componente soberano que obtiene todas sus traducciones internamente.
 * @returns {Promise<React.ReactElement>} El componente de pie de página.
 */
export async function Footer(): Promise<React.ReactElement> {
  const t = await getTranslations("components.layout.Footer");
  const currentYear = new Date().getFullYear();

  serverLogger.trace(
    { component: "Footer" },
    "Renderizando pie de página soberano de servidor."
  );

  const legalLinks: FooterLink[] = t.raw("legalLinks");

  return (
    <footer className="bg-brand-primary-dark/80 text-white/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Coluna de Contato e Marca */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{t("brandName")}</h3>
            <p className="text-sm">{t("brandDescription")}</p>
            <div>
              <a
                href={`mailto:${t("contact.email")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={16} />
                <span>{t("contact.email")}</span>
              </a>
            </div>
          </div>

          {/* Coluna de Links Legais */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">{t("legalTitle")}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de Disclaimers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              {t("disclaimerTitle")}
            </h3>
            <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs">
              <Shield
                size={28}
                className="mt-1 flex-shrink-0 text-brand-accent"
              />
              <div>
                <p className="font-bold">{t("affiliateDisclaimer.title")}</p>
                <p>{t("affiliateDisclaimer.text")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Copyright e Disclaimer Científico */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
          <p className="mb-2">{t("scientificDisclaimer")}</p>
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
// src/components/layout/Footer.tsx
