// .docs-espejo/components/ui/BenefitPill.tsx.md
/**
 * @file .docs-espejo/components/ui/BenefitPill.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato BenefitPill.
 * @author L.I.A. Legacy
 * @version 3.1.0
 */
# Manifiesto Conceptual: Aparato `BenefitPill`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura, atómica y accesible**. Su único propósito es presentar un único beneficio clave del producto de una manera concisa, visual y semánticamente correcta.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente confía en que las `props` que recibe ya han sido validadas por su orquestador (`BenefitsSection`). No contiene su propio esquema de validación Zod.
*   **Semántica y Accesibilidad:** Utiliza un elemento `<article>` como raíz y el atributo `aria-labelledby` para crear un "nombre accesible" explícito, garantizando una experiencia de élite para usuarios de lectores de pantalla.
*   **Animación:** Su lógica interna está dedicada a las animaciones de `framer-motion` para la entrada y la interacción.

## 3. Contrato de API
### Props de Entrada (`BenefitPillProps`):
*   `icon: LucideIcon`: El componente de icono a renderizar.
*   `title: string`: El título del beneficio.
*   `description: string`: La descripción concisa del beneficio.
*   `index: number`: El índice del beneficio en la lista, usado para escalonar la animación.

## 4. Zona de Melhorias Futuras
*   **TOOLTIP CON DETALLES:** Añadir una prop opcional `tooltipText?: string` que, si se proporciona, muestre un tooltip con información adicional al pasar el cursor sobre la píldora.
*   **BADGE DE BENEFICIO:** Extender el contrato de datos en el orquestador (`BenefitsSection`) para incluir una propiedad opcional `badge?: string` (ej. "Nuevo") que este componente pueda renderizar para destacar beneficios específicos.
// .docs-espejo/components/ui/BenefitPill.tsx.md