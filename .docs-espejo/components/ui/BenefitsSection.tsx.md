// .docs-espejo/components/ui/BenefitsSection.tsx.md
/**
 * @file .docs-espejo/components/ui/BenefitsSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato BenefitsSection.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `BenefitsSection`

## 1. Rol Estratégico y Propósito

Este aparato es un **organismo de UI soberano de alta persuasión**. Su propósito estratégico es comunicar de forma rápida, clara y visualmente atractiva los principales beneficios del producto. Actúa como una prueba social tangible, transformando afirmaciones de marketing en puntos de valor concretos.

Como componente soberano, **obtiene su propio contenido de i18n**, eliminando la dependencia de `props` y garantizando su reutilización y consistencia visual en toda la aplicación.

## 2. Arquitectura y Flujo de Ejecución

Es un **Componente de Cliente (`"use client"`) soberano**. Su lógica interna se centra en obtener sus traducciones y mapear un array de datos a componentes `BenefitPill`.

```mermaid
graph TD
    A["`BenefitsSection.tsx`"] -- "Invoca `useTranslations()`" --> B[Obtiene `mainTitle` y `benefits[]` de su archivo JSON];
    B -- "Mapea `benefits[]`" --> C{Loop de Renderizado};
    C -- "Para cada `benefit`" --> D["Renderiza `<BenefitPill />`"];
    A -- "Usa `iconMap` para resolver" --> E[Icono de Lucide];
    E -- "Pasa como prop a" --> D;
La arquitectura desacopla completamente el componente de sus padres, convirtiéndolo en un aparato "plug-and-play".
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
4. Zona de Melhorias Futuras
MODAL DE DETALLES CIENTÍFICOS: Al hacer clic en un BenefitPill, abrir un modal que muestre información detallada y citas del informe científico relacionadas con ese beneficio.
CONTENIDO DE BENEFICIOS VÍA CMS: Obtener los datos de los beneficios desde un Headless CMS, permitiendo a marketing realizar pruebas A/B de los beneficios sin un deploy.
VARIANTES DE LAYOUT: Implementar variantes (grid, carousel, list) a través de una prop y cva para permitir diferentes visualizaciones.
ICONOS PERSONALIZADOS SVG: Reemplazar el iconMap con la capacidad de renderizar iconos SVG personalizados y animados para un branding más fuerte.
PRUEBAS DE INTEGRACIÓN: Crear un arnés de pruebas que renderice el componente y verifique que el número correcto de BenefitPills se muestra con el contenido esperado de los archivos de traducción.
// .docs-espejo/components/ui/BenefitsSection.tsx.md