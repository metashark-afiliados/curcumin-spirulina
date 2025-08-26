
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { BenefitsSection } from "@/components/ui/BenefitsSection";
import messages from "@/messages/components/ui/BenefitsSection.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente molecular BenefitsSection.
 */
describe("UI: BenefitsSection", () => {
  const locale = "it-IT";

  it("should render all six benefit pills with internationalized text", () => {
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={{ BenefitsSection: messages[locale] }}
      >
        <BenefitsSection />
      </NextIntlClientProvider>
    );

    // Validar que se renderizan los 6 beneficios
    const allPills = screen.getAllByRole("heading", { level: 3 });
    expect(allPills).toHaveLength(6);

    // Validar el contenido del primer y último beneficio para confirmar la data
    expect(screen.getByText(messages[locale].pill1.title)).toBeInTheDocument();
    expect(
      screen.getByText(messages[locale].pill6.subtitle)
    ).toBeInTheDocument();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - BLINDAGEM DE COMPONENTE MOLECULAR: O teste garante que a seção `BenefitsSection` ensambla corretamente todos os seus componentes atômicos filhos (`BenefitPill`).
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE INTEGRAÇÃO COM I18N: O teste confirma que o componente consome e renderiza corretamente o conteúdo do arquivo de mensagens, validando a internacionalização.
 */