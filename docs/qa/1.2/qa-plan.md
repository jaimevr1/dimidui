# Plano de Qualidade e Testes - Estória 1.2

- **Estória**: 1.2: Autenticação do Aluno
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Segurança (NFR6)**: **RISCO ALTO**. A estória implementa a autenticação, que é um ponto crítico de segurança. O fato de as senhas serem armazenadas em texto plano, conforme a NFR6, é uma vulnerabilidade **aceita para o MVP**, mas deve ser registrada como um débito técnico de segurança de alta prioridade a ser resolvido antes de um lançamento em produção.
- **Usabilidade**: **ALTO IMPACTO**. A experiência de login é o primeiro ponto de contato do aluno com a aplicação. Um fluxo de login que não funciona, ou mensagens de erro pouco claras (AC 4), podem causar frustração imediata e impedir o uso da plataforma.
- **Confiabilidade**: **MÉDIO IMPACTO**. A consulta de autenticação ao Supabase (AC 2) deve ser confiável. Falhas de rede ou erros na consulta devem ser tratados para não deixar o usuário em um estado de limbo.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Lógica de autenticação insegura** | **Alta** | **Crítico** | A comparação de senha em texto plano é inerentemente insegura. A mitigação no MVP é aceitar o risco, mas para produção, a solução é usar o sistema de autenticação do Supabase Auth com hash de senhas. |
| **2. Gerenciamento de sessão inadequado** | Média | Alto | Se o `student_id` não for armazenado ou verificado corretamente, um usuário não autenticado pode acessar rotas protegidas. A mitigação é o teste rigoroso do fluxo de proteção de rotas (Cenário 1.2.3). |
| **3. Mensagens de erro genéricas** | Alta | Baixo | Mensagens como "Erro" em vez de "Usuário ou senha inválidos" prejudicam a usabilidade. A mitigação é garantir que a AC 4 seja implementada com texto claro. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor após a conclusão das tarefas.

### Cenário de Teste 1.2.1: Fluxo de Login com Sucesso
- **Objetivo**: Garantir que um usuário com credenciais válidas consiga fazer login e ser redirecionado (AC 1, 2, 3).
- **Pré-condição**: Um usuário de teste (ex: `aluno_teste`, senha `1234`) existe na tabela `students`.
- **Passos**:
  1.  Acesse a página `login.html`.
  2.  Digite `aluno_teste` no campo de nome.
  3.  Digite `1234` no campo de senha.
  4.  Clique no botão de submit.
- **Resultado Esperado**:
  - O navegador deve ser redirecionado para `aluno-dashboard.html`.
  - No console do navegador, `localStorage.getItem('student_id')` deve retornar o UUID do `aluno_teste`.

### Cenário de Teste 1.2.2: Fluxo de Login com Falha
- **Objetivo**: Garantir que credenciais inválidas resultem em uma mensagem de erro clara e não permitam o acesso (AC 4).
- **Passos**:
  1.  Acesse a página `login.html`.
  2.  Digite `aluno_teste` no campo de nome.
  3.  Digite `senha_errada` no campo de senha.
  4.  Clique no botão de submit.
- **Resultado Esperado**:
  - O usuário deve permanecer na página `login.html`.
  - Uma mensagem de erro visível, como "Usuário ou senha inválidos", deve aparecer na página.

### Cenário de Teste 1.2.3: Proteção de Rota
- **Objetivo**: Garantir que um usuário não autenticado não possa acessar páginas protegidas (AC 3).
- **Passos**:
  1.  Limpe o `localStorage` do navegador (`localStorage.clear()` no console).
  2.  Tente acessar a URL `.../aluno-dashboard.html` diretamente no navegador.
- **Resultado Esperado**:
  - O navegador deve redirecionar o usuário imediatamente para `login.html`.

## 4. Sumário de QA

A estória é **crítica para a funcionalidade** do MVP. O principal risco de segurança (senhas em texto plano) foi aceito para o escopo do MVP, mas deve ser tratado como prioridade máxima pós-MVP. Os testes devem focar em garantir que o fluxo de login funcione perfeitamente nos cenários de sucesso e falha, e que a proteção de rotas baseada no `localStorage` seja robusta e impeça qualquer acesso não autorizado.
