// .docs-espejo/lib/helpers/geoip.helper.ts.md
/**
 * @file .docs-espejo/lib/helpers/geoip.helper.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `geoip.helper.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `geoip.helper.ts`

## 1. Rol Estratégico y Propósito

Este aparato es un **servicio de infraestructura de bajo nivel**. Su única y exclusiva responsabilidad es actuar como una capa de abstracción sobre una API de geolocalización por IP externa.

Su propósito estratégico es enriquecer el contexto de una petición entrante, proveyendo el código de país del visitante. Este dato es consumido por capas superiores (como el `locale-detector.helper.ts`) para tomar decisiones de negocio, como la selección automática del idioma en la primera visita del usuario.

## 2. Arquitectura y Flujo de Ejecución

Es una función pura y asíncrona de servidor (`"server-only"`).

```mermaid
graph TD
    A[Middleware invoca `getLocaleFromGeoIP(request)`] --> B{IP es privada/inválida?};
    B -- Sí --> C[Retorna `undefined`];
    B -- No --> D[Hace `fetch` a `ip-api.com/{ip}`];
    D -- Falla o Timeout --> C;
    D -- Éxito --> E[Valida la respuesta];
    E -- Inválida --> C;
    E -- Válida --> F[Extrae `countryCode`];
    F --> G[Retorna `countryCode` (ej. "IT")];
La lógica está diseñada para ser resiliente y "fallar silenciosamente". Cualquier problema en la comunicación con la API externa o en la validación de su respuesta resulta en un undefined, permitiendo que el flujo del middleware continúe hacia el siguiente método de detección sin interrumpir la petición del usuario.
3. Contrato de API
getLocaleFromGeoIP(request: NextRequest): string | undefined
Entrada: request: El objeto de petición de Next.js, del cual se extrae la IP.
Salida: Un string con el código de país ISO 3166-1 Alpha-2 (ej. "IT") si la detección es exitosa, o undefined en cualquier otro caso.
4. Zona de Melhorias Futuras
Abstracción de Proveedor: Refactorizar el helper para que la URL de la API (ip-api.com) se obtenga desde una variable de entorno, permitiendo cambiar de proveedor de GeoIP sin modificar el código.
Cacheo en Edge (Vercel KV): Implementar una capa de cacheo con Vercel KV. Antes de llamar a la API externa, verificar si la IP ya fue consultada recientemente para reducir la latencia y el uso de la API.
Mecanismo de Fallback de Proveedores: Configurar un segundo proveedor de GeoIP y, si la llamada al primario falla, intentar automáticamente con el secundario para aumentar la resiliencia.
Enriquecimiento de Datos: Extender la función para que devuelva un objeto más rico { countryCode, region, city } en lugar de solo el código de país.
Validación de Respuesta con Zod: Crear un GeoIPResponseSchema con Zod para validar la respuesta de la API externa de forma tipo-segura.
Tipado Estricto de Retorno: En lugar de string | undefined, definir un tipo CountryCode que sea una unión literal de todos los códigos ISO válidos para una mayor seguridad de tipos.
Batching de Peticiones: Si la API lo permite, implementar una lógica para agrupar múltiples lookups de IP en una sola petición de red.
Manejo de Cuotas de API: Integrar una lógica que rastree el uso de la API y envíe una alerta (logger.warn) cuando se acerque al límite de la cuota gratuita.
Pruebas de Integración: Crear una suite de pruebas de integración que utilice msw (Mock Service Worker) para simular respuestas exitosas y fallidas de la API de GeoIP.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/helpers/geoip.helper.ts.md