<!-- .docs-espejo/components/ui/PriceDisplay.tsx.md -->
/**
 * @file .docs-espejo/components/ui/PriceDisplay.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato PriceDisplay.
 * @author L.I.A. Legacy
 * @version 6.1.0
 */
# Manifiesto Conceptual: Aparato `PriceDisplay`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI soberana de conversión y accesibilidad**. Su propósito es presentar la información de precios de una manera visualmente persuasiva y semánticamente rica, creando un anclaje de valor claro para todos los usuarios.

Como componente soberano, **obtiene todo su contenido de UI** (etiquetas, moneda, `aria-label`s) a través de `useTranslations`, y **recibe únicamente los datos de negocio** (los valores de los precios) a través de `props`. Se integra con la API de logging del cliente unificada para una observabilidad completa de su funcionamiento, incluyendo errores en el formateo de precios.

## 2. Arquitectura de Élite

Es un componente de cliente (`"use client"`) soberano que implementa las mejores prácticas de semántica y accesibilidad:
*   **HTML Semántico:** Utiliza las etiquetas `<del>` para el precio original y `<ins>` para el precio con descuento, comunicando el significado de la oferta a las tecnologías asistivas de manera apropiada.
*   **Accesibilidad Explícita:** Provee `aria-label`s completos e internacionalizados para cada valor de precio, mejorando la experiencia para usuarios de lectores de pantalla.
*   **Resiliencia:** Encapsula la lógica de formateo de `Intl.NumberFormat` en un bloque `try/catch` para prevenir fallos de renderizado en caso de configuraciones de locale o moneda inesperadas. Los errores son registrados con `clientLogger`.
*   **Responsabilidad de Validación:** Este componente de presentación confía en que las `props` que recibe ya han sido validadas por su orquestador. No contiene su propio esquema de validación Zod, adhiriéndose al Principio de Responsabilidad Única.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts` con la API unificada `(context, message)`) para registrar su propio flujo de renderizado y cualquier error durante el formateo de precios.

## 3. Contrato de API
### Props de Entrada (`PriceDisplayProps`):
*   `originalPrice: number`: El precio original sin descuento.
*   `discountedPrice: number`: El precio final con descuento.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **CÁLCULO Y VISUALIZACIÓN DE DESCUENTO AUTOMÁTICO:** Añadir una prop opcional `showDiscountPercentage?: boolean`. Si es `true`, el componente calcularía y mostraría el porcentaje de descuento (ej. "¡Ahorra 50%!") en un "badge" visualmente atractivo.
*   **ANIMACIÓN DE NÚMEROS:** Al entrar en el `viewport`, los números de los precios podrían animar desde `0` hasta el valor final, creando un efecto visual dinámico que capte la atención.
*   **INTEGRACIÓN CON `Schema.org` Avanzada:** Añadir una prop `productOfferSchema?: Offer` (del tipo de Schema.org para ofertas) que permita inyectar datos estructurados (`Offer` schema) para un SEO avanzado, directamente en el `<head>` de la página a través de `SchemaInjector`.
*   **ESTADO DE CARGA (ESQUELETO):** Añadir un estado `isLoading?: boolean` que, si es `true`, muestre placeholders animados (esqueletos) en lugar de los números de precio, mejorando la UX durante la carga asíncrona de datos de precios.
*   **SOPORTE PARA MÚLTIPLES DIVISAS:** Extender la lógica para permitir una prop `preferredCurrency?: string` que, en conjunto con `useTranslations`, seleccione la moneda a mostrar si el usuario tiene una preferencia.
<!-- .docs-espejo/components/ui/PriceDisplay.tsx.md -->