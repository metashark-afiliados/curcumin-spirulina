// .docs-espejo/postcss.config.mjs.md
/**
 * @file .docs-espejo/postcss.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de PostCSS.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `postcss.config.mjs`

## 1. Rol Estratégico y Propósito

Este aparato es el **director del pipeline de transformación de CSS**. Su única responsabilidad es definir la secuencia de plugins de PostCSS que procesarán el código CSS antes de que sea enviado al navegador.

Estratégicamente, es el aparato que habilita el uso de herramientas de CSS de alto nivel como Tailwind CSS, traduciendo las clases de utilidad y las directivas a CSS estándar y compatible con todos los navegadores.

## 2. Arquitectura de la Configuración

La configuración es un objeto simple que define un pipeline de plugins:

1.  **`tailwindcss: {}`:** Es el primer y más importante plugin. Escanea los archivos de código fuente, encuentra las clases de utilidad de Tailwind y genera el CSS correspondiente.
2.  **`autoprefixer: {}`:** Se ejecuta después de Tailwind. Analiza el CSS generado y añade automáticamente los prefijos de proveedor (`-webkit-`, `-moz-`, etc.) necesarios para garantizar que las propiedades de CSS modernas funcionen en navegadores más antiguos.

## 3. Contrato de API

*   **Entrada:** Archivos de código fuente (`.css`, `.tsx`) que contienen sintaxis de Tailwind CSS.
*   **Salida:** Un único archivo CSS optimizado y compatible con múltiples navegadores, listo para ser utilizado en producción.

## 4. Zona de Melhorias Futuras

1.  **Integración de `cssnano`:** Para una optimización de producción de élite, añadir el plugin `cssnano` al final del pipeline para minificar el CSS, eliminando espacios en blanco y comentarios para reducir el tamaño del archivo.
2.  **Soporte para `postcss-import`:** Integrar `postcss-import` al principio del pipeline para permitir la importación de archivos CSS dentro de otros (`@import`), mejorando la organización de los estilos.
3.  **Configuración por Entorno:** Implementar una lógica que cargue plugins diferentes según el `NODE_ENV` (ej. no ejecutar `cssnano` en desarrollo para una mejor depuración).
4.  **Documentación en Español:** Traducir este documento espejo al español.
5.  **Validación de Configuración:** Utilizar JSDoc o tipos de TypeScript para validar la estructura del objeto de configuración, previniendo errores de tipeo en los nombres de los plugins.
6.  **Plugin para `nesting`:** Integrar `tailwindcss/nesting` o `postcss-nesting` para habilitar la sintaxis de anidamiento de CSS nativa.
7.  **Logging de Plugins:** Investigar si los plugins de PostCSS pueden ser configurados para emitir logs sobre las transformaciones que realizan, para una mayor observabilidad del proceso de build.
8.  **Generación de `sourcemaps`:** Configurar la generación de `sourcemaps` para facilitar la depuración del CSS en el navegador.
9.  **Plugin de Orden de Propiedades:** Integrar un plugin como `postcss-sorting` para ordenar las propiedades CSS de una manera consistente, mejorando la legibilidad del CSS generado.
10. **Extracción a `postcss.config.cjs`:** Considerar cambiar la extensión a `.cjs` si surgen problemas de compatibilidad con módulos CommonJS, aunque `.mjs` es el estándar moderno.

// .docs-espejo/postcss.config.mjs.md