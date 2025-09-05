// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file GeoIPLocator.tsx
 * @description Aparato de diagnóstico y proveedor de contexto de élite. Su única
 *              responsabilidad es detectar la información de geolocalización
 *              del usuario a través de una API de GeoIP del lado del cliente y
 *              proveer estos datos a cualquier componente de la aplicación
 *              que los necesite (ej. OrderForm) de una manera desacoplada y
 *              eficiente.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 * @see .env.example (para la variable NEXT_PUBLIC_GEOIP_API_URL)
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { clientLogger } from "@/lib/logger";

/**
 * @private
 * @constant GEOIP_API_URL
 * @description La URL del endpoint de la API de GeoIP. Se consume desde
 *              variables de entorno para máxima flexibilidad, con un fallback
 *              público para desarrollo.
 */
const GEOIP_API_URL =
  process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co/json/";

/**
 * @interface GeoIPData
 * @description Define la estructura de los datos de geolocalización que se proveerán.
 */
interface GeoIPData {
  countryCode: string | null;
  countryName: string | null;
}

/**
 * @interface GeoIPContextState
 * @description Define el estado completo del contexto, incluyendo los datos,
 *              el estado de carga y posibles errores.
 */
interface GeoIPContextState {
  geoData: GeoIPData;
  isLoading: boolean;
  error: string | null;
}

const GeoIPContext = createContext<GeoIPContextState | undefined>(undefined);

/**
 * @component GeoIPProvider
 * @description Componente de orden superior que obtiene los datos de GeoIP y los
 *              hace disponibles para sus componentes hijos a través del GeoIPContext.
 * @param {{ children: ReactNode }} props - Propiedades del componente.
 * @returns {React.ReactElement}
 */
export function GeoIPProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeoIPContextState>({
    geoData: { countryCode: null, countryName: null },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGeoIPData = async () => {
      clientLogger.info(
        "[GeoIPLocator] Iniciando obtención de datos de GeoIP."
      );
      try {
        const response = await fetch(GEOIP_API_URL);
        if (!response.ok) {
          throw new Error(`La API respondió con el estado: ${response.status}`);
        }
        const data = await response.json();

        clientLogger.info(
          "[GeoIPLocator] Datos de GeoIP obtenidos con éxito.",
          { country: data.country_name }
        );
        setState({
          geoData: {
            countryCode: data.country_code || null,
            countryName: data.country_name || null,
          },
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Un error desconocido ocurrió";
        clientLogger.error(
          "[GeoIPLocator] Falla al obtener datos de GeoIP.",
          errorMessage
        );
        setState({
          geoData: { countryCode: null, countryName: null },
          isLoading: false,
          error: errorMessage,
        });
      }
    };

    fetchGeoIPData();
  }, []);

  return (
    <GeoIPContext.Provider value={state}>{children}</GeoIPContext.Provider>
  );
}

/**
 * @hook useGeoIP
 * @description Hook personalizado para consumir el GeoIPContext. Proporciona una
 *              API simple y segura para que los componentes accedan a los datos de
 *              geolocalización.
 * @throws {Error} Si se usa fuera de un GeoIPProvider.
 * @returns {GeoIPContextState} El estado actual del contexto de GeoIP.
 */
export const useGeoIP = (): GeoIPContextState => {
  const context = useContext(GeoIPContext);
  if (context === undefined) {
    throw new Error("useGeoIP debe ser usado dentro de un GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
