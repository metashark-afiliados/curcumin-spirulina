// tests/unit/lib/utils.test.ts
import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para a função de utilidade `cn`.
 *              Valida a correta fusão de classes, resolução de conflitos do Tailwind
 *              e aplicação de classes condicionais.
 */
describe("Lib: cn utility", () => {
  it("should merge simple class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes correctly using objects", () => {
    const isActive = true;
    const hasError = false;
    expect(cn("base", { "is-active": isActive, "has-error": hasError })).toBe(
      "base is-active"
    );
  });

  it("should handle conditional classes in arrays", () => {
    const classes = ["class1", false, "class3", null, undefined, "class4"];
    expect(cn(classes)).toBe("class1 class3 class4");
  });

  it("should resolve conflicting tailwind classes, last one wins", () => {
    expect(cn("p-2 m-4", "p-4")).toBe("m-4 p-4");
  });

  it("should handle complex responsive and state prefixes", () => {
    expect(cn("sm:p-2 md:p-3", "sm:p-4")).toBe("md:p-3 sm:p-4");
  });

  it("should correctly merge classes with different variants", () => {
    expect(cn("bg-red-500 text-lg", "bg-blue-500")).toBe("text-lg bg-blue-500");
  });

  it("should return an empty string for falsy inputs", () => {
    expect(cn(null, undefined, false, "")).toBe("");
  });

  it("should handle a mix of all types of inputs", () => {
    const isActive = true;
    expect(
      cn("p-2", { "font-bold": isActive }, ["m-4", null], "p-4 text-center")
    ).toBe("font-bold m-4 p-4 text-center");
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - BENCHMARK TESTS: Adicionar testes de benchmark para medir a performance da função `cn` com um número muito grande de classes, garantindo que não haja regressões de performance em futuras atualizações das bibliotecas subjacentes (`clsx`, `tailwind-merge`).
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - CORE FUNCTIONALITY COVERAGE: Os testes cobrem os casos de uso principais: fusão simples, classes condicionais e resolução de conflitos.
 * ((Implementada)) @version 1.0.0 - TAILWIND CONFLICT SCENARIOS: Testes específicos para validar a lógica de resolução de conflitos do `tailwind-merge`, que é a principal responsabilidade desta função de utilidade.
 * ((Implementada)) @version 1.0.0 - EDGE CASES: Validação de casos extremos, como entradas `falsy`, para garantir a robustez da função.
 *
 */
