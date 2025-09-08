// .docs-espejo/package.json.md
/**
 * @file .docs-espejo/package.json.md
 * @description Documento Espejo y SSoT conceptual para el aparato `package.json`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `package.json`

## 1. Rol Estratégico y Propósito

El aparato `package.json` es el **manifiesto fundamental del proyecto**. Actúa como la Única Fuente de Verdad (SSoT) para tres dominios críticos:

1.  **Identidad:** Define los metadatos del proyecto (`name`, `version`, `description`).
2.  **Dependencias:** Lista explícitamente todas las librerías de terceros necesarias para construir y ejecutar la aplicación, garantizando builds reproducibles a través del `pnpm-lock.yaml`.
3.  **Operaciones:** Proporciona una API de línea de comandos a través de la sección `scripts`, que encapsula tareas complejas de desarrollo, testing, build y mantenimiento en comandos simples y predecibles.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura del `package.json` sigue el estándar de NPM. Su flujo de ejecución principal es a través del gestor de paquetes `pnpm`, que interpreta las secciones para orquestar acciones:

*   **`pnpm install`:** Lee `dependencies` y `devDependencies` para construir el directorio `node_modules`.
*   **`pnpm run <script>`:** Ejecuta el comando asociado a una clave en la sección `scripts`.

El script `prepare` está configurado para ejecutar `husky`, instalando los hooks de Git (`pre-commit`) que actúan como una puerta de calidad automatizada, ejecutando `quality:check` antes de cada commit.

## 3. Contrato de API (`scripts`)

La sección `scripts` define la interfaz pública para interactuar con el proyecto desde la línea de comandos:

*   **Desarrollo:** `pnpm dev`
*   **Build:** `pnpm build`
*   **Calidad:** `pnpm quality:check` (agrupa `format:check`, `lint`, `typecheck`)
*   **Pruebas:** `pnpm test` (y sus variantes `:unit`, `:integration`)
*   **Diagnóstico:** `pnpm diag:all` (audita la infraestructura de logging)
*   **Generación de Código:** `pnpm gen:all` (automatiza la i18n)

## 4. Zona de Melhorias Futuras

1.  **Versionado y Changelog Automatizado:** Integrar `release-it` y `commitlint` para automatizar el versionado semántico y la generación de `CHANGELOG.md` basados en la convención de commits.
2.  **Ejecución de Scripts en Paralelo:** Utilizar `npm-run-all` para ejecutar tareas de calidad en paralelo (`pnpm quality:check:parallel`), acelerando el pipeline de CI.
3.  **Análisis de Dependencias:** Añadir un script `deps:audit` que utilice `pnpm audit` o `depcheck` para identificar vulnerabilidades de seguridad y dependencias no utilizadas.
4.  **Generación de Documentación:** Implementar un script `docs:generate` que utilice `typedoc` para generar automáticamente documentación HTML a partir de los comentarios TSDoc.
5.  **Mocking de API Centralizado:** Añadir un script `mock:server` que inicie un servidor MSW (Mock Service Worker) para el desarrollo de UI desacoplado de APIs externas.
6.  **Tipado de Variables de Entorno:** Integrar `t3-env` para proporcionar validación y autocompletado tipo-seguro para las variables de entorno.
7.  **Limpieza de Build Cache:** Añadir un script `clean` que elimine los directorios `.next` y `.turbo` para forzar una reconstrucción limpia del proyecto.
8.  **Gestión de Migraciones de Base de Datos:** Para proyectos con esquemas más complejos, integrar una herramienta como `node-pg-migrate` y añadir scripts `db:migrate` y `db:rollback`.
9.  **Pruebas E2E (Playwright):** Añadir scripts `e2e` y `e2e:ui` para ejecutar la suite de pruebas End-to-End.
10. **Internacionalización de la Documentación:** Traducir este documento espejo a otros idiomas para facilitar el onboarding de equipos multilingües.
// .docs-espejo/package.json.md