// tests/unit/components/diagnostic/GeoIPLocator.test.tsx
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GeoIPLocator } from "@/components/diagnostic/GeoIPLocator";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Suite de testes unitários para o aparato de diagnóstico GeoIPLocator.
 */
describe("Diagnostic: GeoIPLocator", () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should display loading state initially", () => {
    render(<GeoIPLocator />);
    expect(screen.getByText(/Cargando datos de GeoIP/i)).toBeInTheDocument();
  });

  it("should display data after a successful fetch", async () => {
    const mockData = {
      query: "127.0.0.1",
      country: "Testland",
      countryCode: "TS",
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<GeoIPLocator />);

    // REFACTORIZACIÓN: Usar `findBy*` es la forma canónica y más robusta
    // para esperar a que aparezcan elementos asíncronamente.
    expect(await screen.findByText("127.0.0.1")).toBeInTheDocument();
    expect(screen.getByText("Testland")).toBeInTheDocument();
    expect(screen.getByText("TS")).toBeInTheDocument();
  });

  it("should display an error message if fetch fails", async () => {
    mockFetch.mockRejectedValue(new Error("Network Error"));

    render(<GeoIPLocator />);

    // REFACTORIZACIÓN: Usar `findBy*` para esperar el mensaje de error.
    expect(
      await screen.findByText(/Error: Network Error/i)
    ).toBeInTheDocument();
  });
});

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - SINCRONIZAÇÃO ASSÍNCRONA DE ÉLITE: O arnés de testes foi refatorizado para usar as queries `findBy*` da React Testing Library. Esta é a abordagem canônica para testar a aparição de elementos assíncronos, pois encapsula a lógica de `waitFor` de forma mais limpa e robusta, eliminando as advertências de `act()` e garantindo a estabilidade do teste.
 * ((Implementada)) @version 1.0.0 - ARQUITETURA DE MOCK DE API GLOBAL.
 * ((Implementada)) @version 1.0.0 - COBERTURA DE ESTADOS COMPLETA.
 */
