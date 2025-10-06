# Technical Assumptions

## Repository Structure: Monorepo
A estrutura de pastas descrita na especificação implica um único repositório para todo o código do frontend.

## Service Architecture
A arquitetura é de Backend-as-a-Service (BaaS), com toda a lógica de backend, banco de dados e autenticação gerenciada pelo Supabase.

## Testing Requirements
A especificação menciona "Teste com 3 alunos reais", indicando um foco em testes manuais de usabilidade para o MVP. Não há requisitos para testes automatizados (unitários, integração, etc.) nesta fase.

## Additional Technical Assumptions and Requests
- O sistema de 3 tentativas é uma regra de negócio fixa.
- A senha do aluno é definida pelo professor no momento do cadastro.
- Alunos podem refazer as atividades um número ilimitado de vezes.

---
