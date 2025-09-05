// src/app/not-found.tsx
/**
 * @file not-found.tsx
 * @description Aparato soberano para la página 404 global. Gestiona tanto
 *              el contenido del `<body>` como los metadatos del `<head>`.
 *              Implementa un patrón de resiliencia con fallback para garantizar
 *              que nunca falle.
 * @version 4.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/not-found.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { Link } from "@/lib/navigation";
import { serverLogger } from "@/lib/logger";

/**
 * @function generateMetadata
 * @description Genera los metadatos de SEO para la página 404. Es soberana
 *              en la obtención de sus propias traducciones.
 * @returns {Promise<Metadata>} El objeto de metadatos para Next.js.
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const t = await getTranslations("app.notFound.meta");
    return {
      title: t("title"),
    };
  } catch (error) {
    serverLogger.error(
      { err: error },
      "[NotFoundPage Metadata] Falha ao carregar traduções para metadados. Usando fallback."
    );
    return {
      title: "Page Not Found",
    };
  }
}

/**
 * @component NotFoundPage
 * @description El componente principal para la página 404.
 * @returns {Promise<React.ReactElement>} A página de erro 404.
 */
export default async function NotFoundPage() {
  let t;
  const fallbackTexts = {
    title: "Error 404",
    description:
      "The page you are looking for does not exist or has been moved.",
    backToHomeButton: "Back to Home",
  };

  try {
    t = await getTranslations("app.notFound");
  } catch (error) {
    serverLogger.error(
      { err: error },
      "[NotFoundPage] Falha ao carregar traduções. Usando textos de fallback."
    );
    t = (key: keyof typeof fallbackTexts) => fallbackTexts[key];
  }

  serverLogger.warn("[NotFoundPage] Renderizando página 404.");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-primary-dark p-8 text-center text-white">
      <TriangleAlert className="h-24 w-24 text-yellow-400" />
      <h1 className="mt-8 text-6xl font-extrabold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-lg text-white/80">{t("description")}</p>
      <Link
        href="/"
        className="mt-12 inline-block rounded-md bg-white px-8 py-3 font-bold text-brand-primary-dark shadow-lg transition-transform hover:scale-105"
      >
        {t("backToHomeButton")}
      </Link>
    </main>
  );
}
// src/app/not-found.tsx
