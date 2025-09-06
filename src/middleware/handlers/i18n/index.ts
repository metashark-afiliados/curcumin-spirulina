// src/middleware/handlers/i18n/index.ts
/**
 * @file src/middleware/handlers/i18n/index.ts
 * @description Manejador de middleware atómico para la internacionalización (i18n).
 *              Determina el `locale` más apropiado para cada petición y configura
 *              `next-intl` en consecuencia. Consume la SSoT para la configuración
 *              de locales y rutas, y recibe el `correlationId` explícitamente
 *              para una trazabilidad de élite en el Edge.
 * @author L.I.A. Legacy
 * @version 4.1.0
 * @see .docs-espejo/middleware/handlers/i18n/index.ts.md
 */
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import createNextIntlMiddleware from "next-intl/middleware";

import {
  lookupCountryFromRequest,
  mapCountryToLocale,
} from "@/lib/helpers/geoip.helper";
import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
  type AppLocale,
} from "@/lib/navigation";
import { edgeLogger } from "@/lib/edge-logger";
import { type LogContext } from "@/lib/types/logging";

function getLocaleFromRequest(
  request: NextRequest,
  correlationId: string
): AppLocale | undefined {
  const baseContext: LogContext = { component: "I18nHandler", correlationId };

  // 1. Detección por Cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as AppLocale)) {
    edgeLogger.trace(
      { ...baseContext, method: "cookie", locale: cookieLocale },
      "[I18nHandler] Locale detectado vía cookie."
    );
    return cookieLocale as AppLocale;
  }

  // 2. Detección por Cabecera `Accept-Language`
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    const matchedLocale = match(
      languages,
      [...locales],
      defaultLocale
    ) as AppLocale;
    edgeLogger.trace(
      {
        ...baseContext,
        method: "accept-language",
        locale: matchedLocale,
        languages,
      },
      "[I18nHandler] Locale detectado vía Accept-Language."
    );
    return matchedLocale;
  } catch (e) {
    edgeLogger.warn(
      { ...baseContext, err: e, languages },
      "[I18nHandler] Fallo al detectar locale vía Accept-Language."
    );
  }

  // 3. Detección por GeoIP (Fallback)
  // CORRECCIÓN DEFINITIVA: Se pasa el `correlationId` a las funciones del helper.
  const country = lookupCountryFromRequest(request, correlationId);
  const geoLocale = mapCountryToLocale(country, correlationId);
  if (geoLocale) {
    edgeLogger.trace(
      { ...baseContext, method: "geoip", locale: geoLocale, country },
      "[I18nHandler] Locale detectado vía GeoIP."
    );
    return geoLocale;
  }

  edgeLogger.warn(
    baseContext,
    "[I18nHandler] No se pudo determinar el locale por ningún método."
  );
  return undefined;
}

export async function handleI18n(
  request: NextRequest,
  correlationId: string
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const baseContext: LogContext = { component: "I18nHandler", correlationId };

  const isExcludedPath = pathname.startsWith("/select-language");
  if (isExcludedPath) {
    edgeLogger.trace(
      { ...baseContext, path: pathname },
      "[I18nHandler] Saltando procesamiento de i18n para ruta excluida."
    );
    return NextResponse.next();
  }

  const locale = getLocaleFromRequest(request, correlationId);

  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = "/select-language";
    edgeLogger.warn(
      { ...baseContext, path: pathname },
      "[I18nHandler] Redireccionando a /select-language."
    );
    return NextResponse.redirect(url);
  }

  const nextIntlMiddleware = createNextIntlMiddleware({
    locales: [...locales],
    localePrefix,
    pathnames,
    defaultLocale,
  });

  const response = nextIntlMiddleware(request);
  response.headers.set("x-app-locale", locale);

  edgeLogger.trace(
    { ...baseContext, locale, path: pathname },
    "[I18nHandler] Procesamiento de i18n completado."
  );

  return response;
}
// src/middleware/handlers/i18n/index.ts
