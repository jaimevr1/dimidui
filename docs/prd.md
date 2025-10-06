# Dimidui MVP Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Validar a arquitetura de módulos de atividades gamificadas e o engajamento dos alunos do 4º ao 6º ano.
- Entregar um MVP totalmente funcional em 5 semanas para permitir testes e feedback com usuários reais.
- Fornecer aos professores uma ferramenta para criar, atribuir e monitorar atividades de aprendizado personalizadas.
- Oferecer aos alunos uma experiência de aprendizado interativa com feedback imediato para melhorar a maestria de conceitos da BNCC.
- Estabelecer uma base de código e arquitetura sólida para futuras expansões do produto.

### Background Context
Este projeto visa resolver a necessidade de ferramentas educacionais mais flexíveis e baseadas em dados. O Dimidui MVP foca em criar uma plataforma onde o aprendizado é adaptativo e o progresso do aluno é transparente. Para os professores, ele combate a dificuldade de acompanhar individualmente os alunos em turmas grandes, oferecendo dashboards visuais. Para os alunos, ele transforma a prática de habilidades fundamentais em uma experiência mais engajadora, em oposição a métodos estáticos e menos interativos.

### Change Log
| Date       | Version | Description                | Author |
|------------|---------|----------------------------|--------|
| 2025-10-06 | 1.0     | Versão inicial do documento | John, PM |

---

## Requirements

### Functional
1.  **FR1**: O sistema deve permitir que alunos façam login usando um nome de usuário e senha pré-definidos pelo professor.
2.  **FR2**: O sistema deve ser capaz de renderizar dinamicamente uma atividade a partir de uma estrutura JSON, apresentando os módulos na sequência definida.
3.  **FR3**: O sistema deve implementar o módulo **M1 (BateriaRápida)**, que apresenta questões com um timer opcional.
4.  **FR4**: O sistema deve implementar o módulo **M9 (CompreensãoLeitora)**, com um texto de apoio e questões de múltipla escolha.
5.  **FR5**: O dashboard do aluno deve listar todas as atividades que foram atribuídas a ele e que estão disponíveis para serem realizadas.
6.  **FR6**: O sistema deve implementar o módulo **M5 (IdentificaOperação)**, onde o aluno escolhe a operação matemática correta para resolver um problema.
7.  **FR7**: Todas as tentativas do aluno, incluindo respostas, tempo gasto e acertos, devem ser salvas no banco de dados (Supabase).
8.  **FR8**: O sistema deve implementar uma lógica de 3 tentativas por questão: a primeira errada apenas notifica, a segunda oferece uma dica, e a terceira mostra a resposta correta e bloqueia a questão.
9.  **FR9**: Professores devem ter uma interface para criar novas atividades, definindo metadados (nome, tipo, BNCC, etc.) e adicionando módulos.
10. **FR10**: O sistema deve incluir um **Banco de Questões**, permitindo que professores criem, visualizem e reutilizem questões nos módulos das atividades.
11. **FR11**: Professores devem poder visualizar um preview da atividade antes de salvá-la.
12. **FR12**: O sistema deve implementar o módulo **M2 (LinhaNumérica)**, com funcionalidade de arrastar e soltar.
13. **FR13**: O sistema deve implementar o módulo **M6 (DestacaPalavraChave)**, onde o aluno clica nas palavras corretas em um texto.
14. **FR14**: O sistema deve implementar o módulo **M8 (CorrigeOrtografia)**, no formato de múltipla escolha.
15. **FR15**: O sistema deve implementar uma lógica de desbloqueio, onde uma atividade só se torna disponível após a conclusão bem-sucedida (acurácia >= 70%) de uma atividade pré-requisito.
16. **FR16**: O dashboard do professor deve exibir uma visão geral do desempenho da turma e uma visão detalhada por aluno individual.
17. **FR17**: Professores devem poder cadastrar novos alunos e atribuir atividades a eles.
18. **FR18**: O sistema deve fornecer uma view (`concept_mastery`) que calcula a maestria média do aluno por código BNCC.

