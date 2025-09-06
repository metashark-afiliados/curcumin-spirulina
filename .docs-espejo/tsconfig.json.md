// .docs-espejo/tsconfig.json.md
/**
 * @file .docs-espejo/tsconfig.json.md
 * @description Documento Espejo y SSoT conceptual para la configuración de TypeScript.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `tsconfig.json`

## 1. Rol Estratégico y Propósito
El `tsconfig.json` es la **Constitución para el compilador de TypeScript**. Define las reglas del lenguaje, la resolución de módulos y qué archivos forman parte del programa de la aplicación. Su propósito es garantizar la máxima seguridad de tipos (`strict: true`), una configuración de módulos moderna (`moduleResolution: "bundler"`) y una correcta resolución de alias (`paths`).

La refactorización clave ha sido sanear la directiva `include` para que se enfoque exclusivamente en el código fuente de la aplicación (`src`), excluyendo explícitamente los archivos de prueba, lo cual resuelve los errores de "archivo no encontrado".

## 2. Arquitectura y Flujo de Ejecución
Este archivo es consumido por varios procesos del ciclo de vida del desarrollo:
```mermaid
graph TD
    A[Editor de Código (VS Code)] --> B{tsconfig.json};
    C[Next.js Build (`pnpm build`)] --> B;
    D[Linter (`pnpm lint`)] --> B;
    B -- Define Reglas --> E[Análisis Estático y Compilación];
3. Contrato de API (Opciones Clave)
strict: true: Habilita todas las opciones de verificación estricta de tipos. No negociable.
paths: { "@/*": ["./src/*"] }: Define el alias de importación canónico.
include: Define explícitamente que solo el código en src y los tipos generados por Next.js pertenecen al programa de la aplicación.
4. Zona de Melhorias Futuras
Añadir alias @tests: Para simplificar las importaciones en la suite de pruebas.
Habilitar noUnusedLocals: Para una limpieza de código más estricta.
Habilitar noUnusedParameters: Para una API de funciones más limpia.
Configurar baseUrl: Aunque implícito, establecer baseUrl: "." explícitamente.
Explorar composite y references: Para optimizar los tiempos de compilación en un futuro monorepo.
Sincronizar con jsconfig.json: Asegurar que las configuraciones sean consistentes si se introduce JavaScript en el proyecto.
Definir target más moderno: Evaluar si el target puede ser actualizado a es2017 o superior, dependiendo de la compatibilidad de los navegadores objetivo.
Habilitar forceConsistentCasingInFileNames: Para prevenir errores en sistemas de archivos que no distinguen mayúsculas de minúsculas.
Crear un tsconfig.test.json: Para configuraciones específicas de la suite de pruebas.
Documentar cada opción: Añadir comentarios en línea en el tsconfig.json explicando el propósito de cada opción de compilador.
// .docs-espejo/tsconfig.json.md