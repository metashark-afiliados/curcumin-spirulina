// .docs-espejo/middleware.ts.md
/\*\*

- @file .docs-espejo/middleware.ts.md
- @description Documento Espejo y SSoT conceptual para el orquestador de middleware.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `middleware.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **director de orquesta del Edge**. Su única responsabilidad es definir y ejecutar el **pipeline de manejadores de middleware** en una secuencia declarativa y predecible.

No contiene lógica de negocio. Su propósito es la orquestación, el control de flujo, la observabilidad y el manejo de errores a nivel de pipeline, garantizando que cada petición sea procesada de forma segura y consistente antes de llegar a la aplicación.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura es un pipeline secuencial envuelto en un contexto de observabilidad.

```mermaid
graph TD
    A[Petición Entrante] --> B["`middleware()`"];
    B -- "Inicia Contexto" --> C["`withCorrelationId`"];
    C -- "Ejecuta" --> D[Pipeline de Manejadores];
    D -- "1. `handleI18n`" --> D;
    D -- "2. `handleAuth` (futuro)" --> D;
    D -- "3. `handleTelemetry` (futuro)" --> D;
    D -- "Retorna `NextResponse` final" --> C;
    C -- "Retorna `NextResponse`" --> B;
    B --> E[Respuesta al Cliente];
3. Contrato de API
middleware(request: NextRequest): Promise<NextResponse>: La función principal exportada que cumple con la API de Middleware de Next.js.
config: { matcher: string[] }: La configuración que define a qué rutas se aplica el middleware.
4. Zona de Mejoras Futuras
Pipeline Dinámico: Hacer que el pipeline de manejadores se construya dinámicamente a partir de un archivo de configuración, permitiendo reordenar o deshabilitar manejadores sin tocar el código.
Manejo de Errores por Manejador: Implementar una lógica en el orquestador que pueda manejar errores específicos de un manejador de forma diferente (ej. si handleAuth falla, redirigir a /login; si handleI18n falla, usar un locale de emergencia).
Métricas de Performance por Manejador: Medir el tiempo de ejecución de cada manejador individualmente y registrarlo para identificar cuellos de botella en el pipeline.
Documentación en Español: Traducir este documento espejo al español.
Bypass de Pipeline para Rutas Específicas: Añadir una lógica al inicio que, para ciertas rutas (ej. /health), pueda saltarse todo el pipeline y retornar una respuesta inmediata.
Inyección de Dependencias: Refactorizar para que los manejadores sean clases que puedan recibir dependencias (como un cliente de base de datos mockeado) para facilitar las pruebas.
Soporte para Múltiples Pipelines: Implementar una lógica que, basándose en el pathname de la petición, pueda seleccionar y ejecutar diferentes pipelines (ej. un pipeline para /api/* y otro para el resto de la app).
Integración con Feature Flags: El orquestador podría consultar un servicio de feature flags para habilitar o deshabilitar manejadores dinámicamente en producción.
Contexto Compartido entre Manejadores: Crear un objeto de contexto (ctx) que se pase de un manejador al siguiente, permitiéndoles compartir datos de forma segura sin depender de cabeceras.
Pruebas de Integración del Pipeline: Crear un arnés de pruebas que ejecute el pipeline completo con mocks de cada manejador para validar la lógica de orquestación, el control de flujo y el manejo de errores.
// .docs-espejo/middleware.ts.md
```
