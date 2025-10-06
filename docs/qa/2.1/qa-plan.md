# Plano de Qualidade e Testes - Estória 2.1

- **Estória**: 2.1: Interface de Criação de Atividade (Metadados)
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. Esta é a primeira etapa da principal ferramenta do professor. A interface deve ser intuitiva e os campos claramente rotulados. A lógica condicional para exibir o dropdown de vinculação (AC 2) é um ponto chave de usabilidade; se não funcionar, o professor não poderá criar atividades de integração.
- **Manutenibilidade**: **BAIXO IMPACTO**. O código para esta estória é relativamente simples e contido. No entanto, a forma como a chamada ao Supabase para popular o dropdown é feita pode impactar a manutenibilidade se a lógica for misturada diretamente com a manipulação do DOM.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Dropdown de vinculação não é populado** | Média | Alto | Se a chamada ao Supabase para buscar as atividades de "Fluência" falhar, o professor não poderá criar atividades de "Integração". A mitigação é tratar o erro da chamada à API e exibir uma mensagem clara, como "Não foi possível carregar as atividades de pré-requisito". |
| **2. Lógica de exibição condicional falha** | Baixa | Médio | Se o dropdown de vinculação não aparecer ou desaparecer nos momentos corretos, a interface ficará confusa. A mitigação é o teste rigoroso do event listener no campo "Tipo" (Cenário 2.1.2). |
| **3. Validação de entrada inexistente** | Alta | Baixo | O formulário pode permitir que o professor submeta dados inválidos (ex: duração negativa). Embora a estória não exija validação, isso representa um pequeno débito técnico. A mitigação é adicionar validações básicas de formulário HTML5 (ex: `type="number" min="1"`). |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 2.1.1: Verificação do Formulário Padrão
- **Objetivo**: Garantir que o formulário de metadados é renderizado corretamente no estado inicial (AC 1, 3).
- **Passos**:
  1.  Abra a página `professor-criar.html`.
- **Resultado Esperado**:
  - Devem ser exibidos campos para nome, tipo (com "Fluência" selecionado por padrão), códigos BNCC e duração.
  - O dropdown para vincular atividades de pré-requisito não deve estar visível.
  - O botão "+ Adicionar Módulo" deve estar visível.

### Cenário de Teste 2.1.2: Lógica de Exibição Condicional
- **Objetivo**: Verificar se a interface se adapta corretamente à seleção do tipo de atividade (AC 2).
- **Pré-condição**: Existem pelo menos duas atividades com `type = 'fluencia'` no banco de dados.
- **Passos**:
  1.  Abra a página `professor-criar.html`.
  2.  No dropdown "Tipo", selecione "Integração".
  3.  Observe a interface.
  4.  No dropdown "Tipo", selecione "Fluência" novamente.
- **Resultado Esperado**:
  - Ao selecionar "Integração", um novo dropdown deve aparecer, contendo os nomes das atividades de fluência existentes.
  - Ao selecionar "Fluência" novamente, o dropdown de vinculação deve desaparecer.

### Cenário de Teste 2.1.3: Dropdown de Vinculação Vazio
- **Objetivo**: Verificar o comportamento do sistema quando não há atividades de pré-requisito para vincular.
- **Pré-condição**: Não existe nenhuma atividade com `type = 'fluencia'` no banco de dados.
- **Passos**:
  1.  Abra a página `professor-criar.html`.
  2.  No dropdown "Tipo", selecione "Integração".
- **Resultado Esperado**:
  - O dropdown de vinculação deve aparecer, mas estar vazio ou conter uma mensagem como "Nenhuma atividade de fluência encontrada". O ideal é que ele fique desabilitado.

## 4. Sumário de QA

O foco desta estória é a usabilidade e a reatividade da interface do formulário. A experiência do professor ao criar conteúdo depende de uma UI que se adapta de forma inteligente e confiável. Os testes devem validar exaustivamente a lógica condicional de exibição do formulário, incluindo o tratamento de casos onde a chamada de dados para popular o dropdown de vinculação falha ou retorna vazia.
