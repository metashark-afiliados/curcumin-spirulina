// tests/setup.ts
/**
 * @file setup.ts
 * @description Archivo de configuración global para el ambiente de pruebas Vitest.
 *              Su única responsabilidad es extender el `expect` con matchers
 *              adicionales de `@testing-library/jest-dom` para aserciones de UI
 *              y de `jest-axe` para pruebas de accesibilidad.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { expect } from "vitest";

// Extiende el `expect` de Vitest con todos los matchers disponibles.
expect.extend(toHaveNoViolations);
// tests/setup.ts
