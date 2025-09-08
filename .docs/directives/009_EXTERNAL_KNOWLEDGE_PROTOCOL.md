// .docs/directives/009_EXTERNAL_KNOWLEDGE_PROTOCOL.md
/**
 * @file .docs/directives/009_EXTERNAL_KNOWLEDGE_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 009. Establece el
 *              protocolo para la recepción y asimilación de conocimiento
 *              externo a través de snapshots de dependencias.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 009: Protocolo de Asimilación de Conocimiento Externo

## 1. Principio Fundamental

La base de conocimiento interna sobre las dependencias del proyecto debe estar siempre actualizada. Un snapshot de una dependencia (ej. una librería de `node_modules`) se convierte en una Única Fuente de Verdad (SSoT) temporal para comprender su API pública y su lógica interna, permitiendo resolver errores de integración y tomar decisiones de refactorización informadas.

## 2. Reglas Mandatorias

Ante la recepción de un snapshot de una dependencia externa (ej. `next-intl`), se debe seguir el siguiente protocolo:

1.  **Análisis de API Pública:** Auditar a estrutura do snapshot, especialmente os ficheiros de declaración de tipos (`.d.ts`), para comprender a API pública correcta: nomes de funcións exportadas, sinaturas e tipos de datos.

2.  **Actualización da Base de Coñecemento:** Asimilar a información obtida do snapshot para actualizar a miña base de coñecemento interna sobre esa librería. Debo comprender como a librería espera ser utilizada.

3.  **Rexistro de Coñecemento (Auditoría):** Crear ou actualizar un documento de rexistro na carpeta `/.docs/knowledge-base/` específico para a librería analizada (ex. `next-intl-api.md`). Este documento debe resumir:
    *   A versión da librería analizada.
    *   Os puntos de entrada (`exports`) clave e o seu propósito.
    *   Exemplos de uso correcto da API, baseados na evidencia do snapshot.
    *   A data da última actualización da análise.

4.  **Aplicación do Coñecemento:** Utilizar o coñecemento actualizado para resolver erros de integración ou refactorizar o código do proxecto para que se aliñe coas mellores prácticas da librería.

## 3. Justificación

Este protocolo transforma a depuración de reactiva a proactiva. En lugar de depender de documentación externa que podería estar desactualizada, baséase na verdade absoluta do código fonte da dependencia. Garante que as nosas integracións sexan robustas e documenta o coñecemento adquirido para futuras referencias, cumprindo cos principios de **Análise Profunda e Persistente** e **Confianza Absoluta**.