// src/components/ui/SchemaInjector.tsx
/**
 * @file src/components/ui/SchemaInjector.tsx
 * @description Aparato de UI de cliente, atómico y puro. Nivelado a la
 *              arquitectura de logging de ConvertiKit.
 * @author L.I.A. Legacy
 * @version 3.1.0
 * @see .docs-espejo/components/ui/SchemaInjector.tsx.md
 */
"use client";

import { useEffect } from "react";
import { clientLogger } from "@/lib/client-logger";

interface SchemaInjectorProps {
  schema: Record<string, unknown>;
}

export function SchemaInjector({ schema }: SchemaInjectorProps): null {
  const schemaType = schema["@type"]?.toString().toLowerCase() || "unknown";
  const schemaId = `schema-ld-${schemaType}`;
  const context = { component: "SchemaInjector", schemaType, schemaId };

  useEffect(() => {
    if (document.getElementById(schemaId)) {
      clientLogger.trace(
        "[SchemaInjector]",
        "Script de Schema JSON-LD ya existe. Saltando inyección.",
        { schemaId }
      );
      return;
    }

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";

    try {
      script.innerHTML = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);

      clientLogger.trace(
        "[SchemaInjector]",
        "Schema JSON-LD inyectado en el head.",
        { schemaId }
      );
    } catch (error) {
      clientLogger.error(
        "[SchemaInjector]",
        "Error al serializar o inyectar schema JSON-LD.",
        {
          schemaId,
          error:
            error instanceof Error
              ? error.message
              : "Unknown serialization error",
        }
      );
    }

    return () => {
      const existingScript = document.getElementById(schemaId);
      if (existingScript) {
        document.head.removeChild(existingScript);
        clientLogger.trace(
          "[SchemaInjector]",
          "Script de Schema JSON-LD removido en desmontaje.",
          { schemaId }
        );
      }
    };
  }, [schema, schemaId]);

  return null;
}
// src/components/ui/SchemaInjector.tsx
