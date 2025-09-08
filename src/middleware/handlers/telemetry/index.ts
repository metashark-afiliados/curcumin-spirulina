// src/middleware/handlers/telemetry/index.ts
/**
 * @file src/middleware/handlers/telemetry/index.ts
 * @description Manejador de telemetría de élite. Inicia el tracking de sesión
 *              en la primera visita y registra el evento inicial de forma
 *              asíncrona y no bloqueante.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @see .docs-espejo/middleware/handlers/telemetry/index.ts.md
 */
import "server-only";

import { type NextRequest, type NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/config/telemetry.config";
import { logTelemetryEvent } from "@/lib/actions/telemetry/logTelemetryEvent.action";
import { getLocaleFromGeoIP } from "@/lib/helpers/geoip.helper";
import { logger } from "@/lib/logger";

/**
 * @public
 * @async
 * @function handleTelemetry
 * @description Orquesta la recolección de datos de telemetría en la primera visita
 *              y los persiste invocando la Server Action `logTelemetryEvent`.
 *              Es un proceso "fire-and-forget" que no bloquea el pipeline.
 * @param {NextRequest} request - La petición entrante.
 * @param {NextResponse} response - El objeto de respuesta actual en el pipeline.
 * @returns {Promise<void>} No devuelve valor, solo muta la respuesta con una cookie.
 */
export async function handleTelemetry(
  request: NextRequest,
  response: NextResponse
): Promise<void> {
  // Optimización: Si la cookie de sesión ya existe, no hacemos nada.
  if (request.cookies.has(SESSION_COOKIE_NAME)) {
    return;
  }

  const sessionId = crypto.randomUUID();
  const userAgent = request.headers.get("user-agent") || "";
  const context = { sessionId, path: request.nextUrl.pathname, userAgent };

  logger.info(
    context,
    "[TelemetryHandler] Nuevo visitante detectado, iniciando log de sesión."
  );

  // Ejecutamos la lógica de persistencia en segundo plano (fire-and-forget)
  // para no bloquear la respuesta al usuario.
  (async () => {
    try {
      const geoLocale = await getLocaleFromGeoIP(request);
      const eventPayload = {
        eventName: "SESSION_START",
        sessionId,
        timestamp: new Date().toISOString(),
        payload: {
          path: request.nextUrl.pathname,
          userAgent,
          geoLocale: geoLocale || null,
          searchParams: Object.fromEntries(request.nextUrl.searchParams),
          referer: request.headers.get("referer") || null,
        },
      };
      await logTelemetryEvent(eventPayload);
    } catch (error) {
      logger.error(
        { err: error, ...context },
        "[TelemetryHandler] Fallo en la ejecución en segundo plano de logTelemetryEvent."
      );
    }
  })();

  // Establecemos la cookie en la respuesta para identificar las peticiones subsiguientes.
  response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 30, // 30 minutos de sesión
  });
}
// src/middleware/handlers/telemetry/index.ts
