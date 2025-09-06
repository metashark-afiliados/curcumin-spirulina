<!-- .docs-espejo/components/ui/SchemaInjector.tsx.md -->
/**
 * @file .docs-espejo/components/ui/SchemaInjector.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato SchemaInjector.
 * @author L.I.A. Legacy
 * @version 2.1.0
 */
# Manifiesto Conceptual: Aparato `SchemaInjector`

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar del SEO Técnico**. Su única responsabilidad es actuar como un "inyector" seguro y reutilizable para datos estructurados (JSON-LD) conformes con `Schema.org`.

Estratégicamente, es el mecanismo que permite a nuestros componentes de UI comunicar su significado semántico a los motores de búsqueda, habilitando la aparición de "rich snippets" (estrellas, precios, FAQs) en los resultados de búsqueda, lo que impacta directamente en la visibilidad y la tasa de clics (CTR). Se integra con la API de logging unificada del cliente para una observabilidad completa de la inyección.

## 2. Arquitectura y Flujo de Ejecución

Es un Client Component puro y de utilidad. Su flujo es simple y directo.

```mermaid
graph TD
    A[Componente de Cliente Padre <br> (ej. `TestimonialCard`)] --> B["Pasa prop `schema` a"];
    B --> C["`<SchemaInjector>`"];
    C -- "1. `useEffect` se dispara" --> D{Comprueba si el script existe};
    D -- No existe --> E[Crea `<script type=\"application/ld+json\">`];
    E -- "2. Serializa `schema` a JSON" --> F[Contenido JSON-LD];
    F -- "3. Añade `F` a `E` e inyecta `E` en `document.head`" --> G[HTML Head];
    E -- Errores de Serialización/Inyección --> H["`clientLogger.error()`"];
    G -- En desmontaje --> I[Remueve `E` de `document.head`];
    G --> J["`clientLogger.trace()`"];
3. Contrato de API
Props de Entrada (SchemaInjectorProps):
schema: Record<string, unknown>: El objeto JSON-LD a inyectar, conforme a Schema.org.
Salida:
null (este componente no renderiza nada visualmente).
4. Zona de Mejoras Nuevas (Valor al Proyecto)
VALIDACIÓN DE SCHEMA EN DESARROLLO (Integración Externa): En modo de desarrollo, el componente podría opcionalmente validar el schema recibido contra la API de validación de Google (Rich Results Test) o una librería de tipos de schema-dts para advertir sobre propiedades inválidas o faltantes. Esto añadiría una capa proactiva de QA de SEO.
SOPORTE PARA MÚLTIPLES SCHEMAS (@graph): Extender el componente para que acepte un array de schemas y los ensamble automáticamente en un único script utilizando la propiedad @graph de JSON-LD. Esto es una mejor práctica de SEO para páginas que describen múltiples entidades.
SOPORTE PARA nonce (CSP): Añadir una prop nonce?: string que se pasaría a la etiqueta <script> para cumplir con políticas de seguridad de contenido (CSP) estrictas, mejorando la seguridad general de la aplicación.
MONITOREO DE ERRORES DE INYECCIÓN: Mejorar el logging de errores en el try/catch para incluir más contexto sobre el tipo de error (ej., JSON inválido, problema con document.head) y, potencialmente, enviarlo a Sentry si es un error crítico que impacta el SEO.
DEPURACIÓN VISUAL EN DESARROLLO: Añadir una prop debug?: boolean que, si es true en desarrollo, imprima el JSON serializado en la consola para facilitar la depuración, además de inyectarlo en el DOM.
<!-- .docs-espejo/components/ui/SchemaInjector.tsx.md -->