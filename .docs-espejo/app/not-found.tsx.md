<!-- .docs-espejo/app/not-found.tsx.md -->
/**
 * @file .docs-espejo/app/not-found.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página 404 global.
 * @author L.I.A. Legacy
 * @version 5.2.0
 */
# Manifiesto Conceptual: Aparato `not-found.tsx` (Página 404 Global)

## 1. Rol Estratégico y Propósito

Este aparato es la **red de seguridad soberana** de la experiencia de usuario. Su propósito es capturar todas las peticiones a rutas no existentes y presentar una página de error 404 clara, útil e internacionalizada.

Como aparato soberano (Server Component), es responsable de toda la respuesta:
1.  **Metadatos (`<head>`):** Exporta `generateMetadata` para definir el título de la página, contribuyendo al SEO y la UX.
2.  **Contenido (`<body>`):** Renderiza el cuerpo de la página con un mensaje de error y una opción para volver al inicio.
3.  **Resiliencia:** Implementa un patrón de `try/catch` con textos de `fallback` para garantizar que la página 404 se renderice siempre, incluso si el sistema de i18n falla.
4.  **Optimización de Prerrenderizado:** **Configurado explícitamente para forzar la estaticidad (`export const dynamic = 'force-static';`)** para optimizar el rendimiento del build y el despliegue.
5.  **Observabilidad de Élite:** Utiliza `serverLogger` (con la API unificada `(context, message)`) para registrar la generación de metadatos, errores de validación de contenido y el renderizado de la página, asegurando la trazabilidad.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** especial, invocado por Next.js cuando una ruta no es encontrada.

```mermaid
graph TD
    A[Request a /ruta-inexistente] --> B{Next.js};
    B -- "1. Renderiza `not-found.tsx`" --> C["`export const dynamic = 'force-static';`"];
    C --> D["`generateMetadata()`"];
    D -- "Llama a `getTranslations()`" --> E{Capa de i18n};
    E -- Éxito --> F[Obtiene título];
    E -- Fallo --> G["`serverLogger.warn()` y usa título de fallback"];
    D --> H[Retorna `Metadata` con título];
    H --> I[Inyectado en `<head>`];

    C --> J["`NotFoundPage()`"];
    J -- "1. `serverLogger.trace()` (Inicio render)" --> K[Registro de Observabilidad];
    J -- "2. `getTranslations()` y `t.raw('')`" --> L{Contenido i18n};
    L -- "3. Valida contra `NotFoundContentSchema`" --> M{¿Validación OK?};
    M -- Sí --> N[Usa `content.data`];
    M -- No --> O["`serverLogger.error()` y usa `fallbackTexts`"];
    O --> N;
    N --> P[Renderiza UI con textos traducidos y botón de Home];
    P --> Q[HTML final de la página];
3. Contrato de API
Props de Entrada:
Ninguna. Es invocado por el framework.
Salida:
El JSX.Element que representa la página 404 completa.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
SUGERENCIAS DE PÁGINAS INTELIGENTES: Implementar una lógica que sugiera páginas relevantes basadas en la URL mal escrita (utilizando un algoritmo de coincidencia difusa o un índice de búsqueda) si la página no existe.
LOGGING DE 404 PERSISTENTE: Implementar una lógica en el middleware o en una Server Action para registrar las URLs que generan errores 404 en una base de datos o sistema de analíticas. Esto es una mina de oro para el SEO, permitiendo identificar enlaces rotos o nuevas oportunidades de contenido.
CAMPO DE BÚSQUEDA INTERNA: Añadir una barra de búsqueda a la página 404, permitiendo a los usuarios encontrar directamente el contenido que buscaban sin tener que volver a la página de inicio.
DISEÑO MÁS CREATIVO Y BRANDED: Diseñar una ilustración o animación 404 personalizada que refuerce la identidad de la marca y haga la experiencia del error menos frustrante.
REPORTE DE ENLACE ROTO (USER-SUBMITTED): Añadir un botón opcional de "Reportar enlace roto" que, al hacer clic, permita a los usuarios notificar al equipo de desarrollo sobre la URL que no funciona, enviando un evento de telemetría o una Server Action.
<!-- .docs-espejo/app/not-found.tsx.md -->