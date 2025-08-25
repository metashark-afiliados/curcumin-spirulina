// tests/setup.ts
import "@testing-library/jest-dom";

/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.0.0
 * @description Global setup file for the Vitest testing environment.
 *              This file is executed before each test suite, ensuring a consistent
 *              and well-defined testing context. Its primary responsibility is to
 *              extend the Vitest `expect` utility with DOM-specific matchers
 *              from `@testing-library/jest-dom`.
 * @see https://vitest.dev/config/#setupfiles
 * @see https://github.com/testing-library/jest-dom
 */

/**
 * MEJORA CONTINUA
 *
 * @version 1.0.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority High - MSW INTEGRATION: Integrar o Mock Service Worker (MSW) para interceptar e simular requisições de API de forma robusta durante os testes de integração, garantindo que os testes não dependam de um backend real.
 * ((Vigente)) @priority Medium - GLOBAL MOCKS: Implementar mocks para APIs do navegador que não são suportadas pelo JSDOM, como `localStorage` ou `matchMedia`, caso os componentes comecem a depender delas.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.0.0 - JEST-DOM INTEGRATION: Importação global dos matchers do `jest-dom`, que estendem o `expect` do Vitest e permitem asserções de DOM mais semânticas e legíveis (ex: `.toBeVisible()`, `.toHaveTextContent()`).
 * ((Implementada)) @version 1.0.0 - CENTRALIZED TEST SETUP: A criação deste arquivo estabelece um ponto de entrada único e centralizado para toda a configuração do ambiente de teste, aderindo ao princípio DRY.
 *
 */
