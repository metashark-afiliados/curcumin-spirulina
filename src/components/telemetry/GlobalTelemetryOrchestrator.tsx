// src/components/telemetry/GlobalTelemetryOrchestrator.tsx
/**
 * @file GlobalTelemetryOrchestrator.tsx
 * @description Orquestador de cliente "sin cabeza" (headless). Su única
 *              responsabilidad es invocar los hooks de tracking global,
 *              actuando como el punto de entrada para la telemetría automática
 *              de la aplicación.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
"use client";

import { usePageViewTracker } from "@/hooks/usePageViewTracker";
import { useScrollDepthTracker } from "@/hooks/useScrollDepthTracker";
import { clientLogger } from "@/lib/client-logger";

/**
 * @component GlobalTelemetryOrchestrator
 * @description Un componente "pass-through" que activa la telemetría global
 *              y renderiza a sus hijos. Debe ser un hijo de `TelemetryProvider`.
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactNode}
 */
export function GlobalTelemetryOrchestrator({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageViewTracker();
  useScrollDepthTracker();

  clientLogger.trace(
    "[GlobalTelemetryOrchestrator]",
    "Orquestador de telemetría global montado. Hooks de tracking activos."
  );

  return <>{children}</>;
}
// src/components/telemetry/GlobalTelemetryOrchestrator.tsx
