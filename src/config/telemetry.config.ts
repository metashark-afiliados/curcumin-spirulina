// src/config/telemetry.config.ts
/**
 * @file src/config/telemetry.config.ts
 * @description Manifiesto de Configuración y Única Fuente de Verdad (SSoT) para
 *              el sistema de telemetría del cliente. Centraliza todas las constantes
 *              y valores de configuración para desacoplar el `TelemetryProvider`
 *              de su configuración.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
"use client";

/**
 * @constant SESSION_COOKIE_NAME
 * @description El nombre canónico de la cookie utilizada para persistir el ID de sesión del visitante.
 */
export const SESSION_COOKIE_NAME = "app_session_id";

/**
 * @constant BATCH_INTERVAL_MS
 * @description El intervalo de tiempo (en milisegundos) que el sistema espera para
 *              enviar un lote de eventos de telemetría al servidor.
 */
export const BATCH_INTERVAL_MS = 5000;

/**
 * @constant MAX_BATCH_SIZE
 * @description El número máximo de eventos que se acumulan en el buffer antes de
 *              forzar un envío al servidor.
 */
export const MAX_BATCH_SIZE = 10;

/**
 * @constant SCROLL_DEPTH_MILESTONES
 * @description Los hitos de profundidad de scroll (en porcentaje) que activarán
 *              un evento de telemetría `SCROLL_DEPTH`.
 */
export const SCROLL_DEPTH_MILESTONES = [25, 50, 75, 100];
// src/config/telemetry.config.ts
