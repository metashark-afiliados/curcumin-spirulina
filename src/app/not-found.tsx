// src/app/not-found.tsx
/**
 * @file not-found.tsx
 * @description Aparato soberano e resiliente para a página 404 global. Valida
 *              seu próprio conteúdo de i18n para garantir que nunca falhe.
 * @version 5.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/not-found.tsx.md
 */
import "server-only";

import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { Link } from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger";
import { NotFoundContentSchema } from "@/lib/validators/i18n/NotFound.schema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.notFound.meta");
  return { title: t("title") };
}

export default async function NotFoundPage() {
  const fallbackTexts = {
    title: "Error 404",
    description: "La página que buscas no existe o ha sido movida.",
    backToHomeButton: "Volver al Inicio",
  };

  let content;
  try {
    const t = await getTranslations("app.notFound");
    const rawContent = t.raw("");
    // El schema espera `meta`, lo proporcionamos vacío ya que no se usa aquí.
    const validation = NotFoundContentSchema.safeParse({
      meta: {},
      ...rawContent,
    });
    if (!validation.success) throw validation.error;
    content = validation.data;
  } catch (error) {
    // CORRECCIÓN: Firma del logger corregida para (contexto, mensaje).
    serverLogger.error(
      { err: error },
      "Falha ao carregar ou validar traduções para 404. Usando fallbacks."
    );
    content = fallbackTexts;
  }

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
// src/app/not-found.tsx
