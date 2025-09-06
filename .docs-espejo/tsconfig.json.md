<!-- .docs-espejo/tsconfig.json.md -->
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para la configuración de TypeScript.
 * @author L.I.A. Legacy
 * @version 2.0.0
 */
# Manifiesto Conceptual: Aparato `tsconfig.json`

## 1. Rol Estratégico y Propósito

El `tsconfig.json` es la **"Constitución" para el compilador de TypeScript**. Define las reglas del lenguaje, la resolución de módulos y qué archivos forman parte del programa de la aplicación. Su propósito es garantizar la máxima seguridad de tipos (`strict: true`), una configuración de módulos moderna (`moduleResolution: "bundler"`), una resolución de alias correcta (`paths`) y un build resiliente (`forceConsistentCasingInFileNames: true`).

## 2. Arquitectura y Flujo de Ejecución

Este archivo es consumido por varios procesos del ciclo de vida del desarrollo:

```mermaid
graph TD
    A[Editor de Código (VS Code)] --> B{tsconfig.json};
    C[Next.js Build (`pnpm build`)] --> B;
    D[Linter (`pnpm lint`)] --> B;
    B -- Define Reglas --> E[Análisis Estático y Compilación];
3. Contrato de API (Opciones Clave)
strict: true: Habilita todas las opciones de verificación estricta de tipos. No negociable para un código de élite.
forceConsistentCasingInFileNames: true: Añade una capa de resiliencia al build, previniendo errores de importación causados por inconsistencias de mayúsculas/minúsculas en los nombres de archivo.
moduleResolution: "bundler": La estrategia de resolución de módulos recomendada para frameworks modernos como Next.js, que utilizan bundlers avanzados.
paths: { "@/*": ["./src/*"] }: Define el alias de importación canónico, mejorando la legibilidad y mantenibilidad de las rutas de importación.
include: Define explícitamente que solo el código en src y los tipos generados por Next.js pertenecen al programa de la aplicación.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Añadir alias @tests: Para simplificar las importaciones en la suite de pruebas.
Habilitar noUnusedLocals y noUnusedParameters: Para una limpieza de código aún más estricta, forzando la eliminación de variables y parámetros no utilizados.
Crear un tsconfig.test.json: Para configuraciones específicas de la suite de pruebas, que podría extender el tsconfig.json base y añadir los alias de prueba.
Explorar composite y references: Para optimizar los tiempos de compilación en un futuro monorepo con múltiples paquetes.
<!-- .docs-espejo/tsconfig.json.md -->