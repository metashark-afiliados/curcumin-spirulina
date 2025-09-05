// src/components/telemetry/TelemetryProvider.tsx
/**
 * @file TelemetryProvider.tsx
 * @description Orquestador de Telemetría de élite. Implementa "event batching"
 *              para optimizar el rendimiento de la red, agrupando eventos
 *              antes de enviarlos al servidor.
 * @version 2.0.0
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
import { type TelemetryEvent } from "@/lib/validators/TelemetryEvent.schema";

const SESSION_COOKIE_NAME = "app_session_id";
const BATCH_INTERVAL_MS = 5000;
const MAX_BATCH_SIZE = 10;
const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100];

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
  const cookies = useCookies();
  const pathname = usePathname();
  const eventBuffer = useRef<Omit<TelemetryEvent, "sessionId">[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackedScrollDepths = useRef<Set<number>>(new Set());

  const flushBuffer = useCallback(() => {
    if (eventBuffer.current.length === 0 || !sessionId) return;

    clientLogger.info(
      `[TelemetryProvider] Despejando buffer com ${eventBuffer.current.length} eventos.`,
      { sessionId }
    );
    const eventsToSend = eventBuffer.current.map((event) => ({
      ...event,
      sessionId,
    }));

    eventsToSend.forEach((eventData) => {
      logTelemetryEvent(eventData).catch((error) => {
        clientLogger.error(
          "[TelemetryProvider] Falha ao enviar evento de telemetria em lote.",
          { error }
        );
      });
    });

    eventBuffer.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [sessionId]);

  const trackEvent = useCallback(
    (
      eventName: TelemetryEvent["eventName"],
      payload?: TelemetryEvent["payload"]
    ) => {
      const eventData: Omit<TelemetryEvent, "sessionId" | "payload"> & {
        payload?: TelemetryEvent["payload"];
      } = {
        eventName,
        timestamp: new Date().toISOString(),
        ...(payload && { payload }),
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
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      cookies.set(SESSION_COOKIE_NAME, currentSessionId, {
        path: "/",
        expires: 365,
      });
      clientLogger.info("[TelemetryProvider] Nueva sesión iniciada.", {
        sessionId: currentSessionId,
      });
    }
    setSessionId(currentSessionId);
  }, [cookies]);

  useEffect(() => {
    if (sessionId) {
      trackEvent("PAGE_VIEW", { path: pathname });
    }
    trackedScrollDepths.current.clear();
  }, [pathname, sessionId, trackEvent]);

  useEffect(() => {
    const handleScroll = () => {
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
  }, [pathname, trackEvent]);

  return (
    <TelemetryContext.Provider value={{ trackEvent }}>
      {children}
    </TelemetryContext.Provider>
  );
}
// src/components/telemetry/TelemetryProvider.tsx
