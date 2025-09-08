// src/components/telemetry/TelemetryProvider.tsx
/**
 * @file src/components/telemetry/TelemetryProvider.tsx
 * @description Orquestador de Telemetría de élite para el cliente. Atomizado
 *              para adherirse estrictamente al PRU. Su única responsabilidad
 *              ahora es gestionar el ciclo de vida de la sesión y proveer la
 *              API de contexto (`trackEvent`). La lógica de tracking ha sido
 *              delegada a hooks dedicados.
 * @author L.I.A. Legacy
 * @version 5.0.0
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
import { logTelemetryEvent } from "@/lib/actions/telemetry/logTelemetryEvent.action";
import { clientLogger } from "@/lib/client-logger";
import { type TelemetryEvent } from "@/lib/validators/TelemetryEvent.schema";
import {
  BATCH_INTERVAL_MS,
  MAX_BATCH_SIZE,
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

/**
 * @component TelemetryProvider
 * @description Proveedor de contexto que orquesta la sesión de telemetría del cliente
 *              y expone la función `trackEvent` para un registro de eventos desacoplado.
 * @param {{ children: ReactNode }} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento proveedor.
 */
export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [correlationId, setCorrelationId] = useState<string | null>(null);
  const cookies = useCookies();
  const eventBuffer = useRef<Omit<TelemetryEvent, "sessionId">[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="correlation-id"]');
    const id = metaTag ? metaTag.getAttribute("content") : null;
    setCorrelationId(id);
    if (id) {
      clientLogger.info(
        "[TelemetryProvider]",
        "Correlation ID del servidor sincronizado.",
        { correlationId: id }
      );
    }
  }, []);

  const flushBuffer = useCallback(() => {
    if (eventBuffer.current.length === 0 || !sessionId) return;

    clientLogger.info(
      "[TelemetryProvider]",
      `Despejando buffer con ${eventBuffer.current.length} eventos.`,
      { correlationId, sessionId, count: eventBuffer.current.length }
    );

    const eventsToSend = eventBuffer.current.map((event) => ({
      ...event,
      sessionId,
    }));
    eventBuffer.current = [];

    eventsToSend.forEach((eventData) => {
      logTelemetryEvent(eventData).catch((error) => {
        clientLogger.error(
          "[TelemetryProvider]",
          "Fallo al enviar evento de telemetría en lote.",
          { correlationId, sessionId, error, eventData }
        );
      });
    });

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
      if (!sessionId) {
        clientLogger.warn(
          "[TelemetryProvider]",
          "Intento de rastrear evento antes de que la sesión esté lista. Evento ignorado.",
          { eventName }
        );
        return;
      }
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
    [sessionId, flushBuffer]
  );

  useEffect(() => {
    let currentSessionId = cookies.get(SESSION_COOKIE_NAME);
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      cookies.set(SESSION_COOKIE_NAME, currentSessionId, {
        path: "/",
        expires: 365,
      });
      clientLogger.info("[TelemetryProvider]", "Nueva sesión iniciada.", {
        correlationId,
        sessionId: currentSessionId,
      });
    }
    setSessionId(currentSessionId);
  }, [cookies, correlationId]);

  return (
    <TelemetryContext.Provider value={{ trackEvent }}>
      {children}
    </TelemetryContext.Provider>
  );
}
// src/components/telemetry/TelemetryProvider.tsx
