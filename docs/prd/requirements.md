# Requirements

## Functional
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

## Non-Functional
1.  **NFR1**: A aplicação deve ser construída utilizando exclusivamente HTML, CSS, Vanilla JavaScript no frontend, Supabase no backend e ser implantada na Vercel.
2.  **NFR2**: A interface do usuário deve ser responsiva, funcionando adequadamente em navegadores de desktop e mobile.
3.  **NFR3**: A aplicação deve utilizar a fonte Atkinson Hyperlegible para garantir a legibilidade e os ícones da biblioteca Lucide.
4.  **NFR4**: A estrutura de pastas do projeto deve seguir estritamente o que foi definido na especificação técnica.
5.  **NFR5**: O acesso aos dados dos alunos deve ser protegido utilizando Row Level Security (RLS) no Supabase para garantir que um aluno só possa ver seus próprios dados.
6.  **NFR6**: Para o MVP, as senhas dos alunos serão armazenadas em texto plano no banco de dados.

---
