<!-- .docs-espejo/components/ui/BenefitsSection.tsx.md -->
/**
 * @file .docs-espejo/components/ui/BenefitsSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato BenefitsSection.
 * @author L.I.A. Legacy
 * @version 6.2.0
 */
# Manifiesto Conceptual: Aparato `BenefitsSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI soberano, resiliente y de alta persuasión**. Su propósito estratégico es comunicar los beneficios clave del producto, actuando como un pilar de confianza para el usuario.

Como componente soberano, **obtiene y VALIDA su propio contenido de i18n** contra un contrato de datos Zod, garantizando que una alteración en el contenido nunca rompa la UI. Se integra con la API de logging unificada del cliente para una observabilidad completa.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**.
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Antes de renderizar, construye un objeto con su contenido a partir de la capa de i18n (`t.raw('benefits')`) y lo valida rigurosamente contra el `BenefitsSectionContentSchema`. Si la validación falla, registra un error detallado con `clientLogger` y retorna `null` para prevenir fallos en cascada.
*   **Composición:** Orquesta la renderización de las moléculas de presentación puras `BenefitPill`, pasando los datos validados como `props`.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible.
*   **Observabilidad:** Utiliza `clientLogger` (de `src/lib/client-logger.ts`) para registrar errores de validación de contenido, advertencias sobre iconos no mapeados, y el flujo de renderizado, asegurando que cualquier problema sea visible en las herramientas de desarrollo.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Este es un componente soberano y autocontenido que obtiene todas sus dependencias internamente.

### Contrato de Datos (desde `lib/validators`):
*   Debe cumplir la estructura definida en `BenefitsSectionContentSchema`. Accede a los datos de beneficios complejos a través de `t.raw('benefits')`.

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **BADGE DE BENEFICIO CONFIGURABLE:** Extender el contrato de datos en `BenefitsSectionContentSchema` para incluir una propiedad opcional `badge?: string` (ej. "Nuevo", "Recomendado") en cada beneficio. El `BenefitPill` podría renderizar este badge para destacar visualmente ciertos beneficios.
*   **CONTENIDO ENRIQUECIDO CON MDX:** Permitir que la `description` de los beneficios sea interpretada como Markdown (utilizando una librería ligera de parseo en el cliente) para incluir negritas, cursivas o enlaces básicos, ofreciendo mayor flexibilidad de formato al equipo de marketing.
*   **ORDENAMIENTO DINÁMICO DE BENEFICIOS:** Permitir que el orden de los beneficios sea controlado por una propiedad en el archivo de i18n o por un Headless CMS, lo que facilitaría las pruebas A/B y la personalización del contenido sin cambios de código.
*   **ANIMACIÓN DE DETALLE AL HOVER:** Al pasar el ratón sobre un `BenefitPill`, además de la animación de escala actual, podría activarse una microinteracción que revele información adicional (ej. una frase corta, un icono de "Más info").
*   **CONSOLA DE ADVERTENCIAS VISUAL:** En entornos de desarrollo, si un `iconName` no se encuentra en `iconMap`, podría mostrarse un pequeño indicador visual en la UI (además del log) para alertar al desarrollador directamente en la interfaz.
<!-- .docs-espejo/components/ui/BenefitsSection.tsx.md -->