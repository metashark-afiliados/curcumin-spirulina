// src/components/layout/Footer.tsx
/**
 * @file Footer.tsx
 * @description Aparato de layout soberano, resiliente y atomizado. Actúa como
 *              un orquestador que obtiene y valida el contenido de i18n y lo
 *              delega a subcomponentes de presentación puros para el renderizado.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 8.1.0
 * @see .docs-espejo/components/layout/Footer.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";

import {
  FooterContentSchema,
  type FooterContent,
} from "@/lib/validators/i18n/Footer.schema";
import { logger } from "@/lib/logger";
import { Link, type Pathname } from "@/lib/navigation";
import { BrandInfoColumn } from "./_partials/footer/BrandInfoColumn";

// --- Subcomponentes Atómicos de Presentación Pura ---

const LegalLinksColumn = (
  props: Pick<FooterContent, "legalTitle" | "legalLinks">
) => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-white">{props.legalTitle}</h3>
    <ul className="space-y-2">
      {props.legalLinks.map((link) => (
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
);

const DisclaimerColumn = (
  props: Pick<FooterContent, "disclaimerTitle" | "affiliateDisclaimer">
) => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-white">{props.disclaimerTitle}</h3>
    <div className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs">
      <Shield size={28} className="mt-1 flex-shrink-0 text-brand-cta-red" />
      <div>
        <p className="font-bold">{props.affiliateDisclaimer.title}</p>
        <p>{props.affiliateDisclaimer.text}</p>
      </div>
    </div>
  </div>
);

// --- Orquestador Principal ---

async function loader(): Promise<FooterContent | null> {
  const baseContext = { component: "FooterLoader" };
  try {
    const t = await getTranslations("components.layout.Footer");
    const rawContent = t.raw("");
    const validation = FooterContentSchema.safeParse(rawContent);
    if (!validation.success) {
      throw validation.error;
    }
    logger.trace(baseContext, "Contenido del Footer cargado y validado.");
    return validation.data;
  } catch (error) {
    logger.error(
      { err: error, ...baseContext },
      "Fallo en carga o validación de contenido del Footer. No será renderizado."
    );
    return null;
  }
}

export async function Footer(): Promise<React.ReactElement | null> {
  const content = await loader();
  if (!content) {
    return null;
  }
  const t = await getTranslations("components.layout.Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-base-green-dark text-white/70">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <BrandInfoColumn
            brandName={content.brandName}
            brandDescription={content.brandDescription}
            contact={content.contact}
            socialLinks={content.socialLinks}
          />
          <LegalLinksColumn
            legalTitle={content.legalTitle}
            legalLinks={content.legalLinks}
          />
          <DisclaimerColumn
            disclaimerTitle={content.disclaimerTitle}
            affiliateDisclaimer={content.affiliateDisclaimer}
          />
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

