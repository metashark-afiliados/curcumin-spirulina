// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file GeoIPLocator.tsx
 * @description Aparato de diagnóstico e provedor de contexto resiliente. Valida
 *              a resposta da API de GeoIP contra um schema Zod antes de
 *              fornecer os dados à aplicação.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { clientLogger } from "@/lib/client-logger";
import { GeoIPResponseSchema } from "@/lib/validators/GeoIP.schema";

const GEOIP_API_URL =
  process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co/json/";

interface GeoIPData {
  countryCode: string | null;
  countryName: string | null;
}

interface GeoIPContextState {
  geoData: GeoIPData;
  isLoading: boolean;
  error: string | null;
}

const GeoIPContext = createContext<GeoIPContextState | undefined>(undefined);

async function fetchGeoIPData(): Promise<GeoIPData> {
  clientLogger.info("[GeoIPLocator] Iniciando obtenção de dados de GeoIP.");
  const response = await fetch(GEOIP_API_URL);
  if (!response.ok) {
    throw new Error(`A API respondeu com o estado: ${response.status}`);
  }
  const data = await response.json();

  const validation = GeoIPResponseSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(
      `Resposta de API de GeoIP inválida: ${validation.error.message}`
    );
  }

  clientLogger.info(
    "[GeoIPLocator] Dados de GeoIP obtidos e validados com sucesso.",
    {
      country: validation.data.country_name,
    }
  );

  return {
    countryCode: validation.data.country_code || null,
    countryName: validation.data.country_name || null,
  };
}

export function GeoIPProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeoIPContextState>({
    geoData: { countryCode: null, countryName: null },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchGeoIPData()
      .then((geoData) => {
        setState({ geoData, isLoading: false, error: null });
      })
      .catch((error) => {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Un error desconocido ocurrió";
        clientLogger.error(
          "[GeoIPLocator] Falla ao obter ou validar dados de GeoIP.",
          { errorMessage }
        );
        setState({
          geoData: { countryCode: null, countryName: null },
          isLoading: false,
          error: errorMessage,
        });
      });
  }, []);

  return (
    <GeoIPContext.Provider value={state}>{children}</GeoIPContext.Provider>
  );
}

export const useGeoIP = (): GeoIPContextState => {
  const context = useContext(GeoIPContext);
  if (context === undefined) {
    throw new Error("useGeoIP deve ser usado dentro de um GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
