// .docs-espejo/messages/manifest.ts.md
/\*\*

- @file .docs-espejo/messages/manifest.ts.md
- @description Documento Espejo y SSoT conceptual para el manifiesto de mensajes.
- @author RaZ Podestá - MetaShark Tech
- @version 1.0.0
  \*/

# Manifiesto Conceptual: Aparato `messages/manifest.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **mapa maestro de la arquitectura IMAS**. Su única y crítica responsabilidad es proporcionar un registro centralizado de todos los módulos de traducción atómicos disponibles en la aplicación.

Actúa como una capa de descubrimiento que desacopla completamente al orquestador de i18n (`i18n.ts`) del conocimiento directo sobre la estructura de archivos en `src/messages/`. El orquestador simplemente lee este mapa y carga lo que está registrado, adhiriéndose al principio de "Configuración sobre Código".

## 2. Arquitectura y Flujo de Ejecución

Este es un aparato de configuración pura. No tiene lógica de ejecución propia, pero es fundamental en el flujo de inicialización de la i18n.

```mermaid
graph TD
    A["Archivos .json atómicos <br> (src/messages/components/...)"] -- "Son registrados en" --> B["manifest.ts"];
    B -- "Es consumido por" --> C["i18n.ts (Orquestador)"];
    C -- "Carga dinámicamente los módulos" --> A;
3. Contrato de API
Exportación: export const messagesManifest: Record<string, ManifestModule>
Estructura de Clave: Un string que representa el namespace, derivado de la ruta del archivo (ej. components.ui.OrderForm).
Estructura de Valor: Una función de importación dinámica (() => import(...)) que devuelve una promesa que resuelve al módulo de mensajes.
4. Zona de Mejoras Futuras
Generación Automática: Implementar un script (pnpm gen:i18n:manifest) que escanee el directorio src/messages y genere este archivo automáticamente. Esto eliminaría el registro manual y prevendría errores de omisión.
Validación de Manifiesto en CI/CD: Añadir un paso en el pipeline de CI/CD que ejecute el script de generación y verifique si hay cambios. Si hay cambios sin "commitear", la build fallaría, forzando la sincronización del manifiesto.
Soporte para Namespaces Anidados Profundos: Asegurar que el script de generación pueda manejar estructuras de directorios más complejas si fuera necesario.
Documentación en Español: Traducir este documento espejo al español.
Comentarios de Origen: El script de generación podría añadir un comentario encima de cada entrada indicando la ruta del archivo original (// from: ./components/ui/OrderForm.json).
Carga Condicional de Módulos: Explorar un patrón donde el manifiesto pueda incluir metadatos para cargar ciertos módulos solo en rutas específicas, para una optimización de carga aún más granular.
Integración con Herramientas de Traducción: El manifiesto podría ser utilizado por herramientas externas para identificar todos los archivos que necesitan ser enviados a traducción.
Tipado Dinámico de Namespaces: Investigar si es posible generar un tipo NamespaceKey a partir de las claves de este manifiesto para un autocompletado aún más estricto en el useTranslations.
Manejo de Módulos Compartidos: Definir una convención para namespaces "compartidos" (ej. shared.errors) para que sean fácilmente identificables.
Alerta de Módulos Vacíos: El script de generación podría advertir si un archivo JSON registrado está vacío o no contiene traducciones para el locale por defecto.
// .docs-espejo/messages/manifest.ts.md
```
