// tests/integration/components/ui/OrderForm.test.tsx
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import * as orderActions from "@/app/actions/order.actions";
import { OrderForm } from "@/components/ui/OrderForm";
import messages from "@/messages/components/ui/OrderForm.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.2.0
 * @description Suite de testes de integração para o OrderForm.
 */

// El mock de `react-dom` fue movido a `tests/setup.ts` para aplicación global.

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/app/actions/order.actions", async (importOriginal) => {
  const mod = await importOriginal<typeof orderActions>();
  return {
    ...mod,
    submitOrder: vi.fn(
      async (
        prevState: any,
        formData: FormData
      ): Promise<orderActions.FormState> => {
        if (formData.get("name") === "Error Case") {
          return { success: false, message: "submitError" };
        }
        return { success: true, message: "submitSuccess" };
      }
    ),
  };
});
const mockedSubmitOrder = vi.mocked(orderActions.submitOrder);

describe("Integration: OrderForm", () => {
  const locale = "it-IT";

  const renderComponent = () => {
    const providerMessages = { OrderForm: messages[locale] };
    return render(
      <NextIntlClientProvider locale={locale} messages={providerMessages}>
        <OrderForm />
      </NextIntlClientProvider>
    );
  };

  it("should display client-side validation errors and not call action", async () => {
    const user = userEvent.setup();
    renderComponent();

    const ctaButton = screen.getByRole("button", {
      name: messages[locale].ctaButton,
    });
    await act(async () => {
      await user.click(ctaButton);
    });

    expect(
      await screen.findByText("Il nome è obbligatorio")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Il numero di telefono non è valido")
    ).toBeInTheDocument();
    expect(mockedSubmitOrder).not.toHaveBeenCalled();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 2.2.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.2.0 - ARQUITETURA DE MOCK CENTRALIZADA: O mock local de `react-dom` foi removido. O arnés de testes agora depende da configuração global provida em `tests/setup.ts`, aderindo aos princípios DRY e de centralização da configuração.
 * ((Implementada)) @version 2.1.0 - CORREÇÃO DE NAMESPACE I18N.
 * ((Implementada)) @version 2.0.0 - SINCRONIZAÇÃO ASSÍNCRONA DE ÉLITE.
 * ((Implementada)) @version 2.0.0 - MOCK ROBUSTO DE SERVER ACTION.
 */
