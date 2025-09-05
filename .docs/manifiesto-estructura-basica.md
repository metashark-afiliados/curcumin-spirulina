Manifiesto de Implementación: Arquitectura de Resiliencia y Observabilidad v1.0
ID del Documento: LIA-SSoT-IMPLEMENTATION-GUIDE-V1
Clasificación: Confidencial / Guía Canónica
Preámbulo: La Filosofía
Este documento es la guía táctica para implementar la infraestructura de resiliencia y observabilidad de ConvertiKit en cualquier nuevo proyecto. La filosofía subyacente es "Falla Rápido, Falla Limpio, Falla de Forma Observable".
Falla Rápido: La validación es la primera línea de defensa.
Falla Limpio: La UI nunca debe romperse; recibe contratos de error predecibles (ActionResult).
Falla de Forma Observable: Cada acción y cada error, esperado o inesperado, deja un rastro inmutable.
Sección 1: Arquitectura de Observabilidad y Logging de Élite
Propósito: Establecer una SSoT para el logging que sea estructurada, segura, y agnóstica a la infraestructura de recolección, con trazabilidad de extremo a extremo.
1.1. El Logger de Servidor Soberano (pino)
SSoT de Código: src/lib/logger.ts
SSoT de Configuración: src/config/logger.config.ts
Arquitectura:
Se utiliza pino por su altísimo rendimiento. Toda la configuración se centraliza para que la aplicación emita logs JSON estructurados a stdout. La recolección, el análisis y el almacenamiento de estos logs son responsabilidad de la infraestructura externa (ej. Vercel Log Drains, Datadog, Sentry). La aplicación permanece agnóstica.
Implementación:
Configuración de Censura (src/config/logger.config.ts):
Define un array inmutable de rutas de claves que pino debe censurar automáticamente para prevenir la fuga de datos sensibles.
code
TypeScript
// src/config/logger.config.ts
/**
 * @file logger.config.ts
 * @description Manifiesto de Configuración y SSoT para el sistema de logging.
 */
export const REDACTED_PATHS: readonly string[] = [
  "email", "password", "token", "accessToken", "refreshToken",
  "*.password", "*.email", "req.headers.authorization",
  "payload.email", "context.payload.email",
];
// src/config/logger.config.ts
Instanciación del Logger (src/lib/logger.ts):
Crea la instancia del logger, inyectando el correlationId en cada log y configurando el transporte a Sentry para producción.
code
TypeScript
// src/lib/logger.ts
import pino from "pino";
import { REDACTED_PATHS } from "@/config/logger.config";
import { getCorrelationId } from "@/lib/helpers/correlation-id.helper";

const pinoConfig: pino.LoggerOptions = {
  level: process.env.NODE_ENV === "development" ? "trace" : "info",
  base: { service: "my-new-project" },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
    log: (obj) => {
      const correlationId = getCorrelationId();
      if (correlationId) return { ...obj, correlationId };
      return obj;
    },
  },
  redact: { paths: [...REDACTED_PATHS], censor: "[REDACTED]" },
};

const transport = process.env.NODE_ENV === "production"
  ? pino.transport({ /* Configuración de Sentry */ })
  : pino.transport({ target: "pino-pretty" });

export const logger = pino(pinoConfig, transport);

// ... implementación de clientLogger ...
// src/lib/logger.ts
Directiva de Uso (Mandatoria):
Toda invocación al logger de servidor DEBE seguir la firma logger.level({ contexto }, "mensaje").
Correcto: logger.info({ userId: '123' }, "Usuario ha iniciado sesión.");
Correcto (Errores): logger.error({ err: error, userId: '123' }, "Fallo la operación X.");
Incorrecto: logger.info("Usuario ha iniciado sesión.", { userId: '123' });
Sección 2: Arquitectura de Errores Soberanos Codificados (IMAS-E)
Propósito: Desacoplar completamente la lógica de negocio de la capa de presentación de errores. Las Server Actions nunca devuelven strings de error; devuelven claves de i18n.
Arquitectura (IMAS-E: Internationalization Modular Atomic Strategy for Errors):
El sistema se basa en la composición de contratos de datos atómicos (schemas Zod) que validan manifiestos de contenido atómicos (archivos JSON).
Implementación:
Contratos de Error Atómicos (src/lib/validators/i18n/errors/):
Para cada dominio de negocio (ej. workspaces), se crea un schema Zod que define las claves de error para ese dominio.
code
TypeScript
// src/lib/validators/i18n/errors/WorkspaceErrors.schema.ts
import { z } from "zod";
export const WorkspaceErrorsSchema = z.object({
  create_failed: z.string(),
  delete_permission_denied: z.string(),
  // ... más claves
});
// src/lib/validators/i18n/errors/WorkspaceErrors.schema.ts
Contenido de Error Atómico (src/messages/shared/errors/):
Para cada schema, se crea un archivo JSON correspondiente con las traducciones.
code
JSON
// src/messages/shared/errors/WorkspaceErrors.json
{
  "en-US": {
    "create_failed": "Failed to create the workspace. Please try again.",
    "delete_permission_denied": "You do not have permission to delete this workspace."
  },
  "es-ES": { ... },
  "pt-BR": { ... }
}
// src/messages/shared/errors/WorkspaceErrors.json
Ensamblador de Errores (ValidationErrors.schema.ts):
Un schema maestro en src/lib/validators/i18n/ importa y ensambla todos los schemas de error atómicos en un único objeto ValidationErrorsSchema. Este es el contrato maestro para todos los errores de la aplicación.
code
TypeScript
// src/lib/validators/i18n/ValidationErrors.schema.ts
import { z } from "zod";
import * as ErrorSchemas from "./errors";

