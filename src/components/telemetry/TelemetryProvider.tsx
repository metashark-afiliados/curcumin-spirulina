// src/components/telemetry/TelemetryProvider.tsx
/**
 * @file src/components/telemetry/TelemetryProvider.tsx
 * @description Orquestador de Telemetría de élite para el cliente.
 *              Implementa "event batching" para optimizar el rendimiento de la red,
 *              agrupando eventos antes de enviarlos al servidor. Gestiona el ciclo
 *              de vida de la sesión del visitante y captura eventos globales.
 *              Se adhiere a la API unificada de logging del cliente para una
 *              observabilidad completa.
 * @version 2.1.0
 * @author L.I.A. Legacy
 * @see .docs-espejo/components/telemetry/TelemetryProvider.tsx.md
 * @see src/lib/client-logger.ts (SSoT para el logger de cliente)
 * @see src/lib/types/logging.ts (SSoT para `LogContext`)
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
// IMPORTACIÓN CORREGIDA: Apunta a la nueva SSoT del clientLogger
import { clientLogger } from "@/lib/client-logger";
import { type TelemetryEvent } from "@/lib/validators/TelemetryEvent.schema";
import { type LogContext } from "@/lib/types/logging"; // Importar LogContext

const SESSION_COOKIE_NAME = "app_session_id";
const BATCH_INTERVAL_MS = 5000;
const MAX_BATCH_SIZE = 10;
const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100];

/**
 * @interface TelemetryContextType
 * @description Define la interfaz del contexto de telemetría que se provee a los hijos.
 */
type TelemetryContextType = {
  trackEvent: (
    eventName: TelemetryEvent["eventName"],
    payload?: TelemetryEvent["payload"]
  ) => void;
};

/**
 * @public
 * @constant TelemetryContext
 * @description Contexto de React para la telemetría, utilizado por `useTelemetry`.
 */
export const TelemetryContext = createContext<TelemetryContextType | undefined>(
  undefined
);

/**
 * @component TelemetryProvider
 * @description Componente proveedor de contexto para la telemetría. Gestiona el `sessionId`,
 *              el `event batching`, y los `scroll depth milestones`.
 *              Envuelve a los componentes hijos para proporcionarles la funcionalidad `trackEvent`.
 * @param {object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos a renderizar.
 * @returns {React.ReactElement}
 */
export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const cookies = useCookies();
  const pathname = usePathname();
  const eventBuffer = useRef<Omit<TelemetryEvent, "sessionId">[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackedScrollDepths = useRef<Set<number>>(new Set());

  /**
   * @private
   * @function flushBuffer
   * @description Envía los eventos acumulados en el buffer a la Server Action.
   *              Se llama cuando el buffer alcanza el tamaño máximo o después
   *              de un intervalo de tiempo.
   */
  const flushBuffer = useCallback(() => {
    if (eventBuffer.current.length === 0 || !sessionId) return;

    // USO DE CLIENTLOGGER CORREGIDO: (context, message)
    clientLogger.info(
      { sessionId, eventCount: eventBuffer.current.length },
      `[TelemetryProvider] Despejando buffer con ${eventBuffer.current.length} eventos.`
    );
    const eventsToSend = eventBuffer.current.map((event) => ({
      ...event,
      sessionId,
    }));

    eventsToSend.forEach((eventData) => {
      // Llamada asíncrona a la Server Action, "fire-and-forget".
      logTelemetryEvent(eventData).catch((error) => {
        // USO DE CLIENTLOGGER CORREGIDO: (context, message)
        clientLogger.error(
          { error, eventData, sessionId },
          "[TelemetryProvider] Falha ao enviar evento de telemetria em lote."
        );
      });
    });

    eventBuffer.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [sessionId]);

  /**
   * @public
   * @function trackEvent
   * @description Registra un evento de telemetría. Acumula eventos en un buffer
   *              y los envía en lotes para optimizar las llamadas de red.
   * @param {TelemetryEvent["eventName"]} eventName - El nombre canónico del evento.
   * @param {TelemetryEvent["payload"]} [payload] - Datos adicionales del evento.
   */
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

  // Efecto para inicializar el `sessionId` desde cookies o generar uno nuevo.
  useEffect(() => {
    let currentSessionId = cookies.get(SESSION_COOKIE_NAME);
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      cookies.set(SESSION_COOKIE_NAME, currentSessionId, {
        path: "/",
        expires: 365,
      });
      // USO DE CLIENTLOGGER CORREGIDO: (context, message)
      clientLogger.info(
        { sessionId: currentSessionId },
        "[TelemetryProvider] Nueva sesión iniciada."
      );
    }
    setSessionId(currentSessionId);
  }, [cookies]);

  // Efecto para registrar PAGE_VIEW en cambios de ruta y resetear profundidades de scroll.
  useEffect(() => {
    if (sessionId) {
      trackEvent("PAGE_VIEW", { path: pathname });
    }
    trackedScrollDepths.current.clear();
  }, [pathname, sessionId, trackEvent]);

  // Efecto para registrar SCROLL_DEPTH en hitos específicos.
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      if (scrollHeight === clientHeight) return; // Evita división por cero o páginas cortas.

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
          // USO DE CLIENTLOGGER CORREGIDO: (context, message)
          clientLogger.trace(
            {
              path: pathname,
              depth: `${milestone}%`,
              correlationId: sessionId as LogContext["correlationId"],
            },
            `[TelemetryProvider] Hito de scroll alcanzado: ${milestone}%.`
          );
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
