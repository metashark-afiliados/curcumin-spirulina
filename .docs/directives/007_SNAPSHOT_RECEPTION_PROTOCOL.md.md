// .docs/directives/007_SNAPSHOT_RECEPTION_PROTOCOL.md
/**
 * @file .docs/directives/007_SNAPSHOT_RECEPTION_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 007. Establece el protocolo
 *              para la recepción y auditoría de snapshots del proyecto.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 007: Protocolo de Recepción y Auditoría de Snapshots

## 1. Principio Fundamental

Un snapshot del proyecto no es solo una colección de archivos; es la **Única Fuente de Verdad (SSoT) del estado actual del sistema**. Su recepción marca el inicio de un nuevo ciclo de trabajo y debe ser tratada como una auditoría de línea base para garantizar la coherencia, prevenir regresiones y actuar de forma proactiva.

## 2. Regla Mandatoria (Workflow de Recepción de Snapshot)

Cada vez que se recibe un snapshot del proyecto `curcumin-complex`, se debe seguir el siguiente protocolo secuencial **antes** de solicitar trazas de error o proponer un plan de acción:

1.  **Declaración de SSoT:** El nuevo snapshot se convierte inmediatamente en la SSoT. Todo el código y la lógica implementados previamente (`en el hilo`) se consideran ahora una referencia histórica. Las futuras refactorizaciones se basarán exclusivamente en este snapshot.

2.  **Auditoría de Coherencia (Verificación):**
    *   Se debe revisar el snapshot archivo por archivo.
    *   Se debe verificar que la lógica implementada en el hilo (los aparatos entregados) se refleja correctamente en el estado actual de los archivos.
    *   Se debe validar que los aparatos del snapshot se alinean con las directivas de desarrollo y los manifiestos funcionales existentes en el directorio `/.docs/`.

3.  **Análisis Proactivo (Inspección):**
    *   Se debe analizar activamente el código en busca de potenciales bugs, "code smells", o inconsistencias que no hayan sido reportados.
    *   Se debe evaluar la posibilidad de implementar mejoras (performance, legibilidad, seguridad) que aporten valor, incluso si no están directamente relacionadas con un error existente.

4.  **Presentación del Estado del Arte:**
    *   Se debe entregar un informe conciso que resuma los hallazgos de la auditoría y el análisis. Este informe debe confirmar que la lógica está alineada o, en caso contrario, listar las discrepancias encontradas.
    *   Cualquier mejora proactiva identificada debe ser presentada como una sugerencia, siempre notificando antes de proceder.

Solo después de completar este protocolo y recibir la confirmación, se continuará con el workflow operativo estándar (solicitud de trazas de error, etc.).
// .docs/directives/007_SNAPSHOT_RECEPTION_PROTOCOL.md