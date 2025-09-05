// tests/unit/lib/utils.test.ts
/**
 * @file utils.test.ts
 * @description Suíte de testes de unidade de elite para o módulo de utilidades.
 *              Blinda a função `cn`, garantindo sua robustez e previsibilidade.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("Lib: cn utility", () => {
  it("deve mesclar nomes de classes simples", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("deve lidar corretamente com classes condicionais", () => {
    expect(cn("base", { "is-active": true, "has-error": false })).toBe(
      "base is-active"
    );
  });

  it("deve resolver classes conflitantes do Tailwind, a última vence", () => {
    expect(cn("p-2 m-4", "p-4")).toBe("m-4 p-4");
  });

  it("deve lidar com uma mistura de todos os tipos de entradas", () => {
    expect(
      cn("p-2", { "font-bold": true }, ["m-4", null], "p-4 text-center")
    ).toBe("font-bold m-4 p-4 text-center");
  });

  it("deve retornar uma string vazia para entradas nulas ou indefinidas", () => {
    expect(cn(null, undefined, false, "")).toBe("");
  });
});
// tests/unit/lib/utils.test.ts
