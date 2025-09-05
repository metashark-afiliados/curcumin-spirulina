// vitest.config.mts
/**
 * @file vitest.config.mts
 * @description Manifiesto de Configuración y SSoT para Vitest. Define el entorno
 *              de pruebas, la resolución de módulos, la preparación del entorno
 *              y los umbrales de calidad del código para toda la aplicación.
 * @author L.I.A. Legacy
 * @version 1.0.0
 * @see .docs-espejo/vitest.config.mts.md
 */
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /**
     * @plugin tsconfigPaths
     * @description Lee la configuración de `paths` del tsconfig.json para
     *              resolver los alias de importación (`@/*`) en las pruebas.
     */
    tsconfigPaths(),
  ],
  test: {
    /**
     * @property environment
     * @description Configura un entorno de navegador simulado (DOM) usando JSDOM,
     *              esencial para probar componentes de React.
     */
    environment: "jsdom",
    /**
     * @property globals
     * @description Habilita el acceso a las APIs de Vitest (describe, it, expect)
     *              globalmente, sin necesidad de importarlas en cada archivo.
     */
    globals: true,
    /**
     * @property setupFiles
     * @description Lista de archivos que se ejecutan antes de cada suite de pruebas.
     *              Se utiliza aquí para extender `expect` con matchers de jest-dom y jest-axe.
     */
    setupFiles: ["./tests/setup.ts"],
    /**
     * @property coverage
     * @description Configuración del reporte de cobertura de código.
     */
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // Umbral de calidad de élite: exige un 80% de cobertura.
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      // Excluir archivos de configuración y mocks de la cobertura.
      exclude: [
        "**/*.config.{js,ts,mjs,mts}",
        "**/tests/mocks/**",
        "**/src/middleware/**", // El middleware es difícil de probar unitariamente.
        "**/.docs-espejo/**",
      ],
    },
    // Mockea el paquete 'server-only' para que no falle en el entorno de pruebas JSDOM.
    alias: {
      "server-only": "./tests/mocks/server-only.ts",
    },
  },
});
// vitest.config.mts
