// tests/setup.ts
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { expect, vi } from "vitest";

import type * as orderActions from "@/app/actions/order.actions";

// Extiende el `expect` de Vitest con los matchers de jest-axe
expect.extend(toHaveNoViolations);

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.3.0
 * @description Global setup file for the Vitest testing environment.
 *              Extiende el `expect` de Vitest para incluir matchers de
 *              `@testing-library/jest-dom` y `jest-axe`, y establece mocks
 *              globales para APIs de React no disponibles en JSDOM.
 */

// --- Mock Global de Hooks de Servidor ---
vi.mock("react-dom", async (importOriginal) => {
  // CORRECCIÓN: Importar el módulo original para no destruir su funcionalidad interna.
  const mod = await vi.importActual<typeof import("react-dom")>("react-dom");
  return {
    ...mod,
    useFormState: (
      action: unknown,
      initialState: orderActions.FormState
    ): [orderActions.FormState, (formData: FormData) => void] => [
      initialState,
      (formData: FormData) => {
        // Implementación mock que no hace nada.
      },
    ],
    useFormStatus: () => ({
      pending: false,
      data: null,
      method: null,
      action: null,
    }),
  };
});
// --- Fin del Mock Global ---

/**
 * MEJORA CONTINUA
 *
 * @version 1.3.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.3.0 - MOCK QUIRÚRGICO NO DESTRUCTIVO: O mock de `react-dom` foi refatorizado para usar `vi.importActual`. Esta abordagem preserva a funcionalidade interna do módulo original e sobreescreve apenas os hooks específicos (`useFormState`, `useFormStatus`). Isso resolve a advertência crítica `The current testing environment is not configured to support act(...)` e restaura a integridade do ambiente de testes.
 * ((Implementada)) @version 1.2.0 - MOCK GLOBAL DE `react-dom`.
 * ((Implementada)) @version 1.1.0 - INTEGRAÇÃO DE `jest-axe`.
 * ((Implementada)) @version 1.0.0 - JEST-DOM INTEGRATION.
 */
