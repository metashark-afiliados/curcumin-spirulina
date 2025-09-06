// src/components/diagnostic/GeoIPLocator.tsx
/**
 * @file src/components/diagnostic/GeoIPLocator.tsx
 * @description Aparato de diagnóstico y proveedor de contexto resiliente.
 *              Detecta la información de geolocalización del usuario a través
 *              de una API de GeoIP y la provee a cualquier componente que la necesite.
 *              Valida la respuesta de la API de GeoIP contra un schema Zod antes
 *              de proporcionar los datos. Se adhiere a la API de logging del cliente
 *              unificada para una observabilidad completa de la detección geográfica.
 * @version 4.3.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 * @see src/lib/validators/GeoIP.schema.ts (SSoT para la validación de la respuesta GeoIP)
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { GeoIPResponseSchema } from "@/lib/validators/GeoIP.schema";
import { type ValidationErrorKey } from "@/lib/types/actions";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

const GEOIP_API_URL =
  process.env.NEXT_PUBLIC_GEOIP_API_URL || "https://ipapi.co/json/";

/**
 * @interface GeoIPData
 * @description Contrato de datos para la información de GeoIP limpia y validada.
 */
interface GeoIPData {
  countryCode: string | null;
  countryName: string | null;
}

/**
 * @interface GeoIPContextState
 * @description Contrato de datos para el estado del contexto GeoIP,
 *              incluyendo los datos geográficos, el estado de carga
 *              y posibles claves de error.
 */
interface GeoIPContextState {
  geoData: GeoIPData;
  isLoading: boolean;
  errorKey: ValidationErrorKey | null;
}

/**
 * @private
 * @constant GeoIPContext
 * @description Contexto de React que almacena y provee el estado de GeoIP.
 */
const GeoIPContext = createContext<GeoIPContextState | undefined>(undefined);

/**
 * @private
 * @async
 * @function fetchGeoIPData
 * @description Función atómica para obtener y validar los datos de GeoIP desde una API externa.
 *              Utiliza `clientLogger` para registrar el proceso y los errores.
 * @throws {Error} Si la respuesta de la API no es exitosa o la validación falla.
 * @returns {Promise<GeoIPData>} Los datos de GeoIP limpios y validados.
 */
async function fetchGeoIPData(): Promise<GeoIPData> {
  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.info(
    { component: "GeoIPLocator", apiUrl: GEOIP_API_URL },
    "[GeoIPLocator] Iniciando obtención de datos de GeoIP."
  );
  const response = await fetch(GEOIP_API_URL);
  if (!response.ok) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      {
        component: "GeoIPLocator",
        status: response.status,
        statusText: response.statusText,
      } as LogContext, // Aserción de tipo
      `[GeoIPLocator] API response status: ${response.status}`
    );
    throw new Error(`API response status: ${response.status}`);
  }
  const data = await response.json();

  const validation = GeoIPResponseSchema.safeParse(data);
  if (!validation.success) {
    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.error(
      {
        component: "GeoIPLocator",
        error: validation.error.flatten(),
        rawData: data,
      } as LogContext, // Aserción de tipo
      "[GeoIPLocator] Respuesta de API GeoIP inválida."
    );
    throw new Error(`Invalid GeoIP API response: ${validation.error.message}`);
  }

  // USO DE CLIENTLOGGER CORREGIDO: (context, message)
  clientLogger.info(
    { component: "GeoIPLocator", country: validation.data.country_name },
    "[GeoIPLocator] Datos de GeoIP obtenidos y validados con éxito."
  );

  return {
    countryCode: validation.data.country_code || null,
    countryName: validation.data.country_name || null,
  };
}

/**
 * @component GeoIPProvider
 * @description Componente proveedor de contexto que obtiene y disponibiliza los datos de GeoIP
 *              a todos sus hijos. Gestiona el estado de carga y errores de la detección GeoIP.
 * @param {{ children: ReactNode }} props - Propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos a renderizar.
 * @returns {React.ReactElement}
 */
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
        // OPORTUNIDAD DE ATOMIZACIÓN: Loggear éxito al establecer estado
        clientLogger.trace(
          {
            component: "GeoIPProvider",
            status: "success",
            countryCode: geoData.countryCode,
          },
          "Estado de GeoIP actualizado con datos exitosos."
        );
      })
      .catch((error) => {
        // USO DE CLIENTLOGGER CORREGIDO: (context, message)
        clientLogger.error(
          { error, component: "GeoIPProvider" } as LogContext, // Aserción de tipo
          "[GeoIPLocator] Falha ao obter ou validar dados de GeoIP. Usando estado de fallback."
        );
        setState({
          geoData: { countryCode: null, countryName: null },
          isLoading: false,
          errorKey: "generic.error_server_generic", // Clave de error canónica
        });
      });
  }, []); // El efecto se ejecuta solo una vez al montar el componente.

  return (
    <GeoIPContext.Provider value={state}>{children}</GeoIPContext.Provider>
  );
}

/**
 * @hook useGeoIP
 * @description Hook personalizado para consumir el contexto de GeoIP.
 *              Proporciona una forma segura y desacoplada de acceder a los datos
 *              de geolocalización detectados en el cliente.
 * @throws {Error} Si se utiliza fuera de un `GeoIPProvider`, forzando el cumplimiento
 *                  de la jerarquía de componentes.
 * @returns {GeoIPContextState} El estado actual del contexto GeoIP.
 */
export const useGeoIP = (): GeoIPContextState => {
  const context = useContext(GeoIPContext);
  if (context === undefined) {
    // OPORTUNIDAD DE ATOMIZACIÓN: Loggear uso incorrecto del hook
    clientLogger.error(
      { component: "useGeoIP", error: "Context not provided" },
      "Hook `useGeoIP` utilizado fuera de `GeoIPProvider`. Esto es un error de desarrollo."
    );
    throw new Error("useGeoIP debe ser usado dentro de un GeoIPProvider");
  }
  return context;
};
// src/components/diagnostic/GeoIPLocator.tsx
