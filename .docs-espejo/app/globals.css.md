// .docs-espejo/app/globals.css.md
/**
 * @file .docs-espejo/app/globals.css.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de estilos globales.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `globals.css`

## 1. Rol Estratégico y Propósito

Este aparato es la **Única Fuente de Verdad (SSoT) para los valores del sistema de diseño**. Su propósito es definir la paleta de colores, la tipografía base, el espaciado y otros tokens de diseño de la aplicación a través de variables CSS nativas.

Actúa como una capa de abstracción que desacopla la **estructura** del tema (definida en `tailwind.config.ts`) de sus **valores**, permitiendo una tematización flexible y un mantenimiento centralizado.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura es declarativa y se basa en el sistema de capas de Tailwind CSS.

```mermaid
graph TD
    A["`globals.css` (Define variables en `:root`)"] --> B["`tailwind.config.ts` (Lee variables)"];
    B --> C["Motor de Tailwind (Genera clases de utilidad)"];
    C --> D["Componentes React (Consumen clases)"];
Definición: Dentro de @layer base, se define el bloque :root que contiene todas las variables CSS.
Consumo: tailwind.config.ts referencia estas variables (ej. hsl(var(--brand-primary))).
Aplicación: El motor de Tailwind utiliza estos valores para generar las clases de utilidad que se usan en toda la aplicación.
3. Contrato de API
API de Salida: Provee un conjunto de variables CSS globales que representan los tokens de diseño del proyecto (ej. --brand-primary, --radius).
4. Zona de Melhorias Futuras
TEMATIZACIÓN AVANZADA (LIGHT/DARK): Implementar un selector [data-theme='light'] o @media (prefers-color-scheme: light) para sobrescribir las variables y ofrecer un tema claro completo.
TIPOGRAFÍA FLUIDA: Utilizar la función clamp() de CSS en las variables de tamaño de fuente para crear una escala tipográfica que se ajuste fluidamente al tamaño del viewport.
GENERACIÓN DESDE TOKENS DE DISEÑO: Integrar una herramienta como Tokens Studio o Style Dictionary para generar automáticamente este archivo a partir de una SSoT en una herramienta de diseño como Figma.
PALETA DE COLORES EXTENDIDA: Generar programáticamente una paleta de colores completa con diferentes tonalidades (ej. --brand-primary-50 a --brand-primary-900) para mayor flexibilidad.
VARIABLES DE ESPACIADO Y RITMO VERTICAL: Definir una escala de espaciado (--space-xs, --space-s, etc.) para estandarizar los márgenes y paddings en toda la aplicación.
SCRIPT DE VALIDACIÓN DE TOKENS: Crear un script que se ejecute en el CI/CD para verificar que todas las variables consumidas en tailwind.config.ts estén definidas en este archivo.
SOPORTE PARA prefers-reduced-motion: Definir variables para duraciones y delays de transición que puedan ser puestas a cero dentro de un media query @media (prefers-reduced-motion: reduce).
ESTILOS DE IMPRESIÓN (@media print): Añadir una sección @media print que redefina variables para optimizar la apariencia de la página para impresión (ej. --background: #fff; --foreground: #000;).
UTILITARIOS DE CONTRASTE (WCAG): Crear un script que lea los valores de las variables de color de primer y segundo plano y calcule su ratio de contraste para alertar sobre posibles problemas de accesibilidad.
VARIABLES PARA SOMBRAS (BOX SHADOWS): Centralizar la definición de las sombras de la UI en variables (ej. --shadow-sm, --shadow-md) para garantizar consistencia.
// .docs-espejo/app/globals.css.md