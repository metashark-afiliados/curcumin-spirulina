// .docs-espejo/directives/003_USER_PREFERENCE_PROMPT_PROTOCOL.md.md
/**
 * @file .docs-espejo/directives/003_USER_PREFERENCE_PROMPT_PROTOCOL.md.md
 * @description Documento Espejo y SSoT conceptual para el aparato de directiva 003.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: Directiva 003 - Protocolo de Prompts de Preferencia de Usuario

## 1. Rol Estratégico y Propósito

El propósito de este aparato de documentación (`003_USER_PREFERENCE_PROMPT_PROTOCOL.md`) es servir como la **Única Fuente de Verdad (SSoT) inmutable que define el workflow para la gestión de instrucciones verbales**.

Su rol estratégico es transformar un proceso de comunicación efímero (instrucciones verbales) en un sistema de artefactos de conocimiento formalizados, versionables y reutilizables (los prompts en `/.docs/prompts/`). Esto garantiza que las "preferencias de usuario" del arquitecto se capturen de forma precisa y se integren en la memoria a largo plazo del proyecto.

## 2. Arquitectura y Flujo de Ejecución

Este aparato no es código ejecutable, sino un **documento de proceso**. Define un flujo de trabajo que la IA debe seguir. Su ejecución es conceptual:

1.  **Entrada:** Una instrucción verbal del arquitecto.
2.  **Proceso:** La IA aplica las reglas definidas en este documento (transcribir, analizar, verificar, crear).
3.  **Salida:** Un nuevo artefacto de prompt en `/.docs/prompts/` y la formalización de la directiva en el hilo de la conversación.

## 3. Contrato de API

*   **Entradas:** Instrucciones verbales.
*   **Salidas:** Archivos `.md` en el directorio `/.docs/prompts/` y la adhesión al protocolo en todas las interacciones futuras.

## 4. Zona de Melhorias Futuras

1.  **Automatización de Verificación:** Un script podría analizar el directorio de prompts y alertar si se está creando un prompt con un nombre o contenido muy similar a uno existente.
2.  **Sistema de Priorización Dinámica:** La directiva podría evolucionar para incluir un sistema donde los prompts puedan ser priorizados dinámicamente en el roadmap.
3.  **Integración con Gestor de Tareas:** Un webhook podría crear automáticamente un "issue" en un gestor de tareas (ej. GitHub Issues) cada vez que se crea un nuevo prompt.
4.  **Validación de Sintaxis de Prompt:** Utilizar un linter de markdown para asegurar que todos los prompts generados sigan una estructura y formato consistentes.
5.  **Historial de Cambios de Prompts:** La directiva podría requerir que los cambios a prompts existentes se registren en una sección de "Historial de Revisiones" dentro del propio archivo del prompt.
6.  **Sistema de Tags para Prompts:** Añadir metadatos de "tags" (ej. `ui`, `backend`, `dx`) a cada prompt para facilitar su búsqueda y categorización.
7.  **Mecanismo de Aprobación Formal:** Integrar el proceso de aprobación de prompts con los Pull Requests de GitHub, requiriendo una revisión formal antes de que un prompt sea considerado "activo".
8.  **Generación de Resúmenes:** Un script podría generar un `README.md` en el directorio `/.docs/prompts/` que liste y resuma todos los prompts existentes.
9.  **Plantillas de Prompts:** Crear plantillas estandarizadas para diferentes tipos de prompts (ej. refactorización, creación de nuevo componente, corrección de bug) para agilizar su creación.
10. **Internacionalización de la Documentación:** Traducir esta directiva a otros idiomas para equipos multilingües.
// .docs-espejo/directives/003_USER_PREFERENCE_PROMPT_PROTOCOL.md.md