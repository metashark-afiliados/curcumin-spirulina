<!-- .docs-espejo/components/ui/InfoSection.tsx.md -->
/**
 * @file .docs-espejo/components/ui/InfoSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato InfoSection.
 * @author L.I.A. Legacy
 * @version 6.1.0
 */
# Manifiesto Conceptual: Aparato `InfoSection`

## 1. Rol Estratégico y Propósito

Este aparato es el **pilar soberano de la construcción de autoridad y confianza** en la landing page. Su propósito es guiar al usuario a través de una narrativa persuasiva que sigue la fórmula psicológica clásica: "Problema -> Agitación -> Solución".

Actúa como un "mini-artículo" que educa al visitante, valida sus puntos de dolor y presenta la solución de una manera lógica y basada en evidencia. Como **componente soberano**, obtiene todo su contenido (incluyendo HTML enriquecido) de su propio archivo de mensajes, eliminando la dependencia de `props`. Se integra con la API de logging unificada del cliente para una observabilidad completa.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**. Su característica técnica clave es:
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Obtiene su contenido completo a través de `t.raw("")` y lo valida rigurosamente contra el `InfoSectionContentSchema`. Si la validación falla, registra un error detallado con `clientLogger` y retorna `null`.
*   **Renderizado de HTML Enriquecido:** Utiliza `dangerouslySetInnerHTML` para renderizar HTML directamente desde la capa de contenido de i18n, permitiendo al equipo de marketing un control granular sobre el formato del texto sin modificar el código del componente.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts` con la API unificada `(context, message)`) para registrar errores de validación de contenido y el flujo de renderizado, asegurando que cualquier problema sea visible en las herramientas de desarrollo.

```mermaid
graph TD
    A["`InfoSection.tsx`"] -- "Invoca `useTranslations()` y `t.raw()`" --> B[Obtiene todo su contenido, incluyendo HTML, de su archivo JSON];
    B -- "Valida contra `InfoSectionContentSchema`" --> C{¿Validación OK?};
    C -- Sí --> D["Renderiza Títulos y Componentes (`Image`, `<a>`)"];
    D -- "Usa `dangerouslySetInnerHTML` para" --> E["Renderizar Párrafos y Citas con formato"];
    C -- No --> F["`clientLogger.error()` y retorna `null`"];
    D & E --> G[Sección Final Renderizada];
3. Contrato de API
Props de Entrada:
Ninguna. Este es un componente soberano y autocontenido.
Contrato de Datos (desde i18n):
El contenido obtenido de t.raw("") debe cumplir con la estructura definida en InfoSectionContentSchema.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
CARDS DE INGREDIENTES INTERACTIVOS: Refactorizar los párrafos de la sección de "solución" para que utilicen "cards" o "pestañas" interactivas, una para cada ingrediente clave (Cúrcuma, Piperina, Espirulina). Esto mejoraría la digestibilidad de la información y la interactividad.
INFOGRAFÍAS VISUALES DINÁMICAS: Extender el esquema de contenido para permitir pasar una URL de imagen para un infográfico o un componente SVG. Esto permitiría al equipo de marketing integrar contenido visual altamente persuasivo y configurarlo desde los archivos de i18n.
VARIANTES DE LAYOUT PERSONALIZABLES: Crear variantes de layout (ej. image-left, image-right, no-image) que modifiquen la disposición del texto y la imagen. Esto se podría controlar a través de una prop en el componente o directamente en el esquema de i18n, facilitando pruebas A/B de diseño.
SANEAMIENTO DE HTML MÁS ROBUSTO: Integrar una librería de saneamiento de HTML (ej. DOMPurify) para limpiar el contenido antes de pasarlo a dangerouslySetInnerHTML. Esto añadiría una capa extra de seguridad contra ataques XSS si el contenido de i18n pudiera ser introducido por fuentes no confiables.
SOPORTE PARA VÍDEO EMBEBIDO: Permitir que el esquema de i18n incluya una videoUrl opcional. Si está presente, la sección podría renderizar un reproductor de vídeo embebido en lugar de la imagen estática, para campañas con contenido audiovisual.
<!-- .docs-espejo/components/ui/InfoSection.tsx.md -->