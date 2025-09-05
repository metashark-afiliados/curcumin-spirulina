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

Como **orquestador soberano**, su responsabilidad es **obtener y validar su propio contenido de i18n** y componer las moléculas `TreatmentCycleCard` en un layout cohesivo y animado.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**.

```mermaid
graph TD
    A["`TreatmentCycleSection.tsx`"] -- "1. Invoca `useTranslations()`" --> B["Obtiene contenido de su .json"];
    B -- "2. Valida contra `TreatmentCycleSection.schema.ts`" --> C{¿Validación OK?};
    C -- Sí --> D["Renderiza Título y mapea `cycles`"];
    D -- "Para cada `cycle`, pasa props a" --> E["`TreatmentCycleCard`"];
    C -- No --> F["Registra error y retorna `null`"];
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
Contrato de Datos (i18n): El contenido obtenido de useTranslations debe cumplir con el TreatmentCycleSectionContentSchema.
4. Zona de Melhorias Futuras
VISUALIZACIÓN DE PROGRESO: Implementar un elemento visual (ej. una línea de tiempo SVG animada) que conecte las tarjetas, reforzando la idea de una jornada continua.
LAYOUT DE CARRUSEL: Añadir una variante de layout que muestre las tarjetas en un carrusel interactivo, especialmente útil en vistas móviles.
SELECCIÓN DE PLAN (CTA INTEGRADO): Permitir que cada tarjeta tenga un botón "Seleccionar Plan" que desplace la vista al formulario de pedido.
CONTENIDO VÍA CMS: Permitir que los datos de los ciclos provengan de un Headless CMS para que el equipo de marketing pueda realizar pruebas A/B de la narrativa.
// .docs-espejo/components/ui/TreatmentCycleSection.tsx.md