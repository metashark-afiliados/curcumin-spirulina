// .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para el aparato `tsconfig.json`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `tsconfig.json`

## 1. Rol Estratégico y Propósito

Este aparato es la **Constitución del Compilador de TypeScript**. Su única y crítica responsabilidad es definir las reglas y opciones con las que el compilador (`tsc`) y el servidor de lenguaje de TypeScript analizan, validan y compilan nuestro código fuente.

Actúa como la SSoT para:
*   **Seguridad de Tipos:** Define el nivel de rigurosidad del sistema de tipos (`strict: true`).
*   **Resolución de Módulos:** Especifica cómo se deben resolver las importaciones y exportaciones.
*   **Soporte de Sintaxis:** Habilita características del lenguaje como JSX.
*   **Alcance del Proyecto:** Define qué archivos están incluidos y excluidos de la compilación.

## 2. Arquitectura y Flujo de Ejecución

Es un archivo de configuración estático. No tiene un flujo de ejecución, sino que es leído por múltiples herramientas del ecosistema en diferentes fases del ciclo de vida del desarrollo.

```mermaid
graph TD
    A["tsconfig.json <br> (SSoT de Configuración)"] --> B["Servidor de Lenguaje de VS Code <br> (Análisis en tiempo real)"];
    A --> C["Compilador `tsc` <br> (Ejecutado por `next build`)"];
    A --> D["Vitest <br> (Entorno de pruebas)"];
3. Contrato de API
Exportaciones: Ninguna. Su "API" es el conjunto de opciones de compilador que define.
Herencia: Extiende la configuración base proporcionada por @tsconfig/next/tsconfig.json, que es la mejor práctica recomendada por Vercel.
4. Zona de Melhorias Futuras
Múltiples tsconfig.json: Para proyectos monorepo o con lógicas muy desacopladas (ej. scripts vs. app), se podrían crear múltiples tsconfig que hereden de una base común para una configuración más granular.
paths Generado Automáticamente: Un script podría analizar la estructura de directorios y generar la sección paths para evitar desincronizaciones manuales.
strict al Máximo: Habilitar todas las flags de strict individuales (noImplicitAny, strictNullChecks, etc.) explícitamente para una mayor claridad.
noUncheckedIndexedAccess: Habilitar esta opción para añadir | undefined a los accesos de arrays y objetos, forzando un manejo de casos de borde más seguro.
declaration y declarationMap: Habilitar estas opciones si el proyecto fuera a ser publicado como una librería de NPM, para generar los archivos de definición de tipos (.d.ts).
plugins: Integrar plugins de TypeScript como typescript-plugin-css-modules para obtener tipado en las importaciones de CSS.
composite y incremental: Habilitar estas opciones para optimizar los tiempos de compilación en proyectos muy grandes o monorepos.
Auditoría de Configuración: Crear un script de CI que valide que el tsconfig.json cumple con los estándares de seguridad y calidad del equipo.
Pruebas de Tipo (Type Tests): Utilizar una librería como tsd para escribir pruebas que validen que ciertos tipos complejos se comportan como se espera en tiempo de compilación.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/tsconfig.json.md