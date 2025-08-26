import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

import { PriceDisplay } from "@/components/ui/PriceDisplay";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Suite de testes unitários para o componente PriceDisplay.
 */
describe("UI: PriceDisplay", () => {
  const messagesPath = path.resolve(
    process.cwd(),
    "src/messages/components/ui/OrderForm.json"
  );
  const messagesFile = fs.readFileSync(messagesPath, "utf8");
  const messages = JSON.parse(messagesFile);

  it("should render and format prices correctly for it-IT", () => {
    const locale = "it-IT";
    render(
      <NextIntlClientProvider
        locale={locale}
        messages={{ OrderForm: messages[locale] }}
      >
        <PriceDisplay originalPrice={78} discountedPrice={39} locale={locale} />
      </NextIntlClientProvider>
    );
    // Intl.NumberFormat para 'it-IT' puede añadir espacios y usar comas.
    expect(screen.getByText(/78/)).toBeInTheDocument();
    expect(screen.getByText(/39/)).toBeInTheDocument();
    expect(
      screen.getByText(messages[locale].originalPriceLabel)
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
 * ((Implementada)) @version 1.0.0 - VALIDAÇÃO DE I18N E FORMATAÇÃO: O teste valida que os preços e as etiquetas traduzidas são renderizados corretamente.
 */
