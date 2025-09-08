// src/app/not-found.tsx
/**
 * @file src/app/not-found.tsx
 * @description Aparato de fallback 404 global. Corregido para alinearse
 *              con la API actualizada de `FullScreenError`, pasando `iconName`
 *              en lugar del componente `icon`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.1.0
 * @see .docs-espejo/app/not-found.tsx.md
 */
import "server-only";

import { type Metadata } from "next";
import Link from "next/link";

import { FullScreenError } from "@/components/shared/FullScreenError";
import { withCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { logger } from "@/lib/logger";

export function generateMetadata(): Metadata {
  return { title: "404 - Page Not Found" };
}

async function GlobalNotFoundPage(): Promise<React.ReactElement> {
  logger.error(
    { component: "GlobalNotFoundPage" },
    "Renderizando página 404 GLOBAL. Esto puede indicar un problema grave de enrutamiento o un intento de escaneo."
  );

  return (
    <html>
      <body className="bg-brand-background font-sans text-white">
        <FullScreenError
          // CORRECCIÓN: Se pasa el nombre del ícono como string.
          iconName="TriangleAlert"
          title="Error 404"
          description="The page you are looking for does not exist or has been moved."
          iconClassName="text-yellow-400"
          actionSlot={
            <Link
              href="/"
              className="inline-block rounded-md bg-white px-8 py-3 font-bold text-brand-base-green-dark shadow-lg transition-transform hover:scale-105"
            >
              Back to Home
            </Link>
          }
        />
      </body>
    </html>
  );
}

export default withCorrelationId(GlobalNotFoundPage);
// src/app/not-found.tsx
