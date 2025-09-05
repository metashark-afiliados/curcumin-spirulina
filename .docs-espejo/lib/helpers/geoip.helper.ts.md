// .docs-espejo/lib/helpers/geoip.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/geoip.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el helper de lógica de GeoIP.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `geoip.helper`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la lógica de detección de GeoIP en el servidor**. Su única responsabilidad es contener las funciones puras que extraen información de geolocalización de una petición y la transforman en un `locale` útil para la aplicación.

Actúa como una capa de lógica desacoplada, consumiendo su configuración desde la SSoT `geoip.config.ts`, lo que le permite centrarse exclusivamente en el "cómo" de la detección, no en el "qué".

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de servidor puro que es consumido principalmente por el `middleware` de i18n.

```mermaid
graph TD
    A["`geoip.config.ts` (SSoT de Mapeo)"] --> B["`geoip.helper.ts`"];
    C["`handleI18n` (Middleware)"] -- "Invoca" --> B;
    B -- "Retorna `locale`" --> C;
3. Contrato de API
lookupCountryFromRequest(request: NextRequest): string | null:
Salida: El código de país ISO 3166-1 Alpha-2 o null.
mapCountryToLocale(countryCode: string | null): string | undefined:
Salida: El AppLocale correspondiente o undefined.
4. Zona de Melhorias Futuras
Fallback a API Externa: Implementar uma lógica de fallback que, se o header da Vercel não estiver presente, chame uma API de GeoIP externa para determinar o país.
Mapeamento Mais Robusto: Utilizar uma biblioteca de i18n (como intl-locales-supported) para criar um mapeamento mais robusto e menos manual entre países e locais.
CI Check para Cobertura de Locais: Adicionar uma verificação no CI/CD que garanta que cada AppLocale em navigation.ts tenha pelo menos um país mapeado para ele em geoip.config.ts.
// .docs-espejo/lib/helpers/geoip.helper.ts.md