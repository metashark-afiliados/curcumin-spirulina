// .docs-espejo/components/ui/TestimonialsSection.tsx.md
/**
 * @file .docs-espejo/components/ui/TestimonialsSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TestimonialsSection.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `TestimonialsSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI soberano centrado en la prueba social**. Su propósito es orquestar y presentar una colección de testimonios de clientes de una manera interactiva y atractiva, utilizando un formato de carrusel.

Como **componente soberano**, obtiene su propio contenido de i18n (título, datos de testimonios y etiquetas ARIA), eliminando la dependencia de `props` y convirtiéndose en un aparato "plug-and-play".

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica interna está dedicada a la gestión del estado del carrusel a través del hook `useEmblaCarousel` y a la obtención de su propio contenido.

```mermaid
graph TD
    A["`TestimonialsSection.tsx`"] -- "Invoca `useTranslations()`" --> B[Obtiene `mainTitle` y `testimonials[]` de su archivo JSON];
    B -- "Inicializa" --> C["Hook `useEmblaCarousel`"];
    B -- "Mapea `testimonials[]`" --> D{Loop de Renderizado};
    D -- "Para cada `testimonial`" --> E["Renderiza `<TestimonialCard />`"];
    F[Botones de Navegación] -- "Al hacer clic, llaman a" --> G["`emblaApi.scrollPrev/Next()`"];
Esta arquitectura soberana elimina el prop drilling y promueve la máxima reutilización del componente.
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
INDICADORES DE PAGINACIÓN (PUNTOS): Añadir una serie de puntos debajo del carrusel que indiquen el número total de testimonios y resalten el que está actualmente visible.
AUTOPLAY DEL CARRUSEL: Implementar una opción de autoplay que avance automáticamente los testimonios, con la capacidad de pausarse al pasar el cursor.
ALTURA ADAPTATIVA: Configurar Embla Carousel para que ajuste su altura dinámicamente si los testimonios tienen longitudes de texto variables, evitando espacios en blanco.
FEEDBACK VISUAL EN BOTONES: Deshabilitar visualmente el botón "anterior" en el primer slide y el "siguiente" en el último si la opción loop está desactivada.
VERSIÓN DE CUADRÍCULA (GRID): Añadir una prop layout: 'carousel' | 'grid' que permita renderizar los testimonios en una cuadrícula estática en lugar de un carrusel.
// .docs-espejo/components/ui/TestimonialsSection.tsx.md