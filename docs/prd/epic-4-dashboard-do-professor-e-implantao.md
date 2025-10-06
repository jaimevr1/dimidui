# Epic 4: Dashboard do Professor e Implantação
**Goal**: Fornecer ao professor as ferramentas para monitorar o progresso dos alunos, gerenciar a turma e implantar a aplicação para uso real.

## Story 4.1: Dashboard do Professor - Visão Geral e Individual
As a: Professor,
I want: Um dashboard que mostre o desempenho geral da minha turma e me permita aprofundar nos dados de cada aluno,
so that: Eu possa identificar rapidamente quem precisa de mais ajuda e em quais habilidades.
**Acceptance Criteria**:
1.  O `professor-dashboard.html` deve exibir os KPIs da turma (alunos ativos, acurácia média, etc.).
2.  O dashboard deve mostrar um gráfico ou lista com a maestria média da turma por habilidade BNCC.
3.  Uma lista de alunos deve permitir clicar em um aluno para ver sua página de detalhes.
4.  A página de detalhes do aluno deve mostrar seu progresso geral, maestria por habilidade e um histórico de atividades.

## Story 4.2: Gestão de Alunos e Atribuição
As a: Professor,
I want: Cadastrar novos alunos na minha turma e atribuir atividades a eles,
so that: Eu possa gerenciar quem faz o quê.
**Acceptance Criteria**:
1.  Deve haver uma interface para adicionar um novo aluno (nome, senha, série).
2.  Na página de detalhes do aluno ou da turma, o professor deve poder selecionar uma ou mais atividades e atribuí-las a um ou mais alunos.
3.  A atribuição deve criar um registro na tabela `activity_assignments`.

## Story 4.3: Implantação e Teste Final
As a: Desenvolvedor,
I want: Implantar a aplicação na Vercel e realizar um teste de ponta a ponta,
so that: O MVP esteja disponível para os primeiros usuários.
**Acceptance Criteria**:
1.  O projeto deve ser conectado a um repositório Git e configurado para deploy automático na Vercel.
2.  O deploy deve ser bem-sucedido.
3.  Um teste completo com 3 "alunos reais" (pode ser o próprio dev em 3 contas) deve ser realizado, cobrindo o fluxo de login, realização de atividades, desbloqueio e visualização de progresso no dashboard do professor.

---
