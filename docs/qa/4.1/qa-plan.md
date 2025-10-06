# Plano de Qualidade e Testes - Estória 4.1

- **Estória**: 4.1: Dashboard do Professor - Visão Geral e Individual
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Integridade de Dados**: **ALTO IMPACTO**. A principal função desta estória é a visualização de dados. A precisão dos KPIs, médias e históricos exibidos é fundamental. Qualquer discrepância entre os dados mostrados e os dados brutos no banco de dados mina a confiança do professor na ferramenta.
- **Performance**: **MÉDIO IMPACTO**. O dashboard depende de views (`concept_mastery`, `student_progress_summary`) para agregar dados. O desempenho dessas views sob carga (muitos alunos, muitas tentativas) é um fator importante. Embora não seja um problema para o MVP, a complexidade das agregações deve ser monitorada.
- **Usabilidade**: **ALTO IMPACTO**. A clareza e a capacidade de interpretação dos dados são cruciais. O professor deve ser capaz de, com uma olhada rápida, identificar alunos com dificuldades e as habilidades que precisam de mais atenção (AC 1, 2). A navegação da visão geral para a visão detalhada do aluno deve ser fluida (AC 3).

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Dados incorretos ou desatualizados** | Média | **Crítico** | Se as views do banco de dados não calcularem as médias corretamente ou se o frontend não buscar os dados mais recentes, as decisões pedagógicas do professor serão baseadas em informações falsas. A mitigação é validar os cálculos das views com um conjunto de dados de teste e garantir que o frontend busque os dados a cada carregamento de página. |
| **2. Visualização de dados confusa** | Média | Médio | Gráficos ou listas mal projetados podem mais confundir do que informar. A mitigação é seguir de perto os wireframes da especificação e garantir que todos os pontos de dados sejam claramente rotulados. |
| **3. Navegação quebrada para detalhes do aluno** | Baixa | Alto | Se o link da lista de alunos para a página de detalhes não passar o `student_id` corretamente, a página de destino não funcionará. A mitigação é o teste rigoroso do fluxo de navegação (Cenário 4.1.2). |

## 3. Plano de Teste (Test Design)

Estes testes exigem uma preparação cuidadosa do banco de dados com dados de teste realistas.

### Cenário de Teste 4.1.1: Validação da Visão Geral da Turma
- **Objetivo**: Garantir que os KPIs e médias da turma inteira são calculados e exibidos corretamente (AC 1, 2).
- **Pré-condição**: O banco de dados contém dados de 3 alunos de teste com múltiplas tentativas e acurácias variadas.
- **Passos**:
  1.  Calcule manualmente a acurácia média esperada para a turma toda.
  2.  Calcule manualmente a maestria média esperada para uma habilidade BNCC específica.
  3.  Acesse a página `professor-dashboard.html`.
- **Resultado Esperado**:
  - Os KPIs exibidos na tela (ex: "Acurácia média") devem corresponder aos valores calculados manualmente.
  - A lista de maestria de habilidades BNCC deve exibir as médias corretas para cada habilidade.
  - A lista de alunos deve exibir os 3 alunos de teste.

### Cenário de Teste 4.1.2: Navegação e Validação da Visão Individual
- **Objetivo**: Garantir que a navegação para a página de detalhes funciona e que os dados exibidos são específicos daquele aluno (AC 3, 4).
- **Pré-condição**: Mesma do cenário anterior.
- **Passos**:
  1.  Acesse a página `professor-dashboard.html`.
  2.  Clique no "Aluno A" na lista de alunos.
  3.  Observe os dados na página de detalhes do aluno.
- **Resultado Esperado**:
  - A página deve ser carregada sem erros.
  - Os KPIs (progresso geral, acurácia) devem corresponder aos dados **apenas** do "Aluno A".
  - O histórico de atividades deve listar **apenas** as atividades realizadas pelo "Aluno A".

### Cenário de Teste 4.1.3: Verificação de Estado Vazio
- **Objetivo**: Garantir que o dashboard lida bem com a ausência de dados.
- **Pré-condição**: O banco de dados não contém nenhuma tentativa (`student_attempts` está vazia).
- **Passos**:
  1.  Acesse a página `professor-dashboard.html`.
- **Resultado Esperado**:
  - A página não deve quebrar.
  - Os KPIs devem exibir valores padrão graciosos (ex: "Acurácia média: 0%" ou "N/A").
  - As listas devem exibir mensagens como "Nenhuma atividade realizada ainda".

## 4. Sumário de QA

Esta estória é o principal ponto de entrega de valor para o usuário professor. A confiança na aplicação será construída ou destruída aqui. O foco dos testes não é apenas a funcionalidade, mas a **precisão dos dados**. É fundamental que o conjunto de dados de teste seja bem preparado para permitir a verificação manual dos cálculos de agregação. As queries nas views do Supabase devem ser testadas independentemente para garantir sua correção antes de serem consumidas pelo frontend.
