import { act, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CountdownTimer } from "@/components/ui/CountdownTimer";
import messages from "@/messages/components/ui/OrderForm.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o CountdownTimer.
 *              Valida a renderização inicial, a atualização de tempo e o
 *              comportamento quando o tempo expira, utilizando timers falsos.
 */
describe("UI: CountdownTimer", () => {
  const locale = "it-IT";

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderComponent = (targetDate: Date) => {
    return render(
      <NextIntlClientProvider
        locale={locale}
        messages={{ OrderForm: messages[locale] }}
      >
        <CountdownTimer targetDate={targetDate} />
      </NextIntlClientProvider>
    );
  };

  it("should render the initial time correctly", () => {
    const targetDate = new Date(Date.now() + 1000 * (3600 * 2 + 60 * 5 + 10)); // 2h 5m 10s
    renderComponent(targetDate);

    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("05")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should update the time after one second", () => {
    const targetDate = new Date(Date.now() + 1000 * 5); // 5 seconds
    renderComponent(targetDate);

    expect(screen.getByText("05")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("should display all zeros when the target date is in the past", () => {
    const targetDate = new Date(Date.now() - 10000); // 10 seconds ago
    renderComponent(targetDate);

    const zeros = screen.getAllByText("00");
    expect(zeros.length).toBe(3); // hours, minutes, seconds
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - ARQUITETURA DE TESTES ESTÁVEIS: Utiliza `vi.useFakeTimers()` para controlar o tempo, permitindo testes determinísticos e rápidos para funcionalidades baseadas em `setInterval`, eliminando a instabilidade (`flakiness`).
 * ((Implementada)) @version 1.0.0 - COBERTURA DE CASOS DE BORDA: O arnés valida os três estados críticos do componente: a renderização inicial, a atualização síncrona do tempo e o comportamento quando a contagem regressiva já expirou.
 * ((Implementada)) @version 1.0.0 - MOCK DE I18N: O componente é envolvido no `NextIntlClientProvider`, seguindo o padrão de élite do projeto para testar componentes que dependem do contexto de internacionalização.
 */
