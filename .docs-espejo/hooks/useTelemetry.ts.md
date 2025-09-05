// .docs-espejo/hooks/useTelemetry.ts.md
/**
 * @file .docs-espejo/hooks/useTelemetry.ts.md
 * @description Documento Espejo y SSoT conceptual para el hook useTelemetry.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `useTelemetry`

## 1. Rol Estratégico y Propósito

Este aparato es la **API pública y desacoplada** para el sistema de telemetría del cliente. Su única responsabilidad es abstraer el consumo del `TelemetryContext`, proporcionando a los componentes de UI una forma limpia y segura de acceder à função `trackEvent`.

## 2. Arquitectura de Élite

Es un **Hook de Cliente (`"use client"`)** que sigue el patrón de "Consumidor de Contexto".
*   **Responsabilidad de Validación:** Este hook no valida datos. Su función es ser un "canal". La validación de los datos enviados a través de `trackEvent` ocurre en la frontera del sistema (en el `TelemetryProvider` y la Server Action `logTelemetryEvent`).
*   **Guardián de Contexto:** Lanza un error si se intenta usar fuera de un `TelemetryProvider`, garantizando un fallo rápido y claro durante el desarrollo.

## 3. Contrato de API
### Parámetros de Entrada:
*   Ninguno.

### Salida:
*   `{ trackEvent: (eventName, payload) => void }`: Un objeto que contiene la función para registrar eventos de telemetría.

## 4. Zona de Melhorias Futuras
*   **TIPADO DE EVENTOS:** A medida que el sistema crezca, se podría usar `generics` para que el `payload` sea tipo-seguro basado en el `eventName`.
// .docs-espejo/hooks/useTelemetry.ts.md