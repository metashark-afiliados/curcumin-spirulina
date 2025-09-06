// src/middleware.ts
/**
 * @file src/middleware.ts
 * @description Orquestador principal del middleware en el Edge Runtime.
 *              Implementa la SSoT de observabilidad para el Edge: genera un
 *              `correlationId` y lo inyecta explícitamente como dependencia
 *              a los manejadores del pipeline.
 * @author L.I.A. Legacy
 * @version 5.0.0
 * @see .docs/TODO.md
 * @see .docs-espejo/middleware.ts.md
 */
import { type NextRequest, NextResponse } from "next/server";
import { handleI18n } from "./middleware/handlers";
import { edgeLogger } from "./lib/edge-logger";
import { type LogContext } from "./lib/types/logging";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const correlationId =
    request.headers.get("x-correlation-id") || crypto.randomUUID();

  const baseContext: LogContext = {
    component: "MiddlewareOrchestrator",
    correlationId,
    method: request.method,
    path: request.nextUrl.pathname,
  };

  edgeLogger.info(
    baseContext,
    "[Middleware] Petición entrante. Iniciando pipeline."
  );

  try {
    // Inyección de Dependencia Explícita: El `correlationId` se pasa como argumento.
    const response = await handleI18n(request, correlationId);

    response.headers.set("x-correlation-id", correlationId);

    edgeLogger.info(
      { ...baseContext, status: response.status },
      "[Middleware] Pipeline completado. Devolviendo respuesta."
    );

    return response;
  } catch (error) {
    edgeLogger.error(
      { ...baseContext, err: error },
      "[Middleware] Error crítico no capturado en el pipeline de middleware."
    );
    const errorResponse = new NextResponse("Internal Server Error", {
      status: 500,
    });
    errorResponse.headers.set("x-correlation-id", correlationId);
    return errorResponse;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|js|img).*)"],
};
// src/middleware.ts
