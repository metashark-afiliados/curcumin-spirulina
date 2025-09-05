// src/middleware/handlers/i18n/index.ts
/**
 * @file index.ts
 * @description Manejador de middleware atómico para i18n com um fluxo de
 *              detección de élite e fallback a uma página de seleção.
 * @version 2.1.0
 * @author L.I.A. Legacy
 */
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import createNextIntlMiddleware from "next-intl/middleware";
import {
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
} from "@/lib/navigation";
import { serverLogger } from "@/lib/server-logger"; // <-- CORREÇÃO: Importação corrigida.
import {
  lookupCountryFromRequest,
  mapCountryToLocale,
} from "@/lib/helpers/geoip.helper";

function getLocaleFromRequest(request: NextRequest): string | undefined {
  // 1. Prioridad Máxima: Cookie (Elección explícita del usuario)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    serverLogger.trace("[I18nHandler] Locale detectado via cookie.", {
      locale: cookieLocale,
    });
    return cookieLocale;
  }

  // 2. Prioridad Media: Cabecera 'Accept-Language' del navegador
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  try {
    const matchedLocale = match(languages, locales as any, defaultLocale);
    serverLogger.trace("[I18nHandler] Locale detectado via Accept-Language.", {
      locale: matchedLocale,
    });
    return matchedLocale;
  } catch (e) {
    // Ignorar error si no hay coincidencias
  }

  // 3. Prioridad Baja: GeoIP
  const country = lookupCountryFromRequest(request);
  const geoLocale = mapCountryToLocale(country);
  if (geoLocale) {
    serverLogger.trace("[I18nHandler] Locale detectado via GeoIP.", {
      locale: geoLocale,
    });
    return geoLocale;
  }

  return undefined;
}

export async function handleI18n(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/select-language")) {
    return NextResponse.next();
  }

  const locale = getLocaleFromRequest(request);

  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = "/select-language";
    serverLogger.warn(
      "[I18nHandler] No se pudo determinar el locale. Redireccionando a la página de selección."
    );
    return NextResponse.redirect(url);
  }

  const handle = createNextIntlMiddleware({
    locales,
    localePrefix,
    pathnames,
    defaultLocale,
  });

  const response = handle(request);
  response.headers.set("x-app-locale", locale);

  return response;
}
// src/middleware/handlers/i18n/index.ts
