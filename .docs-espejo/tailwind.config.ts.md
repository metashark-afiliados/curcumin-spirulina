// .docs-espejo/tailwind.config.ts.md
/**
 * @file .docs-espejo/tailwind.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración de Tailwind CSS.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `tailwind.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **plano arquitectónico del sistema de diseño**. Su propósito es definir la **estructura** de los tokens de diseño de la aplicación (nombres de colores, escala de espaciado, tipografía) y configurar los plugins que extienden las capacidades de Tailwind CSS.

Estratégicamente, este archivo implementa la filosofía de "Configuración sobre Código". Actúa como una capa de abstracción que consume los *valores* de los tokens de diseño (definidos como variables CSS en `globals.css`) y los mapea a *nombres* semánticos que se utilizan en toda la aplicación (ej. `bg-brand-primary`).

## 2. Arquitectura de la Configuración

La arquitectura se centra en el desacoplamiento y la extensibilidad:

*   **`content`:** Es la directiva más crítica para el rendimiento. Define explícitamente qué archivos debe escanear Tailwind para el proceso de "purga", asegurando que solo las clases utilizadas se incluyan en el CSS final.
*   **`theme.extend`:** Es el corazón del sistema de diseño.
    *   **`colors`, `borderRadius`, `fontFamily`:** No contienen valores codificados. En su lugar, referencian variables CSS (ej. `hsl(var(--brand-primary))`). Esto desacopla la configuración de los valores del tema, haciendo de `globals.css` la SSoT para la apariencia visual.
    *   **`keyframes`, `animation`:** Definen animaciones personalizadas reutilizables.
*   **`plugins`:** Es el mecanismo de extensibilidad. Integra funcionalidades adicionales como tipografía avanzada (`@tailwindcss/typography`), animaciones (`tailwindcss-animate`) y herramientas de depuración (`tailwindcss-debug-screens`).

## 3. Contrato de API

*   **Entrada:**
    *   Archivos de código fuente (`.tsx`, `.mdx`) para el escaneo de clases.
    *   Variables CSS definidas en `globals.css` para los valores de los tokens.
*   **Salida:** Un conjunto de clases de utilidad de Tailwind CSS que pueden ser utilizadas en toda la aplicación, y un archivo CSS de producción altamente optimizado.

## 4. Zona de Melhorias Futuras

1.  **Generación de Tokens desde Figma:** Integrar una herramienta como `Tokens Studio` para sincronizar los tokens de diseño directamente desde un archivo de Figma, generando automáticamente las variables en `globals.css`.
2.  **Plugin de Tema Personalizado:** Crear un plugin de Tailwind personalizado que genere todas las variables de color y tipografía de forma programática, permitiendo la creación de temas dinámicos.
3.  **Soporte para `Container Queries`:** Integrar el plugin `@tailwindcss/container-queries` para habilitar un diseño responsivo basado en el tamaño del contenedor, no solo de la ventana.
4.  **Variantes de UI Personalizadas:** Crear variantes personalizadas (ej. `variant:ui-loading`) que permitan estilizar componentes basados en atributos de datos, para una UI más semántica.
5.  **Documentación en Español:** Traducir este documento espejo al español.
6.  **Validación de Tokens:** Crear un script que verifique que todas las variables CSS referenciadas en este archivo estén definidas en `globals.css`.
7.  **Paleta de Colores Extendida:** Definir una paleta de colores más granular (ej. `brand-primary-50`, `brand-primary-100`, ...) para una mayor flexibilidad de diseño.
8.  **Configuración de Tipografía Fluida:** Implementar una configuración de tipografía fluida que escale el tamaño de la fuente suavemente entre diferentes breakpoints.
9.  **Soporte para `color-scheme`:** Añadir soporte para la propiedad CSS `color-scheme` para mejorar la integración con los temas del sistema operativo del usuario.
10. **Extracción de Temas a Archivos Separados:** Si se desarrollan múltiples temas, la definición de variables de color en `globals.css` podría ser dividida en archivos separados (ej. `themes/dark.css`, `themes/light.css`).

// .docs-espejo/tailwind.config.ts.md