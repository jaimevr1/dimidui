# Plano de Qualidade e Testes - Estória 4.2

- **Estória**: 4.2: Gestão de Alunos e Atribuição
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. A capacidade de gerenciar a turma e atribuir trabalho é uma tarefa fundamental do professor. A interface para essas ações deve ser eficiente e à prova de erros. A atribuição em massa (várias atividades para vários alunos) é uma funcionalidade poderosa que precisa ser especialmente clara (AC 2).
- **Integridade de Dados**: **ALTO IMPACTO**. A criação de um aluno (AC 1) e, mais importante, a criação de registros de atribuição (AC 3) devem ser transações confiáveis. Uma falha na atribuição significa que o aluno não receberá o trabalho, o que é uma falha funcional crítica.
- **Segurança**: **MÉDIO IMPACTO**. A interface de criação de aluno lida com senhas. Embora a NFR6 aceite senhas em texto plano para o MVP, a interface não deve, em hipótese alguma, expor senhas após a criação ou em qualquer outro lugar.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Falha na atribuição em massa** | Média | **Crítico** | Se o professor selecionar 5 alunos e 5 atividades (25 atribuições) e a operação falhar no meio, o estado do sistema ficará inconsistente. A mitigação é garantir que a inserção em massa no Supabase seja tratada como uma transação única, se possível, e que haja um feedback claro de sucesso ou falha para o professor. |
| **2. Criação de aluno duplicado** | Média | Médio | A interface atual não previne que um professor crie dois alunos com o mesmo nome. Isso pode causar confusão no login. A mitigação no MVP é a atenção do professor. Uma mitigação futura seria verificar a existência do nome antes de criar o novo aluno. |
| **3. Performance na modal de atribuição** | Baixa (no MVP) | Médio | Carregar listas com todos os alunos e todas as atividades pode se tornar lento. A mitigação futura é adicionar paginação ou busca a essas listas. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manually pelo desenvolvedor.

### Cenário de Teste 4.2.1: Criação de um Novo Aluno
- **Objetivo**: Garantir que um professor consegue adicionar um novo aluno à turma (AC 1).
- **Passos**:
  1.  Acesse o `professor-dashboard.html`.
  2.  Clique no botão "+ Novo Aluno".
  3.  Preencha o nome, senha e série no formulário da modal.
  4.  Clique em "Salvar".
- **Resultado Esperado**:
  - A modal deve fechar.
  - O novo aluno deve aparecer na lista de alunos do dashboard.
  - Um novo registro correspondente deve existir na tabela `students` do Supabase.

### Cenário de Teste 4.2.2: Atribuição de Atividade (Um para Um)
- **Objetivo**: Verificar o fluxo de atribuição mais simples: uma atividade para um aluno (AC 2, 3).
- **Pré-condição**: Existem alunos e atividades no sistema.
- **Passos**:
  1.  Acesse o `professor-dashboard.html`.
  2.  Clique em "Atribuir Atividade".
  3.  Na modal, selecione exatamente 1 aluno e 1 atividade.
  4.  Clique em "Salvar Atribuição".
- **Resultado Esperado**:
  - Um novo registro deve ser criado na tabela `activity_assignments` com o `student_id` e `activity_id` corretos.
  - Ao fazer login como o aluno selecionado, a nova atividade deve aparecer em seu dashboard.

### Cenário de Teste 4.2.3: Atribuição de Atividade (Muitos para Muitos)
- **Objetivo**: Verificar o fluxo de atribuição em massa (AC 2, 3).
- **Pré-condição**: Existem pelo menos 3 alunos e 3 atividades no sistema.
- **Passos**:
  1.  Acesse o `professor-dashboard.html`.
  2.  Clique em "Atribuir Atividade".
  3.  Na modal, selecione 2 alunos e 3 atividades.
  4.  Clique em "Salvar Atribuição".
- **Resultado Esperado**:
  - Exatamente 6 novos registros (2 alunos * 3 atividades) devem ser criados na tabela `activity_assignments`.
  - Ao fazer login como cada um dos alunos selecionados, as 3 novas atividades devem aparecer em seus dashboards.

## 4. Sumário de QA

Esta estória é fundamental para a autonomia do professor na plataforma. O ponto mais crítico para testar é a robustez da funcionalidade de atribuição, especialmente o cenário de muitos-para-muitos. É preciso garantir que a operação seja atômica ou que, em caso de falha, o feedback para o professor seja extremamente claro sobre o que foi e o que não foi atribuído. A usabilidade da modal de atribuição, com suas duas listas de seleção, também merece atenção para garantir que a experiência seja fluida.
