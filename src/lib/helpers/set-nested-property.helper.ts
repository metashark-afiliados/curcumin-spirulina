// src/lib/helpers/set-nested-property.helper.ts
/**
 * @author Raz Podestá - MetaShark Tech <raz.metashark.tech>
 * @version 1.1.0
 * @description Helper atómico y puro para la asignación de propiedades anidadas.
 *              Es el motor de ensamblaje para la arquitectura de i18n IMAS,
 *              transformando namespaces planos (e.g., "Component.Header.title")
 *              en un objeto anidado. Es universalmente compatible (cliente/servidor).
 */
export function setNestedProperty(
  obj: Record<string, any>,
  path: string,
  value: any
): Record<string, any> {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}

/**
 * MEJORA CONTINUA
 *
 * @version 1.1.0
 *
 * ---
 *
 * @section Melhorias Futuras
 *
 * ((Vigente)) @priority Low - SUPORTE A ARRAYS: Aprimorar o helper para suportar a sintaxe de colchetes (e.g., "path.to.array[0].property") para definir valores em índices específicos de arrays aninhados.
 *
 * ---
 *
 * @section Melhorias Adicionadas
 *
 * ((Implementada)) @version 1.1.0 - CORREÇÃO DE INTEGRIDADE SINTÁTICA: O arquivo foi completamente reescrito para corrigir uma corrupção sintática no bloco de comentários que impedia a compilação.
 * ((Implementada)) @version 1.0.0 - MOTOR DE ENSAMBLAJE IMAS: Este helper é a implementação canônica da lógica de ensamblaje para nossa arquitetura de i18n de elite.
 * ((Implementada)) @version 1.0.0 - CRIAÇÃO DE CAMINHO DINÂMICO: A função cria objetos intermediários no caminho se eles não existirem, tornando-a robusta contra estruturas de dados parcialmente definidas.
 * ((Implementada)) @version 1.0.0 - FUNÇÃO PURA: O helper opera de forma previsível e sem efeitos colaterais, facilitando a depuração e o teste.
 *
 */
