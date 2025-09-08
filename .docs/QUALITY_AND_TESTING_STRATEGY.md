// .docs/QUALITY_AND_TESTING_STRATEGY.md
/**
 * @file .docs/QUALITY_AND_TESTING_STRATEGY.md
 * @description Manifiesto de Estrategia de Calidad y Pruebas. Esta es la
 *              Única Fuente de Verdad (SSoT) que define cómo medimos,
 *              garantizamos y automatizamos la calidad en el proyecto Curcumin-Complex.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto de Calidad y Pruebas: Curcumin-Complex

## 1. Filosofía de Calidad

Nuestra filosofía de calidad se basa en el principio de **"Confianza Automatizada"**. No confiamos en la inspección manual para prevenir errores; construimos un sistema automatizado y por capas que actúa como una red de seguridad, permitiéndonos desarrollar y refactorizar con velocidad y confianza.

La calidad no es una fase final; es una propiedad intrínseca del proceso de desarrollo, reforzada en cada commit y en cada Pull Request.

---

## 2. La Arquitectura de Pruebas: La Pirámide Adaptada

Nuestro enfoque de pruebas sigue el modelo clásico de la pirámide, adaptado a una aplicación Next.js moderna.

```mermaid
graph TD
    subgraph " "
        direction TB
        E2E["**Pruebas End-to-End** <br> *(Playwright)* <br> Flujos de Usuario Críticos"];
        Integration["**Pruebas de Integración/Componente** <br> * (Vitest + RTL + Axe)* <br> Comportamiento de Aparatos de UI"];
        Unit["**Pruebas Unitarias** <br> * (Vitest)* <br> Lógica Atómica y Pura"];
    end
    style E2E fill:#f9d7d7,stroke:#c0392b,stroke-width:2px
    style Integration fill:#f7dc6f,stroke:#f1c40f,stroke-width:2px
    style Unit fill:#d5f5e3,stroke:#27ae60,stroke-width:2px
Nivel 1: Pruebas Unitarias (La Base)
Herramienta: Vitest
Propósito: Verificar la corrección de las piezas de lógica más pequeñas y aisladas de la aplicación (los "átomos" de la lógica).
Qué Probar:
Funciones de Utilidad: Todo en src/lib/utils.ts y src/lib/helpers/. Por ejemplo, setNestedProperty o formatDate.
Lógica de Schemas: La lógica compleja dentro de los schemas Zod (ej. refine, transform).
Ubicación de Archivos: [ruta-del-aparato].test.ts (ej. src/lib/helpers/set-nested-property.test.ts).
Principio Clave: Estas pruebas deben ser extremadamente rápidas y no deben tener dependencias del DOM, de React o de APIs externas.
Nivel 2: Pruebas de Integración y Componentes (El Núcleo)
Herramientas: Vitest, React Testing Library (RTL), jest-axe.
Propósito: Garantizar que nuestros aparatos de UI (componentes de React) se rendericen correctamente, sean plenamente funcionales e interactivos, y cumplan con los estándares de accesibilidad.
Qué Probar:
Renderizado Condicional: ¿El componente muestra el estado correcto basado en sus props? (ej. un Button en estado loading).
Interacción del Usuario: Simular eventos de usuario (click, type, submit) y afirmar que el componente reacciona como se espera.
Accesibilidad (A11y): Utilizar jest-axe para verificar que el HTML renderizado no tiene violaciones de accesibilidad (expect(await axe(container)).toHaveNoViolations()).
Comportamiento de Hooks: Probar hooks personalizados de forma aislada para validar su lógica de estado.
Ubicación de Archivos: tests/integration/components/[...ruta-del-aparato].test.tsx.
Nivel 3: Pruebas End-to-End (E2E) (La Cima)
Herramienta: Playwright
Propósito: Simular flujos de usuario completos en un navegador real, validando que múltiples componentes y sistemas (frontend, server actions, APIs externas) funcionan juntos correctamente. Son las pruebas más valiosas pero también las más lentas.
Qué Probar (Flujos de Usuario Críticos - SSoT):
Funnel de Conversión Principal:
Navegar a la HomePage.
Rellenar el OrderForm con datos válidos.
Hacer clic en el botón de envío.
(Crucial) Interceptar la petición de red saliente y verificar que se envía al endpoint del productor con todos los campos correctos (nombre, teléfono, campos ocultos).
Navegación y Consumo de Contenido:
Navegar a la HomePage.
Hacer clic en el enlace del "Blog" en el Header.
Verificar que la página de índice del blog (/blog) se carga y muestra al menos una tarjeta de artículo.
Hacer clic en una ArticleCard y verificar que la página del artículo se carga correctamente.
3. Estrategia de Calidad del Código Estático
La calidad no solo se mide en tiempo de ejecución, sino también en reposo.
Linting (ESLint): La SSoT es eslint.config.mjs. Fuerza la consistencia del código, previene patrones de error comunes y asegura el cumplimiento de las reglas de los hooks de React y la accesibilidad.
Formato (Prettier): La SSoT es .prettierrc. Garantiza un estilo de código 100% consistente en todo el proyecto, eliminando el debate sobre el formato.
Seguridad de Tipos (TypeScript): La SSoT es tsconfig.json. La directiva "strict": true es la primera y más importante línea de defensa contra errores de tipo.
Estos guardianes se ejecutan automáticamente en el hook pre-commit de Husky y en el pipeline de CI.
4. Cobertura de Código (Code Coverage)
La cobertura de código es una métrica para medir qué porcentaje de nuestro código está siendo probado. No es un objetivo en sí mismo, sino un indicador de la salud de nuestra suite de pruebas.
Herramienta: Vitest --coverage
Objetivos Mínimos (Mandatorios): La configuración en vitest.config.mts DEBE hacer que el pipeline de CI falle si no se cumplen los siguientes umbrales:
Ramas (Branches): 80%
Funciones (Functions): 85%
Líneas (Lines): 85%
Declaraciones (Statements): 85%
El objetivo no es alcanzar el 100%, sino asegurar que toda la lógica crítica y compleja esté cubierta por pruebas robustas.
// .docs/QUALITY_AND_TESTING_STRATEGY.md