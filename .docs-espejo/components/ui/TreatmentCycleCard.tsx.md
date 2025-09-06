<!-- .docs-espejo/components/ui/TreatmentCycleCard.tsx.md -->
/**
 * @file .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TreatmentCycleCard.
 * @author L.I.A. Legacy
 * @version 4.2.0
 */
# Manifiesto Conceptual: Aparato `TreatmentCycleCard`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI de presentación pura, atómica y accesible**. Su propósito es presentar una fase individual de un programa de bienestar de una manera concisa, visual y semánticamente correcta.

Estratégicamente, ayuda a gestionar las expectativas del cliente, aumenta la confianza al mostrar un plan estructurado y fomenta el compromiso a largo plazo con el producto.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**.
*   **Responsabilidad de Validación:** Este componente confía en que las `props` que recibe ya han sido validadas por su orquestador (`TreatmentCycleSection`). No contiene su propio esquema de validación Zod.
*   **Semántica y Accesibilidad:** Utiliza un elemento `<section>` como raíz con `aria-labelledby` para crear un "nombre accesible" explícito, garantizando una experiencia de élite para usuarios de lectores de pantalla.
*   **Animación:** Su lógica interna está dedicada a las animaciones de `framer-motion` para la entrada y la interacción.
*   **Observabilidad:** Utiliza el `clientLogger` (ahora con la API unificada `(context, message)`) para registrar su propio flujo, contribuyendo a la observabilidad del lado del cliente.

## 3. Contrato de API
### Props de Entrada (`TreatmentCycleCardProps`):
*   `duration: string`: La duración de la fase del tratamiento (ej., "30 Días").
*   `title: string`: El título de la fase del tratamiento.
*   `description: string`: Una descripción detallada de lo que ocurre en esta fase.
*   `index: number`: El índice de la tarjeta en la lista, utilizado para escalonar la animación.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **ICONO O IMAGEN POR FASE:** Extender el contrato de datos para incluir una prop `icon?: LucideIcon` o `imageUrl?: string` que represente visualmente la fase del tratamiento, en lugar de solo la duración numérica. Esto podría mejorar la comprensión y el atractivo visual.
*   **INDICADOR DE PROGRESO DE LA FASE:** Añadir una pequeña barra de progreso visual o un indicador de "completado" en la tarjeta para simular el avance del usuario a través del ciclo, especialmente si se integra con un sistema de seguimiento del progreso.
*   **CALL TO ACTION POR FASE (CTA):** Permitir que cada tarjeta tenga un botón de `Call To Action` opcional que, al hacer clic, dirija al usuario a una sección relevante (ej. el formulario de pedido si es el final del ciclo, o a un artículo de blog relacionado con esa fase).
*   **TOOLTIP CON DETALLES ADICIONALES:** Al pasar el cursor sobre la tarjeta, podría mostrarse un `Tooltip` con información más detallada sobre los beneficios específicos o los hitos de esa fase, sin sobrecargar la UI principal.
*   **VARIANTES DE ESTILO (cva):** Definir variantes de estilo utilizando `class-variance-authority` (`cva`) para las tarjetas, permitiendo diferentes diseños o colores para distinguir fases críticas o para pruebas A/B.
<!-- .docs-espejo/components/ui/TreatmentCycleCard.tsx.md -->