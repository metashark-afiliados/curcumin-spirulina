<!-- .docs-espejo/middleware/handlers/i18n/index.ts.md -->
/**
 * @file .docs-espejo/middleware/handlers/i18n/index.ts.md
 * @description Documento Espejo y SSoT conceptual para el manejador de i18n en el Edge Runtime.
 * @author L.I.A. Legacy
 * @version 2.6.1
 */
# Manifiesto Conceptual: Aparato `handleI18n` (Edge Runtime)

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la internacionalización en el Edge**. Su única responsabilidad es interceptar cada petición entrante, determinar el `locale` más apropiado para el usuario y configurar el contexto de `next-intl` antes de que la petición llegue a los Server Components.

Actúa como una capa de abstracción robusta sobre la librería `next-intl`, centralizando su configuración y lógica en un único punto atómico dentro del pipeline del middleware. Al consumir la Única Fuente de Verdad (SSoT) para `locales` y `pathnames` desde `src/lib/navigation.ts`, garantiza una coherencia absoluta en todo el sistema de internacionalización. Además, proporciona trazabilidad de extremo a extremo recibiendo explícitamente el `correlationId` para los logs del Edge, mejorando la observabilidad y el diagnóstico.

## 2. Arquitectura y Flujo de Ejecución

El manejador es una función asíncrona que delega la lógica principal a `createNextIntlMiddleware`, pero la enriquece con detección de locale avanzada y observabilidad.

```mermaid
graph TD
    A[Petición Entrante] --> B["`middleware.ts` (Orquestador)"];
    B -- "1. `withCorrelationId` establece `correlationId`" --> C["Contexto de `correlationId`"];
    B -- "2. Llama a `handleI18n(request, correlationId)`" --> D["`handleI18n` (Recibe `correlationId`)"];
    D -- "3. Llama a `getLocaleFromRequest(request, correlationId)`" --> E["`getLocaleFromRequest` (Recibe `correlationId`)"];
    E -- "4. Intenta detectar locale (cookie > Accept-Language > GeoIP)" --> F[Locale Detectado (o `undefined`)];
    F -- No Locale --> G[Redirecciona a `/select-language`];
    G -- "Utiliza `edgeLogger.warn()` con `correlationId`" --> H[Registro de Observabilidad];
    F -- Locale Ok --> I["5. Configura y Llama a `createNextIntlMiddleware()`"];
    I -- "6. Detecta locale y aplica prefijo de ruta" --> J["`NextResponse`"];
    J -- "7. Añade cabecera `x-app-locale`" --> D;
    D -- "8. `edgeLogger.trace()` con `correlationId`" --> H;
    D --> K[Retorna `NextResponse` a `middleware.ts`];
3. Contrato de API
handleI18n(request: NextRequest, correlationId: string | undefined): Promise<NextResponse>:
Propósito: La función principal del manejador de i18n para el middleware.
Parámetros:
request: NextRequest: El objeto de la petición entrante.
correlationId: string | undefined: El ID de correlación explícitamente pasado desde el middleware principal.
Retorno: Una Promise que resuelve a un NextResponse. Esto puede ser una redirección (si el locale no se puede determinar o se está en la página de selección de idioma) o la respuesta procesada por next-intl con cabeceras de i18n añadidas.
Observabilidad: Todos los logs dentro de handleI18n utilizan el correlationId para trazabilidad.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Cacheo de Detección de GeoIP/Accept-Language: Implementar un mecanismo de caché (ej. en sessionStorage para el cliente, o en Vercel KV para el Edge si es posible) para los resultados de getLocaleFromRequest. Esto evitaría la re-ejecución de la lógica de detección en peticiones subsiguientes de la misma sesión o usuario, reduciendo la latencia y mejorando el rendimiento.
A/B Testing de Locales: Integrar con un sistema de feature flags para poder forzar un locale específico a un porcentaje de usuarios, permitiendo pruebas de mercado y de conversión entre diferentes versiones lingüísticas del sitio.
Manejo Robusto de fallbackLocale: Aunque next-intl ya maneja defaultLocale, se podría extender la lógica en getLocaleFromRequest para implementar un fallback más sofisticado si un locale detectado no está en la lista principal locales (ej. mapear fr-CA a en-US si fr-FR no está soportado, en lugar de solo al defaultLocale global).
Logging de Rendimiento Detallado: Añadir métricas de rendimiento específicas dentro de handleI18n para monitorear el tiempo de ejecución de las diferentes etapas (detección de cookie, Accept-Language, GeoIP). Esto puede ayudar a identificar cuellos de botella en la fase inicial de la petición en el Edge Runtime.
Soporte Avanzado para Dominios por Locale: Si el proyecto escalara para usar dominios específicos por idioma (ej., curcumin.es, curcumin.it), este manejador necesitaría ser refactorizado para adaptar la lógica de redirección y detección basada en el dominio del request.
<!-- .docs-espejo/middleware/handlers/i18n/index.ts.md -->