<!-- .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md -->
/**
 * @file .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato GeoIPLocator.
 * @author L.I.A. Legacy
 * @version 4.3.0
 */
# Manifiesto Conceptual: Aparato `GeoIPLocator`

## 1. Rol Estratégico y Propósito

Este aparato es un **proveedor de contexto de cliente resiliente y diagnóstico**. Su única responsabilidad es detectar la información de geolocalización del usuario a través de una API de GeoIP en el navegador y proveer estos datos a cualquier componente de la aplicación que los necesite (ej. `OrderForm`) de una manera desacoplada y eficiente.

Estratégicamente, permite la personalización de la experiencia del usuario (como preseleccionar el país en formularios, mostrar ofertas específicas por región o adaptar el contenido al `locale` más probable del visitante). Se integra con la API de logging unificada del cliente para una observabilidad completa de su funcionamiento, incluyendo errores en la detección y validación de GeoIP.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Proveedor de Contexto" de React, separando la lógica de obtención de datos de su consumo, y añadiendo resiliencia y observabilidad.

```mermaid
graph TD
    A[Componente `GeoIPProvider` se monta en el árbol] --> B["`useEffect` se dispara una vez"];
    B --> C["Llama a `fetchGeoIPData()`"];
    subgraph "Lógica de `fetchGeoIPData`"
      C -- "1. `clientLogger.info()` (inicio)" --> C;
      C -- "2. Realiza `fetch` a `GEOIP_API_URL`" --> D{Respuesta de la API};
      D -- Éxito --> E["3. Valida la respuesta con `GeoIPResponseSchema`"];
      E -- Éxito --> F[Retorna `GeoIPData` limpia];
      E -- Fallo --> G["`clientLogger.error()` y Lanza Error"];
      D -- Fallo HTTP --> H["`clientLogger.error()` y Lanza Error"];
    end
    F --> I["`GeoIPProvider` recibe `geoData`"];
    I -- "4. Actualiza estado (`isLoading=false, errorKey=null`)" --> J[Contexto Proveído];
    I -- "5. `clientLogger.trace()` (éxito al establecer estado)" --> K[Registro de Observabilidad];
    G & H --> L["`GeoIPProvider` captura el error"];
    L -- "6. `clientLogger.error()` (fallo en obtención/validación)" --> M[Registro de Observabilidad];
    L -- "7. Actualiza estado (`isLoading=false, errorKey='generic.error_server_generic'`)" --> J;
    
    N[Cualquier componente hijo] -- "Llama a" --> O["Hook `useGeoIP()`"];
    O -- "Lee desde" --> J;
    alt Uso Incorrecto (fuera de Provider)
        O --> P["`clientLogger.error()` y Lanza Error"];
    end
    O --> N[Recibe `{ geoData, isLoading, errorKey }`];
3. Contrato de API
Componente de Entrada: GeoIPProvider
Props: { children: ReactNode }
Hook de Salida: useGeoIP()
Retorno: GeoIPContextState { geoData: { countryCode: string | null, countryName: string | null }, isLoading: boolean, errorKey: ValidationErrorKey | null }
4. Zona de Mejoras Nuevas (Valor al Proyecto)
CACHEO ROBUSTO DE DATOS EN sessionStorage: Para evitar llamadas redundantes a la API de GeoIP y mejorar el rendimiento en visitas subsiguientes a la misma sesión, los datos de GeoIP podrían ser almacenados y recuperados de sessionStorage. Esto requeriría añadir lógica para verificar la frescura de los datos y re-fetch si han expirado.
MECANISMO DE RETENTATIVAS (RETRY) CON "EXPONENTIAL BACKOFF": Implementar una lógica de reintentos con un retardo creciente (exponential backoff) para la llamada fetchGeoIPData en caso de fallos de red intermitentes o errores transitorios de la API. Esto aumentaría la resiliencia del sistema.
UI DE ERROR TRADUCIDA CON react-hot-toast: El errorKey retornado por el hook ('generic.error_server_generic') puede ser utilizado en los componentes consumidores con useTranslations y react-hot-toast para mostrar una notificación de error localizada y amigable al usuario.
FALLBACK DE SERVIDOR (SERVER-SIDE GEOIP): Pasar un valor inicial de GeoIP detectado en el servidor (ej., a través de los headers de Vercel) como prop al GeoIPProvider. Esto permitiría que el proveedor inicie con datos pre-rellenados, mejorando el "First Contentful Paint" (FCP) al reducir la latencia de la primera detección en el cliente.
LIMITACIÓN DE LLAMADAS A LA API (Rate Limiting): Para evitar el abuso o los costos excesivos de la API de GeoIP, implementar un control de "rate limiting" a nivel del cliente o del servidor (si se usa un proxy). Esto podría implicar almacenar un timestamp de la última llamada en localStorage o sessionStorage.
<!-- .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md -->