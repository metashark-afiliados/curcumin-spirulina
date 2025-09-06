<!-- .docs-espejo/package.json.md -->
/**
 * @file .docs-espejo/package.json.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto del proyecto, package.json.
 * @author L.I.A. Legacy
 * @version 2.3.0
 */
# Manifiesto Conceptual: Aparato `package.json`

## 1. Rol Estratégico y Propósito

Este aparato es el **corazón del proyecto y la Única Fuente de Verdad (SSoT) para sus dependencias, metadatos y scripts de tareas**. Su propósito es definir de forma declarativa el ecosistema de herramientas y librerías sobre el que se construye la aplicación, y proporcionar una interfaz de línea de comandos (`pnpm run <script>`) consistente y de alto nivel para todas las operaciones de desarrollo, calidad y build.

Estratégicamente, un `package.json` bien estructurado y mantenido es fundamental para:
*   **Estabilidad:** Garantiza builds reproducibles.
*   **Mantenibilidad:** Centraliza la gestión de versiones de dependencias.
*   **Eficiencia (DX):** Automatiza tareas complejas a través de scripts simples.
*   **Observabilidad:** Configura scripts de desarrollo para mejorar la legibilidad de los logs sin comprometer el rendimiento del `runtime`.

## 2. Arquitectura de la Configuración

La estructura del archivo se organiza en tres secciones principales:

*   **Metadatos:** Define la identidad del proyecto (`name`, `version`, `description`, etc.).
*   **Scripts:** Es la API de línea de comandos del proyecto. Los scripts están diseñados para ser atómicos y componibles. Por ejemplo, `quality:check` compone otros scripts atómicos (`format:check`, `lint`, `typecheck`) para crear una puerta de calidad robusta. El script `dev` ha sido modificado para integrarse con `pino-pretty` a través de un pipe externo, resolviendo problemas de compatibilidad del logger en el entorno de Next.js.
*   **Dependencias:**
    *   `dependencies`: Librerías necesarias para que la aplicación se ejecute en producción.
    *   `devDependencies`: Herramientas utilizadas únicamente durante el desarrollo, pruebas y build (ej. ESLint, Vitest, TypeScript, pino-pretty).

## 3. Contrato de API (Scripts)

La "API" de este aparato es el conjunto de comandos ejecutables vía `pnpm run`:

*   **Desarrollo:**
    *   `dev`: Inicia el servidor de desarrollo de Next.js y pipea sus logs a `pino-pretty` para una salida legible.
    *   `dev:pretty`: Alias para `dev`.
*   **Build & Producción:** `build`, `start`
*   **Calidad de Código:** `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `quality:check`
*   **Pruebas:** `test`, `test:watch`, `test:unit`, `test:integration`, `test:coverage`
*   **Generación de Artefactos:** `gen:i18n`, `gen:i18n:manifest`, `gen:i18n:types`

## 4. Zona de Mejoras Nuevas (Valor al Proyecto)

*   **Pruebas End-to-End (Playwright):** Integrar Playwright para pruebas E2E y añadir los scripts correspondientes (`e2e`, `e2e:ui`). Esto completaría el blindaje del proyecto con pruebas en todos los niveles.
*   **Análisis de Bundle Interactivo:** Integrar `@next/bundle-analyzer` y un script (`analyze`) para visualizar el tamaño de los paquetes de JavaScript. Esto permitiría identificar y optimizar proactivamente los componentes que están añadiendo más peso al bundle.
*   **Generación Automática de Changelog:** Integrar una herramienta como `standard-version` para automatizar la generación del `CHANGELOG.md` basada en los commits, siguiendo convenciones de commit semántico. Esto mejoraría la comunicación sobre las versiones y cambios del proyecto.
*   **Hooks de Git Avanzados (`pre-push`):** Añadir un hook `pre-push` en Husky que ejecute `pnpm quality:check` para prevenir que se envíe código de baja calidad al repositorio antes de una revisión de código.
*   **Auditoría de Dependencias Automatizada:** Añadir un script `audit:check` que ejecute `pnpm audit` con un umbral de severidad definido para detectar vulnerabilidades en las dependencias de forma temprana en el ciclo de desarrollo.
*   **Pruebas de Regresión Visual (con `lost-pixel`):** Integrar una herramienta de pruebas de regresión visual (ej. `lost-pixel`) para detectar cambios inesperados en la UI entre diferentes entornos o versiones del código.
*   **Integración con Storybook:** Añadir Storybook para el desarrollo y documentación aislada de componentes de UI, mejorando la coherencia y facilitando la colaboración en el diseño.
*   **Generador de Manifiestos de Módulo (`Barrel Files`) Automatizado:** Crear un script que genere automáticamente los archivos `index.ts` para una exportación de módulos consistente en directorios como `src/middleware/handlers`, reduciendo el mantenimiento manual.
<!-- .docs-espejo/package.json.md -->