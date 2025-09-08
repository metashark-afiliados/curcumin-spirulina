// src/hooks/usePageViewTracker.ts
/**
 * @file usePageViewTracker.ts
 * @description Hook de cliente atómico y soberano. Su única responsabilidad es
 *              registrar un evento `PAGE_VIEW` cada vez que la ruta de la
 *              aplicación cambia.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTelemetry } from "@/hooks/useTelemetry";

/**
 * @hook usePageViewTracker
 * @description Un hook que se suscribe a los cambios de `pathname` y dispara
 *              un evento de telemetría `PAGE_VIEW` utilizando el contexto
 *              proporcionado por `TelemetryProvider`.
 */
export function usePageViewTracker(): void {
  const pathname = usePathname();
  const { trackEvent } = useTelemetry();

  useEffect(() => {
    trackEvent("PAGE_VIEW", { path: pathname });
  }, [pathname, trackEvent]);
}
// src/hooks/usePageViewTracker.ts
