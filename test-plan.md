# Plano de Testes - Stories 1.2 e 1.3

## Credenciais de Teste
- **Professor**: jaime.alencar.oliveira@gmail.com / jaimealencar13#
- **Aluno Teste**: Aluno Teste / 123456

## Story 1.2: Autenticação do Aluno

### Funcionalidades Implementadas
- ✅ Página de login (`login.html`)
- ✅ Sistema de autenticação (`scripts/auth.js`)
- ✅ Dashboard do aluno (`aluno-dashboard.html`)
- ✅ Proteção de rotas

### Cenários de Teste

#### TC1.2.1: Login com credenciais válidas
**Pré-condição**: Usuário "Aluno Teste" existe na tabela `students`
**Passos**:
1. Acessar `login.html`
2. Inserir nome: "Aluno Teste"
3. Inserir senha: "123456"
4. Clicar em "Entrar"

**Resultado esperado**: Redirecionamento para `aluno-dashboard.html`

#### TC1.2.2: Login com credenciais inválidas
**Passos**:
1. Acessar `login.html`
2. Inserir nome: "Usuário Inexistente"
3. Inserir senha: "senha_errada"
4. Clicar em "Entrar"

**Resultado esperado**: Exibição da mensagem "Usuário ou senha inválidos."

#### TC1.2.3: Proteção de rota - acesso direto ao dashboard
**Passos**:
1. Limpar localStorage do navegador
2. Acessar diretamente `aluno-dashboard.html`

**Resultado esperado**: Redirecionamento automático para `login.html`

#### TC1.2.4: Persistência de sessão
**Pré-condição**: Usuário logado com sucesso
**Passos**:
1. Fazer login com credenciais válidas
2. Verificar se `student_id` está no localStorage
3. Recarregar a página do dashboard

**Resultado esperado**: Dashboard permanece acessível sem novo login

## Story 1.3: Runtime Básico de Atividades

### Funcionalidades Implementadas
- ✅ Página de atividade (`atividade.html`)
- ✅ Runtime de atividades (`scripts/activity-runtime.js`)
- ✅ Módulos básicos (M1 e M9 placeholders)

### Cenários de Teste

#### TC1.3.1: Carregamento de atividade válida
**Pré-condição**: Atividade de teste existe no Supabase com módulos M1 e M9
**Passos**:
1. Acessar `atividade.html?id=<activity_id>`
2. Verificar se o primeiro módulo é carregado
3. Simular conclusão do primeiro módulo
4. Verificar transição para o segundo módulo

**Resultado esperado**: Sequenciamento correto dos módulos

#### TC1.3.2: Atividade inexistente
**Passos**:
1. Acessar `atividade.html?id=999999`

**Resultado esperado**: Tratamento de erro apropriado

## Requisitos para Execução dos Testes

### Dados de Teste no Supabase
1. **Tabela `students`**: Inserir registro com nome "Aluno Teste" e senha "123456"
2. **Tabela `activities`**: Criar atividade de teste com 2 módulos (M1 e M9)

### Configuração do Ambiente
1. Servidor HTTP local rodando (ex: Live Server, http-server)
2. Configuração do Supabase client funcionando
3. Navegador com DevTools para verificar localStorage e console

## Limitações Identificadas

1. **Senhas em texto plano**: Sistema atual não hash senhas (adequado para MVP)
2. **Módulos placeholder**: M1 e M9 são apenas estruturas básicas
3. **Sem logout**: Funcionalidade não implementada nas stories atuais
4. **Tratamento de erro limitado**: Poucos cenários de erro cobertos

## Scripts de Teste Automatizado

Para automatizar estes testes, seria necessário:
- Framework de teste E2E (Cypress, Playwright)
- Mock do Supabase ou ambiente de teste dedicado
- Configuração de dados de teste automatizada