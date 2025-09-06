<!-- .docs-espejo/middleware.ts.md -->
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `middleware`.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `middleware.ts` (Orquestador del Edge)

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de entrada y el orquestador resiliente del pipeline de la aplicación**. Se ejecuta en el Edge Runtime para cada petición. Sus responsabilidades son:

1.  **Establecer la Trazabilidad:** Inicia la observabilidad transaccional generando un `correlationId` nativo del Edge (`crypto.randomUUID()`).
2.  **Orquestar el Pipeline:** Invoca una secuencia de manejadores atómicos (`handleI18n`, etc.) de forma ordenada.
3.  **Propagar el Contexto Explícitamente:** Pasa el `correlationId` como argumento a todos los sub-sistemas (manejadores, loggers), siguiendo el patrón de propagación de contexto canónico para el Edge Runtime.
4.  **Garantizar la Resiliencia:** Implementa un "escudo de resiliencia" (`try/catch`) que previene fallos, asegurando que cada error sea capturado, logueado con su `correlationId`, y devuelto al cliente.

## 2. Arquitectura y Flujo de Ejecución

El `middleware.ts` actúa como un orquestador que genera y propaga explícitamente el contexto de la petición.

```mermaid
graph TD
    A[Petición del Usuario] --> B["`middleware` function"];
    B -- "1. Genera `correlationId` con `crypto.randomUUID()`" --> C{Pipeline de Manejadores};
    C -- "2. Llama a `handleI18n(request, correlationId)`" --> D[Respuesta de I18n];
    D -- "3. Añade `x-correlation-id` a la cabecera de respuesta" --> E["`edgeLogger.info()` (Éxito)"];
    E --> F[Respuesta Final al Cliente];
    
    subgraph "Escudo de Resiliencia"
        C -- "Fallo en un manejador" --> G["Bloque `catch`"];
        G -- "4. `edgeLogger.error()` con `correlationId`" --> H[Log Crítico];
        H -- "5. Retorna `NextResponse(500)` con `x-correlation-id`" --> F;
    end
3. Contrato de API
middleware(request: NextRequest): Promise<NextResponse>: La función principal que Next.js invoca.
config: { matcher: string[] }: Define las rutas en las que se ejecutará el middleware.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Pipeline de Manejadores Dinámico: Implementar un sistema donde el orden de los manejadores pueda ser configurado a través de Vercel Edge Config.
Manejador de Autenticación (JWT): Crear un handleAuth que valide un token JWT en el Edge, protegiendo las rutas de forma temprana.
Manejador de A/B Testing: Crear un handleABTesting que asigne al usuario a un grupo de prueba y reescriba la URL a una variante de página.
Manejador de Modo Mantenimiento: Crear un handleMaintenance que, si una variable en Edge Config está activa, redirija todas las peticiones a una página de mantenimiento estática.
Manejador de Inyección de Headers de Seguridad: Crear un handleSecurityHeaders que añada automáticamente headers de seguridad estándar (CSP, XSS, etc.) a todas las respuestas.
<!-- .docs-espejo/middleware.ts.md -->