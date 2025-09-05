// .docs-espejo/components/ui/SchemaInjector.tsx.md
/**
 * @file .docs-espejo/components/ui/SchemaInjector.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato SchemaInjector.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `SchemaInjector`

## 1. Rol Estratégico y Propósito

Este aparato es un **pilar del SEO Técnico**. Su única responsabilidad es actuar como un "inyector" seguro y reutilizable para datos estructurados (JSON-LD) conformes con `Schema.org`.

Estratégicamente, es el mecanismo que permite a nuestros componentes de UI comunicar su significado semántico a los motores de búsqueda, habilitando la aparición de "rich snippets" (estrellas, precios, FAQs) en los resultados de búsqueda, lo que impacta directamente en la visibilidad y la tasa de clics (CTR).

## 2. Arquitectura y Flujo de Ejecución

Es un Server Component puro y de utilidad. Su flujo es simple y directo.

```mermaid
graph TD
    A[Componente de Servidor Padre <br> (ej. `HomePage`, `TestimonialCard`)] --> B["Llama a una factoría de schemas <br> (ej. `generateProductSchema()`)"];
    B --> C[Obtiene objeto JSON-LD];
    C -- "Pasa como prop `schema` a" --> D["`<SchemaInjector>`"];
    D -- "Renderiza" --> E["`<script type=\"application/ld+json\">...`"];
    E -- "Next.js lo inyecta en el" --> F["`<head>` del HTML"];
3. Contrato de API
Props de Entrada (SchemaInjectorProps):
schema: Record<string, unknown>: El objeto JSON-LD a inyectar.
Salida: Un React.ReactElement que representa la etiqueta <script>.
4. Zona de Melhorias Futuras
VALIDACIÓN DE SCHEMA EN DESARROLLO: En modo de desarrollo, el componente podría validar el schema recibido contra una librería de tipos de schema-dts para advertir sobre propiedades inválidas o faltantes.
SOPORTE PARA MÚLTIPLES SCHEMAS (@graph): Extender el componente para que acepte un array de schemas y los ensamble automáticamente en un único script utilizando la propiedad @graph de JSON-LD.
MANEJO DE ERRORES DE SERIALIZACIÓN: Envolver JSON.stringify en un try/catch. Si la serialización falla (ej. por una referencia circular), registrar un error con serverLogger y renderizar null.
SOPORTE PARA nonce (CSP): Añadir una prop nonce?: string que se pasaría a la etiqueta <script> para cumplir con políticas de seguridad de contenido (Content Security Policy) estrictas.
MODO DEBUG: Añadir una prop debug?: boolean que, si es true en desarrollo, también imprima el JSON en un console.log para facilitar la depuración.
LOGGING DE TAMAÑO: Registrar el tamaño en bytes del JSON serializado para monitorear posibles impactos en el rendimiento por schemas demasiado grandes.
DOCUMENTACIÓN EN ESPAÑOL: Traducir este documento espejo al español.
INTEGRACIÓN CON GOOGLE RICH RESULTS TEST API: Crear un script de CI/CD que renderice páginas clave, extraiga el JSON-LD inyectado y lo envíe a la API de Google para una validación automatizada.
TIPADO DE PROPS MÁS ESTRICTO: En lugar de Record<string, unknown>, se podrían crear tipos más específicos como ProductSchemaProps, ReviewSchemaProps para una mayor seguridad de tipos.
GENERACIÓN DE key AUTOMÁTICA: Si se implementa el soporte para múltiples schemas, generar automáticamente un key para la etiqueta <script> basado en un hash del contenido para evitar conflictos.
// .docs-espejo/components/ui/SchemaInjector.tsx.md