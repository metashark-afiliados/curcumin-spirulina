// .docs-espejo/components/ui/HeroSection.tsx.md
/**
 * @file .docs-espejo/components/ui/HeroSection.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato HeroSection.
 * @author L.I.A. Legacy
 * @version 6.0.0
 */
# Manifiesto Conceptual: Aparato `HeroSection`

## 1. Rol Estratégico y Propósito

Este aparato es el **orquestador soberano, resiliente y configurable** de la sección "Hero". Su propósito es capturar la atención del visitante y guiarlo a la conversión.

Como orquestador, sus responsabilidades son:
1.  **Obtener Contenido:** Carga su contenido desde su archivo de mensajes i18n.
2.  **Validar Contenido:** Valida rigurosamente el contenido contra su SSoT de schema (`HeroSection.schema.ts`), garantizando la integridad de los datos.
3.  **Manejar Errores:** Si la validación falla, registra un error detallado y se abstiene de renderizar, previniendo fallos en producción.
4.  **Ensamblar UI:** Orquesta la composición de subcomponentes de presentación puros (`HeroContent`, `HeroImage`) y del aparato soberano `OrderForm`.

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
Props de Entrada: Ninguna. Es un componente soberano.
Contrato de Datos (desde i18n): Debe cumplir la estructura definida en HeroSectionContentSchema.
4. Zona de Melhorias Futuras
VARIANTES DE LAYOUT (cva): Extender el schema para incluir una propiedad layout: "image-left" | "image-right" y usar cva para aplicar diferentes clases de grid, permitiendo pruebas A/B del layout directamente desde el archivo de contenido.
CONTENIDO DESDE CMS: Reemplazar getTranslations con una llamada a un Headless CMS. El schema Zod seguirá siendo la barrera de validación, haciendo el cambio de fuente de datos seguro y transparente.
CTA SECUNDARIO: Extender el schema para permitir un objeto secondaryCta opcional que, si está presente, renderice un segundo botón (ej. "Leer más").
IMAGEN DE FONDO CONFIGURABLE: Permitir una propiedad backgroundImage opcional en el schema para personalizar el fondo de la sección.
// .docs-espejo/components/ui/HeroSection.tsx.md