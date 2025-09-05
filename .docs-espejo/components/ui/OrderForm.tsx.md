// .docs-espejo/components/ui/OrderForm.tsx.md
/**
 * @file .docs-espejo/components/ui/OrderForm.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato OrderForm.
 * @author L.I.A. Legacy
 * @version 3.0.0
 */
# Manifiesto Conceptual: Aparato `OrderForm`

## 1. Rol Estratégico y Propósito

Este aparato es la **máquina de conversión soberana y de élite** de la aplicación. Su propósito es orquestar todo el flujo de captura de leads:

1.  **Orquestar la Oferta:** Compone y orquesta el componente `PriceDisplay`.
2.  **Capturar Datos:** Renderiza los campos de entrada para el nombre y el teléfono.
3.  **Validar Datos (IMAS-E):** Utiliza una factoría de schemas Zod para construir un validador con **mensajes de error 100% internacionalizados**.
4.  **Enriquecer Datos:** Consume el contexto `GeoIPProvider` para obtener el país del usuario.
5.  **Garantizar Atribución:** Contiene los campos ocultos necesarios que son llenados por el script global `webvork.js`.
6.  **Someter Datos:** Realiza la subida del formulario al endpoint del productor a través de una subida nativa para máxima compatibilidad.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Hook Soberano / Componente de Presentación Puro", donde `OrderForm` actúa como el orquestador soberano.

```mermaid
graph TD
    subgraph Orquestador (OrderForm.tsx)
        A["`useTranslations('OrderForm')`"];
        B["`useGeoIP()`"];
        C["`getOrderFormSchema(t)`"];
    end

    subgraph Componentes Puros
        D["`PriceDisplay.tsx`"];
        E["`FormInput.tsx`"];
    end

    A -- "Pasa props de i18n" --> D & E;
    B -- "Actualiza <input name='geo'>" --> F[Payload del Formulario];
    G[webvork.js] -- "Llena campos UTM" --> F;

    I[Usuario envía] --> J{Validación RHF/Zod};
    J -- OK --> K[POST nativo a Productor];
    J -- KO --> L[Muestra Errores UI (internacionalizados)];
3. Contrato de API
Props de Entrada: Ninguna. Es un componente soberano y autocontenido.
Contrato de Salida (Campos del Formulario): name, phone, lang, geo, landing_id, offer_id, y campos UTM.
4. Zona de Melhorias Futuras
SUBMISSÃO AJAX COM FALLBACK: Implementar una subida con fetch para evitar el recargado de página y usar react-hot-toast para feedback, manteniendo el POST nativo como fallback para resiliencia.
MÁSCARA DE INPUT DE TELEFONE: Integrar una biblioteca como react-imask en el FormInput para formatear el número de teléfono en tiempo real.
SELECTOR DE PAÍS VISIBLE: Añadir un <select> para el país, preseleccionado con los datos de useGeoIP, permitiendo al usuario corregirlo si es necesario.
TRACKING DE ABANDONO DE FORMULARIO: Integrar con una herramienta de analítica para registrar eventos cuando un usuario empieza a rellenar el formulario pero no lo envía.
CAMPO "HONEYPOT" ANTI-SPAM: Añadir un campo oculto para humanos pero visible para bots para prevenir spam.
VALIDACIÓN DE TELÉFONO POR PAÍS: Utilizar una librería como libphonenumber-js para validar que el formato del número de teléfono es correcto para el país detectado por GeoIP, usando un refine en el schema Zod.
// .docs-espejo/components/ui/OrderForm.tsx.md