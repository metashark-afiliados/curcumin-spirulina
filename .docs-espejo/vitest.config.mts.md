// .docs-espejo/vitest.config.mts.md
/\*\*

- @file .docs-espejo/vitest.config.mts.md
- @description Documento Espejo y SSoT conceptual para la configuración de Vitest.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `vitest.config.mts`

## 1. Rol Estratégico y Propósito

Este aparato es el **cerebro del corredor de pruebas unitarias y de integración**. Su única responsabilidad es instruir a Vitest sobre cómo descubrir, ejecutar y reportar los resultados de las pruebas, creando un entorno de validación rápido, robusto y consistente.

Estratégicamente, este archivo garantiza:

1.  **Aislamiento:** Define qué archivos son pruebas (`include`) y cuáles no.
2.  **Fidelidad del Entorno:** Configura un entorno de navegador simulado (`jsdom`) para que los componentes de React puedan ser renderizados y probados.
3.  **Preparación:** Ejecuta `tests/setup.ts` antes de las pruebas para preparar el entorno.
4.  **Calidad del Código:** Define los umbrales mínimos de cobertura de código que deben cumplirse para que la suite de pruebas pase.

## 2. Arquitectura y Flujo de Ejecución

Es un archivo de configuración puro, sin ejecución directa en la aplicación.

```mermaid
graph TD
    A[Desarrollador ejecuta `pnpm test`] --> B[Vitest Runner];
    B -- "Lee" --> C["`vitest.config.mts`"];
    C -- "Carga `plugins`" --> D["`vite-tsconfig-paths` (Resuelve alias)"];
    C -- "Aplica `setupFiles`" --> E["Ejecuta `tests/setup.ts`"];
    C -- "Usa `include` para" --> F[Encuentra archivos `*.test.tsx`];
    F -- "Son ejecutados en entorno" --> G["`jsdom`"];
    G -- "Generan reporte de" --> H["Cobertura de Código"];
3. Contrato de API
Exportación: Exporta por defecto un objeto de configuración que cumple con la API de vitest/config.
4. Zona de Melhorias Futuras
SUITES DE PRUEBAS SEPARADAS: Crear configuraciones separadas (ej. vitest.config.unit.mts, vitest.config.integration.mts) que tengan diferentes patrones de include para poder ejecutar solo pruebas unitarias o de integración.
MOCKING AUTOMÁTICO: Integrar la opción mocks.globals de Vitest para mockear automáticamente módulos globales (como fetch) si es necesario.
REPORTES DE COBERTURA PERSONALIZADOS: Utilizar reporters de cobertura personalizados (como vitest-json-reporter) para generar artefactos que puedan ser consumidos por herramientas de CI/CD para análisis de tendencias de calidad.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
PARALELIZACIÓN DE PRUEBAS: Experimentar con las opciones de threads y isolate para optimizar el tiempo de ejecución de la suite de pruebas a medida que crece.
INTEGRACIÓN CON jsdom-global: Para pruebas que necesiten un control más fino del entorno JSDOM, se podría registrar jsdom-global/register en setupFiles.
UMBRALES POR ARCHIVO: Configurar umbrales de cobertura de código específicos por archivo o directorio para aplicar estándares de calidad más altos a las partes más críticas de la aplicación.
PRUEBAS DE SNAPSHOT: Habilitar y configurar las pruebas de snapshot si se decide adoptar esta estrategia para componentes de UI.
REPORTE DE ACCESIBILIDAD (A11Y): Integrar un reporter personalizado que ejecute jest-axe en todos los componentes renderizados y genere un reporte de accesibilidad.
CONFIGURACIÓN DE ALIAS DE VITEST: Además de vite-tsconfig-paths, se podrían definir alias específicos para el entorno de pruebas directamente en la configuración de Vitest si fuera necesario.
// .docs-espejo/vitest.config.mts.md
```
