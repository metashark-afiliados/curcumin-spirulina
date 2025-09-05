// .docs-espejo/components/ui/PriceDisplay.tsx.md
/**
 * @file .docs-espejo/components/ui/PriceDisplay.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato PriceDisplay.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `PriceDisplay`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI soberana de conversión y accesibilidad**. Su propósito es presentar la información de precios de una manera visualmente persuasiva y semánticamente rica, creando un anclaje de valor claro para todos los usuarios.

Como componente soberano, **obtiene todo su contenido de UI** (etiquetas, moneda, `aria-label`s) a través de `useTranslations`, y **recibe únicamente los datos de negocio** (los valores de los precios) a través de `props`.

## 2. Arquitectura de Élite

Es un componente de cliente (`"use client"`) soberano que implementa las mejores prácticas de semántica y accesibilidad:
*   **HTML Semántico:** Utiliza las etiquetas `<del>` para el precio original y `<ins>` para el precio con descuento, comunicando el significado de la oferta a las tecnologías asistivas.
*   **Accesibilidad Explícita:** Provee `aria-label`s completos e internacionalizados para cada valor de precio.
*   **Resiliencia:** Encapsula la lógica de formateo de `Intl.NumberFormat` en un bloque `try/catch` para prevenir fallos de renderizado.
*   **Responsabilidad de Validación:** Este componente de presentación confía en que las `props` que recibe ya han sido validadas por su orquestador. No contiene su propio esquema de validación Zod, adhiriéndose al Principio de Responsabilidad Única.

## 3. Contrato de API
### Props de Entrada (`PriceDisplayProps`):
*   `originalPrice: number`: El precio original sin descuento.
*   `discountedPrice: number`: El precio final con descuento.

## 4. Zona de Melhorias Futuras
*   **CÁLCULO DE DESCUENTO AUTOMÁTICO:** Añadir una prop opcional `showDiscountPercentage?: boolean`. Si es `true`, el componente calcularía y mostraría el porcentaje de descuento (ej. "¡Ahorra 50%!") en un "badge".
*   **ANIMACIÓN DE NÚMEROS:** Al entrar en el viewport, los números podrían animar desde 0 hasta el valor final.
*   **INTEGRACIÓN CON `Schema.org`:** Añadir una prop para inyectar datos estructurados (`Offer` schema) para un SEO avanzado.
*   **ESTADO DE CARGA (ESQUELETO):** Añadir un estado `isLoading?: boolean` que muestre placeholders animados mientras se cargan los datos de precios desde una API.
// .docs-espejo/components/ui/PriceDisplay.tsx.md