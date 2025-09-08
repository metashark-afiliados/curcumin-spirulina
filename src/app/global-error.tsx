// src/app/global-error.tsx
/**
 * @file src/app/global-error.tsx
 * @description Componente de error global resiliente e internacionalizado.
 *              Refactorizado para aceptar un nombre de ícono y consumir el
 *              componente de UI `FullScreenError` como Client Component.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 7.0.0
 * @see .docs-espejo/app/global-error.tsx.md
 */
"use client";

import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { FullScreenError } from "@/components/shared/FullScreenError";
import { clientLogger } from "@/lib/client-logger";
import { Link } from "@/lib/navigation";
import {
  type GlobalErrorContent,
  GlobalErrorContentSchema,
} from "@/lib/validators/i18n/GlobalError.schema";

/**
 * @public
 * @component GlobalError
 * @description Componente global para la captura y visualización de errores en el cliente.
 *              Reporta a Sentry, registra localmente y delega la renderización de la
 *              UI al componente `FullScreenError`.
 * @param {object} props - Propiedades del componente.
 * @param {Error & { digest?: string }} props.error - El objeto de error capturado.
 * @returns {React.ReactElement}
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): React.ReactElement {
  const t = useTranslations("app.globalError");

  useEffect(() => {
    Sentry.captureException(error);
    clientLogger.error(
      {
        component: "GlobalError",
        errorName: error.name,
        errorDigest: error.digest,
        originalError: error,
      },
      `Error global de cliente capturado: ${error.message}`
    );
  }, [error]);

  const fallbackContent: GlobalErrorContent = {
    title: "An Error Occurred",
    description:
      "We're sorry, something went wrong. Our team has been notified.",
    backToHomeButton: "Back to Home",
  };

  let content: GlobalErrorContent;
  try {
    const rawContent = t.raw("");
    const validation = GlobalErrorContentSchema.safeParse(rawContent);
    if (!validation.success) throw validation.error;
    content = validation.data;
  } catch (err) {
    clientLogger.error(
      { component: "GlobalError", error: err },
      "Fallo al validar contenido i18n para la página de error global."
    );
    content = fallbackContent;
  }

  return (
    <html>
      <body className="bg-brand-background font-sans text-white">
        <FullScreenError
          iconName="ServerCrash"
          title={content.title}
          description={content.description}
          actionSlot={
            <Link
              href="/"
              className="inline-block rounded-md bg-white px-8 py-3 font-bold text-brand-base-green-dark shadow-lg transition-transform hover:scale-105"
            >
              {content.backToHomeButton}
            </Link>
          }
        />
      </body>
    </html>
  );
}
// src/app/global-error.tsx
