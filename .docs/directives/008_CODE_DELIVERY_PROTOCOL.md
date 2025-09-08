// .docs/directives/008_CODE_DELIVERY_PROTOCOL.md
/**
 * @file .docs/directives/008_CODE_DELIVERY_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 008. Establece el
 *              protocolo para la entrega de aparatos de código.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 008: Protocolo de Entrega de Código Íntegro

## 1. Principio Fundamental

La claridad, la atomicidad y la usabilidad inmediata del código entregado son innegociables. Cada entrega debe ser una unidad de trabajo autocontida, completa y lista para ser integrada sin ambigüedades, minimizando la carga cognitiva del arquitecto.

## 2. Reglas Mandatorias

1.  **Entrega Completa (Sin Abreviaciones):** Todo aparato de código (ficheiro `.ts`, `.tsx`, `.json`, etc.) debe ser entregado na súa **totalidade**. O uso de abreviacións como `...`, comentarios de omisión ou calquera outra forma de acurtamento do código está **estritamente prohibido**.

2.  **Formato de Bloque de Código Perfecto:** Cada aparato debe ser encapsulado nun único e ben definido bloque de código Markdown.
    *   Debe utilizar a sintaxe de triplo acento grave (```) co identificador de linguaxe apropiado (ex. `typescript`, `json`, `markdown`).
    *   Non debe haber ningún carácter ou escape que rompa a renderización do bloque de código.

3.  **Documentación e Rutas Explícitas:**
    *   Todo aparato debe incluír a súa documentación TSDoc completa.
    *   A primeira e a última liña dentro de cada bloque de código deben ser comentarios que indiquen a ruta relativa completa do ficheiro.

## 3. Justificación

Este protocolo garante que cada entrega sexa unha Única Fonte de Verdade (SSoT) atómica e inequívoca. Prevén erros de copia e pegado, elimina a necesidade de buscar contexto adicional e asegura que o código recibido é exactamente o que debe existir no sistema, respectando o principio de **Visión Holística 360 Graos**.