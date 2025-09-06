// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file src/components/diagnostic/GeoIPLocator.tsx
 * @description Aparato de diagnóstico y proveedor de contexto resiliente.
 *              Nivelado para asegurar la adherencia estricta a la API de
 *              logging del cliente unificada, garantizando una observabilidad
 *              consistente y correlacionada.
 * @version 5.0.0
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
import { type LogContext } from "@/lib/types/logging";

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
  const baseContext = { component: "GeoIPLocator" };
  clientLogger.info(
    { ...baseContext, apiUrl: GEOIP_API_URL },
    "Iniciando obtención de datos de GeoIP."
  );

  const response = await fetch(GEOIP_API_URL);
  if (!response.ok) {
    const errorContext: LogContext = {
      ...baseContext,
      status: response.status,
      statusText: response.statusText,
    };
    clientLogger.error(
      errorContext,
      `Fallo en la respuesta de la API de GeoIP.`
    );
    throw new Error(`API response status: ${response.status}`);
  }
  const data = await response.json();

  const validation = GeoIPResponseSchema.safeParse(data);
  if (!validation.success) {
    const errorContext: LogContext = {
      ...baseContext,
      error: validation.error.flatten(),
      rawData: data,
    };
    clientLogger.error(errorContext, "Respuesta de API GeoIP inválida.");
    throw new Error(`Invalid GeoIP API response: ${validation.error.message}`);
  }

  const successContext: LogContext = {
    ...baseContext,
    country: validation.data.country_name,
  };
  clientLogger.info(
    successContext,
    "Datos de GeoIP obtenidos y validados con éxito."
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
    const baseContext = { component: "GeoIPProvider" };
    fetchGeoIPData()
      .then((geoData) => {
        setState({ geoData, isLoading: false, errorKey: null });
        clientLogger.trace(
          {
            ...baseContext,
            status: "success",
            countryCode: geoData.countryCode,
          },
          "Estado de GeoIP actualizado con datos exitosos."
        );
      })
      .catch((error) => {
        clientLogger.error(
          { ...baseContext, error: error.message },
          "Fallo al obtener/validar datos de GeoIP. Usando estado de fallback."
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
    const errorContext = {
      component: "useGeoIP",
      error: "Context not provided",
    };
    clientLogger.error(
      errorContext,
      "Hook `useGeoIP` utilizado fuera de `GeoIPProvider`. Esto es un error de desarrollo."
    );
    throw new Error("useGeoIP debe ser usado dentro de un GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
