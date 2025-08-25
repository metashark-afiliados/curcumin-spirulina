// vitest.config.mts
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

/**
 * @type {import('vitest/config').UserConfig}
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Vitest configuration file for the Curcumin Spirulina project.
 *              Establishes a professional testing environment for unit and integration tests.
 *              Configured as an ESM module (.mts) to support ESM-only plugins.
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/setup.ts",
        "**/*.config.{js,ts,mjs,mts}",
        ".next/",
        "postcss.config.mjs",
        "prettier.config.mjs",
        "src/middleware.ts",
        "src/i18n.ts",
      ],
    },
  },
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Medium - COVERAGE THRESHOLDS: Implementar limites de cobertura de teste (`coverage.thresholds`) para garantir que novos commits mantenham ou aumentem a qualidade do código.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - MIGRACIÓN A MÓDULO ESM (.mts): O arquivo foi renomeado para `vitest.config.mts` para ser tratado como um Módulo ECMAScript. Isso resolve o erro crítico `ESM file cannot be loaded by require` e garante a compatibilidade com plugins modernos do Vite.
 * ((Implementada)) @version 1.0.0 - REACT & TSCONFIG PATHS: Integração completa com o ecossistema do projeto.
 * ((Implementada)) @version 1.0.0 - JSDOM ENVIRONMENT: Configuração explícita do ambiente `jsdom`.
 * ((Implementada)) @version 1.0.0 - GLOBAL SETUP FILE: Definição de um arquivo `setupFiles` para centralizar a configuração global dos testes.
 *
 */
