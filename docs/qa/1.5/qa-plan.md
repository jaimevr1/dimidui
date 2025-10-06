# Plano de Qualidade e Testes - Estória 1.5

- **Estória**: 1.5: Dashboard do Aluno e Persistência de Dados
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Integridade de Dados**: **ALTO IMPACTO**. A correta persistência das tentativas do aluno (AC 2) é crucial. Dados perdidos ou corrompidos podem levar a uma avaliação incorreta do progresso do aluno, quebrando a confiança do professor e do aluno na plataforma.
- **Performance**: **MÉDIO IMPACTO**. O carregamento do dashboard (AC 1) envolve múltiplas chamadas ao banco de dados. Embora o volume de dados no MVP seja pequeno, a query para buscar atividades e seus status deve ser otimizada para não se tornar um gargalo no futuro. O uso das views pré-calculadas do Supabase será importante para estórias futuras.
- **Confiabilidade**: **ALTO IMPACTO**. O sistema deve garantir que, uma vez que uma tentativa é feita, ela seja salva. Falhas de rede durante o salvamento devem ser tratadas, talvez com uma lógica de retentativa ou, no mínimo, notificando o usuário que o progresso pode não ter sido salvo.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Perda de dados de progresso** | Média | **Crítico** | Se a chamada `.insert()` para `student_attempts` falhar (ex: por problema de rede), o progresso do aluno é perdido. A mitigação é envolver a chamada em um bloco `try...catch` e implementar uma UI que indique o status do salvamento (ex: um ícone de "salvando..." que se torna "salvo"). |
| **2. Condição de Corrida (Race Condition)** | Baixa | Médio | Se um aluno responder a perguntas muito rapidamente, múltiplas chamadas de inserção podem ocorrer simultaneamente, potencialmente causando problemas. A mitigação é garantir que cada chamada seja atômica e independente. |
| **3. Performance de Carregamento do Dashboard** | Baixa (no MVP) | Alto (em escala) | As queries para buscar atividades e status podem se tornar lentas com muitos alunos/atividades. A mitigação é garantir que as queries usem índices no banco de dados e, futuramente, consolidar as chamadas em uma única função de borda (Edge Function) do Supabase. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 1.5.1: Visualização de Atividades Atribuídas
- **Objetivo**: Garantir que o dashboard exiba corretamente as atividades que foram atribuídas a um aluno (AC 1).
- **Pré-condição**: Um aluno de teste existe. Duas atividades (A e B) existem. Apenas a Atividade A está atribuída ao aluno na tabela `activity_assignments`.
- **Passos**:
  1.  Faça login como o aluno de teste.
  2.  Observe o dashboard.
- **Resultado Esperado**:
  - Apenas o card para a Atividade A deve ser exibido.
  - O card da Atividade B não deve aparecer.

### Cenário de Teste 1.5.2: Persistência de Tentativas
- **Objetivo**: Verificar se cada tentativa do aluno é salva corretamente no banco de dados (AC 2).
- **Pré-condição**: O aluno de teste está logado e acessa uma atividade.
- **Passos**:
  1.  Abra o painel do Supabase e observe a tabela `student_attempts` em tempo real.
  2.  Na aplicação, responda a uma questão (certa ou errada).
  3.  Observe a tabela `student_attempts`.
- **Resultado Esperado**:
  - Um novo registro deve aparecer na tabela `student_attempts` imediatamente após a resposta.
  - O registro deve conter o `student_id`, `activity_id` corretos e os detalhes da questão respondida no campo `questions_data`.

### Cenário de Teste 1.5.3: Atualização do Status da Atividade
- **Objetivo**: Garantir que o dashboard reflita o status de conclusão de uma atividade (AC 3).
- **Pré-condição**: O aluno de teste tem uma atividade atribuída que ainda não foi concluída.
- **Passos**:
  1.  Faça login como o aluno de teste e observe o dashboard. O card da atividade não deve ter o indicador de "concluída".
  2.  Jogue e complete a atividade.
  3.  Volte para o dashboard.
- **Resultado Esperado**:
  - O card da atividade que foi concluída agora deve exibir um indicador visual de conclusão (ex: um ícone de check ✅).

## 4. Sumário de QA

A integridade dos dados é o ponto mais crítico desta estória. A confiança na plataforma depende da precisão com que o progresso do aluno é registrado e exibido. Os testes devem se concentrar em validar o fluxo de dados completo: desde a ação do usuário na interface, passando pela chamada de inserção no Supabase, até a verificação dos dados brutos no banco de dados e sua correta re-exibição no dashboard. O tratamento de erros em chamadas de rede durante a persistência é um ponto de atenção importante.
