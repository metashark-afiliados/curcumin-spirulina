// src/middleware/handlers/i18n/index.ts
/**
 * @file src/middleware/handlers/i18n/index.ts
 * @description Manejador de middleware atómico para la internacionalización (i18n) en el Edge Runtime.
 *              Su responsabilidad es determinar el `locale` correcto para cada petición entrante
 *              y configurar el contexto de `next-intl` antes de que la petición llegue a los
 *              Server Components. Utiliza la Única Fuente de Verdad (SSoT) para la configuración
 *              de locales y rutas, garantizando la coherencia.
 *              **Ahora recibe explícitamente el `correlationId` como parámetro, eliminando cualquier
 *              dependencia de `getCorrelationId()` dentro de este módulo para compatibilidad con el Edge.**
 * @version 2.6.1
 * @author L.I.A. Legacy
 * @see .docs-espejo/middleware/handlers/i18n/index.ts.md
 * @see src/lib/navigation.ts (SSoT para `locales`, `defaultLocale`, `pathnames`, `localePrefix`)
 * @see src/lib/helpers/geoip.helper.ts (Para detección de GeoIP)
 * @see src/lib/edge-logger.ts (SSoT para el logger del Edge)
 * @see src/lib/helpers/correlation-id.helper.ts (La función `getCorrelationId` se utiliza en el middleware principal)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
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
// REMOVIDO: getCorrelationId ya no se importa ni se llama directamente en este archivo.
// El correlationId se pasa explícitamente como argumento.
// import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { type LogContext } from "@/lib/types/logging";

/**
 * @private
 * @function getLocaleFromRequest
 * @description Determina el locale preferido del usuario basándose en varias fuentes,
 *              con un orden de prioridad: Cookie > Accept-Language > GeoIP.
 *              **Recibe el `correlationId` explícitamente para el logging.**
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @param {string | undefined} correlationId - El ID de correlación de la petición, pasado explícitamente.
 * @returns {AppLocale | undefined} El locale detectado o `undefined`.
 */
function getLocaleFromRequest(
  request: NextRequest,
  correlationId: string | undefined
): AppLocale | undefined {
  // USO DE CORRELATIONID: Se usa el parámetro recibido directamente.

  // 1. Detección por Cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as AppLocale)) {
    edgeLogger.trace(
      { locale: cookieLocale, method: "cookie", correlationId } as LogContext,
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
      locales as readonly string[],
      defaultLocale
    ) as AppLocale;
    edgeLogger.trace(
      {
        locale: matchedLocale,
        method: "accept-language",
        languages,
        correlationId,
      } as LogContext,
      "[I18nHandler] Locale detectado vía Accept-Language."
    );
    return matchedLocale;
  } catch (e) {
    edgeLogger.warn(
      { err: e, languages, correlationId } as LogContext,
      "[I18nHandler] Fallo al detectar locale vía Accept-Language."
    );
    // Continuar con la siguiente estrategia.
  }

  // 3. Detección por GeoIP (cabecera `x-vercel-ip-country`)
  // Nota: `lookupCountryFromRequest` y `mapCountryToLocale` en `geoip.helper.ts`
  // ahora también usarán `getCorrelationId()` de su contexto, que es establecido
  // por `src/middleware.ts` (que envuelve handleI18n).
  const country = lookupCountryFromRequest(request);
  const geoLocale = mapCountryToLocale(country);
  if (geoLocale) {
    edgeLogger.trace(
      {
        locale: geoLocale,
        country,
        method: "geoip",
        correlationId,
      } as LogContext,
      "[I18nHandler] Locale detectado vía GeoIP."
    );
    return geoLocale as AppLocale;
  }

  edgeLogger.warn(
    { correlationId } as LogContext,
    "[I18nHandler] No se pudo determinar el locale por ningún método."
  );
  return undefined;
}

/**
 * @public
 * @function handleI18n
 * @description Manejador principal para la lógica de internacionalización del middleware.
 *              Orquesta la detección del locale y la aplicación del middleware de `next-intl`.
 *              Redirige a una página de selección de idioma si no se puede determinar
 *              un locale válido. **Recibe el `correlationId` explícitamente para trazabilidad.**
 * @param {NextRequest} request - El objeto de la petición entrante.
 * @param {string | undefined} correlationId - El ID de correlación de la petición, pasado explícitamente desde el middleware principal.
 * @returns {Promise<NextResponse>} La respuesta del middleware de `next-intl` o una redirección.
 */
export async function handleI18n(
  request: NextRequest,
  correlationId: string | undefined // FIRMA CORREGIDA: Ahora acepta correlationId
): Promise<NextResponse> {
  // USO DE CORRELATIONID: Se usa el parámetro recibido.
  // const currentCorrelationId = getCorrelationId(); // REMOVIDO

  const { pathname } = request.nextUrl;

  // Permite pasar la página de selección de idioma sin ser redirigida de nuevo.
  if (pathname.startsWith("/select-language")) {
    edgeLogger.trace(
      { path: pathname, correlationId } as LogContext,
      "[I18nHandler] Saltando procesamiento de i18n para /select-language."
    );
    return NextResponse.next();
  }

  // PASAMOS CORRELATIONID A getLocaleFromRequest
  const locale = getLocaleFromRequest(request, correlationId);

  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = "/select-language";
    edgeLogger.warn(
      { path: pathname, correlationId } as LogContext,
      "[I18nHandler] No se pudo determinar el locale. Redireccionando a la página de selección de idioma."
    );
    return NextResponse.redirect(url);
  }

  // Crea el middleware de next-intl con la configuración SSoT.
  const handle = createNextIntlMiddleware({
    locales, // SSoT de src/lib/navigation.ts
    localePrefix, // SSoT de src/lib/navigation.ts
    pathnames, // SSoT de src/lib/navigation.ts
    defaultLocale, // SSoT de src/lib/navigation.ts
  });

  const response = handle(request);
  response.headers.set("x-app-locale", locale); // Añadir cabecera para observabilidad

  edgeLogger.trace(
    { locale, path: pathname, correlationId } as LogContext,
    "[I18nHandler] Procesamiento de i18n completado. Locale establecido."
  );

  return response;
}
// src/middleware/handlers/i18n/index.ts
