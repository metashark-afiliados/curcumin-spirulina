// .docs-espejo/middleware.ts.md
/**
 * @file .docs-espejo/middleware.ts.md
 * @description Documento Espejo y SSoT conceptual para el orquestador de middleware.
 * @author RaZ Podestá - MetaShark Tech
 * @version 5.1.0
 */

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
4. Zona de Melhorias Futuras
PIPELINE DINÁMICO: Hacer que el pipeline de manejadores se construya dinámicamente a partir de un archivo de configuración, permitiendo reordenar o deshabilitar manejadores sin tocar el código.
MANEJO DE ERRORES POR MANEJADOR: Implementar una lógica en el orquestador que pueda manejar errores específicos de un manejador de forma diferente (ej. si handleAuth falla, redirigir a /login; si handleI18n falla, usar un locale de emergencia).
MÉTRICAS DE RENDIMIENTO POR MANEJADOR: Medir el tiempo de ejecución de cada manejador individualmente y registrarlo para identificar cuellos de botella en el pipeline.
INYECCIÓN DE DEPENDENCIAS: Refactorizar para que los manejadores sean clases que puedan recibir dependencias (como un cliente de base de datos mockeado) para facilitar las pruebas.
CONTEXTO COMPARTIDO ENTRE MANEJADORES: Crear un objeto de contexto (ctx) que se pase de un manejador al siguiente, permitiéndoles compartir datos de forma segura sin depender de cabeceras.
// .docs-espejo/middleware.ts.md