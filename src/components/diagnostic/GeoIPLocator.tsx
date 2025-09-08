// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file src/components/diagnostic/GeoIPLocator.tsx
 * @description Aparato de diagnóstico y proveedor de contexto resiliente.
 *              Nivelado a la arquitectura de logging de ConvertiKit,
 *              consumiendo el logger unificado con su firma nativa.
 * @version 6.0.0
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
import { clientLogger } from "@/lib/client-logger"; // <-- IMPORTACIÓN CORREGIDA
import { GeoIPResponseSchema } from "@/lib/validators/GeoIP.schema";
import { type ValidationErrorKey } from "@/lib/types/actions";

const GEOIP_API_URL =
  process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co/json/";

interface GeoIPData {
  countryCode: string | null;
  countryName: string | null;
}

interface GeoIPContextState {
  geoData: GeoIPData;
  isLoading: boolean;
  errorKey: ValidationErrorKey | null;
}

const GeoIPContext = createContext<GeoIPContextState | undefined>(undefined);

async function fetchGeoIPData(): Promise<GeoIPData> {
  clientLogger.info(
    "[GeoIPLocator]",
    "Iniciando obtención de datos de GeoIP.",
    { apiUrl: GEOIP_API_URL }
  );

  const response = await fetch(GEOIP_API_URL);
  if (!response.ok) {
    clientLogger.error(
      "[GeoIPLocator]",
      `Fallo en la respuesta de la API de GeoIP.`,
      { status: response.status, statusText: response.statusText }
    );
    throw new Error(`API response status: ${response.status}`);
  }
  const data = await response.json();

  const validation = GeoIPResponseSchema.safeParse(data);
  if (!validation.success) {
    clientLogger.error("[GeoIPLocator]", "Respuesta de API GeoIP inválida.", {
      error: validation.error.flatten(),
      rawData: data,
    });
    throw new Error(`Invalid GeoIP API response: ${validation.error.message}`);
  }

  clientLogger.info(
    "[GeoIPLocator]",
    "Datos de GeoIP obtenidos y validados con éxito.",
    { country: validation.data.country_name }
  );

  return {
    countryCode: validation.data.country_code || null,
    countryName: validation.data.country_name || null,
  };
}

export function GeoIPProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [state, setState] = useState<GeoIPContextState>({
    geoData: { countryCode: null, countryName: null },
    isLoading: true,
    errorKey: null,
  });

  useEffect(() => {
    fetchGeoIPData()
      .then((geoData) => {
        setState({ geoData, isLoading: false, errorKey: null });
        clientLogger.trace(
          "[GeoIPProvider]",
          "Estado de GeoIP actualizado con datos exitosos.",
          {
            status: "success",
            countryCode: geoData.countryCode,
          }
        );
      })
      .catch((error) => {
        clientLogger.error(
          "[GeoIPProvider]",
          "Fallo al obtener/validar datos de GeoIP. Usando estado de fallback.",
          { error: error.message }
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

export const useGeoIP = (): GeoIPContextState => {
  const context = useContext(GeoIPContext);
  if (context === undefined) {
    clientLogger.error(
      "[useGeoIP]",
      "Hook `useGeoIP` utilizado fuera de `GeoIPProvider`. Esto es un error de desarrollo.",
      { error: "Context not provided" }
    );
    throw new Error("useGeoIP debe ser usado dentro de un GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
