// .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
/**
 * @file .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato GeoIPLocator.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `GeoIPLocator`

## 1. Rol Estratégico y Propósito

Este aparato es un **proveedor de contexto de cliente**. Su única responsabilidad es detectar la información de geolocalización del usuario a través de una API de GeoIP en el navegador y proveer estos datos a cualquier componente de la aplicación que los necesite (ej. `OrderForm`) de una manera desacoplada y eficiente.

Estratégicamente, permite la personalización de la experiencia del usuario, como preseleccionar el país en formularios, mostrar ofertas específicas por región o adaptar el contenido al `locale` más probable del visitante.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Proveedor de Contexto" de React, separando la lógica de obtención de datos de su consumo.

```mermaid
graph TD
    A[Componente `GeoIPProvider` se monta en el árbol] --> B["`useEffect` se dispara una vez"];
    B --> C["Llama a `fetch(GEOIP_API_URL)`"];
    C -- Éxito --> D["Actualiza estado interno con datos GeoIP"];
    C -- Fallo --> E["Actualiza estado interno con mensaje de error"];
    D & E --> F["Contexto provee el nuevo estado"];
    G[Cualquier componente hijo] -- "Llama a" --> H["Hook `useGeoIP()`"];
    H -- "Lee desde" --> F;
    H --> G[Recibe `{ geoData, isLoading, error }`];
3. Contrato de API
Componente de Entrada: GeoIPProvider
Props: { children: ReactNode }
Hook de Salida: useGeoIP()
Retorno: GeoIPContextState { geoData: { countryCode, countryName }, isLoading, error }
4. Zona de Melhorias Futuras
CACHING EN sessionStorage: Para evitar llamadas redundantes a la API en cada navegación dentro de la misma sesión, los datos de GeoIP pueden ser almacenados en sessionStorage. El useEffect debería verificar el caché antes de hacer un fetch.
FALLBACK A DETECCIÓN EN SERVIDOR: En plataformas como Vercel, el país está disponible en las cabeceras (x-vercel-ip-country). Se podría pasar este valor inicial desde un Server Component al GeoIPProvider para un renderizado inicial más rápido, usando el fetch del cliente como fallback.
ABSTRACCIÓN A SERVICIO: La lógica de fetch podría ser abstraída a un servicio dedicado (/lib/services/geoip.service.ts) para una mejor separación de responsabilidades y testeabilidad.
IMPLEMENTAR RETRY-MECHANISM: Añadir una lógica de reintentos con "exponential backoff" para el fetch en caso de fallos de red intermitentes.
VALIDACIÓN DE RESPUESTA CON ZOD: Crear un GeoIPResponseSchema con Zod para validar la estructura de la respuesta de la API, garantizando la seguridad de tipos de los datos consumidos.
ESTADOS DE CARGA GRANULARES: En lugar de un booleano isLoading, el estado podría ser más granular ('idle' | 'loading' | 'success' | 'error') para un control más fino de la UI.
HOOK useGeoIPEffect PERSONALIZADO: La lógica dentro del useEffect podría ser extraída a su propio hook para facilitar pruebas unitarias aisladas de la lógica de obtención de datos.
MENSAJES DE ERROR INTERNACIONALIZADOS: Si el fetch falla, el error podría ser una clave de i18n en lugar de un string, para mostrar mensajes de error localizados al usuario.
RESILIENCIA CONTRA AD-BLOCKERS: Investigar y documentar estrategias de fallback para el caso en que un ad-blocker bloquee la llamada a la API de GeoIP.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español para consistencia.
// .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md