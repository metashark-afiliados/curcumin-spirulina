// .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para la configuración de TypeScript.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `tsconfig.json`

## 1. Rol Estratégico y Propósito

Este aparato es el **cerebro del compilador de TypeScript** y la Única Fuente de Verdad (SSoT) para las reglas de tipado y resolución de módulos del proyecto. Su propósito es instruir al compilador de TypeScript (TSC) y a los servicios de lenguaje del editor sobre cómo interpretar, validar y compilar el código.

La estrategia adoptada es la de **"Configuración Soberana y Autocontenida"**. En lugar de heredar de una configuración base externa, este archivo define explícitamente todas las directivas necesarias, garantizando un comportamiento predecible y resiliente en cualquier entorno de desarrollo.

## 2. Arquitectura de la Configuración

La configuración es un objeto JSON autocontenido que define todas las reglas del compilador.

*   **`compilerOptions`:** Es el núcleo del aparato.
    *   **`jsx: "preserve"`:** Directiva crítica que instruye a TypeScript para que entienda la sintaxis JSX y la emita sin transformarla, delegando esa tarea a Next.js.
    *   **`esModuleInterop: true`:** Habilita la compatibilidad entre módulos CommonJS y ES Modules.
    *   **`moduleResolution: "bundler"`:** La estrategia moderna y recomendada para resolver módulos, alineada con herramientas como Vite y Next.js.
    *   **`resolveJsonModule: true`:** Permite importar archivos `.json` directamente como módulos, esencial para la arquitectura IMAS.
    *   **`strict: true`:** Activa todas las banderas de verificación de tipos estrictas, garantizando la máxima seguridad de tipos.
    *   **`paths` y `baseUrl`:** Definen la SSoT para los alias de importación (`@/*`), mejorando drásticamente la mantenibilidad.
    *   **`plugins`:** Integra el plugin de lenguaje de Next.js para una experiencia de desarrollo optimizada.
*   **`include` / `exclude`:** Definen explícitamente el alcance del proyecto para el compilador, asegurando que solo los archivos relevantes sean procesados.

## 3. Contrato de API

*   **Entrada:** El código fuente completo del proyecto.
*   **Salida:** Un proceso de compilación exitoso y una experiencia de desarrollo enriquecida con autocompletado y análisis estático precisos.

## 4. Zona de Melhorias Futuras

*   **PROJETOS COMPOSTOS (COMPOSITE PROJECTS):** A medida que el proyecto crezca, adoptar una estrategia de "proyectos compuestos", con un `tsconfig.json` base y otros específicos por submódulo (ej. `src/`, `tests/`) para optimizar los tiempos de compilación.
*   **SEGURANÇA DE TIPOS MAIS ESTRITA:** Considerar habilitar la bandera `"noUncheckedIndexedAccess": true` para forzar la verificación de accesos a índices de arrays y objetos, previniendo errores de `undefined` en tiempo de ejecución.

// .docs-espejo/tsconfig.json.md