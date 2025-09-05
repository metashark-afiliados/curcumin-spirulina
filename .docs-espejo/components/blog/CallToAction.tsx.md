// .docs-espejo/components/blog/CallToAction.tsx.md
/**
 * @file .docs-espejo/components/blog/CallToAction.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato CallToAction.
 * @author L.I.A. Legacy
 * @version 4.0.0
 */
# Manifiesto Conceptual: Aparato `CallToAction`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI de conversión, soberano y resiliente**. Su propósito es servir como una "rampa de salida" estratégica desde el contenido informativo del blog hacia el funnel de conversión principal.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**.
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Antes de renderizar, valida el contenido obtenido de su archivo `.json` contra el `CallToActionContentSchema`. Si la validación falla, registra un error y renderiza `null`.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Este es un componente soberano y autocontenido.

### Contrato de Datos (desde `lib/validators`):
*   Debe cumplir la estructura definida en `CallToActionContentSchema`.

## 4. Zona de Melhorias Futuras
*   **TESTES A/B DE COPYWRITING:** El componente podría obtener diferentes versiones de `CallToActionContent` desde un servicio de feature flags para probar qué titular convierte mejor.
*   **VARIANTES DE DISEÑO (cva):** Crear variantes que alteren el layout (ej. `image-right`, `text-center`) para evitar la fatiga visual.
*   **SEGUIMIENTO DE EVENTOS DE CONVERSIÓN:** Añadir un evento de tracking (`trackEvent('cta_blog_click')`) al `onClick` del botón para medir su efectividad.
// .docs-espejo/components/blog/CallToAction.tsx.md