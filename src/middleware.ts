// src/middleware.ts
/**
 * @file src/middleware.ts
 * @description Orquestador principal del middleware de Next.js en el Edge Runtime.
 *              Su responsabilidad es interceptar todas las peticiones entrantes
 *              y orquestar un pipeline de manejadores atómicos para aplicar
 *              lógica global como la internacionalización y la telemetría.
 *              Utiliza la Única Fuente de Verdad (SSoT) para la configuración
 *              de locales y rutas, y garantiza la trazabilidad de extremo a extremo
 *              mediante la inyección de `correlationId` desde el punto de entrada.
 * @author L.I.A. Legacy
 * @version 2.1.0
 * @see .docs-espejo/middleware.ts.md
 * @see .docs/manifiesto-estructura-basica.md (Sección 3: Arquitectura de Middleware de Élite)
 * @see src/lib/navigation.ts (SSoT para `locales` y `defaultLocale`)
 * @see src/middleware/handlers/index.ts (Manifiesto de manejadores atómicos)
 * @see src/lib/helpers/correlation-id.helper.ts (SSoT para `withCorrelationId`, `getCorrelationId`)
 * @see src/lib/edge-logger.ts (SSoT para el logger del Edge)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
import { type NextRequest, type NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/navigation";
import { handleI18n } from "./middleware/handlers";
import {
  withCorrelationId,
  getCorrelationId,
} from "./lib/helpers/correlation-id.helper"; // Importar getCorrelationId
import { edgeLogger } from "./lib/edge-logger";
import { type LogContext } from "./lib/types/logging"; // Importar LogContext

/**
 * @public
 * @function middleware
 * @description La función principal del middleware de Next.js.
 *              1. Envuelve toda la ejecución con `withCorrelationId` para establecer
 *                 un ID de correlación para la petición desde el inicio.
 *              2. Orquesta un pipeline de manejadores:
 *                 - `handleI18n`: Responsable de la detección y configuración del locale.
 *              3. Registra el procesamiento del middleware.
 * @param {NextRequest} request - El objeto de la petición HTTP entrante.
 * @returns {Promise<NextResponse>} La respuesta procesada por el pipeline de middleware.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Establece el correlationId para toda la duración de la petición en el Edge.
  // El ID se puede intentar obtener de un header (`x-correlation-id`) o se genera uno nuevo.
  return withCorrelationId(
    async () => {
      // Una vez dentro de `withCorrelationId`, `getCorrelationId()` es seguro de llamar
      // para obtener el ID establecido en este contexto.
      const currentCorrelationId = getCorrelationId();

      edgeLogger.info(
        {
          url: request.url,
          method: request.method,
          correlationId: currentCorrelationId,
        } as LogContext,
        "[Middleware] Petición entrante. Iniciando pipeline."
      );

      // --- Pipeline de Manejadores ---
      // handleI18n ahora recibirá el correlationId explícitamente.
      const response = await handleI18n(request, currentCorrelationId);

      edgeLogger.info(
        {
          url: request.url,
          status: response.status,
          correlationId: currentCorrelationId,
        } as LogContext,
        "[Middleware] Pipeline completado. Devolviendo respuesta."
      );

      return response;
    },
    request.headers.get("x-correlation-id") || undefined
  ); // Pasa un correlationId inicial si ya existe en la request.
}

/**
 * @public
 * @constant config
 * @description Configuración del matcher para el middleware.
 *              Define las rutas en las que se ejecutará el middleware, excluyendo
 *              rutas estáticas de Next.js, activos (favicon, js, img), y la API.
 *              Esto asegura que el middleware solo procese las rutas de página relevantes.
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|js|img).*)"],
};
// src/middleware.ts
