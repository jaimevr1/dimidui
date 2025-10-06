# Epic 2: Ferramentas do Professor e Gestão de Conteúdo
**Goal**: Capacitar o professor a criar, customizar e gerenciar o conteúdo pedagógico da plataforma.

## Story 2.1: Interface de Criação de Atividade (Metadados)
As a: Professor,
I want: Uma interface para iniciar a criação de uma nova atividade, definindo suas informações básicas,
so that: Eu possa organizar e categorizar o conteúdo.
**Acceptance Criteria**:
1.  A página `professor-criar.html` deve ter um formulário para os metadados da atividade: nome, tipo, códigos BNCC e duração.
2.  Se o tipo for "Integração", um dropdown deve aparecer para vincular a uma atividade de "Fluência".
3.  Um botão "+ Adicionar Módulo" deve estar visível.

## Story 2.2: Banco de Questões
As a: Professor,
I want: Um banco de questões onde eu possa criar e armazenar perguntas para reutilizar depois,
so that: Eu possa otimizar meu tempo ao montar novas atividades.
**Acceptance Criteria**:
1.  A página `professor-banco-questoes.html` deve permitir a criação, visualização, edição e exclusão de questões.
2.  O formulário de criação deve se adaptar ao tipo de módulo da questão (M1, M5, etc.).
3.  As questões devem ser salvas na tabela `question_bank`.

## Story 2.3: Integração do Banco de Questões e Preview
As a: Professor,
I want: Adicionar módulos à minha atividade, usando questões do banco ou criando novas na hora,
so that: Eu possa montar a sequência pedagógica desejada.
**Acceptance Criteria**:
1.  Na interface de criação de atividade, ao adicionar um módulo, deve haver a opção "Usar do Banco de Questões".
2.  Uma modal deve permitir a seleção de questões do banco.
3.  A interface deve permitir a criação de novas questões "on-the-fly".
4.  Deve haver um modo de "Preview" que mostra a sequência de módulos antes de salvar a atividade.

---
