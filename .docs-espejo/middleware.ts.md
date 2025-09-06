<!-- .docs-espejo/middleware.ts.md -->
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `middleware`.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `middleware.ts` (Edge Runtime)

## 1. Rol Estratégico y Propósito

El `middleware.ts` es el **guardián de entrada y orquestador del pipeline de la aplicación**. Se ejecuta en el Edge Runtime para cada petición entrante, antes de que llegue a la lógica de renderizado de Next.js. Su propósito principal es:

1.  **Orquestar Lógica de Edge:** Actuar como el punto de entrada para un pipeline de manejadores atómicos (`handleI18n`, `handleAuth`, `handleTelemetry` - futuros). Esto garantiza que la lógica global (seguridad, personalización, observabilidad) se aplique de forma modular y consistente.
2.  **Trazabilidad de Extremo a Extremo:** Inyectar un `correlationId` único a cada petición desde el punto de entrada más temprano, y propagarlo explícitamente a los manejadores del pipeline, facilitando la correlación de logs y eventos a través de todo el sistema.
3.  **Coherencia de Internacionalización:** Al delegar la lógica de i18n a `handleI18n` y al basarse en la SSoT de `locales` y `defaultLocale` (`src/lib/navigation.ts`), asegura que toda la aplicación opera con una configuración de idiomas unificada y correcta.
4.  **Logging de Observabilidad:** Utiliza el `edgeLogger` para registrar el flujo de la petición a través del middleware, proporcionando una visión detallada de las decisiones tomadas en el Edge.

Esta arquitectura eleva el middleware a un componente altamente configurable, mantenible y observable, adhiriéndose estrictamente al Principio de Responsabilidad Única para cada manejador individual.

## 2. Arquitectura y Flujo de Ejecución

El `src/middleware.ts` actúa como un orquestador que invoca una serie de manejadores atómicos en una secuencia predefinida, todo dentro de un contexto de `correlationId`.

```mermaid
graph TD
    A[Petición del Usuario] --> B["`src/middleware.ts` (Función `middleware`)"];
    B -- "1. Envuelve en `withCorrelationId` (obtiene/genera ID)" --> C["Contexto de `correlationId`"];
    C --> D["`getCorrelationId()` (obtiene ID del contexto)"];
    D --> E["`edgeLogger.info()` (Inicio Pipeline con `correlationId`)"];
    E --> F["Llama a `handleI18n(request, currentCorrelationId)`"];
    F -- "2. Retorna `NextResponse` de `handleI18n`" --> G["`edgeLogger.info()` (Fin Pipeline con `correlationId`)"];
    G --> H[Retorna `NextResponse` a Next.js Server];
3. Contrato de API
middleware(request: NextRequest): Promise<NextResponse>:
Propósito: La función principal del middleware que Next.js invoca para cada petición.
Parámetros:
request: NextRequest: El objeto de la petición HTTP entrante.
Retorno: Una Promise que resuelve a un NextResponse, representando la respuesta final del middleware (que puede ser una redirección, una reescritura, o simplemente pasar la petición al siguiente nivel).
Observabilidad: Toda la ejecución de middleware está instrumentada con correlationId y logs de edgeLogger.
config: { matcher: string[] }:
Propósito: Define las rutas en las que se ejecutará el middleware, utilizando una expresión regular de exclusión para evitar procesar activos estáticos, APIs, etc.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Pipeline de Manejadores Dinámico: Implementar un sistema donde el orden y la inclusión de los manejadores de middleware (ej., handleI18n, handleAuth) puedan ser configurados dinámicamente, posiblemente a través de un archivo de configuración externo o feature flags. Esto permitiría la activación/desactivación de funcionalidades de middleware sin cambios de código.
Manejo de Errores Centralizado en Middleware (con Fallback): Implementar un try/catch global en el middleware.ts para capturar cualquier error no esperado de los manejadores. Este manejador central podría loguear el error con edgeLogger y devolver una respuesta de error genérica (status 500) o una página de error predefinida para el usuario, manteniendo la resiliencia incluso en fallos de Edge.
Integración de handleTelemetry para Eventos de Sesión: Crear un nuevo manejador (handleTelemetry) en src/middleware/handlers/ que se encargue de registrar eventos de sesión iniciales (ej. SESSION_START) y otros datos de la petición (IP, User-Agent, referer) en el Edge, enriqueciendo los datos de telemetría antes de que lleguen a la aplicación.
Verificación de Autenticación Ligera en el Edge (handleAuth): Introducir un manejador handleAuth que pueda realizar verificaciones de autenticación ligeras en el Edge (ej. validación de tokens JWT) y, si es necesario, redireccionar a la página de login o denegar el acceso antes de llegar al servidor principal, optimizando la seguridad y el rendimiento.
Métricas de Rendimiento del Pipeline por Manejador: Integrar la medición del tiempo de ejecución de cada manejador individual dentro del pipeline del middleware. Esto permitiría a edgeLogger registrar cuánto tiempo consume cada paso, ayudando a optimizar la latencia total del Edge Runtime.
<!-- .docs-espejo/middleware.ts.md -->