<!-- .docs-espejo/components/blog/CallToAction.tsx.md -->
/**
 * @file .docs-espejo/components/blog/CallToAction.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato CallToAction.
 * @author L.I.A. Legacy
 * @version 4.1.0
 */
# Manifiesto Conceptual: Aparato `CallToAction`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de conversión, soberano y resiliente**. Su propósito es servir como una "rampa de salida" estratégica desde el contenido informativo del blog hacia el funnel de conversión principal.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**.
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Antes de renderizar, valida el contenido obtenido de su archivo `.json` (`t.raw("")`) contra el `CallToActionContentSchema`. Si la validación falla, registra un error detallado con `clientLogger` y renderiza `null`.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts` con la API unificada `(context, message)`) para registrar errores de validación de contenido y el flujo de renderizado, asegurando que cualquier problema sea visible en las herramientas de desarrollo.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Este es un componente soberano y autocontenido.

### Contrato de Datos (desde `lib/validators/i18n/CallToAction.schema.ts`):
*   El contenido obtenido de `t.raw("")` debe cumplir la estructura definida en `CallToActionContentSchema`.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)
*   **TESTES A/B DE COPYWRITING Y DISEÑO:** El componente podría obtener diferentes versiones de `CallToActionContent` desde un servicio de `feature flags` o un CMS para probar qué titular, subtítulo, texto de botón o imagen convierte mejor.
*   **VARIANTES DE DISEÑO (cva):** Crear variantes que alteren el layout (ej. `image-right`, `text-center`) o el estilo del botón y los textos (utilizando `class-variance-authority` para la flexibilidad CSS), para evitar la fatiga visual y permitir una mayor personalización.
*   **SEGUIMIENTO DE EVENTOS DE CONVERSIÓN MEJORADO:** Añadir un evento de `tracking` (`trackEvent('cta_blog_click')`) al `onClick` del botón y en el `Link` (si se usa `asChild`) para medir su efectividad y analizar el comportamiento del usuario en el embudo de conversión.
*   **IMAGEN OPTIMIZADA Y RESPONSIVA:** Asegurarse de que la imagen del CTA se cargue de forma optimizada para diferentes dispositivos y resoluciones (utilizando `next/image` con `sizes` y `quality` adecuados), mejorando el rendimiento y la experiencia visual.
<!-- .docs-espejo/components/blog/CallToAction.tsx.md -->