==================== INICIO DEL ARCHIVO [.docs/todo.md] ====================
// .docs/todo.md
/**
@file .docs/todo.md
@description Manifiesto de Tareas y Roadmap de Ejecución. Esta es la SSoT para la refactorización e implementación de la infraestructura base en el proyecto curcumin-complex.
@author IA Ingeniera de Software Senior v2.0
@version 1.0.0
*/
Manifiesto de Tareas: Implementación de Infraestructura Base
1. Filosofía de Ejecución
La misión es transferir la lógica de observabilidad e internacionalización del proyecto convertikit a curcuma-complex de la forma más simple, limpia y funcional posible. Se eliminará toda complejidad asociada a multi-tenancy y autenticación de usuarios. Cada paso se ejecutará de forma atómica para construir una base estable.
2. Fases de Implementación
Fase 1: Fundación de la Configuración y Observabilidad
Objetivo: Establecer la configuración del proyecto y la infraestructura de logging, que es una dependencia para todos los demás módulos.
Tarea 1.1: Configuración del Proyecto
Prompt: "Inicia la refactorización configurando los archivos base del proyecto."
Checklist:

Aparato next.config.mjs: Implementar la configuración base, incluyendo la integración con Sentry y una Política de Seguridad de Contenido (CSP) simplificada (sin dominios de auth).

Aparato package.json: Añadir los scripts de dev:pretty, diag:* y gen:*.
Tarea 1.2: Pilar de Observabilidad - Logging
Prompt: "Implementa el pilar de Observabilidad, comenzando por el logger."
Checklist:

Aparato src/config/logger.config.ts: Crear el manifiesto de censura de datos sensibles.

Aparato src/lib/helpers/correlation-id.helper.ts: Crear el helper para la gestión de IDs de correlación.

Aparato src/lib/logger.ts: Implementar la SSoT de logging con pino para el servidor.

Aparato src/lib/client-logger.ts: Crear el logger de cliente (console wrapper).
Fase 2: Construcción del Middleware y la Lógica de Negocio
Objetivo: Implementar el pipeline de manejo de peticiones y la lógica de internacionalización detallada.
Tarea 2.1: Orquestador de Middleware
Prompt: "Construye el orquestador del middleware y su primer manejador: i18n."
Checklist:

Aparato src/lib/helpers/geoip.helper.ts: Crear helper de GeoIP.

Aparato src/lib/helpers/locale-detector.helper.ts: Crear helper de detección de locale.

Aparato src/middleware/handlers/i18n/index.ts: Crear el manejador de i18n que implementa el flujo Navegador -> GeoIP -> Redirección a /select-language.

Aparato src/middleware.ts: Crear el orquestador principal del pipeline.
Tarea 2.2: Página de Selección de Idioma
Prompt: "Implementa la página de selección de idioma con el modal y el temporizador."
Checklist:

Aparato src/app/select-language/page.tsx: Crear la página que mostrará el selector de idioma.

Lógica de Cliente: Implementar en la página la lógica del modal que se muestra por 5 segundos y redirige al idioma por defecto si no hay interacción.
Tarea 2.3: Pilar de Observabilidad - Telemetría
Prompt: "Implementa el manejador de telemetría para el tracking de sesiones anónimas."
Checklist:

Aparato src/lib/actions/telemetry/logTelemetryEvent.action.ts: Crear la Server Action para registrar eventos.

Aparato src/config/telemetry.config.ts: Crear el manifiesto de configuración de telemetría.

Aparato src/middleware/handlers/telemetry/index.ts: Crear el manejador que inicia la sesión de telemetría en la primera visita.
Fase 3: Integración Final y Fallbacks
Objetivo: Integrar la nueva infraestructura con el resto de la aplicación y asegurar que los fallbacks de error estén correctamente instrumentados.
Tarea 3.1: Layouts y Proveedores
Prompt: "Crea e instrumenta los layouts raíz de la aplicación."
Checklist:

Aparato src/app/layout.tsx: Crear el layout raíz global.

Aparato src/app/[locale]/layout.tsx: Crear el layout de locale, instrumentándolo con los proveedores de Telemetría.
Tarea 3.2: Manejo de Errores Globales
Prompt: "Implementa y refactoriza los manejadores de error globales."
Checklist:

Aparato src/app/not-found.tsx: Crear el manejador 404 a nivel raíz (para rutas sin locale).

Aparato src/app/[locale]/not-found.tsx: Crear el manejador 404 a nivel de locale.

Aparato src/app/global-error.tsx: Refactorizar el componente existente para que consuma el clientLogger y Sentry.
// .docs/todo.md
==================== FIN DEL ARCHIVO [.docs/todo.md] ====================