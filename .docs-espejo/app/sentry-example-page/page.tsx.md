<!-- .docs-espejo/app/sentry-example-page/page.tsx.md -->
/**
 * @file .docs-espejo/app/sentry-example-page/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de ejemplo de Sentry.
 * @author L.I.A. Legacy
 * @version 1.2.0
 */
# Manifiesto Conceptual: Aparato `sentry-example-page/page.tsx` (Página de Ejemplo de Sentry)

## 1. Rol Estratégico y Propósito

Este aparato es una **página de diagnóstico y prueba de observabilidad**. Su propósito es proporcionar una interfaz visual para verificar la correcta integración y funcionamiento de Sentry en la aplicación, permitiendo simular y reportar errores tanto en el frontend como en el backend.

Estratégicamente, esta página es vital para el control de calidad del sistema de monitoreo de errores. Al ser un componente interactivo que realiza llamadas dinámicas a la API y simula errores, **está configurado explícitamente como una ruta dinámica (`export const dynamic = 'force-dynamic';`)** para asegurar que Next.js la compile y la sirva correctamente. El reporte de que no puede ser estática (`Dynamic server usage`) es el comportamiento esperado y deseado para esta página.

## 2. Arquitectura y Flujo de Ejecución

Es un **Client Component (`"use client"`)** que orquesta la simulación de errores y la verificación de la conectividad con Sentry.

```mermaid
graph TD
    A[Usuario navega a `/sentry-example-page`] --> B["`SentryExamplePage` (Componente Cliente)"];
    B -- "1. `export const dynamic = 'force-dynamic';`" --> B; // Directiva para Next.js (comportamiento esperado)
    B -- "2. `useEffect` para `diagnoseSdkConnectivity()`" --> C[Verifica conectividad con Sentry];
    C -- Éxito --> D[Set `isConnected = true`];
    C -- Fallo --> E[Set `isConnected = false`];

    B --> F["Renderiza UI (Botón 'Throw Sample Error')"];
    F -- "onClick" --> G["`Sentry.startSpan()` (Frontend/Backend)"];
    G -- "Llama a `fetch('/api/sentry-example-api')`" --> H[API Endpoint de Backend];
    H -- Error en Backend (throw new Error) --> I["Sentry.captureException(error)"];
    G -- Simula error en Frontend (throw new Error) --> J["Sentry.captureException(error)"];
    G --> K[Reporta errores a Sentry];
    D & E & K --> L[Actualiza UI con estado de error/conectividad];
3. Contrato de API
Props de Entrada:
Ninguna. Es una página de ruta.
Salida:
Un React.ReactElement que representa la página de prueba de Sentry.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
INTEGRACIÓN CON clientLogger (Adicional): Aunque Sentry ya captura los errores, sería valioso añadir clientLogger.error() al onClick del botón (y a los catch internos del fetch) para que los errores simulados también se registren en la consola del navegador. Esto proporcionaría una observabilidad local adicional para la depuración en desarrollo.
SIMULACIÓN DE ERRORES CONTEXTUALES MÚLTIPLES: Extender la página para permitir simular diferentes tipos de errores (ej., errores de red, errores de renderizado de React, errores de validación) y adjuntar contexto personalizado (ej., userId, transactionId, componentName) a los eventos de Sentry para pruebas más completas del sistema de monitoreo.
INTERFAZ PARA CONFIGURAR SAMPLING DINÁMICO: Añadir una UI en la página de ejemplo para ajustar dinámicamente las tasas de muestreo de tracesSampleRate y replaysSessionSampleRate de Sentry. Esto permitiría a los desarrolladores probar el impacto del muestreo en el reporte de eventos sin modificar el código de configuración de Sentry.
VISUALIZACIÓN DE EVENTOS DE SENTRY EN TIEMPO REAL (Dashboards Integrados): Explorar la posibilidad de integrar un pequeño widget o iframe que, después de generar un error, intente buscar y mostrar el evento recién capturado en el dashboard de Sentry. Esto proporcionaría un feedback instantáneo sobre la integración.
PRUEBAS E2E (Playwright) PARA SENTRY: Crear pruebas End-to-End (E2E) con Playwright que naveguen a esta página, hagan clic en los botones para generar errores y luego verifiquen (posiblemente a través de mocks o logs de red) que los eventos se reportan correctamente a Sentry.
<!-- .docs-espejo/app/sentry-example-page/page.tsx.md -->