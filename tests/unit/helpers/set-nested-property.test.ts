// tests/unit/helpers/set-nested-property.test.ts
/**
 * @file set-nested-property.test.ts
 * @description Suíte de testes de unidade de elite para a função `setNestedProperty`.
 *              Blinda a função contra regressões, validando todos os casos de uso
 *              críticos e casos extremos para garantir a integridade da arquitetura
 *              de internacionalização IMAS.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { describe, expect, it } from "vitest";
import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";

describe("Helper: setNestedProperty", () => {
  it("deve definir uma propriedade em um caminho simples", () => {
    const obj = {};
    setNestedProperty(obj, "a", 1);
    expect(obj).toEqual({ a: 1 });
  });

  it("deve definir uma propriedade em um caminho aninhado, criando objetos intermediários", () => {
    const obj = {};
    setNestedProperty(obj, "a.b.c", "value");
    expect(obj).toEqual({ a: { b: { c: "value" } } });
  });

  it("não deve sobrescrever objetos intermediários existentes que são objetos", () => {
    const obj = { a: { existing: true } };
    setNestedProperty(obj, "a.b", "newValue");
    expect(obj).toEqual({ a: { existing: true, b: "newValue" } });
  });

  it("deve sobrescrever um valor final existente, independentemente do tipo", () => {
    const obj = { a: { b: 1 } };
    setNestedProperty(obj, "a.b", { nestedValue: true });
    expect(obj).toEqual({ a: { b: { nestedValue: true } } });
  });

  it("deve lidar com caminhos que sobrescrevem primitivos com objetos", () => {
    const obj = { a: 1 };
    setNestedProperty(obj, "a.b", "value");
    // @ts-ignore - O tipo de 'a' é alterado de number para object, o que é esperado.
    expect(obj).toEqual({ a: { b: "value" } });
  });

  it("deve retornar a referência do objeto original modificado", () => {
    const obj = {};
    const result = setNestedProperty(obj, "a", 1);
    expect(result).toBe(obj); // Verifica a igualdade de referência.
  });

  it("deve lidar corretamente com caminhos onde um objeto intermediário é null", () => {
    const obj = { a: null };
    setNestedProperty(obj, "a.b", "value");
    // @ts-ignore - O tipo de 'a' é alterado de null para object, o que é esperado.
    expect(obj).toEqual({ a: { b: "value" } });
  });
});
// tests/unit/helpers/set-nested-property.test.ts
