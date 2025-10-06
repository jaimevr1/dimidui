# Epic 1: Fundação e Experiência do Aluno
**Goal**: Entregar a funcionalidade central para o aluno, permitindo que ele se autentique, realize as primeiras atividades e tenha seu progresso salvo.

## Story 1.1: Configuração do Projeto e Infraestrutura
As a: Desenvolvedor,
I want: Configurar o projeto no Supabase e a estrutura de pastas local,
so that: A base para o desenvolvimento da aplicação esteja pronta.
**Acceptance Criteria**:
1.  As tabelas `students`, `activities`, `question_bank`, `student_attempts`, `activity_assignments` e as views `concept_mastery`, `student_progress_summary` devem ser criadas no Supabase.
2.  As políticas de RLS básicas para a tabela `students` (aluno só pode ver a si mesmo) devem ser ativadas.
3.  A estrutura de pastas local (`/assets`, `/styles`, `/scripts`) deve ser criada conforme a especificação.

## Story 1.2: Autenticação do Aluno
As a: Aluno,
I want: Fazer login na plataforma usando meu nome e senha,
so that: Eu possa acessar meu dashboard de atividades.
**Acceptance Criteria**:
1.  A página `login.html` deve conter um formulário com campos para nome e senha.
2.  Ao submeter, o `auth.js` deve verificar as credenciais contra a tabela `students` no Supabase.
3.  Em caso de sucesso, o aluno é redirecionado para `aluno-dashboard.html`.
4.  Em caso de falha, uma mensagem de erro é exibida.

## Story 1.3: Runtime Básico de Atividades
As a: Desenvolvedor,
I want: Criar um motor (`activity-runtime.js`) que renderiza uma atividade baseada em JSON,
so that: Diferentes tipos de módulos possam ser exibidos de forma padronizada.
**Acceptance Criteria**:
1.  O `activity-runtime.js` deve ser capaz de buscar um JSON de atividade.
2.  Ele deve iterar sobre a lista de `modules` no JSON.
3.  Para cada módulo, ele deve chamar a função de renderização correspondente (ex: `m1-bateria.js` para `type: 'm1'`).

## Story 1.4: Implementação dos Módulos M1 e M9
As a: Aluno,
I want: Realizar as atividades dos tipos "Bateria Rápida" (M1) e "Compreensão Leitora" (M9),
so that: Eu possa praticar minhas habilidades de matemática e leitura.
**Acceptance Criteria**:
1.  O `m1-bateria.js` deve renderizar as questões do M1 e validar as respostas.
2.  O `m9-leitura.js` deve renderizar o texto e as questões de múltipla escolha do M9, validando a alternativa selecionada.
3.  A lógica de 3 tentativas com dicas deve ser implementada e funcional para ambos os módulos.

## Story 1.5: Dashboard do Aluno e Persistência de Dados
As a: Aluno,
I want: Ver minhas atividades no dashboard e ter meu progresso salvo,
so that: Eu possa continuar de onde parei e acompanhar meu desempenho.
**Acceptance Criteria**:
1.  A página `aluno-dashboard.html` deve buscar e listar as atividades atribuídas ao aluno logado.
2.  Ao completar uma questão, o `activity-runtime.js` deve salvar os dados da tentativa (acerto, erro, tempo) na tabela `student_attempts`.
3.  O dashboard deve refletir o status das atividades (ex: concluída, a fazer).

---
