<!-- .docs-espejo/components/blog/CallToAction.tsx.md -->
/**
 * @file .docs-espejo/components/blog/CallToAction.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato CallToAction.
 * @author L.I.A. Legacy
 * @version 5.0.0
 */
# Manifiesto Conceptual: Aparato `CallToAction`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de conversión, soberano, resiliente e instrumentado**. Su propósito es servir como una "rampa de salida" estratégica desde el contenido informativo del blog hacia el funnel de conversión principal, midiendo su efectividad.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`)** que integra múltiples principios de élite:
*   **Escudo de Resiliencia:** Valida el contenido obtenido de su archivo `.json` contra el `CallToActionContentSchema`. Si la validación falla, registra un error y renderiza `null`.
*   **Observabilidad de Conversión (Telemetría):** Utiliza el hook `useTelemetry` para disparar un evento `CTA_CLICK`. Esto proporciona una métrica de negocio crucial para analizar el rendimiento del funnel de conversión del blog.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible.
*   **Observabilidad de Ejecución:** Utiliza `clientLogger` para registrar errores de validación de contenido y el flujo de renderizado.

## 3. Contrato de API

*   **Props de Entrada:** Ninguna. Este es un componente soberano y autocontenido.
*   **Contrato de Datos (desde `lib/validators/i18n/CallToAction.schema.ts`):** El contenido obtenido de `t.raw("")` debe cumplir la estructura definida en `CallToActionContentSchema`.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **Testes A/B de Copywriting y Diseño:** El componente podría obtener diferentes versiones de `CallToActionContent` desde un servicio de `feature flags` o un CMS para probar qué titular, subtítulo, o texto de botón convierte mejor.
*   **Variantes de Diseño (`cva`):** Crear variantes que alteren el layout (ej. `image-right`, `text-center`) o el estilo, permitiendo una mayor personalización y evitando la fatiga visual.
*   **Payload de Telemetría Enriquecido:** Añadir más datos al `payload` del evento `trackEvent`, como el `slug` del artículo desde el que se hizo clic (requeriría pasar el `slug` como prop), para un análisis de conversión más granular.
*   **Imagen Optimizada y Responsiva:** Asegurarse de que la imagen del CTA se cargue de forma optimizada para diferentes dispositivos, mejorando el rendimiento y la experiencia visual.
<!-- .docs-espejo/components/blog/CallToAction.tsx.md -->