### Non-Functional
1.  **NFR1**: A aplicação deve ser construída utilizando exclusivamente HTML, CSS, Vanilla JavaScript no frontend, Supabase no backend e ser implantada na Vercel.
2.  **NFR2**: A interface do usuário deve ser responsiva, funcionando adequadamente em navegadores de desktop e mobile.
3.  **NFR3**: A aplicação deve utilizar a fonte Atkinson Hyperlegible para garantir a legibilidade e os ícones da biblioteca Lucide.
4.  **NFR4**: A estrutura de pastas do projeto deve seguir estritamente o que foi definido na especificação técnica.
5.  **NFR5**: O acesso aos dados dos alunos deve ser protegido utilizando Row Level Security (RLS) no Supabase para garantir que um aluno só possa ver seus próprios dados.
6.  **NFR6**: Para o MVP, as senhas dos alunos serão armazenadas em texto plano no banco de dados.

---

## User Interface Design Goals

### Overall UX Vision
A visão é criar uma interface limpa, intuitiva e encorajadora. O design deve ser amigável para crianças, com feedback visual claro (cores para acerto/erro) e uma navegação simples, minimizando a carga cognitiva e mantendo o foco na atividade.

### Key Interaction Paradigms
- **Aprendizagem Modular**: O conteúdo é quebrado em pequenos módulos interativos.
- **Feedback Imediato**: O aluno sabe se acertou ou errou instantaneamente.
- **Gamificação Leve**: A progressão é feita através do desbloqueio de novas atividades, criando uma sensação de conquista.

### Core Screens and Views
- `login.html`: Tela de login para alunos.
- `aluno-dashboard.html`: Dashboard do aluno com a lista de atividades.
- `atividade.html`: Tela genérica onde as atividades são renderizadas.
- `professor-dashboard.html`: Dashboard principal do professor com a visão da turma.
- `professor-criar.html`: Interface para criação e edição de atividades.
- `professor-banco-questoes.html`: Interface para gerenciar o banco de questões.

### Accessibility: None
*(Nenhum nível WCAG formal foi especificado, mas a escolha da fonte Atkinson Hyperlegible é um passo importante para a acessibilidade visual.)*

### Branding
A identidade visual será definida pela paleta de cores especificada no `dimidui_spec.md`, com um tema "Light Mode" exclusivo para o MVP.

### Target Device and Platforms: Web Responsive
A aplicação deve funcionar em navegadores modernos, tanto em desktops quanto em dispositivos móveis.

---

## Technical Assumptions

### Repository Structure: Monorepo
A estrutura de pastas descrita na especificação implica um único repositório para todo o código do frontend.

### Service Architecture
A arquitetura é de Backend-as-a-Service (BaaS), com toda a lógica de backend, banco de dados e autenticação gerenciada pelo Supabase.

### Testing Requirements
A especificação menciona "Teste com 3 alunos reais", indicando um foco em testes manuais de usabilidade para o MVP. Não há requisitos para testes automatizados (unitários, integração, etc.) nesta fase.

### Additional Technical Assumptions and Requests
- O sistema de 3 tentativas é uma regra de negócio fixa.
- A senha do aluno é definida pelo professor no momento do cadastro.
- Alunos podem refazer as atividades um número ilimitado de vezes.

---

## Epic List
- **Epic 1: Fundação e Experiência do Aluno**: Estabelece a infraestrutura do projeto, autenticação, os módulos de atividade principais e o dashboard do aluno.
- **Epic 2: Ferramentas do Professor e Gestão de Conteúdo**: Foca na criação da interface que permite aos professores criar e gerenciar atividades e questões.
- **Epic 3: Módulos Avançados e Progressão**: Introduz os módulos de atividade restantes e a lógica de desbloqueio que conecta a jornada do aluno.
- **Epic 4: Dashboard do Professor e Implantação**: Constrói as ferramentas de monitoramento para o professor, gestão de alunos e finaliza o projeto com o deploy.

---

## Epic 1: Fundação e Experiência do Aluno
**Goal**: Entregar a funcionalidade central para o aluno, permitindo que ele se autentique, realize as primeiras atividades e tenha seu progresso salvo.

### Story 1.1: Configuração do Projeto e Infraestrutura
As a: Desenvolvedor,
I want: Configurar o projeto no Supabase e a estrutura de pastas local,
so that: A base para o desenvolvimento da aplicação esteja pronta.
**Acceptance Criteria**:
1.  As tabelas `students`, `activities`, `question_bank`, `student_attempts`, `activity_assignments` e as views `concept_mastery`, `student_progress_summary` devem ser criadas no Supabase.
2.  As políticas de RLS básicas para a tabela `students` (aluno só pode ver a si mesmo) devem ser ativadas.
3.  A estrutura de pastas local (`/assets`, `/styles`, `/scripts`) deve ser criada conforme a especificação.

