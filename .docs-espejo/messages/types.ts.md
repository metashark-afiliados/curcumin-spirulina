<!-- .docs-espejo/messages/types.ts.md -->
/**
 * @file .docs-espejo/messages/types.ts.md
 * @description Documento Espejo y SSoT conceptual para los tipos de la arquitectura de mensajes.
 * @author L.I.A. Legacy
 * @version 2.3.0
 */
# Manifiesto Conceptual: Aparato `messages/types.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **diccionario de la arquitectura IMAS**. Su única responsabilidad es definir los **contratos de datos (tipos de TypeScript)** que gobiernan la estructura de los módulos de mensajes (`.json`), el manifiesto (`manifest.ts`) que los registra, y la estructura recursiva de los mensajes esperada por `next-intl`.

Actúa como una Única Fuente de Verdad (SSoT) para los tipos del dominio de mensajes, garantizando que el `messagesManifest` y el orquestador `i18n.ts` se comuniquen de forma segura y predecible. La definición de `AbstractIntlMessages` ha sido ajustada para alinearse estrictamente con lo que `next-intl` espera para su objeto de mensajes principal, resolviendo incompatibilidades de tipos y promoviendo el uso correcto de `t()` y `t.raw()`.

## 2. Arquitectura y Flujo de Ejecución

Como archivo de definición de tipos, no tiene un flujo de ejecución, sino un flujo de dependencias conceptuales y de compilación.

```mermaid
graph TD
    A["`src/messages/types.ts` <br> (Define `AbstractIntlMessages`, `MessageModule`, `ManifestModule`)"] --> B["`src/messages/manifest.ts` <br> (Implementa `ManifestModule`)"];
    A --> C["`src/i18n.ts` <br> (Consume `MessageModule`, `AbstractIntlMessages`)"];
    B & C --> D[Toda la Aplicación <br> (Consume Mensajes Tipo-Seguros)];
3. Contrato de API
AbstractIntlMessages: type:
Propósito: Un tipo recursivo que representa la estructura estándar de los mensajes de internacionalización, tal como next-intl puede manejar directamente para la interpolación. Un mensaje puede ser una string o un objeto que contenga más AbstractIntlMessages.
Importante: Para acceder a estructuras de datos más complejas (ej., arrays de objetos, números o booleanos que no se desean interpolar como strings), se recomienda encarecidamente utilizar el método t.raw('namespace.key') en el componente consumidor y luego validar su estructura con Zod. Esto mantiene la seguridad de tipos y la claridad arquitectónica.
MessageModule: type:
Propósito: Define la forma que debe tener cada archivo .json de mensajes: un objeto donde cada clave es un AppLocale soportado y el valor es un objeto de mensajes con la estructura AbstractIntlMessages.
ManifestModule: type:
Propósito: Define la firma de las funciones de importación dinámica que contiene el messagesManifest. Cada función debe resolver a un módulo con una exportación default del tipo MessageModule.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
Generación de Tipo Messages Global (con Zod y t.raw): Crear un script que combine los schemas Zod existentes de cada sección/componente para generar un tipo Messages global. Este tipo, en conjunto con AbstractIntlMessages para t(), permitiría una tipificación precisa para t.raw(), mejorando la seguridad de tipos para el acceso a datos estructurados complejos.
Tipo NestedKeyOf para useTranslations (con t.raw): Con el tipo Messages global, implementar un tipo de utilidad NestedKeyOf que transforme ese tipo en una unión de strings con notación de punto. Esto habilitaría un autocompletado de élite y una seguridad de tipos granular al usar t.raw() en los componentes, guiando al desarrollador a las rutas correctas para datos complejos.
Validación de t.raw() con Zod Automática: Explorar si es posible integrar un sistema que, al usar t.raw(), sugiera automáticamente un schema Zod para validar el resultado, basándose en la configuración de i18n.ts y los schemas existentes de los componentes.
Mensajes Plurales y Contextuales Tipados: Ampliar el tipo AbstractIntlMessages y la lógica de carga para soportar de forma tipo-segura los mensajes plurales (one, other) y contextuales que next-intl puede manejar, que son fundamentales para una internacionalización completa.
<!-- .docs-espejo/messages/types.ts.md -->