import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Apple } from "lucide-react";
import { describe, expect, it } from "vitest";

import { BenefitPill } from "@/components/ui/BenefitPill";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.0.0
 * @description Suite de testes unitários para o componente atômico BenefitPill.
 */
describe("UI: BenefitPill", () => {
  const defaultProps = {
    icon: Apple,
    title: "Test Title",
    subtitle: "Test Subtitle",
  };

  it("should render the text content correctly", () => {
    render(<BenefitPill {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("should render the icon component", () => {
    const { container } = render(<BenefitPill {...defaultProps} />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("lucide-apple");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<BenefitPill {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 2.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.0.0 - CORREÇÃO CRÍTICA DE RENDERIZAÇÃO: O arnés de testes foi corrigido para passar um componente de ícone (`Apple` de `lucide-react`) como a prop `icon`, resolvendo o erro fatal `Element type is invalid` e restaurando a funcionalidade do teste.
 * ((Implementada)) @version 2.0.0 - VALIDAÇÃO DE RENDERIZAÇÃO DE ÍCONE: Adicionado um teste explícito para garantir que o SVG do ícone é renderizado corretamente no DOM.
 */