// src/middleware.ts
/**
 * @file middleware.ts
 * @description Orquestador de Middleware de Élite. Implementa un patrón de
 *              "Pipeline Declarativo" para una ejecución secuencial, observable
 *              y resiliente de manejadores atómicos.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see LIA-SSoT-IMPLEMENTATION-GUIDE-V1 (Manifiesto de Implementación)
 */
import { type NextRequest, type NextResponse } from "next/server";
import { withCorrelationId } from "@/lib/helpers/correlation-id.helper";
import { serverLogger } from "@/lib/logger";
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
    // Por ahora, solo tenemos el manejador de i18n.
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
 *              se aplicará esta lógica.
 */
export const config = {
  matcher: [
    // Omitir rutas de API, assets estáticos (_next/static, _next/image), y archivos públicos.
    "/((?!api|_next/static|_next/image|img|js|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
// src/middleware.ts
