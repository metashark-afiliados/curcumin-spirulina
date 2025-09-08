// .docs-espejo/middleware/handlers/telemetry/index.ts.md
/**
 * @file .docs-espejo/middleware/handlers/telemetry/index.ts.md
 * @description Documento Espejo y SSoT conceptual para el manejador de telemetría del middleware.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: Manejador de Middleware de Telemetría

## 1. Rol Estratégico y Propósito

Este aparato es el **"Sensor de Entrada"** de la aplicación. Su única responsabilidad es identificar la primera petición de una nueva sesión de visitante y registrar su "evento de nacimiento" con el máximo contexto posible desde el servidor.

Actúa como el iniciador del `visitor_log` (futura tabla de persistencia), creando un `sessionId` que unificará todos los eventos de telemetría posteriores, tanto del servidor como del cliente, para esa sesión específica.

## 2. Arquitectura y Flujo de Ejecución

El manejador es una función asíncrona que opera en el Edge, diseñada para ser no bloqueante.

```mermaid
graph TD
    A[Petición Entrante] --> B{Cookie de sesión existe?};
    B -- Sí --> C[Fin. Pasa al siguiente manejador];
    B -- No --> D[Genera nuevo `sessionId`];
    D --> E[Obtiene contexto del servidor (IP, Geo, User-Agent)];
    E --> F["Invoca `logTelemetryEvent` <br> (sin `await` - fire and forget)"];
    F --> G[Añade cookie de sesión a la respuesta];
    G --> C;
3. Contrato de API
handleTelemetry(request: NextRequest, response: NextResponse): Promise<void>
Entrada:
request: El objeto de petición entrante.
response: El objeto de respuesta del manejador anterior en el pipeline.
Salida: Una Promise<void>. La función no devuelve una nueva respuesta; muta el objeto response recibido añadiendo una cookie.
4. Zona de Melhorias Futuras
Detección de Bots Avanzada: Integrar una librería especializada en la detección de bots (ej. isbot) para un análisis más preciso del User-Agent, y añadir ese flag al evento inicial.
Manejo de Do Not Track: Respetar la cabecera DNT (Do Not Track) del navegador y deshabilitar el tracking de telemetría si está presente.
Configuración de Exclusiones: Permitir que el manejador reciba una lista de rutas o patrones de User-Agent a excluir del tracking de telemetría (ej. health checks, IPs internas).
Enriquecimiento con User-Agent Client Hints: Si están disponibles en la petición, priorizar las cabeceras Sec-CH-UA-* sobre el string User-Agent para una detección de dispositivo más moderna y precisa.
Resiliencia de logTelemetryEvent: Implementar una lógica de reintento con backoff exponencial si la llamada a la Server Action falla, utilizando una cola de Vercel KV.
Pruebas de Integración: Escribir pruebas que simulen una primera visita y verifiquen que la cookie se establece correctamente y que la Server Action es llamada con el payload esperado.
Sincronización con Consentimiento de Cookies: Integrar el manejador con un futuro sistema de gestión de consentimiento (CMP), de modo que el tracking solo se inicie después de que el usuario haya dado su consentimiento explícito.
Optimización de lookupIpAddress: El helper de GeoIP podría ser optimizado para no ser llamado si el único propósito de la telemetría es el tracking de sesión y no la geolocalización.
Asociación de Usuario en Login: En una futura implementación con autenticación, este manejador podría detectar una sesión autenticada y añadir el userId al evento SESSION_START.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/middleware/handlers/telemetry/index.ts.md