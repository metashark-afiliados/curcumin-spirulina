// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file GeoIPLocator.tsx
 * @description Aparato de diagnóstico e provedor de contexto resiliente. Valida
 *              a resposta da API de GeoIP contra um schema Zod antes de
 *              fornecer os dados à aplicação.
 * @version 4.2.0
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
import { type ValidationErrorKey } from "@/lib/types/actions";

const GEOIP_API_URL =
  process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co/json/";

/**
 * @interface GeoIPData
 * @description Contrato de dados para a informação de GeoIP limpa e validada.
 */
interface GeoIPData {
  countryCode: string | null;
  countryName: string | null;
}

/**
 * @interface GeoIPContextState
 * @description Contrato de dados para o estado do contexto GeoIP.
 */
interface GeoIPContextState {
  geoData: GeoIPData;
  isLoading: boolean;
  errorKey: ValidationErrorKey | null;
}

const GeoIPContext = createContext<GeoIPContextState | undefined>(undefined);

/**
 * @private
 * @async
 * @function fetchGeoIPData
 * @description Função atómica para obter e validar os dados de GeoIP.
 * @throws {Error} Se a resposta da API não for bem-sucedida ou for inválida.
 * @returns {Promise<GeoIPData>} Os dados de GeoIP limpos.
 */
async function fetchGeoIPData(): Promise<GeoIPData> {
  clientLogger.info("[GeoIPLocator] Iniciando obtenção de dados de GeoIP.");
  const response = await fetch(GEOIP_API_URL);
  if (!response.ok) {
    throw new Error(`API response status: ${response.status}`);
  }
  const data = await response.json();

  const validation = GeoIPResponseSchema.safeParse(data);
  if (!validation.success) {
    throw new Error(`Invalid GeoIP API response: ${validation.error.message}`);
  }

  clientLogger.info(
    "[GeoIPLocator] Dados de GeoIP obtidos e validados com sucesso.",
    { country: validation.data.country_name }
  );

  return {
    countryCode: validation.data.country_code || null,
    countryName: validation.data.country_name || null,
  };
}

/**
 * @component GeoIPProvider
 * @description Provedor de contexto que obtém e disponibiliza os dados de GeoIP.
 * @param {{ children: ReactNode }} props
 * @returns {React.ReactElement}
 */
export function GeoIPProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeoIPContextState>({
    geoData: { countryCode: null, countryName: null },
    isLoading: true,
    errorKey: null,
  });

  useEffect(() => {
    fetchGeoIPData()
      .then((geoData) => {
        setState({ geoData, isLoading: false, errorKey: null });
      })
      .catch((error) => {
        clientLogger.error(
          "[GeoIPLocator] Falha ao obter ou validar dados de GeoIP.",
          { err: error }
        );
        setState({
          geoData: { countryCode: null, countryName: null },
          isLoading: false,
          errorKey: "generic.error_server_generic",
        });
      });
  }, []);

  return (
    <GeoIPContext.Provider value={state}>{children}</GeoIPContext.Provider>
  );
}

/**
 * @hook useGeoIP
 * @description Hook para consumir o contexto de GeoIP.
 * @throws {Error} Se for usado fora de um GeoIPProvider.
 * @returns {GeoIPContextState} O estado atual do contexto GeoIP.
 */
export const useGeoIP = (): GeoIPContextState => {
  const context = useContext(GeoIPContext);
  if (context === undefined) {
    throw new Error("useGeoIP deve ser usado dentro de um GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
