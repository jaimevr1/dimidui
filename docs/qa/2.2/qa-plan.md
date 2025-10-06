# Plano de Qualidade e Testes - Estória 2.2

- **Estória**: 2.2: Banco de Questões
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. A capacidade de um professor gerenciar eficientemente um banco de questões é uma funcionalidade central que economiza tempo. A complexidade está no formulário dinâmico (AC 2); ele deve ser extremamente claro e intuitivo para evitar que o professor se sinta perdido ao alternar entre os tipos de módulo.
- **Integridade de Dados**: **ALTO IMPACTO**. A estória envolve todas as operações CRUD (AC 1). É crucial que a criação, atualização e exclusão de questões sejam transações atômicas e confiáveis. Um bug na serialização do JSON para o campo `content` (AC 3) pode corromper os dados da questão, tornando-a inutilizável em atividades.
- **Manutenibilidade**: **MÉDIO IMPACTO**. A implementação do formulário dinâmico pode se tornar complexa. Uma abordagem limpa, que separa a lógica de cada tipo de módulo em vez de um grande bloco `if/else`, facilitará a adição de novos tipos de módulo no futuro.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Serialização incorreta do JSON de conteúdo** | Média | **Crítico** | Se o objeto JSON para o campo `content` não for construído exatamente como a especificação para cada tipo de módulo, o `activity-runtime` não conseguirá renderizar a questão. A mitigação é validar o JSON gerado contra a especificação antes de salvar e testar cada tipo de módulo no fluxo de ponta a ponta. |
| **2. Falha ao carregar dados para edição** | Baixa | Alto | Se a função de edição (Update) não popular o formulário dinâmico corretamente com os dados existentes, o professor pode acidentalmente apagar ou corromper uma questão ao tentar editá-la. A mitigação é testar o ciclo completo de Criar -> Editar -> Salvar. |
| **3. Exclusão acidental de questão** | Média | Médio | A ausência de um diálogo de confirmação ("Você tem certeza?") antes de excluir uma questão pode levar à perda de trabalho. A mitigação é adicionar um `window.confirm()` antes de executar a operação de exclusão. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 2.2.1: Ciclo CRUD Completo
- **Objetivo**: Garantir que as quatro operações (Create, Read, Update, Delete) funcionam corretamente (AC 1, 3).
- **Passos**:
  1.  **Read (Vazio)**: Abra a página `professor-banco-questoes.html`. A lista de questões deve estar vazia.
  2.  **Create**: Clique em "Criar Nova Questão". Preencha o formulário para um módulo M1 e salve. A nova questão deve aparecer na lista.
  3.  **Read (com dados)**: Recarregue a página. A questão criada ainda deve estar na lista.
  4.  **Update**: Clique no botão "Editar" da questão. Mude o enunciado e salve. O enunciado na lista deve ser atualizado.
  5.  **Delete**: Clique no botão "Excluir" da questão. Confirme a exclusão. A questão deve desaparecer da lista.
- **Resultado Esperado**: Todas as operações devem ser refletidas corretamente na UI e no banco de dados (verificar na tabela `question_bank` do Supabase).

### Cenário de Teste 2.2.2: Validação do Formulário Dinâmico
- **Objetivo**: Verificar se o formulário de criação/edição se adapta corretamente ao tipo de módulo selecionado (AC 2).
- **Passos**:
  1.  Abra a modal de criação de questão.
  2.  Selecione "M1 - Bateria Rápida" no dropdown de tipo. Verifique se os campos são para enunciado, resposta e dica.
  3.  Selecione "M5 - Identifica Operação". Verifique se os campos mudam para problema, operação correta e dica.
  4.  Selecione "M9 - Compreensão Leitora". Verifique se os campos mudam para texto principal e uma sub-seção para adicionar perguntas e alternativas.
- **Resultado Esperado**: O conjunto de campos de formulário visíveis deve corresponder exatamente à estrutura JSON de cada tipo de módulo, conforme a especificação.

## 4. Sumário de QA

Esta estória é complexa devido à natureza dinâmica da interface de usuário. O maior risco técnico é a correta manipulação (serialização e desserialização) do campo JSON `content`, que varia para cada tipo de módulo. Os testes devem ser exaustivos, cobrindo o ciclo CRUD completo para **pelo menos dois tipos de módulo diferentes** (ex: um simples como M1 e um complexo como M9) para garantir que a lógica dinâmica e a manipulação de JSON funcionam de forma robusta.
