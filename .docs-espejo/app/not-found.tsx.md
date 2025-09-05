// .docs-espejo/app/not-found.tsx.md
/**
 * @file .docs-espejo/app/not-found.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página 404 global.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `not-found.tsx`

## 1. Rol Estratégico y Propósito

Este aparato es la **red de seguridad soberana** de la experiencia de usuario. Su propósito es capturar todas las peticiones a rutas no existentes y presentar una página de error 404 clara, útil e internacionalizada.

Como aparato soberano, es responsable de toda la respuesta:
1.  **Metadatos (`<head>`):** Exporta `generateMetadata` para definir el título de la página.
2.  **Contenido (`<body>`):** Renderiza el cuerpo de la página.
3.  **Resiliencia:** Implementa un patrón de `try/catch` con textos de `fallback` para garantizar que la página 404 se renderice siempre, incluso si el sistema de i18n falla.

## 2. Arquitectura y Flujo de Ejecución

Es un **Server Component** especial, invocado por Next.js.

```mermaid
graph TD
    A[Request a /ruta-inexistente] --> B{Next.js};
    B -- "Renderiza `not-found.tsx`" --> C["`generateMetadata()`"];
    C -- "`getTranslations`" --> D{Capa de i18n};
    D -- Éxito --> E[Obtiene título];
    D -- Fallo --> F[Usa título de fallback];
    B -- "Renderiza `NotFoundPage()`" --> G["`getTranslations`"];
    G -- Éxito --> H[Obtiene textos del body];
    G -- Fallo --> I[Usa textos del body de fallback];

    E & H --> J[Renderiza UI con textos traducidos];
    F & I --> J;
3. Contrato de API
Props de Entrada:
Ninguna. Es invocado por el framework.
Salida:
El JSX.Element que representa la página 404 completa.
4. Zona de Melhorias Futuras
SUGERENCIAS DE PÁGINAS: Implementar una lógica que sugiera páginas relevantes basadas en la URL mal escrita, utilizando un algoritmo de coincidencia difusa (fuzzy matching).
LOGGING DE 404: Implementar una lógica en el middleware para registrar las URLs que generan errores 404. Esto es una mina de oro para el SEO.
CAMPO DE BÚSQUEDA: Añadir una barra de búsqueda a la página 404.
DISEÑO MÁS CREATIVO: Diseñar una ilustración o animación 404 personalizada que refuerce la identidad de la marca.
REPORTE DE ENLACE ROTO: Añadir un botón opcional de "Reportar enlace roto" que permita a los usuarios notificar al equipo.
// .docs-espejo/app/not-found.tsx.md