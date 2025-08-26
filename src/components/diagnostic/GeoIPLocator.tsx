// src/components/diagnostic/GeoIPLocator.tsx
"use client";

import { useEffect, useState } from "react";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Aparato de diagnóstico atómico para verificar la funcionalidad de la API
 *              de GeoIP (ip-api.com). Realiza una petición del lado del cliente para
 *              obtener y mostrar la información de geolocalización del usuario.
 *              Es robusto contra fugas de memoria.
 */

interface GeoIPData {
  query: string; // IP Address
  country: string;
  countryCode: string;
}

interface GeoIPState {
  data: GeoIPData | null;
  loading: boolean;
  error: string | null;
}

export function GeoIPLocator() {
  const [state, setState] = useState<GeoIPState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; // Flag para rastrear si el componente está montado.

    const fetchGeoIP = async () => {
      try {
        const response = await fetch(
          "http://ip-api.com/json/?fields=query,country,countryCode"
        );
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const result: GeoIPData = await response.json();
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        if (isMounted) {
          setState({ data: null, loading: false, error: errorMessage });
        }
      }
    };

    fetchGeoIP();

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    return () => {
      isMounted = false;
    };
  }, []); // El array vacío asegura que se ejecute solo una vez al montar.

  return (
    <div className="container my-8 rounded-lg border border-yellow-500 bg-gray-800 p-6 text-white shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-yellow-400">
        Panel de Diagnóstico GeoIP
      </h2>
      {state.loading && (
        <p className="text-blue-300">Cargando datos de GeoIP...</p>
      )}
      {state.error && (
        <p className="font-mono text-red-400">Error: {state.error}</p>
      )}
      {state.data && (
        <div className="font-mono text-lg">
          <p>
            <span className="font-bold text-gray-400">IP Detectada:</span>{" "}
            {state.data.query}
          </p>
          <p>
            <span className="font-bold text-gray-400">País:</span>{" "}
            {state.data.country}
          </p>
          <p>
            <span className="font-bold text-gray-400">Código de País:</span>{" "}
            {state.data.countryCode}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 * ---
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - PREVENCIÓN DE FUGAS DE MEMORIA: Se ha implementado el patrón de limpieza canónico en `useEffect`. La función de limpieza establece un flag `isMounted` en `false` cuando el componente se desmonta, previniendo que `setState` sea llamado después de una operación asíncrona si el componente ya no existe en el DOM. Esto elimina la advertencia de `act` en los tests y hace el componente más robusto.
 * ((Implementada)) @version 1.0.0 - GESTIÓN DE ESTADO DE ÉLITE.
 * ((Implementada)) @version 1.0.0 - HOOK DE EFECTO AISLADO.
 * ((Implementada)) @version 1.0.0 - PROPÓSITO DE DIAGNÓSTICO CLARO.
 */
