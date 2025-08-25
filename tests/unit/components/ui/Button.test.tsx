// tests/unit/components/ui/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente Button.
 *              Valida a renderização correta, aplicação de variantes,
 *              comportamento de eventos e acessibilidade.
 */
describe("UI: Button", () => {
  it("should render children correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply the primary variant and default size classes by default", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveClass("bg-brand-primary text-on_brand h-10 px-4 py-2");
  });

  it("should apply the destructive variant classes when variant is destructive", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-feedback-error");
  });

  it("should apply the large size classes when size is lg", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-11 rounded-md px-8");
  });

  it("should call onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole("button", { name: /clickable/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should render as a child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    );
    // O role não é 'button', mas 'link', pois o elemento subjacente é 'a'
    const linkButton = screen.getByRole("link", { name: /link button/i });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton.tagName).toBe("A");
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
 * ((Vigente)) @priority Medium - ACCESSIBILITY (AXE) TESTS: Integrar `jest-axe` para realizar testes de acessibilidade automatizados, garantindo que o componente não tenha violações de WCAG.
 * ((Vigente)) @priority Low - SNAPSHOT TESTING: Adicionar testes de snapshot para capturar a estrutura do DOM e detectar regressões visuais não intencionais durante refatorações.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - VARIANT COVERAGE: Os testes cobrem a lógica de variantes (default, destructive) e tamanhos (default, lg), garantindo que o CVA está funcionando como esperado.
 * ((Implementada)) @version 1.0.0 - EVENT HANDLER VALIDATION: Validação explícita do manipulador `onClick` e da sua inibição quando o botão está desabilitado, garantindo a correção do comportamento interativo.
 * ((Implementada)) @version 1.0.0 - `asChild` PROP TEST: Teste específico para a funcionalidade `asChild`, confirmando que o componente pode ser renderizado como um elemento diferente, o que é crucial para sua flexibilidade.
 *
 */
