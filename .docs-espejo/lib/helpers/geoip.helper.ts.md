<!-- .docs-espejo/lib/helpers/geoip.helper.ts.md -->
/**
 * @file .docs-espejo/lib/helpers/geoip.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de lógica de GeoIP.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `geoip.helper` (Edge Runtime)

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la lógica de detección de GeoIP en el Edge Runtime**. Su única responsabilidad es contener las funciones puras que extraen información de geolocalización de una petición y la transforman en un `locale` útil para la aplicación.

Consume su configuración desde la SSoT `geoip.config.ts` y utiliza el `edgeLogger` con un `correlationId` propagado explícitamente para una observabilidad completa y compatible con el Edge.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de Edge puro que exporta funciones que son consumidas principalmente por el manejador de middleware `handleI18n`. La propagación de contexto es explícita.

```mermaid
graph TD
    A["`geoip.config.ts` (SSoT de Mapeo)"] --> B["`geoip.helper.ts`"];
    C["`handleI18n` (Manejador)"] -- "Invoca `lookupCountry(req, id)`" --> B;
    B -- "Usa `edgeLogger` con `id`" --> D[Registro de Observabilidad];
    B -- "Retorna `countryCode` / `locale`" --> C;
3. Contrato de API
lookupCountryFromRequest(request: NextRequest, correlationId: string): string | null: Extrae el código de país (ISO 3166-1 Alpha-2) de la petición.
mapCountryToLocale(countryCode: string | null, correlationId: string): AppLocale | undefined: Mapea un código de país a un AppLocale soportado.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Fallback a API Externa con Cache: Implementar una lógica de fallback que, si el header de Vercel no está presente, llame a una API de GeoIP externa. Los resultados deberían ser cacheados en Vercel KV para evitar latencia.
Manejo de Múltiples locales por País: Extender el mapa de configuración para que pueda mapear un país a un array de locales priorizados (ej. CA: ["en-US", "fr-FR"]), y que la lógica negocie con los Accept-Language del usuario.
Validación de Configuración en CI/CD: Añadir un script en el CI/CD que verifique que cada AppLocale definido en navigation.ts tenga al menos un país mapeado en geoip.config.ts.
Simulador de GeoIP en Desarrollo: Crear un mecanismo (ej. a través de una cookie DEBUG_COUNTRY=IT) que permita a los desarrolladores simular peticiones desde diferentes países para probar la lógica de detección fácilmente.
<!-- .docs-espejo/lib/helpers/geoip.helper.ts.md -->