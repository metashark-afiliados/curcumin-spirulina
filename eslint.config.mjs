// eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description Manifiesto de configuración de ESLint ("Flat Config") de élite.
 *              Esta es la Única Fuente de Verdad para las reglas de análisis estático,
 *              calidad de código y formato en todo el proyecto.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
import { FlatCompat } from "@eslint/eslintrc";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // 1. Archivos y directorios a ignorar globalmente.
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },

  // 2. Configuración base de Next.js.
  ...compat.extends("next/core-web-vitals"),

  // 3. Reglas de Accesibilidad (a11y).
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: jsxA11y.configs.recommended.rules,
  },

  // 4. Reglas de ordenamiento de importaciones.
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // 5. Configuración específica para archivos TypeScript.
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...typescriptPlugin.configs["eslint-recommended"].rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // 6. Configuración específica para el entorno de pruebas Vitest.
  {
    files: ["**/tests/**/*.{ts,tsx}"],
    plugins: { vitest: vitestPlugin },
    rules: vitestPlugin.configs.recommended.rules,
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
  },

  // 7. Definición de globales (browser, node).
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // 8. Integración con Prettier (debe ser la última).
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
// eslint.config.mjs