export const ValidationErrorsSchema = z.object({
  generic: ErrorSchemas.GenericErrorsSchema,
  auth: ErrorSchemas.AuthErrorsSchema,
  workspaces: ErrorSchemas.WorkspaceErrorsSchema,
  // ... todos los demás dominios de error
});
// src/lib/validators/i18n/ValidationErrors.schema.ts
Contrato de Retorno de Server Action (Mandatorio):
Toda Server Action que pueda fallar DEBE retornar Promise<ActionResult<TSuccess>>. En caso de fallo, la propiedad error DEBE ser una clave válida en el ValidationErrorsSchema (ej. "workspaces.create_failed").
Sección 3: Arquitectura de Middleware de Élite (El Guardián del Edge)
Propósito: Ejecutar lógica de seguridad, personalización y observabilidad en el Edge antes de que la petición llegue al servidor de Next.js, utilizando un patrón de pipeline declarativo para máxima claridad y mantenibilidad.
Arquitectura:
El src/middleware.ts actúa como un orquestador que invoca una serie de manejadores atómicos en una secuencia predefinida.
Implementación:
Orquestador (src/middleware.ts):
Define el pipeline. Los manejadores que pueden terminar la petición (redirects, maintenance) se ejecutan primero. El resto se ejecuta en una cadena donde la respuesta de un manejador se pasa al siguiente.
code
TypeScript
// src/middleware.ts
// ...
export function middleware(request: NextRequest): Promise<NextResponse> {
  return withCorrelationId(() => {
    // Lógica de pipeline que invoca manejadores...
  });
}
// ...
// src/middleware.ts
Manejador de Telemetría (src/middleware/handlers/telemetry/index.ts):
Responsabilidad: Creación de sesión de visitante y log inicial.
Lógica de Flujo:
Verifica si la cookie metashark_session_id ya existe. Si existe, no hace nada.
Si no existe, es una nueva sesión. Genera un sessionId (crypto.randomUUID()).
Recolecta datos del request: ip, userAgent, geo, referer, searchParams.
Invoca lookupIpAddress para enriquecer los datos geográficos.
Invoca la Server Action logVisitorAction en modo "fire-and-forget" (no espera a que termine) para persistir el log inicial.
Establece la cookie metashark_session_id en la respuesta.
Manejador de i18n (src/middleware/handlers/i18n/index.ts):
Responsabilidad: Detección y configuración del locale para la petición.
Lógica de Detección (en orden de prioridad):
Override de Desarrollo: Busca una cookie DEBUG_LOCALE y la usa si es válida.
Preferencia del Usuario: Busca la cookie NEXT_LOCALE (establecida por LanguageSwitcher).
Detección GeoIP: Si no hay cookie, invoca lookupIpAddress, obtiene el countryCode y busca una correspondencia en src/config/geoip-map.ts.
Fallback Global: Si todo lo anterior falla, utiliza un defaultLocale definido en src/i18n.ts.
Ejecución: Invoca el middleware de next-intl con el defaultLocale determinado.
Observabilidad: Añade una cabecera x-app-locale a la respuesta para que otros manejadores (como el de Auth) la puedan leer.
Sección 4: Guía de Implementación Práctica (Paso a Paso)
Copiar Aparatos de Infraestructura:
Copia los directorios src/config, src/lib/logger.ts, src/lib/helpers, src/lib/validators, src/lib/i18n, src/messages/shared/errors y src/middleware al nuevo proyecto.
Establecer Contratos de Error:
Para cada nuevo dominio de negocio (ej. "Products"), crea:
src/lib/validators/i18n/errors/ProductErrors.schema.ts
src/messages/shared/errors/ProductErrors.json
Ensámblalo en src/lib/validators/i18n/ValidationErrors.schema.ts.
Adoptar el Patrón "Escudo de Resiliencia" en Server Actions:
Toda Server Action que realice una mutación DEBE implementar el siguiente patrón try/catch.
code
TypeScript
// src/lib/actions/products/createProduct.action.ts
// ...
try {
  // 1. Autenticación, Validación, Autorización...
  // 2. Lógica de negocio...
  // 3. Efectos secundarios (auditoría, revalidación)...
  
  return { success: true, data: { newProductId } };

} catch (error) {
  // 4. Observabilidad y Retorno Soberano
  const errorKey: ValidationErrorKey = "products.create_failed"; // Determinar la clave correcta
  
  const errorId = await createPersistentErrorLog(
    "createProductAction", 
    error as Error, 
    context
  );
  
  logger.error(
    { err: error, errorId, ...context },
    "[createProductAction] Fallo en la acción."
  );
  
  return { success: false, error: errorKey };
}
// src/lib/actions/products/createProduct.action.ts
Conclusión:
Esta arquitectura integrada proporciona un sistema robusto, observable y mantenible desde el primer día. Centraliza las decisiones clave en manifiestos de configuración y schemas, y aplica patrones consistentes para el manejo de la lógica de negocio y los errores, sentando las bases para un desarrollo escalable y de élite.