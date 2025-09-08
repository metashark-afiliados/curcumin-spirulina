// .docs/directives/005_ERROR_ANALYSIS_PROTOCOL.md
/**
 * @file .docs/directives/005_ERROR_ANALYSIS_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 005. Establece el protocolo
 *              para el análisis y resolución de errores.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 005: Protocolo de Análisis de Errores

## 1. Principio Fundamental

La corrección de errores debe ser un proceso de ingeniería sistemático que aborde la causa raíz fundamental, no solo los síntomas. Cada error es una oportunidad para fortalecer la resiliencia y simplicidad del sistema.

## 2. Regla Mandatoria (Workflow de Análisis de Error)

Ante la presentación de una traza de error, se debe seguir el siguiente protocolo secuencial de análisis antes de proponer cualquier modificación de código:

1.  **Identificación y Recopilación de Evidencia:**
    *   Identificar el código de error (ej. `TS2322`) y el mensaje.
    *   Identificar el aparato o aparatos donde se origina y manifiesta el error.
    *   Consultar la última versión de los aparatos implicados (snapshot o refactorización previa) para establecer una línea base.

2.  **Análisis de Causa Raíz (RCA):**
    *   Formular un diagnóstico preciso del problema.
    *   Desarrollar hipótesis probables sobre la causa raíz, considerando la interacción entre aparatos (visión holística 360°).
    *   Contrastar las hipótesis contra el proyecto completo para entender el impacto sistémico.

3.  **Propuesta de Solución Holística:**
    *   Diseñar la solución más simple y directa que resuelva la causa raíz.
    *   La solución propuesta **no debe introducir ninguna regresión**, ni funcional ni de lógica.
    *   La solución debe priorizar la simplificación del código existente siempre que sea posible.

## 3. Adenda (Directiva de Solución de Élite)

Al proponer una solución, se debe auditar activamente si existe una alternativa arquitectónica superior que, aunque potencialmente más compleja de implementar, resulte en un sistema más robusto, mantenible o seguro a largo plazo. Si dicha alternativa existe, debe ser presentada y justificada como la "solución de élite" recomendada.

// .docs/directives/005_ERROR_ANALYSIS_PROTOCOL.md