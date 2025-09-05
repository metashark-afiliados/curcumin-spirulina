// .docs-espejo/config/logger.config.ts.md
/**
 * @file .docs-espejo/config/logger.config.ts.md
 * @description Documento Espejo y SSoT conceptual para la configuración del logger.
 * @author L.I.A. Legacy
 * @version 1.1.0
 */
# Manifiesto Conceptual: Aparato `logger.config.ts`

## 1. Rol Estratégico y Propósito

Este aparato es el **guardián de la seguridad de los datos en la observabilidad**. Su única responsabilidad es actuar como una lista de control (un manifiesto declarativo) de todas las claves de datos que se consideran sensibles y que **nunca** deben aparecer en texto plano en los logs de la aplicación.

Estratégicamente, es un pilar de la seguridad y el cumplimiento normativo (ej. GDPR), ya que previene la fuga accidental de Información de Identificación Personal (PII) a sistemas de logging, que a menudo tienen políticas de retención y acceso diferentes a las de la base de datos de producción.

## 2. Arquitectura y Flujo de Ejecución

Es un módulo de configuración puro. No tiene lógica de ejecución, solo exporta una constante que es consumida por el motor de logging.

```mermaid
graph TD
    A["`logger.config.ts` <br> (Define `REDACTED_PATHS`)"] --> B["`logger.ts` (Aparato de Logging)"];
    B -- "Pasa la lista a la configuración de" --> C["Instancia de `pino`"];
    C -- "En cada llamada a `logger.info`, `logger.error`, etc." --> D{Motor de Censura de Pino};
    D -- "Censura claves coincidentes" --> E[Log JSON final y seguro enviado a `stdout`];
3. Contrato de API
Exportación: export const REDACTED_PATHS: readonly string[]
4. Zona de Melhorias Futuras
Configuração por Ambiente: Permitir que a lista REDACTED_PATHS seja estendida com variáveis de ambiente, para poder adicionar chaves de censura específicas para produção sem expô-las no código.
Integração com Gestor de Segredos: Para configurações de máxima segurança, as chaves a serem censuradas poderiam ser carregadas de um serviço como HashiCorp Vault ou AWS Secrets Manager.
Validação de Formato: Adicionar um script de "linting" no CI/CD que verifique se os caminhos em REDACTED_PATHS seguem um formato válido para pino-redact.
Geração Automática: Criar um script que analise o código em busca de padrões de dados sensíveis (ex: user.password) e sugira adicioná-los a esta lista para reduzir omissões.
Sincronização com Tipos: Investigar se é possível usar TypeScript para gerar esses caminhos a partir dos tipos de dados da aplicação (ex: keyof User), garantindo que estejam sempre sincronizados.
// .docs-espejo/config/logger.config.ts.md