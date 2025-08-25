// tests/unit/helpers/set-nested-property.test.ts
import { describe, expect, it } from "vitest";
import { setNestedProperty } from "@/lib/helpers/set-nested-property.helper";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para a função de utilidade `setNestedProperty`.
 *              Valida a correta atribuição de valores em objetos aninhados,
 *              incluindo a criação de caminhos e a sobrescrita de valores.
 */
describe("Helper: setNestedProperty", () => {
  it("should set a property on a simple path", () => {
    const obj = {};
    setNestedProperty(obj, "a", 1);
    expect(obj).toEqual({ a: 1 });
  });

  it("should set a property on a nested path, creating intermediate objects", () => {
    const obj = {};
    setNestedProperty(obj, "a.b.c", "value");
    expect(obj).toEqual({ a: { b: { c: "value" } } });
  });

  it("should not overwrite existing intermediate objects", () => {
    const obj = { a: { existing: true } };
    setNestedProperty(obj, "a.b", "newValue");
    expect(obj).toEqual({ a: { existing: true, b: "newValue" } });
  });

  it("should overwrite an existing final value", () => {
    const obj = { a: { b: 1 } };
    setNestedProperty(obj, "a.b", 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it("should handle paths that contain primitives", () => {
    const obj = { a: 1 };
    setNestedProperty(obj, "a.b", "value");
    expect(obj).toEqual({ a: { b: "value" } });
  });

  it("should return the modified object reference", () => {
    const obj = {};
    const result = setNestedProperty(obj, "a", 1);
    expect(result).toBe(obj); // Check for reference equality
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
 * ((Vigente)) @priority Low - BENCHMARK TESTS: Adicionar testes de benchmark para medir a performance da função com objetos e caminhos muito profundos.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - COBERTURA DE CASOS CRÍTICOS: Os testes validam os cenários chave: criação de caminho, aninhamento, sobrescrita de valores e manejo de primitivos no caminho.
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE INFRAESTRUTURA: Este arnés de testes blinda uma peça crítica da infraestrutura de i18n, garantindo sua robustez.
 *
 */
