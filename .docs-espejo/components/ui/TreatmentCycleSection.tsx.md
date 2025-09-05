// .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
/**
 * @file .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TreatmentCycleSection.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `TreatmentCycleSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI narrativo y soberano**. Su propósito es presentar la "hoja de ruta" del cliente con el producto, dividiendo el viaje en fases digeribles. Estratégicamente, gestiona las expectativas del cliente, aumenta la confianza al mostrar un plan estructurado y fomenta el uso a largo plazo.

Como **orquestador soberano**, su responsabilidad es **obtener su propio contenido de i18n** y componer las moléculas `TreatmentCycleCard` en un layout cohesivo y animado, siendo completamente agnóstico al contenido específico que muestra.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica es únicamente de obtención de datos y composición.

```mermaid
graph TD
    A["`TreatmentCycleSection.tsx`"] -- "Invoca `useTranslations()`" --> B[Obtiene `mainTitle`, `subtitle` y `cycles[]` de su archivo JSON];
    B -- "Renderiza Título y Subtítulo" --> C[Encabezado de Sección];
    B -- "Mapea el array `cycles[]`" --> D{Loop de Renderizado};
    D -- "Para cada `cycle`, pasa props a" --> E["`TreatmentCycleCard.tsx`"];
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
VISUALIZACIÓN DE PROGRESO: Implementar un elemento visual (ej. una línea de tiempo SVG animada) que conecte las tres tarjetas, reforzando la idea de una jornada continua.
LAYOUT DE CARRUSEL: Añadir una variante de layout que muestre las tarjetas en un carrusel interactivo (embla-carousel-react), especialmente útil en vistas móviles.
SELECCIÓN DE PLAN (CTA INTEGRADO): Permitir que cada tarjeta tenga un botón "Seleccionar Plan" que desplace la vista al formulario de pedido e idealmente preseleccione la oferta correspondiente (ej. 3 meses de suministro).
CONTENIDO VÍA CMS: Permitir que los datos de los ciclos provengan de un Headless CMS para que el equipo de marketing pueda realizar pruebas A/B de la narrativa del "viaje del cliente".
PRUEBAS DE INTEGRACIÓN: Crear un arnés de pruebas que verifique que el componente renderiza el número correcto de tarjetas con el contenido esperado de los archivos de traducción.
// .docs-espejo/components/ui/TreatmentCycleSection.tsx.md