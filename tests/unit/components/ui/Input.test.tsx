// tests/unit/components/ui/Input.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "@/components/ui/Input";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente Input.
 *              Valida a renderização correta, interações do usuário e acessibilidade.
 */
describe("UI: Input", () => {
  it("should render an input element with the correct type and placeholder", () => {
    render(<Input type="email" placeholder="test@example.com" />);
    const input = screen.getByPlaceholderText("test@example.com");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });

  it("should call onChange handler when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} data-testid="input" />);
    const input = screen.getByTestId("input");
    await user.type(input, "hello world");
    expect(handleChange).toHaveBeenCalledTimes(11); // una vez por cada caracter
  });
});
