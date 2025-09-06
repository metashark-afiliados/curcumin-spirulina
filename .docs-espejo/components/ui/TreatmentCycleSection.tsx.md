<!-- .docs-espejo/components/ui/TreatmentCycleSection.tsx.md -->
/**
 * @file .docs-espejo/components/ui/TreatmentCycleSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato TreatmentCycleSection.
 * @author L.I.A. Legacy
 * @version 6.4.0
 */
# Manifiesto Conceptual: Aparato `TreatmentCycleSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI narrativo y soberano**. Su propósito es presentar la "hoja de ruta" del cliente con el producto, dividiendo el viaje en fases digeribles. Estratégicamente, gestiona las expectativas del cliente, aumenta la confianza al mostrar un plan estructurado y fomenta el uso a largo plazo.

Como **orquestador soberano**, su responsabilidad es **obtener y validar su propio contenido de i18n** contra un `schema Zod` antes de renderizar. Compone las moléculas `TreatmentCycleCard` en un layout cohesivo y animado, siendo completamente agnóstico al contenido específico que muestra. Se integra con la API de logging unificada del cliente para una observabilidad completa.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**. Su lógica interna está dedicada a la obtención de datos, validación y composición.

```mermaid
graph TD
    A["`TreatmentCycleSection.tsx`"] -- "1. Invoca `useTranslations()` y `t.raw()`" --> B["Obtiene contenido de su .json"];
    B -- "2. Valida contra `TreatmentCycleSectionContentSchema`" --> C{¿Validación OK?};
    C -- Sí --> D["Renderiza Título y Subtítulo"];
    D -- "Mapea el array `cycles[]`" --> E{Loop de Renderizado};
    E -- "Para cada `cycle`, pasa props a" --> F["`<TreatmentCycleCard.tsx>`"];
    C -- No --> G["`clientLogger.error()` y retorna `null`"];
    A -- "Utiliza `clientLogger.trace()`" --> H[Registro de Observabilidad];
3. Contrato de API
Props de Entrada:
Ninguna. Este es un componente soberano y autocontenido.
Contrato de Datos (i18n):
El contenido obtenido de t.raw("") debe cumplir con el TreatmentCycleSectionContentSchema.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
VISUALIZACIÓN DE PROGRESO CON SVG ANIMADO: Implementar un elemento visual (ej., una línea de tiempo SVG animada o conectores entre las tarjetas) que una las tres tarjetas, reforzando la idea de una jornada continua y un progreso visual.
LAYOUT DE CARRUSEL RESPONSIVO: Añadir una variante de layout que muestre las tarjetas en un carrusel interactivo (embla-carousel-react), especialmente útil en vistas móviles para optimizar el espacio y la experiencia táctil.
SELECCIÓN DE PLAN (CTA INTEGRADO): Permitir que cada tarjeta tenga un botón "Seleccionar Plan" opcional que desplace la vista al formulario de pedido (OrderForm) e idealmente preseleccione la oferta correspondiente (ej., 3 meses de suministro para un ciclo más largo).
CONTENIDO VÍA CMS DINÁMICO: Permitir que los datos de los ciclos (mainTitle, subtitle, cycles) provengan de un Headless CMS. Esto permitiría al equipo de marketing realizar pruebas A/B de la narrativa del "viaje del cliente" y actualizar el contenido sin cambios de código.
PRUEBAS DE INTEGRACIÓN AVANZADAS: Crear un arnés de pruebas de integración que no solo verifique que el componente renderiza el número correcto de tarjetas, sino que también compruebe la interacción (si hay CTAs) y la validez de los datos presentados.
<!-- .docs-espejo/components/ui/TreatmentCycleSection.tsx.md -->