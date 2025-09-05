// .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para la configuración de TypeScript.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `tsconfig.json`

## 1. Rol Estratégico y Propósito

Este aparato es el **cerebro del compilador de TypeScript** y la Única Fuente de Verdad (SSoT) para las reglas de tipado y resolución de módulos del proyecto. Su propósito es instruir al compilador de TypeScript (TSC) y a los servicios de lenguaje del editor (como IntelliSense) sobre cómo interpretar, validar y compilar el código fuente.

Estratégicamente, una configuración `tsconfig.json` robusta y bien definida es fundamental para:

1.  **Seguridad de Tipos:** Habilita el análisis estático estricto para capturar errores en tiempo de compilación, no en producción.
2.  **Resolución de Módulos (DX):** Define alias de ruta (`@/*`, `@tests/*`) que simplifican las importaciones y mejoran drásticamente la mantenibilidad.
3.  **Integridad del Proyecto:** A través de la directiva `include`, asegura que el compilador tenga una visión holística de todos los archivos relevantes, incluyendo código fuente, pruebas y archivos de configuración.

## 2. Arquitectura de la Configuración

La configuración se estructura en torno a la propiedad `compilerOptions`, que contiene las directivas principales:

*   **Reglas Estrictas (`strict: true`):** Habilita todas las banderas de verificación de tipos estrictos, forzando un estándar de calidad de código de élite.
*   **Resolución de Módulos (`moduleResolution: "bundler"`):** Utiliza el modo de resolución moderno que emula cómo los empaquetadores como Vite o Webpack resuelven los módulos.
*   **Alias de Ruta (`paths`):** Es la SSoT para los alias de importación, desacoplando la lógica de importación de la estructura física de directorios.
*   **Alcance del Proyecto (`include`, `exclude`):** Define explícitamente qué archivos forman parte del proyecto y cuáles deben ser ignorados, proporcionando al compilador un contexto claro y optimizando el rendimiento.

```mermaid
graph TD
    A["`tsconfig.json` (SSoT)"] --> B["Editor (VSCode IntelliSense)"];
    A --> C["`tsc` (Compilador TypeScript)"];
    A --> D["Next.js / Vitest (Build Tools)"];
    B --> E[Feedback en Tiempo Real];
    C --> F[Análisis Estático y Errores];
    D --> G[Resolución de Módulos y Compilación];
3. Contrato de API
Entrada: El código fuente completo del proyecto.
Salida: Un proceso de compilación exitoso (si no hay errores de tipo) y una experiencia de desarrollo enriquecida con autocompletado y análisis estático precisos.
4. Zona de Melhorias Futuras
PROYECTOS COMPUESTOS (COMPOSITE PROJECTS): A medida que el proyecto crezca, se podría adoptar un enfoque de "composite projects", con un tsconfig.json base y otros específicos por sub-módulo (ej. src/, tests/) para optimizar los tiempos de compilación.
SEGURIDAD DE TIPOS MÁS ESTRICTA: Considerar habilitar la bandera "noUncheckedIndexedAccess": true para forzar la verificación de accesos a índices de arrays y objetos, previniendo errores de undefined en tiempo de ejecución.
VALIDACIÓN DE ALIAS DE RUTA: Investigar plugins de build que validen que los alias definidos en paths apunten a directorios existentes.
SINCRONIZACIÓN CON package.json#exports: Si el proyecto evolucionara para convertirse en una librería publicable, alinear la configuración de paths con el campo exports del package.json para una resolución de módulos consistente.
// .docs-espejo/tsconfig.json.md