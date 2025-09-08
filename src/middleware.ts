// src/middleware.ts
/**
 * @file src/middleware.ts
 * @description Orquestador de Middleware de Élite. Implementa un patrón de
 *              "Pipeline Declarativo" para una ejecución secuencial, observable
 *              y resiliente de manejadores atómicos. Corregido para un manejo
 *              de errores tipo-seguro y una correcta aplicación del HOC.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 * @see .docs-espejo/middleware.ts.md
 */
import { type NextRequest, NextResponse } from "next/server";
import { withCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { logger } from "@/lib/logger";
import { handleI18n, handleTelemetry } from "@/middleware/handlers";

/**
 * @private
 * @async
 * @function middlewarePipeline
 * @description Define y ejecuta el pipeline de middleware para cada petición.
 * @param {NextRequest} request - La petición entrante.
 * @returns {Promise<NextResponse>} La respuesta final del pipeline.
 */
async function middlewarePipeline(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  logger.trace({ path: pathname }, "==> [MIDDLEWARE_PIPELINE] INICIO <==");

  try {
    let response = NextResponse.next({
      request: { headers: new Headers(request.headers) },
    });

    // 1. Manejador de Internacionalización
    response = await handleI18n(request, response);

    // 2. Manejador de Telemetría (fire-and-forget)
    handleTelemetry(request, response).catch((err) => {
      // Manejo de errores tipo-seguro
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error(
        { err: error },
        "[Middleware] Fallo en la ejecución en segundo plano de telemetría."
      );
    });

    logger.trace({ path: pathname }, "==> [MIDDLEWARE_PIPELINE] FIN <==");
    return response;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(
      { err, path: pathname },
      `[MIDDLEWARE_PIPELINE] FALLO CRÍTICO.`
    );
    const url = request.nextUrl.clone();
    url.pathname = "/500";
    return NextResponse.rewrite(url);
  }
}

/**
 * @public
 * @function middleware
 * @description El punto de entrada principal del middleware. Envuelve el pipeline en `withCorrelationId`.
 * @param {NextRequest} request - La petición entrante.
 * @returns {Promise<NextResponse>} El objeto de respuesta final.
 */
export const middleware = withCorrelationId(middlewarePipeline);

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de petición excepto las que probablemente
     * sean para activos estáticos.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|img/|js/|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
// src/middleware.ts
