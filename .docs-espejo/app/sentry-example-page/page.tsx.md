<!-- .docs-espejo/app/sentry-example-page/page.tsx.md -->
/**
 * @file .docs-espejo/app/sentry-example-page/page.tsx.md
 * @description Documento Espejo y SSoT conceptual para la página de ejemplo de Sentry.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `sentry-example-page/page.tsx` (Página de Ejemplo de Sentry)

## 1. Rol Estratégico y Propósito

Este aparato es una **página de diagnóstico y prueba de observabilidad**. Su propósito es proporcionar una interfaz visual para verificar la correcta integración y funcionamiento de Sentry en la aplicación, permitiendo simular y reportar errores tanto en el frontend como en el backend.

Estratégicamente, esta página es vital para el control de calidad del sistema de monitoreo de errores. Al ser un componente interactivo que realiza llamadas dinámicas a la API, **está configurado explícitamente como una ruta dinámica (`export const dynamic = 'force-dynamic';`)** para asegurar que Next.js la compile y la sirva correctamente.

## 2. Arquitectura y Flujo de Ejecución

Es un **Client Component (`"use client"`)** que orquesta la simulación de errores y la verificación de la conectividad con Sentry.

```mermaid
graph TD
    A[Usuario navega a `/sentry-example-page`] --> B["`SentryExamplePage` (Componente Cliente)"];
    B -- "1. `export const dynamic = 'force-dynamic';`" --> B; // Directiva para Next.js
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
INTEGRACIÓN CON clientLogger: Aunque Sentry ya captura los errores, sería valioso añadir clientLogger.error() al onClick del botón para que los errores simulados también se registren en la consola del navegador, proporcionando una observabilidad local adicional para la depuración en desarrollo.
SIMULACIÓN DE ERRORES CONTEXTUALES: Extender la página para permitir simular diferentes tipos de errores (ej., errores de red, errores de renderizado de React, errores de validación) y adjuntar contexto personalizado (ej., userId, transactionId) a los eventos de Sentry para pruebas más completas.
INTERFAZ PARA CONFIGURAR SAMPLING: Añadir una UI en la página de ejemplo para ajustar dinámicamente las tasas de muestreo de tracesSampleRate y replaysSessionSampleRate de Sentry, permitiendo a los desarrolladores probar el impacto del muestreo en el reporte de eventos.
VISUALIZACIÓN DE EVENTOS DE SENTRY EN TIEMPO REAL: Integrar un pequeño widget que, después de generar un error, intente buscar y mostrar el evento recién capturado en Sentry (usando la API de Sentry), proporcionando un feedback instantáneo sobre la integración.
PRUEBAS E2E (Playwright) DE LA INTEGRACIÓN DE SENTRY: Crear pruebas End-to-End (E2E) con Playwright que naveguen a esta página, hagan clic en los botones para generar errores y luego verifiquen que los eventos se reportan correctamente a Sentry (esto requeriría un mock de la API de Sentry o una verificación post-proceso).
<!-- .docs-espejo/app/sentry-example-page/page.tsx.md -->