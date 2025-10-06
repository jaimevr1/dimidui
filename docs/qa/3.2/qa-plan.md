# Plano de Qualidade e Testes - Estória 3.2

- **Estória**: 3.2: Sistema de Desbloqueio de Atividades
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Integridade de Dados**: **ALTO IMPACTO**. A lógica de desbloqueio depende inteiramente da precisão dos dados nas tabelas `activities` (o campo `unlocked_by`) e `student_attempts` (o campo `accuracy`). Um cálculo incorreto da acurácia ou um `unlocked_by` quebrado podem impedir a progressão do aluno.
- **Performance**: **MÉDIO IMPACTO**. A função `getAvailableActivities` (AC 1) executa múltiplas queries ao banco de dados para determinar o estado do dashboard. Para o MVP, com poucos alunos e atividades, o impacto é baixo. No entanto, em escala, essa função é uma candidata primária para otimização, possivelmente sendo movida para uma única Edge Function no Supabase para reduzir a quantidade de viagens de ida e volta (round-trips) da rede.
- **Usabilidade**: **ALTO IMPACTO**. A percepção de progresso é um motivador chave. Se um aluno espera desbloquear uma atividade e isso não acontece devido a um bug, a experiência é extremamente frustrante. A distinção visual entre atividades bloqueadas e desbloqueadas (AC 2) deve ser clara e inequívoca.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Lógica de filtro incorreta** | Média | **Crítico** | Um erro no filtro JavaScript que determina se uma atividade está desbloqueada pode ou desbloquear tudo prematuramente ou bloquear tudo permanentemente. A mitigação é o teste rigoroso do cenário de ponta a ponta (Cenário 3.2.1), cobrindo todos os branches da lógica. |
| **2. Cálculo de acurácia impreciso** | Baixa | Alto | Se o campo `accuracy` na tabela `student_attempts` não for calculado corretamente, a condição de desbloqueio (`>= 0.70`) pode falhar. A mitigação é que este campo é uma coluna gerada (`GENERATED ALWAYS AS`), o que move a responsabilidade do cálculo para o próprio banco de dados, tornando-o mais confiável. |
| **3. Performance ruim com muitos dados** | Alta (em escala) | Médio | A função `getAvailableActivities` pode se tornar lenta. A mitigação no MVP é garantir que as queries usem índices. A mitigação de longo prazo é refatorar para uma Edge Function. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 3.2.1: Fluxo de Desbloqueio com Sucesso
- **Objetivo**: Garantir que uma atividade é desbloqueada após o cumprimento do requisito (AC 3).
- **Pré-condição**: 
  - Atividade A (sem `unlocked_by`) e Atividade B (com `unlocked_by` = ID da Atividade A) existem.
  - Ambas estão atribuídas a um aluno de teste.
- **Passos**:
  1.  Faça login como o aluno. Verifique se a Atividade A está disponível e a B está bloqueada.
  2.  Complete a Atividade A com uma acurácia **maior ou igual a 70%**.
  3.  Volte para o dashboard do aluno.
- **Resultado Esperado**:
  - O card da Atividade B agora deve estar totalmente visível, clicável e sem o ícone de cadeado.

### Cenário de Teste 3.2.2: Fluxo de Desbloqueio com Falha
- **Objetivo**: Garantir que uma atividade permanece bloqueada se o requisito não for cumprido (AC 3).
- **Pré-condição**: Mesma da 3.2.1.
- **Passos**:
  1.  Faça login como o aluno. Verifique se a Atividade A está disponível e a B está bloqueada.
  2.  Complete a Atividade A com uma acurácia **menor que 70%**.
  3.  Volte para o dashboard do aluno.
- **Resultado Esperado**:
  - O card da Atividade B deve permanecer no estado bloqueado (cinza, não clicável).

### Cenário de Teste 3.2.3: Atividades sem Pré-requisito
- **Objetivo**: Garantir que atividades sem o campo `unlocked_by` estejam sempre disponíveis (AC 3).
- **Pré-condição**: Uma Atividade C (com `unlocked_by` = NULL) é atribuída ao aluno.
- **Passos**:
  1.  Faça login como o aluno.
- **Resultado Esperado**:
  - O card da Atividade C deve estar sempre disponível, independentemente do status de outras atividades.

## 4. Sumário de QA

Esta estória é crítica para a gamificação e o engajamento do aluno. A lógica, embora complexa por envolver múltiplas fontes de dados, é bem definida na especificação. O sucesso dos testes depende de uma preparação cuidadosa do estado do banco de dados para cada cenário. É essencial testar os casos limítrofes da condição de acurácia (ex: exatamente 70%) para garantir que os operadores (`>=`) estão corretos. A clareza visual da interface para o estado bloqueado/desbloqueado também é um ponto chave de validação.
