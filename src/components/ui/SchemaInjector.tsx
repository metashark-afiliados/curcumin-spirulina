// src/components/ui/SchemaInjector.tsx
/**
 * @file src/components/ui/SchemaInjector.tsx
 * @description Aparato de UI de cliente, atómico y puro. Su única
 *              responsabilidad es inyectar de forma segura un objeto de schema
 *              JSON-LD en el `<head>` de la página utilizando un `useEffect`.
 *              Se adhiere a la API de logging del cliente unificada para una
 *              observabilidad completa sobre la inyección de datos estructurados.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/SchemaInjector.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
 */
"use client";

import { useEffect } from "react";
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

/**
 * @interface SchemaInjectorProps
 * @description Propiedades del componente `SchemaInjector`.
 */
interface SchemaInjectorProps {
  /**
   * @property {Record<string, unknown>} schema - El objeto JSON-LD a inyectar en el `<head>`.
   *           Debe ser un objeto válido conforme a `Schema.org`.
   */
  schema: Record<string, unknown>;
}

/**
 * @component SchemaInjector
 * @description Componente invisible que inyecta datos estructurados (JSON-LD)
 *              en el `<head>` del documento para mejorar el SEO.
 *              Es un Client Component que gestiona el ciclo de vida del script
 *              a través de `useEffect`.
 * @param {SchemaInjectorProps} props - Las propiedades para el schema JSON-LD.
 * @returns {null} Este componente no renderiza ningún elemento visual en el DOM.
 */
export function SchemaInjector({ schema }: SchemaInjectorProps): null {
  // Genera un ID único para el script basado en el tipo de schema, para evitar duplicados.
  const schemaId = `schema-ld-${schema["@type"]?.toString().toLowerCase() || "unknown"}`;

  useEffect(() => {
    // Evita duplicados si el componente se re-renderiza.
    if (document.getElementById(schemaId)) {
      clientLogger.trace(
        { component: "SchemaInjector", schemaType: schema["@type"], schemaId },
        "Script de Schema JSON-LD ya existe. Saltando inyección."
      );
      return;
    }

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";

    try {
      script.innerHTML = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);

      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.trace(
        { component: "SchemaInjector", schemaType: schema["@type"], schemaId },
        "Schema JSON-LD injetado no head."
      );
    } catch (error) {
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.error(
        {
          component: "SchemaInjector",
          schemaType: schema["@type"],
          schemaId,
          error,
        } as LogContext, // Aserción de tipo para LogContext
        "Erro ao serializar ou injetar schema JSON-LD no head."
      );
    }

    return () => {
      // Limpieza: remueve el script cuando el componente es desmontado.
      const existingScript = document.getElementById(schemaId);
      if (existingScript) {
        document.head.removeChild(existingScript);
        clientLogger.trace(
          {
            component: "SchemaInjector",
            schemaType: schema["@type"],
            schemaId,
          },
          "Script de Schema JSON-LD removido do head na desmontagem."
        );
      }
    };
  }, [schema, schemaId]); // Dependencias para re-ejecutar el efecto si el schema cambia.

  return null; // Este componente no renderiza nada visualmente.
}
// src/components/ui/SchemaInjector.tsx
