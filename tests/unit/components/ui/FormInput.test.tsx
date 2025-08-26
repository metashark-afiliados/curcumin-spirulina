import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { User } from "lucide-react";
import { describe, expect, it } from "vitest";
import { FormInput } from "@/components/ui/FormInput";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente FormInput.
 *              Valida a renderização, acessibilidade e interação do usuário.
 */
describe("UI: FormInput", () => {
  const defaultProps = {
    id: "name",
    label: "Full Name",
    placeholder: "John Doe",
  };

  it("should render an input associated with a label for accessibility", () => {
    render(<FormInput {...defaultProps} />);
    // getByLabelText valida que el <input> con id="name" está
    // correctamente vinculado a la <label> con htmlFor="name".
    const input = screen.getByLabelText("Full Name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "John Doe");
  });

  it("should render an icon when provided", () => {
    // jest-axe necesita que el SVG tenga un título o aria-label si no es decorativo.
    // Lucide-react no los añade por defecto. Para el test, lo envolvemos.
    const { container } = render(<FormInput {...defaultProps} icon={User} />);
    // Buscamos el SVG por su estructura, ya que no tiene un rol accesible.
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass("lucide-user");
  });

  it("should allow user to type text", async () => {
    const user = userEvent.setup();
    render(<FormInput {...defaultProps} />);
    const input = screen.getByLabelText<HTMLInputElement>("Full Name");
    await user.type(input, "test input");
    expect(input.value).toBe("test input");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<FormInput {...defaultProps} icon={User} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE ACESSIBILIDADE CRÍTICA: O teste principal utiliza `getByLabelText` para garantir que a associação entre a `Label` (mesmo sendo `sr-only`) e o `Input` seja funcional, o que é o pilar da acessibilidade em formulários.
 * ((Implementada)) @version 1.0.0 - BLINDAGEM COM `jest-axe`: Garante que a composição do componente molecular não introduz violações de WCAG.
 * ((Implementada)) @version 1.0.0 - TESTE DE INTERAÇÃO DO USUÁRIO: Simula a digitação do usuário para validar que o componente se comporta como um campo de entrada padrão.
 */
