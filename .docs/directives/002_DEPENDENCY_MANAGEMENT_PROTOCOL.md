// .docs/directives/002_DEPENDENCY_MANAGEMENT_PROTOCOL.md
/**
 * @file .docs/directives/002_DEPENDENCY_MANAGEMENT_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 002.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 2/5
 */
# Directiva 002: Protocolo de Gestión de Dependencias y Scripts

## 1. Principio Fundamental

La gestión del archivo `package.json` debe ser predecible, reproducible y auditable. Las modificaciones manuales del archivo son propensas a errores y pueden generar inconsistencias en el archivo de bloqueo (`pnpm-lock.yaml`).

## 2. Reglas Mandatorias

### 2.1. Gestión de Dependencias

Toda adición, eliminación o actualización de dependencias (`dependencies` o `devDependencies`) en `package.json` **debe realizarse exclusivamente a través de comandos del gestor de paquetes `pnpm`** ejecutados en un entorno de línea de comandos CMD de Windows 10.

*   **Ejemplos de Comandos Válidos:**
    *   `pnpm add chalk`: Añade `chalk` a `dependencies`.
    *   `pnpm add -D vitest`: Añade `vitest` a `devDependencies`.
    *   `pnpm remove eslint`: Elimina `eslint`.
    *   `pnpm up --latest`: Actualiza todas las dependencias a su última versión.

Está **estrictamente prohibido** editar manualmente las secciones `dependencies` y `devDependencies` del archivo `package.json`.

### 2.2. Gestión de Scripts

La sección `scripts` de `package.json` sí puede ser modificada directamente. Sin embargo, en cada entrega, solo se debe proporcionar el **fragmento de los scripts que han sido añadidos o modificados**, no el bloque completo de `scripts`. Cada cambio debe ir acompañado de una justificación que explique el propósito del nuevo script y cómo se utiliza.

## 3. Justificación

Esta directiva garantiza:
*   **Integridad del Lockfile:** `pnpm` gestionará de forma óptima el `pnpm-lock.yaml`, asegurando builds reproducibles.
*   **Claridad del Cambio:** Al entregar solo los scripts modificados y su justificación, se mejora la legibilidad de los cambios y se facilita la revisión de código.
// .docs/directives/002_DEPENDENCY_MANAGEMENT_PROTOCOL.md