// src/app/global-error.tsx
/**
 * @file src/app/global-error.tsx
 * @description Componente de error global de Next.js (Client Component).
 *              Este componente captura y gestiona los errores de nivel superior
 *              que ocurren en la aplicación del lado del cliente.
 *              Reporta estos errores a Sentry para monitoreo de producción
 *              y registra una copia en la consola del navegador utilizando `clientLogger`
 *              para una observabilidad local y de desarrollo.
 * @version 1.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/app/global-error.tsx.md
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/global-error
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client"; // Es un Client Component para capturar errores del lado del cliente.

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

// IMPORTACIÓN ADICIONAL: Integramos nuestro logger de cliente para observabilidad local.
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @component GlobalError
 * @description Componente global para la captura y visualización de errores en el cliente.
 *              Garantiza que incluso los fallos críticos de UI sean reportados a Sentry
 *              y logueados localmente, manteniendo un "Escudo de Resiliencia" para la observabilidad.
 * @param {object} props - Propiedades del componente.
 * @param {Error & { digest?: string }} props.error - El objeto de error capturado por Next.js.
 * @returns {React.ReactElement}
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}): React.ReactElement {
  useEffect(() => {
    // 1. Reportar el error a Sentry para monitoreo en producción.
    Sentry.captureException(error);

    // 2. Registrar el error en la consola del navegador usando nuestro `clientLogger`.
    // Esto proporciona una capa adicional de observabilidad, especialmente en desarrollo,
    // o si Sentry no se inicializa correctamente o es bloqueado por un ad-blocker.
    clientLogger.error(
      {
        component: "GlobalError",
        errorName: error.name,
        errorDigest: error.digest,
        originalError: error,
      } as LogContext, // Aserción de tipo
      `[GlobalError] Se ha capturado un error global en el cliente: ${error.message}`
    );
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` es el componente de página de error por defecto de Next.js.
            Su definición de tipo requiere una prop `statusCode`. Sin embargo,
            dado que el App Router no expone códigos de estado para los errores
            capturados por `global-error.tsx`, simplemente pasamos `0` para
            renderizar un mensaje de error genérico. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
// src/app/global-error.tsx
