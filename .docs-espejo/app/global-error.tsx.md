<!-- .docs-espejo/app/global-error.tsx.md -->
/**
 * @file .docs-espejo/app/global-error.tsx.md
 * @description Documento Espejo y SSoT conceptual para el componente de error global del cliente.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `global-error.tsx` (Client-Side)

## 1. Rol Estratégico y Propósito

Este aparato es el **"Escudo de Resiliencia" de última instancia en el cliente**. Su única responsabilidad es capturar y gestionar los errores de nivel superior que ocurren en la aplicación del lado del cliente, previniendo una interrupción completa de la experiencia del usuario y asegurando la observabilidad de estos fallos críticos.

Como Client Component (`"use client"`), es el punto central donde se implementa una estrategia de "falla limpia y observable":
1.  **Reporte a Sentry:** Envía automáticamente los errores capturados a Sentry, proporcionando un sistema de monitoreo en tiempo real para entornos de producción.
2.  **Logging Local:** Registra una copia detallada del error en la consola del navegador utilizando `clientLogger`, lo cual es invaluable para la depuración en desarrollo y como una capa de fallback si el reporte a Sentry falla.
3.  **UI de Fallback:** Delega la visualización de una página de error genérica a `NextError`, manteniendo una interfaz consistente para el usuario incluso en caso de fallos graves.

## 2. Arquitectura y Flujo de Ejecución

Es un Client Component especial de Next.js, invocado automáticamente por el framework cuando se produce un error en el árbol de componentes del cliente que no ha sido capturado por un `ErrorBoundary` más específico.

```mermaid
graph TD
    A[Error en Componente Cliente] --> B{Next.js App Router};
    B -- "Error no capturado" --> C["`global-error.tsx`"];
    C -- "1. Se monta `GlobalError`" --> D["`useEffect` se dispara"];
    D --> E["`Sentry.captureException(error)`"];
    D --> F["`clientLogger.error({ context }, 'message')`"];
    E & F --> G[Reporte a Sentry y Log Local];
    C --> H["Renderiza `<NextError statusCode={0} />`"];
    H --> I[UI de Error Genérica];
3. Contrato de API
Props de Entrada:
error: Error & { digest?: string }: El objeto de error capturado por Next.js, que incluye la instancia de Error y un digest opcional para identificar errores durante el SSR.
Salida:
Un React.ReactElement que renderiza la página de error de fallback.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
UI DE ERROR PERSONALIZADA Y LOCALIZADA: En lugar de depender completamente de NextError, crear una UI de error personalizada que utilice las traducciones de next-intl para mostrar un mensaje más amigable y localizado al usuario, con opciones como "Volver al inicio" o "Contactar soporte".
REINTENTO DE REPORTE A SENTRY: Implementar una lógica de reintento con "exponential backoff" si el Sentry.captureException falla (ej., por problemas de red o porque Sentry está bloqueado). Esto aumentaría la fiabilidad del monitoreo de errores.
ALMACENAMIENTO LOCAL DE ERRORES: En escenarios de offline-first o para depuración avanzada, almacenar los errores capturados en localStorage o IndexedDB y reintentar enviarlos a Sentry o a un endpoint de telemetría cuando la conexión se restablezca.
CONTEXTO DE ERROR MEJORADO (CON TelemetryProvider): Aunque clientLogger ya lo enriquece, el GlobalError podría intentar obtener más contexto del TelemetryProvider (ej., sessionId, últimos eventos) e incluirlo en el reporte de Sentry y en el log, proporcionando una visión más completa de lo que llevó al error.
MECANISMO DE "RELOAD" CONTROLADO: Ofrecer un botón de "Recargar la página" en la UI de error que intente una recarga limpia del navegador, quizás borrando el localStorage o ciertas cookies para intentar resolver el estado de la aplicación corrupto.
<!-- .docs-espejo/app/global-error.tsx.md -->