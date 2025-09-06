<!-- .docs-espejo/components/ui/TestimonialsSection.tsx.md -->
/**
 * @file .docs-espejo/components/ui/TestimonialsSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TestimonialsSection.
 * @author L.I.A. Legacy
 * @version 5.2.0
 */
# Manifiesto Conceptual: Aparato `TestimonialsSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI soberano centrado en la prueba social**. Su propósito es orquestar y presentar una colección de testimonios de clientes de una manera interactiva y atractiva, utilizando un formato de carrusel.

Como **componente soberano**, obtiene su propio contenido de i18n (título, datos de testimonios y etiquetas ARIA), eliminando la dependencia de `props` y convirtiéndose en un aparato "plug-and-play". Se integra con la API de logging unificada del cliente para una observabilidad completa de las interacciones del usuario con el carrusel.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica interna está dedicada a la gestión del estado del carrusel a través del hook `useEmblaCarousel` y a la obtención de su propio contenido.

```mermaid
graph TD
    A["`TestimonialsSection.tsx`"] -- "Invoca `useTranslations()`" --> B[Obtiene `mainTitle` y `testimonials[]` de su archivo JSON];
    B -- "Inicializa" --> C["Hook `useEmblaCarousel`"];
    B -- "Mapea `testimonials[]`" --> D{Loop de Renderizado};
    D -- "Para cada `testimonial`" --> E["Renderiza `<TestimonialCard />`"];
    F[Botones de Navegación] -- "Al hacer clic, llaman a" --> G["`emblaApi.scrollPrev/Next()`"];
    G -- "Registra en `clientLogger.trace()`" --> H[Registro de Observabilidad];
    A -- "Utiliza `clientLogger.trace()`" --> H;
Esta arquitectura soberana elimina el prop drilling y promueve la máxima reutilización del componente.
3. Contrato de API
Props de Entrada:
title: string: El título principal de la sección de testimonios.
children: React.ReactNode: Los elementos hijos que representarán los slides individuales del carrusel (ej., <TestimonialCard />).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
INDICADORES DE PAGINACIÓN (PUNTOS): Añadir una serie de puntos navegables debajo del carrusel que indiquen el número total de testimonios y resalten el que está actualmente visible. Estos puntos también podrían ser clicables para saltar a un testimonio específico, mejorando la UX.
AUTOPLAY DEL CARRUSEL CON PAUSA Y RESUMEN: Implementar una opción de autoplay con un tiempo configurable, que se pause al pasar el cursor o al interactuar con los botones. Además, podría incluir un botón de "Play/Pause" explícito para mayor control del usuario.
ALTURA ADAPTATIVA DINÁMICA MEJORADA: Configurar Embla Carousel para que ajuste su altura dinámicamente si los testimonios tienen longitudes de texto variables, pero también que utilice transiciones suaves para evitar saltos bruscos en el layout.
FEEDBACK VISUAL DE NAVEGACIÓN EXTENDIDO: Deshabilitar visualmente los botones de navegación "anterior" en el primer slide y "siguiente" en el último (si la opción loop está desactivada). Adicionalmente, los botones podrían tener un efecto visual de "presión" al hacer clic para una microinteracción más rica.
VERSIÓN DE CUADRÍCULA (GRID) RESPONSIVA: Añadir una prop layout: 'carousel' | 'grid' que, para pantallas grandes, muestre los testimonios en una cuadrícula estática en lugar de un carrusel, permitiendo visualizar más testimonios simultáneamente y reducir la interactividad cuando el espacio lo permite. En móviles, se mantendría el carrusel.
<!-- .docs-espejo/components/ui/TestimonialsSection.tsx.md -->