// .docs/knowledge-base/next-intl-api.md
/**
 * @file .docs/knowledge-base/next-intl-api.md
 * @description Registro de conocimiento y SSoT para la API de `next-intl`.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */
# Base de Conocimiento: API de `next-intl`

- **Versión Analizada:** 3.26.5
- **Fecha de Análisis:** 2025-09-08
- **Fuente:** Snapshot de `node_modules/next-intl`

## API `next-intl/server` (Server Components)

### 1. `getRequestConfig(async ({ locale }) => ...)`

- **Propósito:** Función de alto orden que se exporta por defecto desde `src/i18n.ts`. Es el punto de entrada que `next-intl` usa para configurar la internacionalización para una petición.
- **Uso Correcto (v3.22+):**
  ```typescript
  import {getRequestConfig} from 'next-intl/server';

  export default getRequestConfig(async () => {
    const locale = await getLocale(); // La forma correcta de obtener el locale

    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default
    };
  });
2. getLocale()
Propósito: Función asíncrona que lee el locale del contexto de la petición actual (establecido por el middleware). Es el reemplazo del parámetro locale obsoleto en getRequestConfig.
Firma: getLocale(): Promise<string>
3. setRequestLocale(locale)
Propósito: Función síncrona utilizada para habilitar el renderizado estático. Se llama al principio de un layout o página estática para informar a next-intl del locale que se está renderizando, evitando el uso de APIs dinámicas como headers().
Firma: setRequestLocale(locale: string): void
4. getTranslations(namespace?)
Propósito: Hook asíncrono para obtener la función de traducción t dentro de un Server Component.
Firma: getTranslations(namespace?: string): Promise<tFunction>
// .docs/knowledge-base/next-intl-api.md