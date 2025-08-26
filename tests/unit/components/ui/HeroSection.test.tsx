// tests/unit/components/ui/HeroSection.test.tsx
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { HeroSection } from "@/components/ui/HeroSection";
import heroMessages from "@/messages/components/ui/HeroSection.json";
import orderFormMessages from "@/messages/components/ui/OrderForm.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 2.1.0
 * @description Suite de testes de integração para o componente HeroSection.
 *              Valida a renderização correta de seu conteúdo e o ensamblaje
 *              de seus componentes filhos, como o OrderForm.
 */

// Mockear el CountdownTimer para evitar problemas con timers en este test de integración
vi.mock("@/components/ui/CountdownTimer", () => ({
  CountdownTimer: () => <div>Countdown Mock</div>,
}));

describe("Integration: HeroSection", () => {
  const locale = "it-IT";
  // CORRECCIÓN: Construir un objeto de mensajes completo que satisfaga a
  // HeroSection y a su hijo OrderForm.
  const providerMessages = {
    HeroSection: heroMessages[locale],
    OrderForm: orderFormMessages[locale],
  };

  it("should render its title, subtitle, and assemble the OrderForm", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={providerMessages}>
        <HeroSection />
      </NextIntlClientProvider>
    );

    // 1. Validar contenido propio de HeroSection
    expect(
      screen.getByRole("heading", {
        name: heroMessages[locale].title,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(heroMessages[locale].subtitle)).toBeInTheDocument();

    // 2. Validar ensamblaje de OrderForm
    expect(
      screen.getByRole("button", { name: orderFormMessages[locale].ctaButton })
    ).toBeInTheDocument();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 2.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 2.1.0 - PROVEDOR DE I18N COMPLETO: O teste foi refatorizado para fornecer um objeto de mensagens completo ao `NextIntlClientProvider`, incluindo as traduções para todos os componentes filhos (`OrderForm`). Isto simula o ambiente real da aplicação, resolve o erro de contexto `MISSING_MESSAGE` no componente filho e garante a correta renderização da árvore de componentes.
 * ((Implementada)) @version 2.1.0 - VALIDAÇÃO DE INTEGRIDADE DE DADOS: Adicionada uma asserção para validar a renderização do `subtitle`, garantindo que a correção de dados no arquivo JSON seja refletida no teste.
 * ((Implementada)) @version 2.0.0 - MOCK DE DEPENDÊNCIA ANINHADA.
 */
