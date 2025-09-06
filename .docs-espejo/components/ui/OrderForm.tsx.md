<!-- .docs-espejo/components/ui/OrderForm.tsx.md -->
/**
 * @file .docs-espejo/components/ui/OrderForm.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato OrderForm.
 * @author L.I.A. Legacy
 * @version 9.2.0
 */
# Manifiesto Conceptual: Aparato `OrderForm`

## 1. Rol Estratégico y Propósito

Este aparato es la **máquina de conversión soberana y de élite** de la aplicación. Su propósito es orquestar todo el flujo de captura de leads de forma resiliente y con una observabilidad completa.

Sus responsabilidades son:

1.  **Orquestar la Oferta:** Compone y orquesta el componente `PriceDisplay`.
2.  **Capturar Datos:** Renderiza los campos de entrada para el nombre y el teléfono.
3.  **Validar Datos (IMAS-E):** Utiliza una factoría de schemas Zod (`getOrderFormSchema`) para construir un validador con **mensajes de error 100% internacionalizados** (`OrderFormContent.schema.ts`).
4.  **Enriquecer Datos:** Consume el contexto `GeoIPProvider` (`useGeoIP`) para obtener el país del usuario y pre-rellenar un campo oculto (`geo`), mejorando la precisión de los leads.
5.  **Garantizar Atribución:** Contiene los campos ocultos esenciales (`landing_id`, `offer_id`, `utm_source`, `lang`) que son llenados por el script global `webvork.js` y la lógica del componente.
6.  **Someter Datos:** Realiza la subida del formulario al endpoint del productor a través de una subida nativa (`method="POST"`) para máxima compatibilidad y resiliencia.
7.  **Observabilidad de Conversión:** Integra `clientLogger` (con la API unificada `(context, message)`) para registrar eventos clave del ciclo de vida del formulario (carga, validación, subida), crucial para el análisis y la depuración del funnel de conversión.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Orquestador de Cliente Resiliente".

```mermaid
graph TD
    subgraph Orquestador (OrderForm.tsx)
        A["`useTranslations('OrderForm')` <br> (Obtiene contenido i18n)"];
        B["`useGeoIP()` <br> (Obtiene datos GeoIP)"];
        C["`getOrderFormSchema(t.raw('validation'))` <br> (Construye Schema Zod)"];
        D["`OrderFormContentSchema.safeParse(t.raw(''))` <br> (Valida Contenido i18n)"];
    end

    subgraph Componentes de Presentación Puros
        E["`<PriceDisplay.tsx>`"];
        F["`<FormInput.tsx>` <br> (Nombre, Teléfono)"];
        G["`<Button.tsx>` <br> (CTA Final)"];
    end

    H["`clientLogger` <br> (Registra eventos y errores)"];
    I["`webvork.js` <br> (Rellena campos UTM)"];
    J[Endpoint del Productor <br> (https://it4.curcumacomplex.com/order.php)];

    A --> D;
    D -- Validación OK --> C;
    D -- Validación FALLIDA --> H; // Log y retorna null
    C -- Provee schema a `useForm` --> OrderForm;

    OrderForm -- Pasa props --> E & F & G;
    B -- Rellena `geo` input --> OrderForm;
    I -- Rellena `utm_source` etc. --> OrderForm;

    K[Usuario Envía Formulario] --> L{`handleSubmit(onValidSubmit)`};
    L -- `react-hook-form` Validates --> M{Validación Zod};
    M -- OK --> H; // Log de éxito
    M -- OK --> N[Set `isSubmitting(true)`];
    N --> O[Subida POST Nativa a J];
    M -- FALLIDA --> H; // Log de error
    M -- FALLIDA --> F; // Muestra Errores en `FormInput`
3. Contrato de API
Props de Entrada: Ninguna. Este es un componente soberano y autocontenido.
Contrato de Salida (Campos del Formulario): name, phone, lang, geo, landing_id, offer_id, y campos UTM. Todos son enviados directamente al endpoint del productor.
Observabilidad: Emite logs estructurados vía clientLogger para el ciclo de vida del formulario.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
SUBMISIÓN AJAX CON FALLBACK RESILIENTE: Implementar la subida del formulario mediante fetch (AJAX) para evitar el recargado de página y proporcionar feedback asíncrono con react-hot-toast. Mantener la subida POST nativa como un fallback robusto en caso de que la subida AJAX falle (ej., problemas de red, errores de JavaScript).
MÁSCARA DE INPUT DE TELÉFONO AVANZADA: Integrar una librería como react-imask en el componente FormInput para aplicar máscaras de formato al número de teléfono en tiempo real. Esto mejoraría la experiencia del usuario y reduciría errores de entrada.
SELECTOR DE PAÍS VISIBLE Y EDITABLE: Añadir un componente <select> para que el usuario pueda seleccionar su país. Este selector se pre-seleccionaría con los datos de useGeoIP, pero permitiría al usuario corregirlo si la detección es incorrecta. Esto mejoraría la usabilidad y la tasa de conversión.
TRACKING DE ABANDONO DE FORMULARIO: Integrar con una herramienta de analítica (o un evento de telemetría personalizado) para registrar eventos cuando un usuario empieza a rellenar el formulario pero no lo envía. Esto es una mina de oro para identificar fricciones en el proceso de conversión.
CAMPO "HONEYPOT" ANTI-SPAM ACCESIBLE: Añadir un campo oculto para humanos pero visible para bots (conocido como "honeypot"). Si un bot rellena este campo (lo cual no deberían hacer los usuarios), la subida se puede descartar silenciosamente. Asegurar que sea accesible para lectores de pantalla.
VALIDACIÓN DE TELÉFONO POR PAÍS MÁS ROBUSTA: Utilizar una librería como libphonenumber-js en conjunto con un refine() de Zod para validar que el formato del número de teléfono es correcto para el país detectado por GeoIP o seleccionado por el usuario.
CONFIRMACIÓN VISUAL DE ÉXITO: Después de una subida exitosa (incluso si es nativa y recarga la página), considerar un parámetro de URL que active una notificación de "Pedido Enviado con Éxito" en la página de agradecimiento.
<!-- .docs-espejo/components/ui/OrderForm.tsx.md -->