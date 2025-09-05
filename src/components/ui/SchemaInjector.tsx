// src/components/ui/SchemaInjector.tsx
/**
 * @file SchemaInjector.tsx
 * @description Aparato de UI de cliente, atómico y puro. Su única
 *              responsabilidad es inyectar de forma segura un objeto de schema
 *              JSON-LD en el `<head>` de la página utilizando un `useEffect`.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/SchemaInjector.tsx.md
 */
"use client";

import { useEffect } from "react";
import { clientLogger } from "@/lib/client-logger";

interface SchemaInjectorProps {
  schema: Record<string, unknown>;
}

export function SchemaInjector({ schema }: SchemaInjectorProps): null {
  const schemaId = `schema-ld-${schema["@type"]?.toString().toLowerCase()}`;

  useEffect(() => {
    // Evita duplicados se o componente se re-renderizar.
    if (document.getElementById(schemaId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    clientLogger.trace("Schema JSON-LD injetado no head.", {
      component: "SchemaInjector",
      schemaType: schema["@type"],
    });

    return () => {
      // Limpeza: remove o script quando o componente é desmontado.
      const existingScript = document.getElementById(schemaId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [schema, schemaId]);

  return null; // Este componente não renderiza nada visualmente.
}
// src/components/ui/SchemaInjector.tsx
