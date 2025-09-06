<!-- .docs-espejo/components/ui/BenefitPill.tsx.md -->
/**
 * @file .docs-espejo/components/ui/BenefitPill.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato BenefitPill.
 * @author L.I.A. Legacy
 * @version 3.2.0
 */
# Manifiesto Conceptual: Aparato `BenefitPill`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura, atómica y accesible**. Su único propósito es presentar un único beneficio clave del producto de una manera concisa, visual y semánticamente correcta.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente confía en que las `props` que recibe ya han sido validadas por su orquestador (`BenefitsSection`). No contiene su propio esquema de validación Zod.
*   **Semántica y Accesibilidad:** Utiliza un elemento `<article>` como raíz y el atributo `aria-labelledby` para crear un "nombre accesible" explícito, garantizando una experiencia de élite para usuarios de lectores de pantalla.
*   **Animación:** Su lógica interna está dedicada a las animaciones de `framer-motion` para la entrada y la interacción.
*   **Observabilidad:** Utiliza el `clientLogger` (ahora con la API unificada `(context, message)`) para registrar su propio flujo, contribuyendo a la observabilidad del lado del cliente.

## 3. Contrato de API
### Props de Entrada (`BenefitPillProps`):
*   `icon: LucideIcon`: El componente de icono a renderizar.
*   `title: string`: El título del beneficio.
*   `description: string`: La descripción concisa del beneficio.
*   `index: number`: El índice del beneficio en la lista, usado para escalonar la animación.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)
*   **TOOLTIP CON DETALLES:** Añadir una prop opcional `tooltipText?: string` que, si se proporciona, muestre un tooltip con información adicional al pasar el cursor sobre la píldora. Esto permite ofrecer más contexto sin sobrecargar la UI principal.
*   **BADGE DE BENEFICIO:** Extender el contrato de datos en el orquestador (`BenefitsSection`) para incluir una propiedad opcional `badge?: string` (ej. "Nuevo", "Popular") que este componente pueda renderizar como un pequeño distintivo visual para destacar beneficios específicos.
*   **VARIANTES DE ICONO Y COLOR:** Explorar el uso de `class-variance-authority` (`cva`) para definir variantes de estilo para el icono o el texto, permitiendo un control más granular sobre la apariencia de la píldora de beneficio.
*   **ANIMACIÓN DE DETALLE AL HOVER:** Al pasar el ratón, además de la animación de escala, podría mostrarse un pequeño detalle o un icono adicional, como una microinteracción de descubrimiento.
<!-- .docs-espejo/components/ui/BenefitPill.tsx.md -->