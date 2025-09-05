// .docs-espejo/package.json.md
/**
 * @file .docs-espejo/package.json.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto del proyecto, package.json.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `package.json`

## 1. Rol Estratégico y Propósito

Este aparato es el **corazón del proyecto y la Única Fuente de Verdad (SSoT) para sus dependencias, metadatos y scripts de tareas**. Su propósito es definir de forma declarativa el ecosistema de herramientas y librerías sobre el que se construye la aplicación, y proporcionar una interfaz de línea de comandos (`pnpm run <script>`) consistente y de alto nivel para todas las operaciones de desarrollo, calidad y build.

Estratégicamente, un `package.json` bien estructurado y mantenido es fundamental para:
*   **Estabilidad:** Garantiza builds reproducibles.
*   **Mantenibilidad:** Centraliza la gestión de versiones de dependencias.
*   **Eficiencia (DX):** Automatiza tareas complejas a través de scripts simples.

## 2. Arquitectura de la Configuración

La estructura del archivo se organiza en tres secciones principales:

*   **Metadatos:** Define la identidad del proyecto (`name`, `version`, `description`, etc.).
*   **Scripts:** Es la API de línea de comandos del proyecto. Los scripts están diseñados para ser atómicos y componibles. Por ejemplo, `quality:check` compone otros scripts atómicos (`format:check`, `lint`, `typecheck`) para crear una puerta de calidad robusta.
*   **Dependencias:**
    *   `dependencies`: Librerías necesarias para que la aplicación se ejecute en producción.
    *   `devDependencies`: Herramientas utilizadas únicamente durante el desarrollo, pruebas y build (ej. ESLint, Vitest, TypeScript).

## 3. Contrato de API (Scripts)

La "API" de este aparato es el conjunto de comandos ejecutables vía `pnpm run`:

*   **Desarrollo:** `dev`
*   **Build & Producción:** `build`, `start`
*   **Calidad de Código:** `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `quality:check`
*   **Pruebas:** `test`, `test:watch`, `test:unit`, `test:integration`, `test:coverage`
*   **Generación de Artefactos:** `gen:i18n`, `gen:i18n:manifest`, `gen:i18n:types`

## 4. Zona de Melhorias Futuras

1.  **Pruebas End-to-End (Playwright):** Integrar Playwright para pruebas E2E y añadir los scripts correspondientes (`e2e`, `e2e:ui`).
2.  **Análisis de Bundle:** Integrar `@next/bundle-analyzer` para visualizar el tamaño de los paquetes de JavaScript y optimizar la performance.
3.  **Generación Automática de Changelog:** Integrar una herramienta como `standard-version` para automatizar la generación del `CHANGELOG.md` basada en los commits.
4.  **Hooks de Git Avanzados (`pre-push`):** Añadir un hook `pre-push` en Husky que ejecute `pnpm quality:check` para prevenir que se envíe código de baja calidad al repositorio.
5.  **Auditoría de Dependencias:** Añadir un script `audit:check` que ejecute `pnpm audit` con un umbral de severidad para detectar vulnerabilidades en las dependencias.
6.  **Pruebas de Regresión Visual:** Integrar una herramienta de pruebas de regresión visual (ej. `lost-pixel`) para detectar cambios inesperados en la UI.
7.  **Integración con Storybook:** Añadir Storybook para el desarrollo y documentación aislada de componentes de UI.
8.  **Generador de Manifiestos de Módulo (`Barrel Files`):** Crear un script que genere automáticamente los archivos `index.ts` para una exportación de módulos consistente.
9.  **Documentación en Español:** Traducir este documento espejo al español.
10. **Script de Setup Inicial:** Crear un script `setup` que guíe a los nuevos desarrolladores a través de la configuración inicial del proyecto (ej. creación de `.env.local`).

// .docs-espejo/package.json.md