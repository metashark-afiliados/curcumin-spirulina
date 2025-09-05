// src/components/ui/SchemaInjector.tsx
/**
 * @file SchemaInjector.tsx
 * @description Aparato de UI de servidor, atómico y puro. Su única
 *              responsabilidad es inyectar de forma segura un objeto de schema
 *              JSON-LD en el `<head>` de la página. Es un pilar fundamental de
 *              la estrategia de SEO Técnico.
 * @version 2.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/ui/SchemaInjector.tsx.md
 */
import "server-only";

import { serverLogger } from "@/lib/logger";

/**
 * @interface SchemaInjectorProps
 * @description Define el contrato de props para el componente SchemaInjector.
 */
interface SchemaInjectorProps {
  /**
   * El objeto de schema (JSON-LD) a ser inyectado. Debe ser un objeto
   * serializable a JSON.
   */
  schema: Record<string, unknown>;
}

/**
 * @public
 * @component SchemaInjector
 * @description Renderiza una etiqueta `<script>` del tipo `application/ld+json`,
 *              inyectando de forma segura los datos estructurados en el documento.
 * @param {SchemaInjectorProps} props - Las propiedades del componente.
 * @returns {React.ReactElement} La etiqueta de script con el JSON-LD.
 */
export function SchemaInjector({
  schema,
}: SchemaInjectorProps): React.ReactElement {
  serverLogger.trace(
    { schemaType: schema["@type"] },
    "[SchemaInjector] Injetando schema JSON-LD na página."
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
// src/components/ui/SchemaInjector.tsx
