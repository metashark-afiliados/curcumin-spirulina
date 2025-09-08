// .docs-espejo/config/locales.config.ts.md
/**
 * @file .docs-espejo/config/locales.config.ts.md
 * @description Documento Espejo y SSoT conceptual para el aparato `locales.config.ts`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */
# Manifiesto Conceptual: `locales.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es la **Piedra Rosetta de la internacionalización** del proyecto. Actúa como la Única Fuente de Verdad (SSoT) inmutable que define un catálogo exhaustivo de idiomas y configuraciones regionales (locales) disponibles para la aplicación.

Su propósito estratégico es desacoplar la lógica de negocio de las cadenas de texto literales (ej. `"it-IT"`), reemplazándolas por referencias a un contrato de datos centralizado y tipo-seguro. Esto implementa la arquitectura "Lean I18n", un pilar de la mantenibilidad a largo plazo del proyecto.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración pura (`"server-only"`) que exporta estructuras de datos. No contiene lógica ejecutable, sino que define los contratos que otros módulos (helpers, middleware, componentes) consumirán.

```mermaid
graph TD
    A["locales.config.ts <br> (SSoT Exhaustiva de Locales)"] --> B["navigation.ts <br> (Define locales activos)"];
    A --> C["locale-detector.helper.ts"];
    A --> D["select-language/page.tsx"];
    A --> E["Otros componentes de UI"];
3. Contrato de API
LOCALES: Un objeto as const que mapea un nombre semántico (ej. IT_IT) a un objeto con id, code, y name. Es la SSoT principal.
SUPPORTED_LOCALES: Un array de solo lectura con todos los objetos de locale.
DEFAULT_LOCALE: El objeto del locale por defecto (es-ES).
AppLocale: El tipo de unión literal de todos los códigos de locale válidos.
4. Zona de Melhorias Futuras
Carga desde CMS/Base de Datos: Para una gestión de contenido dinámica, la lista de locales podría ser cargada desde un CMS o una tabla de configuración.
Mapeo de Direccionalidad (RTL/LTR): Añadir una propiedad direction: 'ltr' | 'rtl' a cada objeto de locale para soportar idiomas que se leen de derecha a izquierda.
Formato de Fecha y Moneda: Incluir formatos de fecha y símbolos de moneda por defecto para cada locale.
Generación Automática de Tipos: Crear un script gen:locales que lea este manifiesto y genere automáticamente el tipo AppLocale.
Bandera del País (Emoji): Añadir una propiedad flag: string con el emoji de la bandera para uso en LanguageSwitcher.
Mapeo a Dominios: Incluir una propiedad domain?: string para soportar una estrategia de i18n basada en dominios diferentes por idioma.
Pruebas de Integridad: Escribir una prueba unitaria que verifique que no haya IDs o códigos duplicados en el manifiesto LOCALES.
Estado de Traducción: Añadir una propiedad translationStatus: 'complete' | 'partial' | 'machine' para rastrear el estado de la traducción.
Interfaz de Gestión: En una futura consola de administración, crear una interfaz para que los administradores de contenido puedan añadir o deshabilitar locales sin tocar el código.
Internacionalización de la Documentación: Traducir este documento espejo.
// .docs-espejo/config/locales.config.ts.md