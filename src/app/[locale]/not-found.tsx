// src/app/[locale]/not-found.tsx
/**
 * @file src/app/[locale]/not-found.tsx
 * @description Manejador 404 soberano e internacionalizado. Refactorizado para
 *              pasar un nombre de ícono como string a FullScreenError,
 *              resolviendo el error de serialización de RSC.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/app/[locale]/not-found.tsx.md
 */
import "server-only";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { type Metadata } from "next";

import { FullScreenError } from "@/components/shared/FullScreenError";
import { logger } from "@/lib/logger";
import { Link } from "@/lib/navigation";
import {
  NotFoundContentSchema,
  type NotFoundContent,
} from "@/lib/validators/i18n/NotFound.schema";

interface NotFoundPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: NotFoundPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "app.notFound" });
  return {
    title: t("meta.title"),
  };
}

export default async function NotFoundPage({
  params: { locale },
}: NotFoundPageProps): Promise<React.ReactElement> {
  unstable_setRequestLocale(locale);
  logger.warn(
    { component: "NotFoundPage", locale },
    "Renderizando página 404 localizada. Esto indica un enlace roto o un error de tipeo del usuario."
  );

  const t = await getTranslations("app.notFound");
  let content: NotFoundContent;

  try {
    const rawContent = t.raw("");
    const validation = NotFoundContentSchema.safeParse(rawContent);
    if (!validation.success) throw validation.error;
    content = validation.data;
  } catch (error) {
    logger.error(
      { err: error, locale },
      "Fallo en la validación del contenido i18n para la página 404. Usando fallback."
    );
    content = {
      meta: { title: "Page Not Found" },
      title: "Error 404",
      description: "The page you are looking for could not be found.",
      backToHomeButton: "Back to Home",
    };
  }

  return (
    <FullScreenError
      iconName="TriangleAlert"
      title={content.title}
      description={content.description}
      iconClassName="text-yellow-400"
      actionSlot={
        <Link
          href="/"
          className="inline-block rounded-md bg-white px-8 py-3 font-bold text-brand-base-green-dark shadow-lg transition-transform hover:scale-105"
        >
          {content.backToHomeButton}
        </Link>
      }
    />
  );
}
// src/app/[locale]/not-found.tsx