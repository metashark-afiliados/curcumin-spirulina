<!-- .docs-espejo/lib/helpers/geoip.helper.ts.md -->
/**
 * @file .docs-espejo/lib/helpers/geoip.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de lógica de GeoIP.
 * @author L.I.A. Legacy
 * @version 2.3.0
 */
# Manifiesto Conceptual: Aparato `geoip.helper` (Edge Runtime)

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la lógica de detección de GeoIP en el Edge Runtime**. Su única responsabilidad es contener las funciones puras que extraen información de geolocalización de una petición (ej., de los headers de Vercel) y la transforman en un `locale` útil para la aplicación.

Actúa como una capa de lógica desacoplada y compatible con el Edge, consumiendo su configuración desde la SSoT `geoip.config.ts`. Ahora, para la observabilidad, utiliza exclusivamente el `edgeLogger` (`src/lib/edge-logger.ts`), garantizando que todos los logs generados en el Edge Runtime son compatibles con ese entorno y están correlacionados con la petición.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de Edge puro que exporta funciones que son consumidas principalmente por el `middleware` de i18n (`src/middleware/handlers/i18n/index.ts`).

```mermaid
graph TD
    A["`geoip.config.ts` (SSoT de Mapeo)"] --> B["`src/lib/helpers/geoip.helper.ts`"];
    C["`src/middleware/handlers/i18n/index.ts` (Middleware)"] -- "Invoca" --> B;
    B -- "Utiliza `edgeLogger` con `correlationId`" --> D[Registro de Observabilidad];
    B -- "Retorna `countryCode` / `locale`" --> C;
3. Contrato de API
lookupCountryFromRequest(request: NextRequest): string | null:
Propósito: Extrae el código de país (ISO 3166-1 Alpha-2) de la petición HTTP.
Parámetros: request: NextRequest - El objeto de la petición.
Retorno: El código de país o null si no se encuentra.
Observabilidad: Loguea la detección o la ausencia del header con edgeLogger.
mapCountryToLocale(countryCode: string | null): string | undefined:
Propósito: Mapea un código de país a un AppLocale soportado.
Parámetros: countryCode: string | null - El código de país a mapear.
Retorno: El AppLocale correspondiente o undefined si no hay un mapeo definido.
Observabilidad: Loguea el mapeo o la falta de este con edgeLogger.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
FALLBACK A API EXTERNA CON CACHE: Implementar una lógica de fallback que, si el header de Vercel (x-vercel-ip-country) no está presente, llame a una API de GeoIP externa (ej., ipapi.co o GeoJS) para determinar el país. Los resultados de esta API externa deberían ser cacheados (Vercel KV en el Edge o sessionStorage en el cliente) para evitar llamadas redundantes y reducir la latencia.
MAPEAMENTO MÁS ROBUSTO Y CONFIGURABLE: Utilizar una librería de i18n (como intl-locales-supported) o una configuración más granular en geoip.config.ts para crear un mapeo más robusto y menos manual entre códigos de país y locales. Esto podría incluir reglas para locales regionales (ej. en-GB a en-US si en-GB no está soportado explícitamente).
VALIDACIÓN DE COBERTURA DE LOCALES EN CI/CD: Añadir una verificación automatizada en el pipeline de CI/CD que garantice que cada AppLocale definido en src/lib/navigation.ts tenga al menos un código de país mapeado a él en src/config/geoip.config.ts, asegurando una cobertura mínima de detección geográfica.
INYECCIÓN DE correlationId EN HEADERS: Asegurar que el correlationId sea inyectado en un header de la respuesta (x-correlation-id) desde el middleware para que los logs del cliente puedan incluirlo, proporcionando una trazabilidad completa de extremo a extremo.
<!-- .docs-espejo/lib/helpers/geoip.helper.ts.md -->