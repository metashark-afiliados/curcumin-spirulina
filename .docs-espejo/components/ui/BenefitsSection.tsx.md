// .docs-espejo/components/ui/BenefitsSection.tsx.md
/**
 * @file .docs-espejo/components/ui/BenefitsSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato BenefitsSection.
 * @author L.I.A. Legacy
 * @version 6.1.0
 */
# Manifiesto Conceptual: Aparato `BenefitsSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI soberano, resiliente y de alta persuasión**. Su propósito estratégico es comunicar los beneficios clave del producto, actuando como um pilar de confiança.

Como componente soberano, **obtiene y VALIDA su propio contenido de i18n** contra un contrato de datos Zod, garantizando que una alteración en el contenido nunca rompa la UI.

## 2. Arquitectura de Élite

Es un **Componente de Cliente (`"use client"`) soberano y resiliente**.
*   **Responsabilidad de Validación:** Este componente implementa el "Escudo de Resiliencia". Antes de renderizar, construye un objeto con su contenido a partir de la capa de i18n (`t`) y lo valida contra el `BenefitsSectionContentSchema`. Si la validación falla, registra un error y renderiza `null`.
*   **Composición:** Orquesta la renderización de las moléculas de presentación puras `BenefitPill`.
*   **Semántica y Accesibilidad:** Utiliza la etiqueta `<section>` y `aria-labelledby` para una estructura semántica y accesible.

## 3. Contrato de API
### Props de Entrada:
*   Ninguna. Este es un componente soberano y autocontenido.

### Contrato de Datos (desde `lib/validators`):
*   Debe cumplir la estructura definida en `BenefitsSectionContentSchema`.

## 4. Zona de Melhorias Futuras
*   **BADGE DE BENEFICIO:** Extender el contrato de datos para incluir una propiedad opcional `badge?: string` (ej. "Nuevo") que el `BenefitPill` pueda renderizar para destacar beneficios específicos.
*   **CONTENIDO ENRIQUECIDO:** Permitir que el campo `description` sea interpretado como Markdown para incluir enlaces o texto en negrita.
*   **ORDENAMIENTO DINÁMICO:** Permitir que el orden de los beneficios sea controlado por una propiedad en un CMS para facilitar las pruebas A/B.
// .docs-espejo/components/ui/BenefitsSection.tsx.md