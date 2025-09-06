// src/components/telemetry/TelemetryProvider.tsx
/**
 * @file src/components/telemetry/TelemetryProvider.tsx
 * @description Orquestador de Telemetría de élite para el cliente. Lee el
 *              `correlationId` del servidor para una observabilidad E2E, gestiona
 *              la sesión del cliente, y utiliza "event batching" para optimizar
 *              el rendimiento.
 * @version 3.0.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/telemetry/TelemetryProvider.tsx.md
 */
"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "next-client-cookies";
import { usePathname } from "next/navigation";
import { logTelemetryEvent } from "@/lib/actions/telemetry/logTelemetryEvent.action";
import { clientLogger } from "@/lib/client-logger";
import { type LogContext } from "@/lib/types/logging";
import { type TelemetryEvent } from "@/lib/validators/TelemetryEvent.schema";
import {
  BATCH_INTERVAL_MS,
  MAX_BATCH_SIZE,
  SCROLL_DEPTH_MILESTONES,
  SESSION_COOKIE_NAME,
} from "@/config/telemetry.config";

type TelemetryContextType = {
  trackEvent: (
    eventName: TelemetryEvent["eventName"],
    payload?: TelemetryEvent["payload"]
  ) => void;
};

export const TelemetryContext = createContext<TelemetryContextType | undefined>(
  undefined
);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [correlationId, setCorrelationId] = useState<string | null>(null);
  const cookies = useCookies();
  const pathname = usePathname();
  const eventBuffer = useRef<Omit<TelemetryEvent, "sessionId">[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackedScrollDepths = useRef<Set<number>>(new Set());

  // Efecto para leer el `correlationId` del servidor una sola vez.
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="correlation-id"]');
    const id = metaTag ? metaTag.getAttribute("content") : null;
    setCorrelationId(id);
    if (id) {
      clientLogger.info(
        { correlationId: id, component: "TelemetryProvider" },
        "Correlation ID del servidor sincronizado."
      );
    }
  }, []);

  const flushBuffer = useCallback(() => {
    if (eventBuffer.current.length === 0 || !sessionId) return;

    const baseLogContext: LogContext = { correlationId };
    clientLogger.info(
      { ...baseLogContext, sessionId, eventCount: eventBuffer.current.length },
      `[TelemetryProvider] Despejando buffer con ${eventBuffer.current.length} eventos.`
    );

    const eventsToSend = eventBuffer.current.map((event) => ({
      ...event,
      sessionId,
    }));

    eventsToSend.forEach((eventData) => {
      logTelemetryEvent(eventData).catch((error) => {
        clientLogger.error(
          { ...baseLogContext, error, eventData, sessionId },
          "[TelemetryProvider] Falha ao enviar evento de telemetria em lote."
        );
      });
    });

    eventBuffer.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [sessionId, correlationId]);

  const trackEvent = useCallback(
    (
      eventName: TelemetryEvent["eventName"],
      payload?: TelemetryEvent["payload"]
    ) => {
      const eventData: Omit<TelemetryEvent, "sessionId"> = {
        eventName,
        payload: payload ?? {},
        timestamp: new Date().toISOString(),
      };
      eventBuffer.current.push(eventData);

      if (eventBuffer.current.length >= MAX_BATCH_SIZE) {
        flushBuffer();
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(flushBuffer, BATCH_INTERVAL_MS);
      }
    },
    [flushBuffer]
  );

  useEffect(() => {
    let currentSessionId = cookies.get(SESSION_COOKIE_NAME);
    const baseLogContext: LogContext = { correlationId };
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      cookies.set(SESSION_COOKIE_NAME, currentSessionId, {
        path: "/",
        expires: 365,
      });
      clientLogger.info(
        { ...baseLogContext, sessionId: currentSessionId },
        "[TelemetryProvider] Nueva sesión iniciada."
      );
    }
    setSessionId(currentSessionId);
  }, [cookies, correlationId]);

  useEffect(() => {
    if (sessionId) {
      trackEvent("PAGE_VIEW", { path: pathname });
    }
    trackedScrollDepths.current.clear();
  }, [pathname, sessionId, trackEvent]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sessionId) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      if (scrollHeight === clientHeight) return;

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
  }, [pathname, sessionId, trackEvent]);

  return (
    <TelemetryContext.Provider value={{ trackEvent }}>
      {children}
    </TelemetryContext.Provider>
  );
}
// src/components/telemetry/TelemetryProvider.tsx
