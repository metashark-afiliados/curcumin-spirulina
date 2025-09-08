// .docs-espejo/lib/helpers/locale-detector.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/locale-detector.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `locale-detector.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `locale-detector.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de decisión de la internacionalización**. Su única responsabilidad es ejecutar una lógica de detección en cascada para determinar el `locale` más apropiado para un visitante, basándose en un conjunto priorizado de señales.

Es una función pura y de bajo nivel, diseñada para ser consumida exclusivamente por el manejador de middleware de i18n. Su diseño desacoplado (recibe sus dependencias como argumentos) es crucial para la estabilidad y testeabilidad del sistema de enrutamiento.

## 2. Arquitectura y Flujo de Ejecución

La lógica implementa una cascada de detección con cuatro niveles de prioridad:

```mermaid
graph TD
    A[Inicio: `detectLocale(request, ...)`] --> B{1. Cookie `NEXT_LOCALE` existe y es válida?};
    B -- Sí --> C[Retorna `{ locale, method: 'cookie' }`];
    B -- No --> D{2. `getLocaleFromGeoIP` retorna un locale válido?};
    D -- Sí --> E[Retorna `{ locale, method: 'geoip' }`];
    D -- No --> F{3. Header `Accept-Language` coincide?};
    F -- Sí --> G[Retorna `{ locale, method: 'header' }`];
    F -- No --> H[Retorna `{ locale: default, method: 'default' }`];
3. Contrato de API
detectLocale(request: NextRequest, locales: readonly AppLocale[], defaultLocale: AppLocale): Promise<{ locale: AppLocale; method: 'cookie' | 'header' | 'geoip' | 'default' }>
Entradas:
request: El objeto de petición de Next.js.
locales: Un array de solo lectura con los AppLocale soportados.
defaultLocale: El AppLocale de fallback.
Salida: Un objeto que contiene el locale detectado (garantizado de ser AppLocale) y el method utilizado.
4. Zona de Melhorias Futuras
Ponderación de Accept-Language: La librería Negotiator soporta ponderación (valores q). La lógica podría ser refinada para respetar estas ponderaciones.
Cacheo de Detección: El resultado de la detección (especialmente GeoIP) podría ser cacheado en Vercel KV para reducir la latencia del middleware.
Configuración de Estrategia: La función podría aceptar un array que defina el orden de la estrategia de detección (ej. strategy: ['geoip', 'header']).
Detección a Nivel de País/Región: Extender la lógica para manejar casos donde un país tiene múltiples idiomas soportados (ej. Canadá -> en-US o fr-CA).
Logging de Detección Fallida: Añadir un log de warn específico cuando un método de detección falla para monitorear la efectividad de cada estrategia.
Pruebas de Integración con Negotiator: Crear pruebas unitarias que pasen diferentes cabeceras Accept-Language y verifiquen el comportamiento.
Soporte para ?lang=it-IT: Añadir una lógica que detecte un parámetro de consulta lang como la máxima prioridad.
Refactorización a una Clase LocaleDetector: Para lógicas más complejas, el helper podría ser refactorizado a una clase para una mejor organización.
A/B Testing de Idioma por Defecto: Integrar con un sistema de feature flags para probar diferentes defaultLocale.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/helpers/locale-detector.helper.ts.md