### Story 1.2: Autenticação do Aluno
As a: Aluno,
I want: Fazer login na plataforma usando meu nome e senha,
so that: Eu possa acessar meu dashboard de atividades.
**Acceptance Criteria**:
1.  A página `login.html` deve conter um formulário com campos para nome e senha.
2.  Ao submeter, o `auth.js` deve verificar as credenciais contra a tabela `students` no Supabase.
3.  Em caso de sucesso, o aluno é redirecionado para `aluno-dashboard.html`.
4.  Em caso de falha, uma mensagem de erro é exibida.

### Story 1.3: Runtime Básico de Atividades
As a: Desenvolvedor,
I want: Criar um motor (`activity-runtime.js`) que renderiza uma atividade baseada em JSON,
so that: Diferentes tipos de módulos possam ser exibidos de forma padronizada.
**Acceptance Criteria**:
1.  O `activity-runtime.js` deve ser capaz de buscar um JSON de atividade.
2.  Ele deve iterar sobre a lista de `modules` no JSON.
3.  Para cada módulo, ele deve chamar a função de renderização correspondente (ex: `m1-bateria.js` para `type: 'm1'`).

### Story 1.4: Implementação dos Módulos M1 e M9
As a: Aluno,
I want: Realizar as atividades dos tipos "Bateria Rápida" (M1) e "Compreensão Leitora" (M9),
so that: Eu possa praticar minhas habilidades de matemática e leitura.
**Acceptance Criteria**:
1.  O `m1-bateria.js` deve renderizar as questões do M1 e validar as respostas.
2.  O `m9-leitura.js` deve renderizar o texto e as questões de múltipla escolha do M9, validando a alternativa selecionada.
3.  A lógica de 3 tentativas com dicas deve ser implementada e funcional para ambos os módulos.

### Story 1.5: Dashboard do Aluno e Persistência de Dados
As a: Aluno,
I want: Ver minhas atividades no dashboard e ter meu progresso salvo,
so that: Eu possa continuar de onde parei e acompanhar meu desempenho.
**Acceptance Criteria**:
1.  A página `aluno-dashboard.html` deve buscar e listar as atividades atribuídas ao aluno logado.
2.  Ao completar uma questão, o `activity-runtime.js` deve salvar os dados da tentativa (acerto, erro, tempo) na tabela `student_attempts`.
3.  O dashboard deve refletir o status das atividades (ex: concluída, a fazer).

---

## Epic 2: Ferramentas do Professor e Gestão de Conteúdo
**Goal**: Capacitar o professor a criar, customizar e gerenciar o conteúdo pedagógico da plataforma.

### Story 2.1: Interface de Criação de Atividade (Metadados)
As a: Professor,
I want: Uma interface para iniciar a criação de uma nova atividade, definindo suas informações básicas,
so that: Eu possa organizar e categorizar o conteúdo.
**Acceptance Criteria**:
1.  A página `professor-criar.html` deve ter um formulário para os metadados da atividade: nome, tipo, códigos BNCC e duração.
2.  Se o tipo for "Integração", um dropdown deve aparecer para vincular a uma atividade de "Fluência".
3.  Um botão "+ Adicionar Módulo" deve estar visível.

### Story 2.2: Banco de Questões
As a: Professor,
I want: Um banco de questões onde eu possa criar e armazenar perguntas para reutilizar depois,
so that: Eu possa otimizar meu tempo ao montar novas atividades.
**Acceptance Criteria**:
1.  A página `professor-banco-questoes.html` deve permitir a criação, visualização, edição e exclusão de questões.
2.  O formulário de criação deve se adaptar ao tipo de módulo da questão (M1, M5, etc.).
3.  As questões devem ser salvas na tabela `question_bank`.

### Story 2.3: Integração do Banco de Questões e Preview
As a: Professor,
I want: Adicionar módulos à minha atividade, usando questões do banco ou criando novas na hora,
so that: Eu possa montar a sequência pedagógica desejada.
**Acceptance Criteria**:
1.  Na interface de criação de atividade, ao adicionar um módulo, deve haver a opção "Usar do Banco de Questões".
2.  Uma modal deve permitir a seleção de questões do banco.
3.  A interface deve permitir a criação de novas questões "on-the-fly".
4.  Deve haver um modo de "Preview" que mostra a sequência de módulos antes de salvar a atividade.

