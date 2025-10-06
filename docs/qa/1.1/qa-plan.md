# Plano de Qualidade e Testes - Estória 1.1

- **Estória**: 1.1: Configuração do Projeto e Infraestrutura
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Segurança (NFR5)**: **ALTO IMPACTO**. A AC 2, que exige a ativação do RLS para a tabela `students`, é o requisito de segurança mais crítico nesta estória. A implementação correta impede que um aluno veja os dados de outro. A falha aqui compromete a privacidade dos dados do usuário.
- **Manutenibilidade**: **MÉDIO IMPACTO**. A Tarefa 4, que centraliza a inicialização do cliente Supabase em `/scripts/supabase-client.js`, é um pilar para a manutenibilidade do código. Garante que toda a aplicação use uma única configuração para se conectar ao backend, facilitando futuras atualizações.
- **Usabilidade**: Não aplicável diretamente a esta estória de infraestrutura.
- **Performance**: Não aplicável diretamente a esta estória de infraestrutura.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Esquema do BD incorreto** | Baixa | **Crítico** | A tarefa exige a cópia exata de um script SQL validado. A verificação manual no painel do Supabase (Tarefa 2) é a principal mitigação. |
| **2. Política RLS mal configurada** | Média | **Crítico** | A configuração é manual e propensa a erros. A verificação manual (Tarefa 3) é a mitigação primária. Recomenda-se um teste de segurança adicional (ver seção 3). |
| **3. Chaves de API expostas** | Baixa | **Crítico** | O desenvolvedor pode, por engano, codificar as chaves diretamente. A mitigação é a revisão de código e a verificação de que as variáveis de ambiente estão sendo usadas conforme a Tarefa 4. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor após a conclusão das tarefas.

### Cenário de Teste 1.1.1: Verificação da Estrutura de Pastas
- **Objetivo**: Garantir que a estrutura de diretórios local foi criada corretamente (AC 3).
- **Passos**:
  1.  Abra um terminal na raiz do projeto.
  2.  Execute o comando `ls -R assets/ scripts/ styles/`.
- **Resultado Esperado**:
  - A saída deve mostrar as subpastas `assets/fonts`, `assets/icons`, e `scripts/modules`.

### Cenário de Teste 1.1.2: Verificação do Esquema do Banco de Dados
- **Objetivo**: Garantir que todas as tabelas e views foram criadas no Supabase (AC 1).
- **Passos**:
  1.  Acesse o projeto no painel do Supabase.
  2.  Navegue até o "Table Editor".
  3.  Verifique a existência das tabelas: `students`, `activities`, `question_bank`, `student_attempts`, `activity_assignments`.
  4.  Navegue até o "SQL Editor".
  5.  Execute `SELECT * FROM concept_mastery LIMIT 1;` e `SELECT * FROM student_progress_summary LIMIT 1;`.
- **Resultado Esperado**:
  - Todas as tabelas devem estar listadas.
  - As queries nas views não devem retornar erros (podem retornar 0 linhas).

### Cenário de Teste 1.1.3: Teste de Segurança da Política RLS
- **Objetivo**: Garantir que a política RLS impede o acesso não autorizado aos dados dos alunos (AC 2).
- **Passos**:
  1.  No Supabase, crie dois alunos de teste na tabela `students`: "Aluno A" e "Aluno B".
  2.  Use a biblioteca de cliente do Supabase (pode ser em um script de teste local ou no console do navegador) para se autenticar como "Aluno A".
  3.  Após a autenticação, tente buscar os dados do "Aluno B" (`supabase.from('students').select('*').eq('name', 'Aluno B')`).
  4.  Agora, tente buscar os dados do próprio "Aluno A" (`supabase.from('students').select('*').eq('name', 'Aluno A')`).
- **Resultado Esperado**:
  - A tentativa de buscar os dados do "Aluno B" deve retornar um array vazio.
  - A tentativa de buscar os dados do "Aluno A" deve retornar os dados corretos do "Aluno A".

## 4. Sumário de QA

A estória é de baixa complexidade, mas de **alto impacto fundamental**. As tarefas são claras e diretamente ligadas aos critérios de aceitação. O maior risco reside na configuração manual da política de segurança (RLS), que deve ser testada com o cenário de teste de segurança 1.1.3 de forma rigorosa. A aprovação desta estória depende da execução bem-sucedida de todos os cenários de teste manuais descritos.
