<!-- .docs-espejo/messages/manifest.ts.md -->
/**
 * @file .docs-espejo/messages/manifest.ts.md
 * @description Documento Espejo y SSoT conceptual para el manifiesto de mensajes.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `messages/manifest.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa maestro de la arquitectura IMAS**. Su única y crítica responsabilidad es proporcionar un registro centralizado de todos los módulos de traducción atómicos disponibles en la aplicación.

Actúa como una capa de descubrimiento que desacopla completamente al orquestador de i18n (`src/i18n.ts`) del conocimiento directo sobre la estructura de archivos en `src/messages/`. El orquestador simplemente lee este mapa y carga lo que está registrado, adhiriéndose al principio de "Configuración sobre Código".

Esta versión refactorizada ha ajustado el tipado de las funciones de importación para ser compatible con la estructura real de los archivos JSON de mensajes, incluyendo arrays de objetos y otros tipos complejos. Esto resuelve errores de compilación y subraya que la validación granular de estas estructuras recae en los schemas Zod de los componentes que consumen `t.raw()`.

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de configuración pura. No tiene lógica de ejecución propia, pero es fundamental en el flujo de inicialización de la i18n.

```mermaid
graph TD
    A["Archivos .json atómicos <br> (src/messages/...)"] -- "Son registrados en" --> B["`src/messages/manifest.ts`"];
    B -- "Es consumido por" --> C["`src/i18n.ts` (Orquestador)"];
    C -- "Carga dinámicamente los módulos" --> A;
3. Contrato de API
messagesManifest: Record<string, () => Promise<{ default: Record<AppLocale, Record<string, any>>; }>>:
Propósito: Un registro (Record) donde cada clave es un namespace de traducción (ej. "components.ui.OrderForm") y el valor es una función de importación dinámica.
Estructura de Retorno de Importación: La promesa resuelve a un objeto con una exportación default que, a su vez, es un Record donde las claves son los AppLocale soportados y los valores son Record<string, any>. Esta tipificación más flexible es clave para permitir la importación de JSONs con estructuras complejas (arrays de objetos, números, booleanos) sin errores de compilación en el manifiesto.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Generación Automática de Manifiesto: La mejora de mayor valor. Implementar un script (ej. pnpm gen:i18n:manifest) que escanee el directorio src/messages y genere este archivo (src/messages/manifest.ts) automáticamente. Esto eliminaría el registro manual, prevendría errores de omisión y garantizaría una sincronización perpetua entre los artefactos y su manifiesto.
Validación de Manifiesto en CI/CD: Añadir un paso en el pipeline de CI/CD que ejecute el script de generación automática y verifique si hay cambios en el manifest.ts. Si hay cambios sin "commitear", la build fallaría, forzando la sincronización del manifiesto.
Comentarios de Origen Automáticos: El script de generación automática podría añadir un comentario encima de cada entrada en messagesManifest indicando la ruta del archivo original (ej. // from: ./components/ui/OrderForm.json) para mejorar la trazabilidad y la comprensión.
Generación de Type Safe t.raw(): Si se implementa un sistema de generación de tipos más avanzado (quizás a partir de schemas Zod), se podría generar un tipo NestedKeyOf o similar que permita tipar el acceso a t.raw() de forma más granular y segura, guiando a los desarrolladores a las rutas correctas para datos complejos.
<!-- .docs-espejo/messages/manifest.ts.md -->