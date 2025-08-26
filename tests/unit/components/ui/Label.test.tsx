// tests/unit/components/ui/Label.test.tsx
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente Label.
 *              Valida a renderização e, criticamente, a sua associação
 *              acessível com um componente Input.
 */
describe("UI: Label", () => {
  it("should render the label text correctly", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should be correctly associated with an input for accessibility", () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </div>
    );
    // `getByLabelText` encontrará el input a través de su label asociado.
    // Si esta aserción pasa, la asociación `htmlFor` -> `id` es correcta.
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Medium - TESTES DE VARIANTES: Quando novas variantes de estilo forem adicionadas ao `labelVariants` (CVA), adicionar testes para validar que as classes corretas são aplicadas.
 *
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE ACESSIBILIDADE (AXE): O arnés de testes inclui uma verificação com `jest-axe`, garantindo que a implementação do componente cumpre com os padrões de acessibilidade WCAG.
 * ((Implementada)) @version 1.0.0 - TESTE DE ASSOCIAÇÃO FUNCIONAL: A prova de que `getByLabelText` funciona valida que o propósito principal do componente `Label` (acessibilidade) foi alcançado com sucesso.
 */
