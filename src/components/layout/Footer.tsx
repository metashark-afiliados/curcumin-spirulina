// src/components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Aparato de layout soberano y resiliente. Obtiene y VALIDA su
 *              propio contenido de i18n. Refactorizado para recibir un logger
 *              transaccional opcional (con tipado explícito `ILogger`) vía props,
 *              alineándose con la arquitectura de Inyección de Dependencias.
 * @version 7.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/layout/Footer.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { Mail, Shield } from "lucide-react";

import { Link, type Pathname } from "@/lib/navigation";
import {
  FooterContentSchema,
  type FooterContent,
} from "@/lib/validators/i18n/Footer.schema";
import { logger as fallbackLogger } from "@/lib/logger";
import { type ILogger } from "@/lib/types/logging";

// La firma del componente se actualiza para aceptar explícitamente nuestra interfaz ILogger.
interface FooterProps {
  logger?: ILogger;
}

export async function Footer({
  logger = fallbackLogger, // El fallbackLogger ya cumple con ILogger.
}: FooterProps): Promise<React.ReactElement | null> {
  const baseContext = { component: "Footer" };
  const t = await getTranslations("components.layout.Footer");
  let content: FooterContent;

  try {
    const rawContent = t.raw("");
    const validation = FooterContentSchema.safeParse(rawContent);
    if (!validation.success) {
      throw validation.error;
    }
    content = validation.data;
  } catch (error) {
    logger.error(
      { ...baseContext, err: error },
      "Error al obtener o validar contenido del Footer. No será renderizado."
    );
    return null;
  }

  logger.trace(baseContext, "Renderizando Footer soberano y validado.");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary-dark/80 text-white/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              {content.brandName}
            </h3>
            <p className="text-sm">{content.brandDescription}</p>
            <div>
              <a
                href={`mailto:${content.contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={16} />
                <span>{content.contact.email}</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              {content.legalTitle}
            </h3>
            <ul className="space-y-2">
              {content.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Pathname}
                    className="text-sm transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              {content.disclaimerTitle}
            </h3>
            <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs">
              <Shield
                size={28}
                className="mt-1 flex-shrink-0 text-brand-accent"
              />
              <div>
                <p className="font-bold">{content.affiliateDisclaimer.title}</p>
                <p>{content.affiliateDisclaimer.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
          <p className="mb-2">{content.scientificDisclaimer}</p>
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
}
// src/components/layout/Footer.tsx
