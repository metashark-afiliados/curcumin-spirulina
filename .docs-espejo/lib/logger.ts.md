// .docs-espejo/lib/logger.ts.md
/**
 * @file .docs-espejo/lib/logger.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `logger.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Manifiesto Conceptual: `logger.ts`

## 1. Rol Estratégico y Propósito

El aparato `logger.ts` es la **Única Fuente de Verdad (SSoT) para toda la observabilidad del lado del servidor**. Su propósito es proporcionar una API de logging unificada, segura y de alto rendimiento que instrumente toda la lógica de backend (Server Components, Server Actions, Route Handlers).

Este aparato implementa una arquitectura de "logging agnóstico al transporte", donde el logger emite logs JSON estructurados a `stdout`, delegando la responsabilidad de la recolección, el formateo y el envío a la infraestructura subyacente (Vercel Log Drains, `pino-pretty` en desarrollo, Sentry en producción).

## 2. Arquitectura y Flujo de Ejecución

El logger se construye sobre `pino` y un pipeline de enriquecimiento y transporte.

```mermaid
graph TD
    A[Server Action / Componente de Servidor] --> B(Invoca `logger.info(...)`);
    B --> C{Pino Core};
    subgraph "Enriquecimiento Automático"
        C --> D["Inyecta `correlationId` <br> (desde `AsyncLocalStorage`)"];
        D --> E["Censura PII <br> (desde `logger.config.ts`)"];
    end
    E --> F{Transporte Condicional};
    subgraph "Entorno"
        F -- "Producción & level >= error" --> G[Transporte a Sentry];
        F -- "Cualquier Entorno" --> H[Emite JSON a stdout];
    end
    subgraph "Consumidor (Fuera de la App)"
      H -- "Desarrollo" --> I[`pnpm pino-pretty`];
      H -- "Producción" --> J[Vercel Log Drain];
    end
3. Contrato de API
logger: Instancia de pino.
Firma de Uso Mandatoria: logger.level({ contexto: Record<string, any> }, "Mensaje"). El primer argumento DEBE ser un objeto de contexto para el logging estructurado.
Manejo de Errores: Los errores DEBEN ser pasados en la clave err: logger.error({ err: error, ... }, "Mensaje").
4. Zona de Melhorias Futuras
Contexto de Usuario Automático: Crear un HOC (withUserContext) para Server Actions que inyecte automáticamente el userId y userRole en el AsyncLocalStorage para que el logger lo incluya en todos los logs de esa transacción.
Transporte a Múltiples Destinos: Enriquecer la configuración del transporte para enviar diferentes niveles de log a diferentes destinos (ej. info a un sistema de analíticas, error a Sentry).
Sincronización de Nivel de Log Dinámico: Implementar una lógica que pueda cambiar el logLevel en tiempo de ejecución sin reiniciar el servidor, a través de una variable de entorno o una tabla de configuración en la DB.
Logging de Performance de Consultas: Crear un wrapper para el cliente de base de datos que mida y registre automáticamente la duración de las consultas SQL lentas (slow query logging).
Validación de Claves de Contexto: Utilizar tipos de TypeScript para definir un LogContext y asegurar que las claves de contexto más comunes (ej. userId, workspaceId) sigan una nomenclatura consistente.
Muestreo de Logs de trace: En producción, implementar un muestreo (sampling) para los logs de nivel trace para reducir el volumen de datos sin perder visibilidad completa.
Integración con Feature Flags: Permitir que el logLevel se ajuste dinámicamente para usuarios o sesiones específicas basándose en un sistema de feature flags, para una depuración dirigida en producción.
Contexto de Request Completo: Crear un middleware que inyecte un resumen del objeto request (método, URL, cabeceras clave) en el AsyncLocalStorage para un logging de peticiones más rico.
Detección de Formato de Log: El logger podría detectar si está en un entorno que soporta pino-pretty y ajustar su salida, aunque el enfoque actual de pipe es más robusto.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/lib/logger.ts.md