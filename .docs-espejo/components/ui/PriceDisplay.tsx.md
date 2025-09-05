// .docs-espejo/components/ui/PriceDisplay.tsx.md
/**
 * @file .docs-espejo/components/ui/PriceDisplay.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato PriceDisplay.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `PriceDisplay`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI soberana de conversión**. Su propósito es presentar la información de precios de una manera visualmente persuasiva, creando un anclaje de valor.

Como componente soberano, **obtiene su propio contenido de UI** (etiquetas, moneda, `locale`) a través de `useTranslations`, y **recibe únicamente los datos de negocio** (los valores de los precios) a través de `props`. Esta separación es un pilar de la arquitectura.

## 2. Arquitectura y Flujo de Ejecución

Es un componente de cliente (`"use client"`) soberano que recibe datos de negocio.

```mermaid
graph TD
    A[Componente Padre (ej. `OrderForm`)] -- "Pasa props (precios)" --> B["`PriceDisplay.tsx`"];
    B -- "Invoca `useTranslations()` y `useLocale()`" --> C[Obtiene etiquetas, moneda y locale];
    C -- "Usa `Intl.NumberFormat` para" --> D[Formatear precios];
    D -- "Renderiza" --> E[HTML com preços e etiquetas];
Esta arquitectura lo hace reutilizable y desacoplado, esperando solo los datos dinámicos que no puede conocer por sí mismo.
3. Contrato de API
Props de Entrada (PriceDisplayProps):
originalPrice: number: El precio original sin descuento.
discountedPrice: number: El precio final con descuento.
4. Zona de Melhorias Futuras
CÁLCULO DE DESCUENTO AUTOMÁTICO: Añadir una prop opcional showDiscountPercentage?: boolean. Si es true, el componente calcularía y mostraría el porcentaje de descuento (ej. "¡Ahorra 50%!") en un "badge".
ANIMACIÓN DE NÚMEROS: Al entrar en el viewport, los números podrían animar desde 0 hasta el valor final.
VARIANTES DE LAYOUT: Implementar variantes (vertical, horizontal) para diferentes disposiciones.
INTEGRACIÓN CON Schema.org: Añadir una prop para inyectar datos estructurados (Offer schema) para un SEO avanzado.
ESTADO DE CARGA (ESQUELETO): Añadir un estado isLoading?: boolean que muestre placeholders animados mientras se cargan los datos de precios desde una API.
// .docs-espejo/components/ui/PriceDisplay.tsx.md