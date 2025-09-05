// .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
/\*\*

- @file .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
- @description Documento Espejo y SSoT conceptual para el aparato TreatmentCycleCard.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `TreatmentCycleCard`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI educativa y de gestión de expectativas**. Su propósito es presentar una fase específica del "viaje del cliente" con el producto de una manera clara y estructurada.

Al dividir el proceso en etapas (`duration`, `title`, `description`), el componente ayuda a construir confianza y a guiar al usuario, mostrando que hay un plan y unos resultados predecibles. Como componente atómico, es la pieza fundamental para construir cualquier tipo de línea de tiempo o sección de proceso.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) de presentación 100% puro**. Su lógica interna está dedicada a las animaciones de `framer-motion` para la entrada y la interacción.

```mermaid
graph TD
    A[Componente Padre (ej. `TreatmentCycleSection`)] -- "Pasa props (duration, title, etc.)" --> B["`TreatmentCycleCard.tsx`"];
    B -- "Usa `props.index` para el `delay` de animación" --> C["Animación de Entrada (`initial`, `whileInView`)"];
    B -- "Define animación de interacción" --> D["`whileHover`"];
    C & D --> E[Renderiza `motion.div` con contenido];
3. Contrato de API
Props de Entrada (TreatmentCycleCardProps):
duration: string: El texto que aparece en el círculo (ej. "30 Días").
title: string: El título de la fase.
description: string: La descripción de la fase.
index: number: El índice del card para la animación escalonada.
4. Zona de Melhorias Futuras
ICONO OPCIONAL: Permitir pasar una prop icon?: LucideIcon que, si se proporciona, se renderice dentro del círculo en lugar de la duration.
VISUALIZACIÓN DE PROGRESO: Crear una variante que conecte visualmente varias tarjetas con una línea (SVG), reforzando la idea de una línea de tiempo.
TOOLTIPS INFORMATIVOS: Añadir un ícono de "información" que, al pasar el cursor, muestre un Tooltip con detalles adicionales o una cita del informe científico.
OFERTAS BASADAS EN CICLOS (CTA): Integrar un botón opcional (ej. "Seleccionar Plan de 90 Días") que, al hacer clic, desplace la página hasta el formulario de pedido y potencialmente preseleccione una oferta.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
VARIANTES DE ESTILO (cva): Crear variantes para diferentes apariencias, como highlighted para destacar una fase recomendada.
PRUEBAS UNITARIAS: Crear un arnés de pruebas para verificar que el contenido de las props se renderiza correctamente.
ACCESIBILIDAD MEJORADA: Asegurarse de que el contenido del card sea completamente accesible para lectores de pantalla, especialmente las animaciones.
COMPONENTE GENÉRICO TimelineCard: Abstraer la lógica de este componente a uno más genérico llamado TimelineCard que pueda ser reutilizado para mostrar cualquier tipo de proceso paso a paso.
CONTENIDO ENRIQUECIDO: Permitir que la description sea un ReactNode o use dangerouslySetInnerHTML para mostrar texto con formato.
// .docs-espejo/components/ui/TreatmentCycleCard.tsx.md
```
