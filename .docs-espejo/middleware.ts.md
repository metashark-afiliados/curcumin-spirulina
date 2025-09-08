// .docs-espejo/middleware.ts.md
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento Espejo y SSoT conceptual para el orquestador de middleware.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `middleware.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **Punto de Entrada Unificado y el Guardián del Edge** de la aplicación. Su rol estratégico es orquestar la ejecución secuencial de una serie de manejadores atómicos que aplican lógica de negocio transversal (como i18n y telemetría) a cada petición entrante.

Su propósito es implementar un pipeline de procesamiento de peticiones que sea observable, resiliente y mantenible, adhiriéndose al principio de "Configuración sobre Código" al definir la secuencia de lógica de forma declarativa.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura se basa en un patrón de "Pipeline Encadenado" envuelto en un contexto de observabilidad.

```mermaid
graph TD
    A[Petición Entrante] --> B(HOC `withCorrelationId`);
    subgraph "Contexto de Correlación"
        B --> C{Pipeline de Middleware};
        C --> D[1. `handleI18n`];
        D --> E[2. `handleTelemetry`];
        E --> F[... Futuros Manejadores];
    end
    F --> G[Respuesta Final al Cliente];

    subgraph "Manejo de Errores"
      C -- Falla Crítica --> H{`try/catch` Global};
      H --> I[Log Error Crítico];
      I --> J[Reescribe a Página de Error 500];
    end
3. Contrato de API
middleware: La función exportada por defecto, que cumple con la firma esperada por Next.js ((request: NextRequest) => Promise<NextResponse>).
config: Un objeto exportado que define el matcher para especificar a qué rutas se aplica el middleware.
4. Zona de Melhorias Futuras
Pipeline Configurable: La lista de manejadores está codificada. Podría ser externalizada a un archivo de configuración (middleware.config.ts) para una mayor flexibilidad.
Manejo de Errores por Etapa: Implementar try/catch individuales alrededor de cada llamada a un manejador dentro del pipeline para permitir que el sistema continúe incluso si un manejador no crítico (como la telemetría) falla.
Bypass Dinámico de Middleware: Añadir una lógica que pueda deshabilitar manejadores específicos basándose en variables de entorno o en cabeceras de la petición, para facilitar la depuración.
Métricas de Rendimiento por Manejador: Registrar la duración de la ejecución de cada manejador individualmente para identificar cuellos de botella en el Edge.
Integración de handleMaintenance: Añadir el manejador de modo de mantenimiento al inicio del pipeline.
Integración de handleRedirects: Añadir el manejador de redirecciones canónicas al pipeline.
Inyección de Dependencias: Refactorizar el pipeline a una clase MiddlewarePipeline que pueda tener dependencias (como el logger) inyectadas para facilitar las pruebas.
Pruebas de Integración del Pipeline: Escribir pruebas de integración que envíen peticiones mock y verifiquen que los manejadores son llamados en el orden correcto y que la respuesta final es la esperada.
Soporte para Múltiples Pipelines: Implementar una lógica en el middleware principal que elija qué pipeline ejecutar basándose en la ruta de la petición (ej. un pipeline para /api y otro para el resto de la app).
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/middleware.ts.md