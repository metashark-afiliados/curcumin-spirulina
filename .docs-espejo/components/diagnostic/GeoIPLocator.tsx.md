// .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
/**
 * @file .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md
 * @description Documento Espejo y SSoT conceptual para el aparato GeoIPLocator.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifiesto Conceptual: Aparato `GeoIPLocator`

## 1. Rol Estratégico y Propósito

Este aparato es un **proveedor de contexto de cliente**. Su única responsabilidad es detectar la información de geolocalización del usuario a través de una API de GeoIP en el navegador y proveer estos datos a cualquier componente de la aplicación que los necesite (ej. `OrderForm`) de una manera desacoplada y eficiente.

Estratégicamente, permite la personalización de la experiencia del usuario, como preseleccionar el país en formularios, mostrar ofertas específicas por región o adaptar el contenido al `locale` más probable del visitante.

## 2. Arquitectura y Flujo de Ejecución

La arquitectura sigue el patrón "Proveedor de Contexto" de React, separando la lógica de obtención de datos de su consumo.

```mermaid
graph TD
    A[Componente `GeoIPProvider` se monta en el árbol] --> B["`useEffect` se dispara una vez"];
    B --> C["Llama a `fetchGeoIPData()`"];
    subgraph "Lógica de fetchGeoIPData"
      C -- Éxito --> D["Valida la respuesta con `GeoIP.schema.ts`"];
      D -- Éxito --> E[Retorna datos GeoIP];
      D -- Fallo --> F[Lanza Error];
    end
    E --> G["Atualiza estado interno con datos GeoIP"];
    F --> H["`catch` actualiza estado con una `ValidationErrorKey`"];
    G & H --> I["Contexto provee el nuevo estado"];
    
    J[Cualquier componente hijo] -- "Llama a" --> K["Hook `useGeoIP()`"];
    K -- "Lee desde" --> I;
    K --> J[Recibe `{ geoData, isLoading, errorKey }`];
3. Contrato de API
Componente de Entrada: GeoIPProvider
Props: { children: ReactNode }
Hook de Salida: useGeoIP()
Retorno: GeoIPContextState { geoData: { countryCode, countryName }, isLoading, errorKey }
4. Zona de Melhorias Futuras
ABSTRAÇÃO PARA HOOK: A lógica de fetch poderia ser abstraída para um hook dedicado (useFetchGeoIP) para melhor separação de responsabilidades e testabilidade.
CACHING EM sessionStorage: Para evitar chamadas redundantes à API, os dados de GeoIP podem ser armazenados em sessionStorage.
MECANISMO DE RETENTATIVAS: Adicionar uma lógica de retry com "exponential backoff" para o fetch em caso de falhas de rede intermitentes.
UI DE ERRO TRADUZIDA: O errorKey retornado pelo hook pode ser usado com useTranslations para mostrar uma mensagem de erro localizada ao usuário.
FALLBACK DE SERVIDOR: Passar um valor inicial de GeoIP detetado no servidor (via headers de Vercel) para o GeoIPProvider para um renderizado inicial mais rápido.
// .docs-espejo/components/diagnostic/GeoIPLocator.tsx.md