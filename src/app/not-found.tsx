// src/app/not-found.tsx
/**
 * @file src/app/not-found.tsx
 * @description Aparato soberano y resiliente para la página 404 global.
 *              Captura todas las peticiones a rutas no existentes y presenta
 *              una página de error 404 clara, útil e internacionalizada.
 *              Valida su propio contenido de i18n para garantizar que nunca
 *              falle, utilizando textos de fallback.
 *              **Configurado para forzar la estaticidad para optimizar el prerrenderizado.**
 * @version 5.2.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/not-found.tsx.md
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 * @see src/lib/logger.ts (SSoT para `serverLogger`)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 * @see src/lib/validators/i18n/NotFound.schema.ts (SSoT para la validación del contenido i18n)
 */
import "server-only"; // Este componente se ejecuta estrictamente en el servidor.

import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import { Link } from "@/lib/navigation";
import { serverLogger } from "@/lib/logger";
import { NotFoundContentSchema } from "@/lib/validators/i18n/NotFound.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

// IMPORTANTE: Para forzar la estaticidad de la página 404.
// Next.js intentará prerrenderizar esta página en tiempo de build,
// lo que es ideal para un error 404 estático y eficiente.
// Si hay alguna dependencia dinámica irresoluble, Next.js lo reportará.
export const dynamic = "force-static";

/**
 * @public
 * @function generateMetadata
 * @description Genera los metadatos SEO para la página 404.
 * @returns {Promise<Metadata>} Los metadatos de la página.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.notFound.meta");
  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "NotFoundPage", action: "generateMetadata" } as LogContext, // Aserción de tipo
    "Generando metadatos para la página 404."
  );
  return { title: t("title") };
}

/**
 * @public
 * @component NotFoundPage
 * @description Componente de página para errores 404 (página no encontrada).
 *              Obtiene y valida su contenido de i18n, proporcionando textos de
 *              fallback para resiliencia. Muestra un icono, un título, una
 *              descripción y un botón para volver a la página de inicio.
 * @returns {Promise<JSX.Element>} La página 404 renderizada.
 */
export default async function NotFoundPage(): Promise<JSX.Element> {
  const fallbackTexts = {
    title: "Error 404",
    description: "La página que buscas no existe o ha sido movida.",
    backToHomeButton: "Volver al Inicio",
  };

  let content;
  try {
    const t = await getTranslations("app.notFound");
    const rawContent = t.raw(""); // Obtenemos todo el namespace para validación.
    const validation = NotFoundContentSchema.safeParse({
      meta: {}, // El schema espera meta, lo proporcionamos vacío ya que generateMetadata lo maneja.
      ...rawContent,
    });
    if (!validation.success) {
      // USO DE SERVERLOGGER: (context, message)
      serverLogger.error(
        {
          component: "NotFoundPage",
          error: validation.error.flatten(),
          rawContent,
        },
        "Falló la validación de contenido de la página 404. Usando fallbacks."
      );
      throw new Error(
        `Validação de conteúdo de NotFoundPage falhou: ${JSON.stringify(
          validation.error.flatten()
        )}`
      );
    }
    content = validation.data;
  } catch (error) {
    // USO DE SERVERLOGGER: (context, message)
    serverLogger.error(
      { error, component: "NotFoundPage" } as LogContext, // Aserción de tipo
      "Error fatal al cargar o validar traducciones para 404. Usando fallbacks."
    );
    content = fallbackTexts; // Asegura que siempre haya contenido.
  }

  // USO DE SERVERLOGGER: (context, message)
  serverLogger.trace(
    { component: "NotFoundPage", title: content.title },
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
// src/app/not-found.tsx
