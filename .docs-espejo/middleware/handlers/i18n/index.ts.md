<!-- .docs-espejo/middleware/handlers/i18n/index.ts.md -->
/**
 * @file .docs-espejo/middleware/handlers/i18n/index.ts.md
 * @description Documento Espejo y SSoT conceptual para el manejador de i18n en el Edge Runtime.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `handleI18n` (Manejador de Middleware)

## 1. Rol Estratégico y Propósito

Este aparato es el **motor de la internacionalización en el Edge**. Su única responsabilidad es interceptar cada petición, determinar el `locale` más apropiado para el usuario con una lógica de detección priorizada, y configurar el contexto de `next-intl`.

Actúa como una capa de lógica atómica, consumiendo la SSoT de configuración de navegación (`src/lib/navigation.ts`) y proporcionando trazabilidad completa al **recibir explícitamente el `correlationId`** para sus logs, adhiriéndose al patrón de propagación de contexto del Edge.

## 2. Arquitectura y Flujo de Ejecución

El manejador orquesta la detección de `locale` y delega la lógica de enrutamiento a `createNextIntlMiddleware`.

```mermaid
graph TD
    A[Orquestador (`middleware.ts`)] -- "1. Llama a `handleI18n(req, id)`" --> B["`handleI18n`"];
    B -- "2. Llama a `getLocaleFromRequest(req, id)`" --> C{Lógica de Detección};
    subgraph "Detección de Locale Priorizada"
        C -- "Prio 1: Cookie `NEXT_LOCALE`" --> D{¿Encontrado?};
        D -- No --> E["Prio 2: Header `Accept-Language`"];
        E --> F{¿Encontrado?};
        F -- No --> G["Prio 3: GeoIP (Header Vercel)"];
        G --> H{¿Encontrado?};
    end
    D & F & H -- Sí --> I["`locale` Válido"];
    H -- No --> J["`undefined`"];
    
    J --> K["Redirecciona a `/select-language`"];
    I --> L["Ejecuta `createNextIntlMiddleware`"];
    L --> M["Añade header `x-app-locale`"];
    K & M --> N[Retorna `NextResponse` al Orquestador];
3. Contrato de API
handleI18n(request: NextRequest, correlationId: string): Promise<NextResponse>: La función principal del manejador. Recibe la petición y el correlationId y retorna una NextResponse.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Cacheo de Detección de GeoIP en el Edge: Para usuarios sin cookie o Accept-Language, cachear el resultado de GeoIP (ej. en Vercel KV store, asociado a la IP) por un corto período para reducir la latencia.
Fallback de locale por Región: Extender la lógica para que, si un locale específico del país no está soportado (ej. en-CA), pueda hacer fallback a uno regional más genérico (en-US).
A/B Testing de locale por Cookie: Implementar una lógica que permita forzar un locale a través de una cookie de A/B testing para pruebas de mercado.
Redirección con URL Original: En la redirección a /select-language, añadir la URL original como parámetro para que el usuario sea redirigido a la página que intentaba visitar después de seleccionar el idioma.
<!-- .docs-espejo/middleware/handlers/i18n/index.ts.md -->