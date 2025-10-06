# Project Brief: Dimidui MVP

## Executive Summary
O Dimidui MVP é uma plataforma de atividades educativas gamificadas, projetada para estudantes do 4º ao 6º ano. O projeto visa criar uma ferramenta de aprendizado adaptativo onde professores podem montar e atribuir atividades modulares focadas em fluência e integração de conhecimento, enquanto monitoram o progresso do aluno em tempo real. A solução será construída com HTML/CSS/JS, utilizando Supabase para backend e autenticação, com deploy na Vercel.

## Problem Statement
Professores necessitam de ferramentas mais eficazes e personalizáveis para acompanhar o desenvolvimento individual dos alunos, especialmente na identificação de dificuldades em habilidades específicas (BNCC). As soluções atuais podem ser genéricas, não permitindo a criação de jornadas de aprendizado adaptativas ou a reutilização de conteúdo. Alunos, por sua vez, se beneficiam de um ambiente de aprendizado mais engajador e interativo, que oferece feedback imediato e dicas construtivas para superar desafios.

## Proposed Solution
A solução é uma aplicação web (MVP) que consiste em um portal para alunos e um dashboard para professores. Os alunos acessam atividades compostas por uma cadeia de "módulos" (ex: Bateria Rápida, Linha Numérica, Compreensão Leitora). O sistema rastreia o desempenho em cada módulo, oferecendo um sistema de 3 tentativas com dicas progressivas. Os professores podem criar novas atividades, montar sequências de módulos a partir de um banco de questões reutilizável e monitorar o progresso da turma e de alunos individuais através de dashboards visuais, com foco em métricas de acurácia e maestria de conceitos da BNCC.

## Target Users
### Primary User Segment: Alunos (4º, 5º e 6º ano)
- **Perfil**: Crianças em fase de desenvolvimento de habilidades fundamentais de matemática e português.
- **Necessidades**: Engajamento, feedback instantâneo, instruções claras e uma sensação de progresso.
- **Metas**: Completar as atividades, melhorar seu desempenho e aprender de forma divertida.

### Secondary User Segment: Professores
- **Perfil**: Educadores que gerenciam turmas e buscam otimizar o ensino.
- **Necessidades**: Ferramentas para criar conteúdo personalizado, monitorar o desempenho da turma de forma macro e individual, identificar dificuldades de aprendizado rapidamente.
- **Metas**: Atribuir atividades relevantes, economizar tempo na correção e ter dados para embasar suas estratégias pedagógicas.

## Goals & Success Metrics
### Business Objectives
- Validar a arquitetura de módulos e o engajamento dos alunos com o formato proposto.
- Entregar um MVP funcional em 5 semanas para testes com usuários reais.

### User Success Metrics
- **Alunos**: Taxa de conclusão de atividades, aumento da acurácia média ao longo do tempo, utilização dos hints de forma eficaz.
- **Professores**: Taxa de criação de novas atividades, frequência de acesso aos dashboards de desempenho, utilização do banco de questões.

### Key Performance Indicators (KPIs)
- **`completed_activities`**: Número de atividades concluídas por aluno.
- **`overall_accuracy`**: Média de acurácia geral por aluno.
- **`mastered_concepts`**: Número de habilidades BNCC com média de acerto acima de 70%.
- **`attempts`**: Número de tentativas por questão, indicando o nível de dificuldade.

## MVP Scope
### Core Features (Must Have)
- **Semana 1**: Setup da infra (Supabase), autenticação de alunos, módulos M1 (BateriaRápida) e M9 (CompreensãoLeitora), e o runtime básico para renderizar as atividades.
- **Semana 2**: Dashboard do aluno para listar atividades, módulo M5 (IdentificaOperação), e a lógica para salvar tentativas e apresentar dicas.
- **Semana 3**: Interface de criação de atividades para o professor, incluindo um banco de questões CRUD.
- **Semana 4**: Módulos M2 (LinhaNumérica), M6 (DestacaPalavraChave), M8 (CorrigeOrtografia), e o sistema de desbloqueio de atividades.
- **Semana 5**: Dashboard do professor (visão geral e individual), gestão de alunos e deploy na Vercel para testes.

### Out of Scope for MVP
- Múltiplos modos de jogo para o mesmo tipo de módulo (ex: M8 apenas múltipla escolha).
- Temas (apenas Light Mode).
- Perfis de administrador ou múltiplos professores.
- Relatórios avançados ou exportação de dados.
- Hash de senhas (serão em plaintext no MVP).

## Post-MVP Vision
*(Não definido na especificação inicial. A ser elaborado com base no feedback do MVP.)*

## Technical Considerations
### Platform Requirements
- **Target Platforms:** Web (Desktop e Mobile).
- **Browser/OS Support:** Navegadores modernos.
- **Performance Requirements:** Carregamento rápido das atividades e feedback em tempo real.

### Technology Preferences
- **Frontend:** HTML5, CSS3, Vanilla JavaScript.
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **Database:** PostgreSQL (via Supabase).
- **Hosting/Infrastructure:** Vercel.

### Architecture Considerations
- **Repository Structure:** Monorepo contendo todos os arquivos do frontend.
- **Service Architecture:** Backend-as-a-Service (BaaS) com Supabase.
- **Security/Compliance:** RLS (Row Level Security) no Supabase para isolamento de dados dos alunos.

## Constraints & Assumptions
### Constraints
- **Timeline:** O projeto deve ser executado em 5 semanas.
- **Tecnologia:** O stack tecnológico (JS, Supabase, Vercel) está definido.
- **Recursos:** Foco em um MVP enxuto, sem recursos visuais ou de áudio complexos.

### Key Assumptions
- O sistema de 3 tentativas com dicas progressivas é um modelo eficaz para o público-alvo.
- Professores se sentirão confortáveis para criar e configurar atividades usando a interface de módulos.
- A estrutura de dados do Supabase é suficiente para suportar as queries dos dashboards de desempenho.

## Risks & Open Questions
*(Não detalhado na especificação. A ser avaliado durante o desenvolvimento.)*

## Appendices
### References
- O documento de especificação técnica original: `docs/dimidui_spec.md`.

## Next Steps
### Immediate Actions
1.  Revisar e aprovar este Project Brief.
2.  Proceder para a criação do Product Requirements Document (PRD) com o agente Product Manager (PM).
3.  Iniciar o desenvolvimento da Semana 1, conforme o cronograma.

### PM Handoff
This Project Brief provides the full context for Dimidui MVP. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.
