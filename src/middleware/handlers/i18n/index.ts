// src/middleware/handlers/i18n/index.ts
/**
 * @file src/middleware/handlers/i18n/index.ts
 * @description Manejador de internacionalización (i18n) de élite. Orquesta
 *              la detección de locale y el enrutamiento, implementando la lógica
 *              de fallback a una página de selección de idioma.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/middleware/handlers/i18n/index.ts.md
 */
import "server-only";

import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { detectLocale } from "@/lib/helpers/locale-detector.helper";
import { logger } from "@/lib/logger";
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from "@/lib/navigation";

/**
 * @public
 * @async
 * @function handleI18n
 * @description El manejador principal de i18n. Orquesta la detección y el
 *              enrutamiento basado en el locale del usuario.
 * @param {NextRequest} request - La petición entrante.
 * @param {NextResponse} response - La respuesta del manejador anterior.
 * @returns {Promise<NextResponse>} La respuesta final (potencialmente modificada).
 */
export async function handleI18n(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const { locale, method } = await detectLocale(
    request,
    locales,
    defaultLocale
  );

  logger.trace(
    { detectedLocale: locale, detectionMethod: method },
    "[I18nHandler] Detección de locale completada."
  );

  // Si el método es 'default', redirigimos al selector de idioma.
  // Se añade una comprobación para evitar un bucle de redirección si ya estamos en la página.
  if (
    method === "default" &&
    !request.nextUrl.pathname.startsWith("/select-language")
  ) {
    logger.info(
      { path: request.nextUrl.pathname },
      "[I18nHandler] No se detectó locale preferido. Redirigiendo a /select-language."
    );
    const redirectUrl = new URL("/select-language", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Si se detectó un locale, usamos el middleware de next-intl.
  const handle = createIntlMiddleware({
    locales,
    localePrefix,
    pathnames: pathnames as Record<string, string>,
    defaultLocale: locale, // Se usa el locale detectado para la petición actual
  });

  const intlResponse = handle(request);

  intlResponse.headers.set("x-app-locale", locale);

  return intlResponse;
}
// src/middleware/handlers/i18n/index.ts