---

## Epic 3: Módulos Avançados e Progressão
**Goal**: Expandir a variedade de atividades disponíveis e implementar a lógica de progressão para criar uma jornada de aprendizado coesa.

### Story 3.1: Implementação dos Módulos M2, M6, M8
As a: Aluno,
I want: Realizar atividades dos tipos "Linha Numérica" (M2), "Destaca Palavra" (M6) e "Corrige Ortografia" (M8),
so that: Eu possa praticar uma gama maior de habilidades.
**Acceptance Criteria**:
1.  O `m2-linha.js` deve renderizar uma linha numérica e permitir arrastar pontos até o local correto.
2.  O `m6-palavra.js` deve permitir que o aluno clique em palavras em um texto para selecioná-las.
3.  O `m8-ortografia.js` deve apresentar uma questão de múltipla escolha para corrigir uma palavra.
4.  A lógica de 3 tentativas deve ser funcional para todos os novos módulos.

### Story 3.2: Sistema de Desbloqueio de Atividades
As a: Aluno,
I want: Desbloquear novas atividades ao completar as anteriores com sucesso,
so that: Eu sinta que estou progredindo em uma jornada.
**Acceptance Criteria**:
1.  A função `getAvailableActivities` deve ser implementada conforme a especificação.
2.  No dashboard do aluno, atividades bloqueadas devem ser visualmente distintas (ex: cinza, com um ícone de cadeado).
3.  Uma atividade com um `unlocked_by` preenchido só deve ficar disponível se o aluno tiver completado a atividade pré-requisito com acurácia de 70% ou mais.

---

## Epic 4: Dashboard do Professor e Implantação
**Goal**: Fornecer ao professor as ferramentas para monitorar o progresso dos alunos, gerenciar a turma e implantar a aplicação para uso real.

### Story 4.1: Dashboard do Professor - Visão Geral e Individual
As a: Professor,
I want: Um dashboard que mostre o desempenho geral da minha turma e me permita aprofundar nos dados de cada aluno,
so that: Eu possa identificar rapidamente quem precisa de mais ajuda e em quais habilidades.
**Acceptance Criteria**:
1.  O `professor-dashboard.html` deve exibir os KPIs da turma (alunos ativos, acurácia média, etc.).
2.  O dashboard deve mostrar um gráfico ou lista com a maestria média da turma por habilidade BNCC.
3.  Uma lista de alunos deve permitir clicar em um aluno para ver sua página de detalhes.
4.  A página de detalhes do aluno deve mostrar seu progresso geral, maestria por habilidade e um histórico de atividades.

### Story 4.2: Gestão de Alunos e Atribuição
As a: Professor,
I want: Cadastrar novos alunos na minha turma e atribuir atividades a eles,
so that: Eu possa gerenciar quem faz o quê.
**Acceptance Criteria**:
1.  Deve haver uma interface para adicionar um novo aluno (nome, senha, série).
2.  Na página de detalhes do aluno ou da turma, o professor deve poder selecionar uma ou mais atividades e atribuí-las a um ou mais alunos.
3.  A atribuição deve criar um registro na tabela `activity_assignments`.

### Story 4.3: Implantação e Teste Final
As a: Desenvolvedor,
I want: Implantar a aplicação na Vercel e realizar um teste de ponta a ponta,
so that: O MVP esteja disponível para os primeiros usuários.
**Acceptance Criteria**:
1.  O projeto deve ser conectado a um repositório Git e configurado para deploy automático na Vercel.
2.  O deploy deve ser bem-sucedido.
3.  Um teste completo com 3 "alunos reais" (pode ser o próprio dev em 3 contas) deve ser realizado, cobrindo o fluxo de login, realização de atividades, desbloqueio e visualização de progresso no dashboard do professor.

---

## Checklist Results Report
*(Esta seção será preenchida após a execução do `pm-checklist`.)*

---

## Next Steps

### UX Expert Prompt
"Com base neste PRD, por favor, crie a especificação de front-end (`front-end-spec.md`) e, se possível, um prompt para uma ferramenta de geração de UI como o v0 para acelerar o desenvolvimento do layout."

### Architect Prompt
"Com base neste PRD, por favor, crie o documento de arquitetura full-stack (`fullstack-architecture.md`), detalhando a implementação técnica, as interações com o Supabase e os padrões de código a serem seguidos."
