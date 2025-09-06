<!-- .docs-espejo/components/ui/HeroSection.tsx.md -->
/**
 * @file .docs-espejo/components/ui/HeroSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato HeroSection.
 * @author L.I.A. Legacy
 * @version 7.2.0
 */
# Manifiesto Conceptual: Aparato `HeroSection`

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador soberano, resiliente y configurable** de la sección "Hero". Su propósito es capturar la atención del visitante y guiarlo a la conversión.

Como orquestador de Server Components, sus responsabilidades son:
1.  **Obtener Contenido:** Carga su contenido de internacionalización (i18n) de forma asíncrona desde su archivo de mensajes.
2.  **Validar Contenido:** Valida rigurosamente el contenido obtenido contra su Única Fuente de Verdad (SSoT) de esquema (`HeroSection.schema.ts`), garantizando la integridad de los datos.
3.  **Manejar Errores:** Si la validación falla, registra un error detallado con `serverLogger` y se abstiene de renderizar, previniendo fallos en producción y manteniendo la resiliencia.
4.  **Ensamblar UI:** Orquesta la composición de subcomponentes de presentación puros (`HeroContent`, `HeroImage`) y del aparato soberano `OrderForm`.
5.  **Observabilidad:** Utiliza `serverLogger` (con la API unificada `(context, message)`) para registrar su propio flujo de renderizado y cualquier error crítico, contribuyendo a la observabilidad del lado del servidor.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Orquestador de Servidor Validado".

```mermaid
graph TD
    A["`HeroSection.tsx` (Orquestador)"] -- "1. Llama a `getTranslations()`" --> B[Contenido i18n];
    C["`HeroSection.schema.ts` (SSoT)"] --> A;
    A -- "2. Valida B contra C" --> D{¿Validación OK?};
    D -- Sí --> E["Renderiza subcomponentes puros"];
    D -- No --> F["`serverLogger.error()` y retorna `null`"];
3. Contrato de API
Props de Entrada:
Ninguna. Es un componente soberano que obtiene todas sus dependencias internamente.
Contrato de Datos (desde i18n):
Debe cumplir la estructura definida en HeroSectionContentSchema.
4. Zona de Mejoras Nuevas (Valor al Proyecto)
VARIANTES DE LAYOUT (cva o props): Extender el esquema de contenido para incluir una propiedad layout: "image-left" | "image-right" | "full-width-form" y usar class-variance-authority (cva) o lógica condicional para aplicar diferentes clases de grid. Esto permitiría realizar pruebas A/B del layout directamente desde el archivo de contenido de i18n, optimizando la tasa de conversión.
CONTENIDO DESDE CMS DINÁMICO: Refactorizar la obtención de contenido para que provenga de un Headless CMS (ej. Contentful, Strapi) en lugar de los archivos JSON de i18n. El schema Zod seguirá siendo la barrera de validación, haciendo el cambio de fuente de datos seguro y transparente para los componentes.
CTA SECUNDARIO ESTRATÉGICO: Extender el esquema de contenido para permitir un objeto secondaryCta opcional. Si está presente, se renderizaría un segundo botón (ej. "Ver testimonios" o "Saber más") que podría redirigir a otra sección de la página o a otra ruta, ofreciendo una opción adicional de interacción al usuario.
IMAGEN DE FONDO CONFIGURABLE: Permitir una propiedad backgroundImageUrl opcional en el esquema de contenido. Si se proporciona, la sección Hero podría renderizar una imagen de fondo dinámica, lo que permite una mayor personalización visual y campañas de marketing específicas.
ANIMACIÓN DE TEXTO CON ATRIBUTOS: Integrar una librería de animación de texto más avanzada (ej., React Spring, o incluso expandir framer-motion para animar letras o palabras individualmente) para el mainTitle y subtitle, proporcionando una entrada de texto más impactante.
<!-- .docs-espejo/components/ui/HeroSection.tsx.md -->