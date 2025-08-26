// vitest.config.mts
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

/**
 * @file vitest.config.mts
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Configuración de Vitest para el entorno de pruebas.
 *              Establece la infraestructura para la ejecución de pruebas unitarias y de
 *              integración, incluyendo el entorno del DOM, archivos de setup global,
 *              y una configuración de cobertura de código de élite.
 */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    exclude: ["node_modules/**", "build/**", ".next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        // Exclusiones de configuración y tipos
        "src/**/types.ts",
        "src/i18n.ts",
        "src/middleware.ts",
        "src/lib/navigation.ts",
        "src/messages/**",
        "src/app/[locale]/layout.tsx",
        "src/app/layout.tsx",
        // Exclusión de aparatos de diagnóstico
        "src/components/diagnostic/**",
      ],
      // Umbrales de calidad de élite
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});

/**
 * MEJORA CONTINUA
 *
 * @version 2.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Medium - SHARDING DE TESTES: Para projetos de grande escala, investigar a implementação de "sharding" para paralelizar a execução de testes em múltiplos workers/máquinas, reduzindo drasticamente o tempo de execução no pipeline de CI/CD.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - CONFIGURAÇÃO DE COBERTURA DE ÉLITE: Implementada uma configuração de `coverage` robusta, especificando `provider`, `reporters` e, crucialmente, regras de `include`/`exclude` para garantir que as métricas reflitam a cobertura real do código da aplicação.
 * ((Implementada)) @version 2.0.0 - UMBRALES DE CALIDAD (THRESHOLDS): Foram estabelecidos umbrales de cobertura de 80% para todas as métricas. Isso transforma o relatório de cobertura em um guardião de qualidade automatizado, falhando o pipeline se a cobertura cair abaixo do padrão de élite.
 * ((Implementada)) @version 1.0.0 - CONFIGURAÇÃO DE BASE: Estrutura inicial com `jsdom`, `globals` e `setupFiles`.
 */
