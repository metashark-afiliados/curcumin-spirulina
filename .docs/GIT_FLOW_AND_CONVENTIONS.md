// .docs/GIT_FLOW_AND_CONVENTIONS.md
/**
 * @file .docs/GIT_FLOW_AND_CONVENTIONS.md
 * @description Manifiesto de Flujo de Desarrollo y SSoT para el Control de
 *              Versiones. Define el modelo de ramificación, las convenciones de
 *              commit y el protocolo de Pull Request para el proyecto Curcumin-Complex.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto de Flujo de Desarrollo: Curcumin-Complex

## 1. Filosofía y Principios

Este documento es la Única Fuente de Verdad (SSoT) para el proceso de contribución de código. Nuestra filosofía se basa en la **Previsibilidad, la Claridad y la Automatización**. El objetivo es mantener un historial de versiones limpio y legible, y utilizar la automatización para garantizar la calidad en cada paso.

1.  **Previsibilidad:** Nunca debe haber dudas sobre cómo iniciar una nueva tarea o proponer un cambio.
2.  **Claridad:** El historial de Git debe ser autoexplicativo, contando la historia de la evolución del proyecto.
3.  **Automatización:** Las puertas de calidad (tests, linting) son automáticas y no negociables.

---

## 2. Modelo de Ramificación: GitHub Flow Simplificado

Adoptamos el modelo **GitHub Flow** por su simplicidad y su alineación con la Integración y Despliegue Continuos (CI/CD).

### La Rama `main` (SSoT de Producción)

*   La rama `main` es sagrada. **SIEMPRE** debe estar en un estado estable y desplegable.
*   **Prohibido:** Los commits directos a `main` están estrictamente prohibidos y bloqueados a nivel de repositorio.
*   **Fuente de Verdad:** Todo nuevo trabajo **DEBE** partir de la última versión de `main`.

### Ramas de Desarrollo (`feature`, `fix`, `chore`)

Todo el trabajo se realiza en ramas descriptivas creadas a partir de `main`.

*   **Convención de Nomenclatura:** `tipo/descripcion-corta-en-kebab-case`
    *   **`tipo`**: Coincide con los tipos de Commit Semántico (ver sección 3).
    *   **`descripcion-corta`**: Un resumen de 2 a 5 palabras de la tarea.

*   **Ejemplos Válidos:**
    *   `feat/integration-reactbits-carousel`
    *   `fix/order-form-phone-validation`
    *   `docs/create-git-flow-manifesto`
    *   `refactor/atomize-telemetry-provider`
    *   `chore/update-pnpm-dependencies`

---

## 3. Convenciones de Commit Semántico (Mandatorio)

El proyecto **DEBE** seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto no es una sugerencia estilística; es un requisito funcional que habilita la automatización del versionamiento y la generación del `CHANGELOG.md`.

### Estructura del Commit
type(scope): subject
[optional body]
[optional footer(s)]
code
Code
*   **`type`**: Define la naturaleza del cambio. Los tipos permitidos son:
    *   **`feat`**: Una nueva funcionalidad para el usuario. (Corresponde a un `MINOR` en SemVer).
    *   **`fix`**: Una corrección de un bug. (Corresponde a un `PATCH` en SemVer).
    *   **`docs`**: Cambios exclusivos en la documentación.
    *   **`style`**: Cambios que no afectan el significado del código (formato, punto y coma, etc.).
    *   **`refactor`**: Un cambio en el código que no corrige un bug ni añade una funcionalidad.
    *   **`perf`**: Un cambio que mejora el rendimiento.
    *   **`test`**: Añadir o corregir pruebas.
    *   **`build`**: Cambios que afectan el sistema de build o dependencias externas (`package.json`).
    *   **`ci`**: Cambios en nuestros archivos y scripts de CI (GitHub Actions).
    *   **`chore`**: Otros cambios que no modifican el código fuente o de pruebas.
*   **`scope` (opcional)**: El contexto del cambio (ej. `ui`, `form`, `auth`, `ci`).
*   **`subject`**: Una descripción concisa, en imperativo y en minúsculas. No terminar con punto.

*   **BREAKING CHANGE**: Un commit que introduce un cambio de API que rompe la compatibilidad debe incluir un `!` después del `type(scope)`, y una explicación en el pie del commit. (Corresponde a un `MAJOR` en SemVer).

### Ejemplos Válidos para `curcumin-complex`:

*   `feat(ui): integrate and naturalize ReactBits ThreadsBackground`
*   `fix(form): prevent form submission on validation error`
*   `docs(branding): create branding ssot and leveling plan`
*   `refactor(telemetry): atomize TelemetryProvider into dedicated hooks`
*   `build(deps): upgrade next-intl to version 3.18.0`
*   `feat(auth)!: replace passport.js with lucia-auth` (Ejemplo de Breaking Change)

---

## 4. Protocolo de Pull Request (PR)

La única vía para introducir código en `main` es a través de un Pull Request.

### Proceso

1.  **Creación:** Una vez completado el trabajo en una rama de desarrollo, se abre un PR contra `main`.
2.  **Documentación:** El PR **DEBE** utilizar la plantilla `.github/PULL_REQUEST_TEMPLATE.md`, que exigirá:
    *   Una descripción clara del "qué" y el "porqué" del cambio.
    *   Un enlace al `Issue` de seguimiento.
    *   Un checklist de pruebas manuales realizadas.
    *   (Si aplica) Screenshots o GIFs que demuestren el cambio.
3.  **Revisión de Código (Code Review):**
    *   Se requiere la **aprobación de al menos un (1) miembro del equipo**.
    *   Los revisores deben enfocarse en la adherencia a la arquitectura, la calidad del código, la legibilidad y la correcta implementación de pruebas.
4.  **Puertas de Calidad Automatizadas (CI):**
    *   El pipeline de CI se ejecutará automáticamente. El PR **NO PODRÁ SER FUSIONADO** si alguno de los siguientes trabajos falla:
        *   `quality_check` (Linting, Type Checking, Formatting)
        *   `unit_and_integration_tests` (Vitest)
        *   `e2e_tests` (Playwright)
        *   `build_production`
5.  **Fusión (Merge):**
    *   Una vez que todas las comprobaciones son exitosas y se ha obtenido la aprobación, el autor del PR puede fusionarlo.
    *   **Método de Fusión:** Utilizar **"Squash and merge"**. Esto condensa todos los commits de la rama en un único commit en `main`, manteniendo el historial de la rama principal limpio y significativo.

// .docs/GIT_FLOW_AND_CONVENTIONS.md