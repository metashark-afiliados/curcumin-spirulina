import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { FooterSection } from "@/components/ui/FooterSection";
import messages from "@/messages/components/ui/FooterSection.json";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente FooterSection.
 */
describe("UI: FooterSection", () => {
  const locale = "it-IT";

  it("should render the disclaimer and copyright notice with the current year", () => {
    const currentYear = new Date().getFullYear();
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={{ FooterSection: messages[locale] }}
      >
        <FooterSection />
      </NextIntlClientProvider>
    );

    // Validar el disclaimer
    expect(screen.getByText(messages[locale].disclaimer)).toBeInTheDocument();

    // Validar el copyright con el año dinámico
    const copyrightText = `© ${currentYear} ${messages[locale].copyright}`;
    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });
});
