// src/hooks/useScrollDepthTracker.ts
/**
 * @file useScrollDepthTracker.ts
 * @description Hook de cliente atómico y soberano. Su única responsabilidad es
 *              monitorear el scroll de la página y registrar eventos `SCROLL_DEPTH`
 *              al alcanzar hitos predefinidos.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SCROLL_DEPTH_MILESTONES } from "@/config/telemetry.config";
import { useTelemetry } from "@/hooks/useTelemetry";

/**
 * @hook useScrollDepthTracker
 * @description Un hook que añade un listener de scroll a la ventana y dispara
 *              eventos de telemetría `SCROLL_DEPTH` al cruzar los hitos definidos
 *              en la configuración.
 */
export function useScrollDepthTracker(): void {
  const pathname = usePathname();
  const { trackEvent } = useTelemetry();
  const trackedScrollDepths = useRef<Set<number>>(new Set());

  // Resetea los hitos rastreados en cada cambio de página.
  useEffect(() => {
    trackedScrollDepths.current.clear();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollHeight === clientHeight) return;

      const scrollTop = document.documentElement.scrollTop;
      const scrollPercentage = Math.round(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );

      for (const milestone of SCROLL_DEPTH_MILESTONES) {
        if (
          scrollPercentage >= milestone &&
          !trackedScrollDepths.current.has(milestone)
        ) {
          trackedScrollDepths.current.add(milestone);
          trackEvent("SCROLL_DEPTH", {
            path: pathname,
            depth: `${milestone}%`,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, trackEvent]);
}
// src/hooks/useScrollDepthTracker.ts
