// .docs-espejo/components/ui/BenefitPill.tsx.md
/\*\*

- @file .docs-espejo/components/ui/BenefitPill.tsx.md
- @description Documento Espejo y SSoT conceptual para el aparato BenefitPill.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `BenefitPill`

## 1. Rol Estratégico y Propósito

Este aparato es una **molécula de UI fundamental para la persuasión**. Su propósito es encapsular un único punto de valor o beneficio del producto en una unidad visualmente atractiva, digerible e interactiva. Es el "ladrillo LEGO" con el que se construye la sección de beneficios.

Como componente de presentación puro, su diseño le permite ser reutilizado en cualquier contexto que requiera la exhibición de características o ventajas de forma concisa.

## 2. Arquitectura y Flujo de Ejecución

Es un Componente de Cliente (`"use client"`) de presentación 100% puro y controlado. Su lógica interna se centra en las animaciones de `framer-motion`.

```mermaid
graph TD
    A[Componente Padre (ej. `BenefitsSection`)] -- "Pasa props (icon, title, etc.)" --> B["`BenefitPill.tsx`"];
    B -- "Usa `props.index` para calcular `delay`" --> C["Animación de Entrada (`initial`, `whileInView`)"];
    B -- "Define" --> D["Animación de Interacción (`whileHover`)"];
    C & D --> E[Renderiza `motion.div` con contenido];
3. Contrato de API
Props de Entrada (BenefitPillProps):
icon: LucideIcon: El componente de ícono de lucide-react.
title: string: El título del beneficio.
description: string: La descripción del beneficio.
index: number: El índice del beneficio en la lista, utilizado para crear un efecto de animación escalonada.
4. Zona de Melhorias Futuras
MODAL DE DETALLES: Al hacer clic, abrir un modal que muestre información extendida sobre el beneficio, con citas del informe científico.
TOOLTIP INFORMATIVO: Al pasar el cursor, mostrar un Tooltip con un dato interesante o una estadística relacionada con el beneficio.
ENLACE OPCIONAL: Permitir que la píldora actúe como un enlace si se le pasa una prop href: string, dirigiendo a una sección detallada o a un artículo de blog.
VARIANTES VISUALES (cva): Crear variantes de estilo (ej. compact, featured) que alteren el tamaño o la apariencia para diferentes contextos de uso.
PERSONALIZACIÓN DE ICONO: Aceptar props para controlar el color y size del ícono, en lugar de tenerlos fijos.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
PRUEBAS DE INTERACCIÓN: Crear pruebas unitarias que verifiquen que las animaciones de framer-motion se aplican correctamente y que el componente es accesible.
SOPORTE PARA IMÁGENES: Permitir pasar una imageUrl: string en lugar de un icon, y renderizar un componente <Image> en el círculo.
NÚMERO DE PASO: Añadir una prop stepNumber?: number para poder usar el componente en secciones de "cómo funciona", mostrando un número en lugar del icono.
BADGE ADICIONAL: Permitir una prop badgeText?: string que renderice un pequeño <Badge> en una esquina de la píldora (ej. "Nuevo", "Popular").
// .docs-espejo/components/ui/BenefitPill.tsx.md
```
