// src/app/not-found.tsx
/**
 * @file src/app/not-found.tsx
 * @description Aparato soberano para la página 404 global. Corregido para
 *              utilizar el patrón de nomenclatura `Handler` y evitar la
 *              redeclaración de identificadores, asegurando una compilación limpia.
 * @version 8.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/not-found.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import type pino from "pino";

import { Link } from "@/lib/navigation";
import { withLogger } from "@/lib/helpers/with-logger.helper";
import { NotFoundContentSchema } from "@/lib/validators/i18n/NotFound.schema";

/**
 * @private
 * @function generateMetadataHandler
 * @description Lógica interna para generar los metadatos.
 */
async function generateMetadataHandler(logger: pino.Logger): Promise<Metadata> {
  const t = await getTranslations("app.notFound.meta");

  logger.trace(
    { component: "NotFoundPage", action: "generateMetadata" },
    "Generando metadatos para la página 404."
  );

  return { title: t("title") };
}
// Exporta la función envuelta con el nombre esperado por Next.js
export const generateMetadata = withLogger(generateMetadataHandler);

/**
 * @private
 * @function NotFoundPageHandler
 * @description Lógica interna para renderizar la página 404.
 */
async function NotFoundPageHandler(logger: pino.Logger): Promise<JSX.Element> {
  const t = await getTranslations("app.notFound");
  const baseContext = { component: "NotFoundPage" };

  const fallbackTexts = {
    title: "Error 404",
    description: "La página que buscas no existe o ha sido movida.",
    backToHomeButton: "Volver al Inicio",
  };

  let content;
  try {
    const rawContent = t.raw("");
    const validation = NotFoundContentSchema.safeParse({
      meta: {},
      ...rawContent,
    });

    if (!validation.success) {
      throw new Error(JSON.stringify(validation.error.flatten()));
    }
    content = validation.data;
  } catch (error) {
    logger.error(
      { ...baseContext, error },
      "Error al cargar/validar traducciones para 404. Usando fallbacks."
    );
    content = fallbackTexts;
  }

  logger.warn(
    { ...baseContext, title: content.title },
    "Renderizando página 404."
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-primary-dark p-8 text-center text-white">
      <TriangleAlert className="h-24 w-24 text-yellow-400" />
      <h1 className="mt-8 text-6xl font-extrabold tracking-tight">
        {content.title}
      </h1>
      <p className="mt-4 max-w-md text-lg text-white/80">
        {content.description}
      </p>
      <Link
        href="/"
        className="mt-12 inline-block rounded-md bg-white px-8 py-3 font-bold text-brand-primary-dark shadow-lg transition-transform hover:scale-105"
      >
        {content.backToHomeButton}
      </Link>
    </main>
  );
}
// Exporta el componente envuelto con el HOC.
export default withLogger(NotFoundPageHandler);
// src/app/not-found.tsx
