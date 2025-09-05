// src/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de Middleware de Élite. Implementa un patrón de
 *              "Pipeline Declarativo" para una ejecución secuencial, observable
 *              y resiliente de manejadores atómicos en el Edge.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs-espejo/middleware.ts.md
 */
import { type NextRequest, type NextResponse } from "next/server";
import { withCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { serverLogger } from "@/lib/server-logger";
import { handleI18n } from "@/middleware/handlers";

/**
 * @public
 * @function middleware
 * @description El punto de entrada principal del middleware. Envuelve el pipeline
 *              en `withCorrelationId` y orquesta la ejecución de los manejadores.
 * @param {NextRequest} request - La petición entrante.
 * @returns {Promise<NextResponse>} El objeto de respuesta final.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // 1. Envolver toda la ejecución para inyectar el ID de correlación.
  return withCorrelationId(async () => {
    const { pathname } = request.nextUrl;
    serverLogger.trace(
      { path: pathname },
      "==> [MIDDLEWARE_PIPELINE] INICIO <=="
    );

    // --- Pipeline de Ejecución ---
    // A futuro, otros manejadores (auth, telemetry) se añadirán aquí en orden.
    const response = await handleI18n(request);

    serverLogger.trace({ path: pathname }, "==> [MIDDLEWARE_PIPELINE] FIN <==");
    return response;
  });
}

/**
 * @public
 * @constant config
 * @description Configuración del matcher para el middleware. Define a qué rutas
 *              se aplicará esta lógica, excluyendo explícitamente rutas de API,
 *              assets estáticos y archivos públicos.
 */
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de petición excepto las que empiezan por:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes optimizadas)
     * - cualquier archivo con una extensión (ej. favicon.ico)
     */
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
// src/middleware.ts
