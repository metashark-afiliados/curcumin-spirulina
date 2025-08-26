// src/middleware.ts
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

import { locales } from "@/lib/navigation";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 5.0.0
 * @description Middleware de internacionalización (i18n) de élite. Implementa
 *              una estrategia de detección de locale con la siguiente prioridad:
 *              1. Anulación por Cookie (`NEXT_LOCALE`) para desarrollo.
 *              2. Detección por cabecera `Accept-Language`.
 *              3. Locale por defecto (`pt-BR`).
 */
const defaultLocale = "pt-BR";

function getLocale(request: NextRequest): string {
  // 1. Prioridad: Anulación por Cookie para desarrolladores
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 2. Prioridad: Cabecera Accept-Language
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(languages, locales as any, defaultLocale);
  } catch (error) {
    // Si hay un error en el matching, recurrir al locale por defecto.
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Omitir rutas de assets y API
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

/**
 * MEJORA CONTINUA
 *
 * @version 5.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 5.0.0 - CORREÇÃO DE CONTRATO DE API (VAA): O middleware foi completamente refatorizado para uma implementação manual explícita, resolvendo o erro crítico de tipo. A tentativa anterior de usar `localeDetection` como uma função violava o contrato da API de `next-intl`.
 * ((Implementada)) @version 5.0.0 - LÓGICA DE DETECÇÃO PRIORIZADA: A nova implementação estabelece uma cadeia de prioridade clara e robusta para a detecção de idioma (Cookie > `Accept-Language` > Padrão), garantindo a funcionalidade de anulação para desenvolvedores e um comportamento previsível para os usuários.
 * ((Implementada)) @version 4.0.0 - ATUALIZAÇÃO DO LOCALE PADRÃO PARA `pt-BR`.
 */
