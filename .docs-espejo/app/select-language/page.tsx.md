<!-- .docs-espejo/app/select-language/page.tsx.md -->
/**
 * @file .docs-espejo/app/select-language/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de selección de idioma.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `select-language/page.tsx` (Página de Selección de Idioma)

## 1. Rol Estratégico y Propósito

Este aparato es la **página de "puerta de entrada" resiliente y accesible** de la aplicación, diseñada para guiar al usuario a seleccionar su idioma preferido cuando este no puede ser determinado automáticamente. Su propósito es triple:

1.  **Detección y Redirección Automática:** Presentar una cuenta regresiva que, al expirar, redirige automáticamente al usuario al `defaultLocale`, garantizando que siempre haya un punto de partida.
2.  **Selección Manual de Idioma:** Ofrecer una lista clara de los locales soportados, permitiendo al usuario elegir manualmente su idioma y guardar esta preferencia en una cookie (`NEXT_LOCALE`).
3.  **Resiliencia y Accesibilidad:** Garantizar que la página se renderice correctamente incluso si hay problemas con la carga o validación del contenido de internacionalización, utilizando textos de fallback. La UI está diseñada para ser accesible y clara.

Como Client Component, orquesta la interacción del usuario, la gestión de cookies y la navegación del router.

## 2. Arquitectura y Flujo de Ejecución

Es un **Client Component (`"use client"`) soberano** que sigue el patrón "Orquestador de Interacción y Validaciones".

```mermaid
graph TD
    A[Usuario llega a `/select-language`] --> B["`SelectLanguagePage` (Componente Cliente)"];
    B -- "1. Invoca `useTranslations('app.selectLanguage')` y `t.raw('')`" --> C[Contenido i18n];
    C -- "2. Valida contra `SelectLanguageContentSchema`" --> D{¿Validación OK?};
    D -- Sí --> E[Usa `content.data`];
    D -- No --> F["`clientLogger.error()` y usa `fallbackContent`"];
    F --> E;

    E --> G["`useState(5)` (countdown)"];
    E --> H["`useCallback(handleLanguageSelect)`"];
    H -- "3. `clientLogger.info()`" --> I[Registro de Evento];
    H -- "4. `cookies.set()`" --> J[Persistencia en Cookie];
    H -- "5. `router.push('/')`" --> K[Redirección];

    E --> L["`useEffect` (gestiona `countdown`)"];
    L -- `countdown === 0` --> M["`clientLogger.warn()`"];
    M --> H; // Llama a `handleLanguageSelect(defaultLocale)`

    E --> N["Renderiza UI (Título, CountdownCircle, Botones de Idioma)"];
    B -- "Utiliza `clientLogger.trace()`" --> I;
3. Contrato de API
Props de Entrada:
Ninguna. Es un componente de página que es orquestado por el App Router de Next.js.
Contrato de Datos (desde lib/validators/i18n/SelectLanguage.schema.ts):
El contenido de internacionalización (t.raw("")) debe cumplir con la estructura definida en SelectLanguageContentSchema.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Detección de Locale Automática con Feedback Visual: Aunque el middleware ya intenta detectar el locale, esta página podría mostrar un mensaje "Detectando tu idioma preferido..." mientras se carga la API de GeoIP o se procesan los headers, y luego resaltar la opción de idioma detectada antes de la redirección.
"No, gracias, prefiero no seleccionar": Añadir una opción "Continuar en [Idioma por defecto]" o "Más tarde" que simplemente cierre la pantalla de selección sin forzar una elección, ideal para usuarios que prefieren la configuración predeterminada sin interacción.
Diseño Responsivo Avanzado: Optimizar aún más el diseño para diferentes tamaños de pantalla, quizás con un carrusel de idiomas en pantallas muy pequeñas o un layout de cuadrícula más denso para pantallas grandes.
Animación de Fade-Out en Redirección: Añadir una animación de framer-motion de fade-out o scale-down a la motion.div principal justo antes de que se dispare la redirección, para una transición de UX más suave.
PRECARGA INTELIGENTE DE RECURSOS: Para el idioma por defecto, precargar los recursos (imágenes, fuentes, datos de i18n) en segundo plano mientras el usuario está en la página de selección, para que la carga de la página principal sea instantánea.
TESTES A/B DE UX DE SELECCIÓN: Utilizar un sistema de feature flags para probar diferentes layouts o flujos de interacción en la página de selección de idioma (ej., ¿es más efectiva la redirección automática o una selección manual obligatoria?).
<!-- .docs-espejo/app/select-language/page.tsx.md -->