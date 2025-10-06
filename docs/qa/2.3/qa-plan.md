# Plano de Qualidade e Testes - Estória 2.3

- **Estória**: 2.3: Integração do Banco de Questões e Preview
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. Esta estória define o fluxo de trabalho central do professor. A capacidade de montar uma atividade de forma fluida, misturando questões novas e existentes, é crucial. A clareza da modal de seleção (AC 2) e a utilidade do preview (AC 4) determinarão se a ferramenta é eficiente ou frustrante.
- **Integridade de Dados**: **MÉDIO IMPACTO**. Ao adicionar um módulo, o sistema deve garantir que o objeto JSON do módulo seja construído corretamente, com o `type` e a `config` adequados, para que o `activity-runtime` possa interpretá-lo. Um erro aqui pode levar à criação de atividades "quebradas".
- **Performance**: **BAIXO IMPACTO**. A busca de questões do banco para a modal de seleção (AC 2) pode se tornar lenta se o banco de questões crescer muito. Para o MVP, isso não é uma preocupação, mas a implementação de paginação ou busca na modal deve ser considerada para o futuro.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Falha na montagem do JSON da atividade** | Média | **Crítico** | Se a "esteira" de módulos não construir corretamente o array `modules` final, a atividade salva será inoperável. A mitigação é testar o fluxo completo, desde a adição de módulos até a verificação do JSON final gerado para o modo de preview. |
| **2. Complexidade da UI na modal** | Média | Médio | A modal que permite criar e selecionar questões pode se tornar muito complexa, confundindo o usuário. A mitigação é manter a UI limpa, talvez usando abas para separar "Criar Nova" de "Selecionar do Banco". |
| **3. Preview não reflete o estado real** | Baixa | Médio | Se o preview (AC 4) não usar exatamente o mesmo objeto JSON que será salvo, ele pode mostrar uma versão diferente da atividade, enganando o professor. A mitigação é garantir que a mesma função de "construir JSON da atividade" seja usada tanto para o preview quanto para o salvamento final. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 2.3.1: Fluxo de Adição a partir do Banco de Questões
- **Objetivo**: Garantir que o professor consiga adicionar módulos a uma atividade usando questões pré-existentes (AC 1, 2).
- **Pré-condição**: Existem várias questões de tipos diferentes no `question_bank`.
- **Passos**:
  1.  Acesse a página `professor-criar.html` e preencha os metadados.
  2.  Clique em "+ Adicionar Módulo".
  3.  Na modal, escolha "Usar do Banco de Questões".
  4.  Verifique se as questões do banco são listadas.
  5.  Selecione duas ou três questões e clique em "Adicionar Selecionadas".
- **Resultado Esperado**:
  - A modal deve fechar.
  - Cards representando os módulos selecionados devem aparecer na área de "esteira" da página principal.

### Cenário de Teste 2.3.2: Fluxo de Adição "On-the-fly"
- **Objetivo**: Garantir que o professor consiga criar uma nova questão e adicioná-la diretamente à atividade (AC 3).
- **Passos**:
  1.  Acesse a página `professor-criar.html`.
  2.  Clique em "+ Adicionar Módulo".
  3.  Na modal, escolha "Criar Nova Questão".
  4.  Preencha o formulário para uma nova questão e salve.
- **Resultado Esperado**:
  - A modal deve fechar.
  - Um card representando o módulo recém-criado deve aparecer na "esteira".
  - A nova questão também deve ter sido salva na tabela `question_bank`.

### Cenário de Teste 2.3.3: Verificação do Preview
- **Objetivo**: Garantir que a função de preview renderiza a atividade corretamente (AC 4).
- **Pré-condição**: Uma atividade com 2-3 módulos foi montada na "esteira".
- **Passos**:
  1.  Clique no botão "Preview".
- **Resultado Esperado**:
  - Uma nova janela ou modal deve abrir, mostrando a atividade sendo executada pelo `activity-runtime`.
  - A sequência e o conteúdo dos módulos no preview devem corresponder exatamente ao que foi montado na página de criação.

## 4. Sumário de QA

Esta estória integra todas as funcionalidades do professor criadas até agora, tornando-a um ponto crítico de teste para o fluxo de criação de conteúdo. O sucesso depende da comunicação perfeita entre a UI, o estado da atividade sendo construída em JavaScript e as chamadas ao banco de dados. Os testes devem validar o fluxo de ponta a ponta, desde a seleção de uma questão no banco até sua correta renderização no modo de preview.
