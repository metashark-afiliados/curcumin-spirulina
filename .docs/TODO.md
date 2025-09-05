// .docs/TODO.md
/**
 * @file .docs/TODO.md
 * @description Manifiesto de Dívida Técnica e Roadmap de Melhorias Arquitetónicas.
 * @author L.I.A. Legacy
 * @version 1.0.0
 */
# Manifesto de Dívida Técnica

Este documento rastreia tarefas de refatoração de alto impacto que foram adiadas estrategicamente para priorizar a estabilidade do build e a velocidade de desenvolvimento.

---

## Tarefa 1: Unificação da API de Logging (Cliente e Servidor)

-   **ID:** `LOG-API-UNIFY`
-   **Estado:** `((Pendente))` ⏳
-   **Descrição:** Atualmente, o `serverLogger` utiliza a assinatura de elite de Pino `logger.level(contexto, mensagem)`, enquanto o `clientLogger` utiliza a assinatura mais tradicional `logger.level(mensagem, contexto)`. Esta inconsistência aumenta a carga cognitiva e é uma fonte de erros.
-   **Plano de Ação:**
    1.  Refatorar o `src/lib/client-logger.ts` para que todos os seus métodos aceitem a assinatura `(contexto: LogContext, mensagem: string)`.
    2.  Realizar uma busca global por todas as invocações de `clientLogger` no projeto.
    3.  Refatorar cada ponto de chamada para se conformar com a nova assinatura unificada.
    4.  Atualizar o documento espelho `.docs-espejo/lib/client-logger.ts.md` para refletir a nova SSoT da API.
-   **Gatilho de Implementação:** A ser abordado durante a "Fase de Otimização e Blindagem" do projeto, após a funcionalidade principal estar estável.