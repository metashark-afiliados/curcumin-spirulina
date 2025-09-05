// .docs-espejo/tests/setup.ts.md
/\*\*

- @file .docs-espejo/tests/setup.ts.md
- @description Documento Espejo y SSoT conceptual para la configuración del entorno de pruebas.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `tests/setup.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **fundamento del entorno de pruebas de la aplicación**. Su única y crítica responsabilidad es preparar el entorno de ejecución de Vitest antes de que se ejecute cualquier prueba. Actúa como el punto de entrada para:

1.  **Extender Capacidades de Aserción:** Importa y registra matchers adicionales de librerías como `@testing-library/jest-dom` y `jest-axe`. Esto enriquece la API de `expect` con aserciones semánticas para la UI (ej. `toBeInTheDocument()`) y para la accesibilidad (`toHaveNoViolations()`).
2.  **Configurar Mocks Globales:** Es el lugar canónico para configurar mocks que deben estar activos en toda la suite de pruebas (ej. `fetch`, `localStorage`).

Estratégicamente, centraliza la configuración del entorno, garantizando que todas las pruebas se ejecuten en un contexto consistente y predecible, adhiriéndose al principio DRY.

## 2. Arquitectura y Flujo de Ejecución

Este es un archivo de configuración que es ejecutado por Vitest antes de la suite de pruebas. No tiene un flujo de ejecución en el contexto de la aplicación.

```mermaid
graph TD
    A[Vitest Runner] -- "Inicia" --> B["Lee `vitest.config.mts`"];
    B -- "Encuentra la directiva `setupFiles`" --> C["Ejecuta `tests/setup.ts`"];
    C -- "Importa y ejecuta `toHaveNoViolations`" --> D["Extiende `expect` con matchers de `jest-axe`"];
    C -- "Importa `@testing-library/jest-dom`" --> E["Extiende `expect` con matchers de DOM"];
    F[Archivos de Prueba (`*.test.ts`)] -- "Son ejecutados después" --> G["Pueden usar los nuevos matchers"];
3. Contrato de API
Entrada: Ninguna. Es un script de configuración.
Salida (Efecto Secundario): El objeto global expect de Vitest es mutado para incluir nuevos métodos de aserción.
4. Zona de Melhorias Futuras
MOCKS DE API GLOBALES (msw): Integrar la inicialización de un servidor de mocks global (Mock Service Worker) aquí (server.listen(), server.close()) para interceptar todas las llamadas de red durante las pruebas.
LIMPIEZA AUTOMÁTICA (afterEach): Configurar un hook global afterEach para llamar a cleanup() de React Testing Library, eliminando la necesidad de hacerlo en cada archivo de prueba.
CONFIGURACIÓN DE FUSO HORÁRIO (Timezone): Para garantizar que las pruebas que dependen de fechas sean consistentes, se podría definir un huso horario estándar para el entorno de pruebas usando process.env.TZ = 'UTC'.
MOCK DE window.matchMedia: Para componentes que utilizan media queries para un renderizado responsivo, se podría configurar aquí un mock global para window.matchMedia.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
POLYFILLS DE NAVEGADOR: Si los componentes utilizan APIs de navegador muy modernas no disponibles en JSDOM, se pueden importar los polyfills necesarios en este archivo.
CONFIGURACIÓN DE faker.js: Establecer una "seed" global para faker.js para que los datos generados en las pruebas sean consistentes entre ejecuciones.
LOGGING DE PRUEBAS MEJORADO: Configurar un beforeEach que registre el nombre de la prueba que está a punto de ejecutarse para una mejor trazabilidad en los logs de CI/CD.
RESETEO DE MOCKS: Añadir un afterEach que llame a vi.clearAllMocks() para asegurar el aislamiento completo entre pruebas.
INTEGRACIÓN CON vitest-localstorage-mock: Añadir mocks para localStorage y sessionStorage para probar componentes que dependen de estas APIs.
// .docs-espejo/tests/setup.ts.md
```
