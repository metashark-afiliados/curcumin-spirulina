// src/hooks/useTelemetry.ts
/**
 * @file useTelemetry.ts
 * @description Hook de cliente que atua como a API pública para interagir com o
 *              sistema de Telemetria. Abstrai o acesso ao `TelemetryContext`.
 * @version 1.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/hooks/useTelemetry.ts.md
 */
"use client";

import { useContext } from "react";
import { TelemetryContext } from "@/components/telemetry/TelemetryProvider";

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (context === undefined) {
    throw new Error(
      "useTelemetry deve ser usado dentro de um TelemetryProvider"
    );
  }
  return context;
};
// src/hooks/useTelemetry.ts
