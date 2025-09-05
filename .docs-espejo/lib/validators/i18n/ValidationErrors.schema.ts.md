// .docs-espejo/lib/validators/i18n/ValidationErrors.schema.ts.md
/**
 * @file .docs-espejo/lib/validators/i18n/ValidationErrors.schema.ts.md
 * @description Documento Espejo y SSoT conceptual para el ensamblador de schemas de error.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `ValidationErrors.schema`

## 1. Rol Estratégico y Propósito

Este aparato es el **ensamblador soberano y la SSoT de la estructura de todos los errores** de la aplicación. Su única responsabilidad es importar todos los schemas de error atómicos (a través del manifiesto `errors/index.ts`) y componerlos en un único **contrato maestro de Zod**.

Este contrato maestro es luego consumido por `src/lib/types/actions.ts` para inferir el tipo `ValidationErrorKey`, que blinda toda la comunicación de errores entre el servidor y el cliente, garantizando una consistencia de élite.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue un patrón de "Manifiesto y Ensamblador", que promueve la escalabilidad.

```mermaid
graph TD
    subgraph "Schemas Atómicos"
        A["`GenericErrors.schema.ts`"]
        B["`AuthErrors.schema.ts` (futuro)"]
    end

    A --> C["`errors/index.ts` (Manifiesto)"];
    B --> C;

    C --> D["`ValidationErrors.schema.ts` (Ensamblador)"];
    D -- "Define `ValidationErrorsSchema`" --> E["`actions.ts`"];
    E -- "Infiere `ValidationErrorKey`" --> F[Toda la Aplicación];
3. Contrato de API
Exportación: export const ValidationErrorsSchema: z.ZodObject<...>
Estructura: Un objeto Zod donde cada clave es un namespace de error (ej. generic) y cada valor es el schema atómico correspondiente importado del manifiesto.
4. Zona de Melhorias Futuras
ENSAMBLAJE AUTOMÁTICO: Criar um script que leia o diretório errors/, gere o errors/index.ts automaticamente e, potencialmente, até mesmo este arquivo ensamblador, eliminando completamente a necessidade de registro manual.
VALIDAÇÃO CRUZADA DE NAMESPACES: Implementar uma verificação em tempo de build que garanta que cada namespace definido aqui tenha um arquivo de mensagens JSON correspondente em src/messages/errors/.
// .docs-espejo/lib/validators/i18n/ValidationErrors.schema.ts.md