// .docs-espejo/eslint.config.mjs.md
/**
 * @file .docs-espejo/eslint.config.mjs.md
 * @description Documento Espejo y SSoT conceptual para la configuración de ESLint.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `eslint.config.mjs`

## 1. Rol Estratégico y Propósito

Este aparato es el **Guardián de la Calidad del Código**. Su única responsabilidad es actuar como la Única Fuente de Verdad (SSoT) para las reglas de análisis estático que definen y fuerzan un estándar de código consistente, mantenible, accesible y de alto rendimiento en todo el proyecto.

Estratégicamente, este archivo automatiza la calidad del código, permitiendo a los desarrolladores centrarse en la lógica de negocio mientras la herramienta previene errores comunes, inconsistencias de estilo y problemas de accesibilidad antes de que el código llegue a producción.

## 2. Arquitectura de la Configuración ("Flat Config")

La configuración utiliza el moderno formato "Flat Config" de ESLint, que es un array de objetos de configuración. Cada objeto representa una capa de reglas que se aplica a un conjunto específico de archivos.

*   **Capas de Configuración:**
    1.  **`ignores`:** Define globalmente qué archivos y directorios deben ser excluidos del análisis.
    2.  **`next/core-web-vitals`:** Proporciona las reglas base recomendadas por el equipo de Next.js.
    3.  **`jsx-a11y`:** Aplica las mejores prácticas de accesibilidad a los componentes JSX.
    4.  **`simple-import-sort`:** Fuerza un ordenamiento consistente y lógico de las declaraciones `import`.
    5.  **`@typescript-eslint` y `react-hooks`:** Aplica reglas avanzadas y tipo-seguras para TypeScript y fuerza las Reglas de los Hooks de React.
    6.  **`vitest`:** Configura el entorno y las reglas específicas para los archivos de prueba.
    7.  **`prettier`:** Integra Prettier como una regla de ESLint, asegurando que el formateo del código sea parte del proceso de linting.

## 3. Contrato de API

*   **Entrada:** El código fuente completo del proyecto.
*   **Salida (Efecto Secundario):** Un reporte de errores y advertencias en la terminal si se encuentran violaciones a las reglas. El objetivo final es un build limpio sin ninguna salida de ESLint.

## 4. Zona de Melhorias Futuras

1.  **Reglas Más Estrictas:** A medida que el proyecto madure, cambiar reglas de `"warn"` a `"error"` (ej. `@typescript-eslint/no-explicit-any`) para forzar un tipado más estricto.
2.  **Reglas Personalizadas:** Crear un plugin de ESLint local con reglas personalizadas que fuercen convenciones específicas del proyecto (ej. una regla que exija que cada Server Action llame a `createAuditLog`).
3.  **Análisis de Complejidad Ciclomática:** Integrar `eslint-plugin-complexity` para establecer un umbral máximo de complejidad para las funciones, promoviendo un código más simple y mantenible.
4.  **Reglas de Performance de React:** Integrar `eslint-plugin-react-perf` para detectar patrones de renderizado ineficientes en los componentes.
5.  **Documentación en Español:** Traducir este documento espejo al español.
6.  **Configuración de `overrides` más Granular:** Crear `overrides` más específicos para diferentes tipos de archivos, como aplicar reglas diferentes a los archivos de configuración (`*.config.mjs`) que a los componentes de UI.
7.  **Integración con `lint-staged`:** Configurar `lint-staged` en `package.json` para ejecutar ESLint solo en los archivos modificados en un commit, acelerando el hook `pre-commit`.
8.  **Generación de Reporte HTML:** Añadir un script que ejecute ESLint con un formateador HTML (`-f html`) para generar un reporte visual de la calidad del código, útil para CI/CD.
9.  **Reglas de Seguridad:** Integrar `eslint-plugin-security` para detectar patrones de código potencialmente inseguros.
10. **Comentarios de Desactivación Obligatorios:** Configurar ESLint para que exija un comentario explicativo cada vez que una regla es desactivada con `// eslint-disable-next-line`.

// .docs-espejo/eslint.config.mjs.md