// tests/unit/components/ui/HeroSection.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import { HeroSection } from "@/components/ui/HeroSection";
import messages from "@/messages/components/ui/HeroSection.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Suite de testes unitários para o componente HeroSection.
 *              Valida a renderização correta do conteúdo internacionalizado.
 */
describe("UI: HeroSection", () => {
  const locale = "it-IT";
  const namespace = "HeroSection";

  // O objeto de mensagens para o provedor simula como `getMessages` o forneceria.
  const providerMessages = {
    [namespace]: messages[locale],
  };

  it("should render the title from the italian messages", () => {
    render(
      <NextIntlClientProvider locale={locale} messages={providerMessages}>
        <HeroSection />
      </NextIntlClientProvider>
    );

    // --- INICIO DE CORRECCIÓN DE ACCESO A DATOS ---
    // Acessamos a chave diretamente, pois o `useTranslations('HeroSection')`
    // já selecionou o namespace correto.
    const expectedTitle = messages[locale].title;
    // --- FIN DE CORRECCIÓN DE ACCESO A DATOS ---

    const titleElement = screen.getByRole("heading", {
      name: expectedTitle,
      level: 1,
    });
    expect(titleElement).toBeInTheDocument();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - SIMULAÇÃO DE I18N DE ALTA FIDELIDADE: O teste foi refatorizado para simular com precisão como o `NextIntlClientProvider` recebe um objeto de mensagens já com namespace, resolvendo o erro de tipo `TS2339`.
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE I18N: O teste valida que o componente consome o contexto e renderiza o conteúdo do arquivo de mensagens atômico.
 */
