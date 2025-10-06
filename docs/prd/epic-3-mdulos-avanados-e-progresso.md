# Epic 3: Módulos Avançados e Progressão
**Goal**: Expandir a variedade de atividades disponíveis e implementar a lógica de progressão para criar uma jornada de aprendizado coesa.

## Story 3.1: Implementação dos Módulos M2, M6, M8
As a: Aluno,
I want: Realizar atividades dos tipos "Linha Numérica" (M2), "Destaca Palavra" (M6) e "Corrige Ortografia" (M8),
so that: Eu possa praticar uma gama maior de habilidades.
**Acceptance Criteria**:
1.  O `m2-linha.js` deve renderizar uma linha numérica e permitir arrastar pontos até o local correto.
2.  O `m6-palavra.js` deve permitir que o aluno clique em palavras em um texto para selecioná-las.
3.  O `m8-ortografia.js` deve apresentar uma questão de múltipla escolha para corrigir uma palavra.
4.  A lógica de 3 tentativas deve ser funcional para todos os novos módulos.

## Story 3.2: Sistema de Desbloqueio de Atividades
As a: Aluno,
I want: Desbloquear novas atividades ao completar as anteriores com sucesso,
so that: Eu sinta que estou progredindo em uma jornada.
**Acceptance Criteria**:
1.  A função `getAvailableActivities` deve ser implementada conforme a especificação.
2.  No dashboard do aluno, atividades bloqueadas devem ser visualmente distintas (ex: cinza, com um ícone de cadeado).
3.  Uma atividade com um `unlocked_by` preenchido só deve ficar disponível se o aluno tiver completado a atividade pré-requisito com acurácia de 70% ou mais.

---
