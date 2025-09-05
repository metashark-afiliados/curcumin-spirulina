// .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
/**
 * @file .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TreatmentCycleCard.
 * @author L.I.A. Legacy
 * @version 4.1.0
 */
# Manifiesto Conceptual: Aparato `TreatmentCycleCard`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI educativa, de presentación pura y accesible**. Su propósito es presentar una fase específica del "viaje del cliente" con el producto de una manera clara, estructurada y semánticamente correcta para todas las tecnologías.

Como componente atómico, es la pieza fundamental para construir cualquier tipo de línea de tiempo o sección de proceso.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente confía en que las `props` que recibe ya han sido validadas por su orquestador (`TreatmentCycleSection`). No contiene su propio esquema de validación Zod.
*   **Semántica y Accesibilidad:** Utiliza un elemento `<section>` como raíz y el atributo `aria-labelledby` para crear un "nombre accesible" explícito, garantizando una experiencia de élite para usuarios de lectores de pantalla.
*   **Animación:** Su lógica interna está dedicada a las animaciones de `framer-motion` para la entrada y la interacción.

## 3. Contrato de API
### Props de Entrada (`TreatmentCycleCardProps`):
*   `duration: string`: El texto que aparece en el círculo (ej. "30 Días").
*   `title: string`: El título de la fase.
*   `description: string`: La descripción de la fase.
*   `index: number`: El índice del card para la animación escalonada.

## 4. Zona de Melhorias Futuras
*   **ICONO OPCIONAL:** Permitir pasar una prop `icon?: LucideIcon` que, si se proporciona, se renderice dentro del círculo en lugar de la `duration`.
*   **VISUALIZACIÓN DE PROGRESO:** Crear una variante que conecte visualmente varias tarjetas con una línea (SVG), reforzando la idea de una línea de tiempo.
*   **OFERTAS BASADAS EN CICLOS (CTA):** Integrar un botón opcional (ej. "Seleccionar Plan de 90 Días") que, al hacer clic, desplace la página hasta el formulario de pedido.
// .docs-espejo/components/ui/TreatmentCycleCard.tsx.md