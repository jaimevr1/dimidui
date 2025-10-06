# Plano de Qualidade e Testes - Estória 1.3

- **Estória**: 1.3: Runtime Básico de Atividades
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Manutenibilidade**: **ALTO IMPACTO**. Esta estória define a arquitetura central do frontend para a exibição de atividades. A criação de um orquestrador (`activity-runtime.js`) e módulos de renderização distintos é fundamental para a capacidade de adicionar novos tipos de atividades no futuro sem refatorar a lógica principal.
- **Confiabilidade**: **MÉDIO IMPACTO**. O runtime deve ser robusto o suficiente para lidar com configurações de módulos malformadas ou ausentes. Se um tipo de módulo no JSON não corresponder a nenhum renderizador conhecido, o sistema deve falhar de forma graciosa (ex: pular o módulo e registrar um erro no console) em vez de quebrar a aplicação inteira.
- **Performance**: **BAIXO IMPACTO** (nesta fase). Embora a performance seja importante, o foco inicial é na funcionalidade. No entanto, a limpeza adequada do contêiner antes de renderizar o próximo módulo (Tarefa 4) é uma prática essencial para evitar problemas de performance e memória no futuro.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Acoplamento forte entre runtime e módulos** | Média | Alto | O contrato entre o runtime e os módulos (a função `render` e o callback `onComplete`) deve ser bem definido e respeitado. A mitigação é garantir que o runtime não tenha conhecimento da lógica interna de nenhum módulo, apenas de sua interface. |
| **2. Falha no carregamento de dados da atividade** | Média | Médio | Se a chamada ao Supabase para buscar o JSON da atividade falhar (AC 1), a página ficará em branco. A mitigação é implementar tratamento de erro na função `loadActivity` para exibir uma mensagem amigável ao usuário. |
| **3. Erro no sequenciamento dos módulos** | Baixa | Médio | Um erro na lógica de incrementação do `currentModuleIndex` ou na chamada do `onComplete` pode fazer com que os módulos sejam pulados ou a atividade trave. A mitigação é o teste rigoroso do fluxo de ponta a ponta (Cenário 1.3.2). |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor.

### Cenário de Teste 1.3.1: Carregamento e Renderização do Primeiro Módulo
- **Objetivo**: Garantir que o runtime consegue buscar uma atividade e renderizar o primeiro módulo corretamente (AC 1, 2, 3).
- **Pré-condição**: Uma atividade de teste com pelo menos um módulo (ex: M1) existe no Supabase.
- **Passos**:
  1.  Acesse a URL `.../atividade.html?id=<ID_DA_ATIVIDADE>`.
- **Resultado Esperado**:
  - A página não deve apresentar erros no console.
  - O contêiner `#activity-container` deve ser preenchido com o HTML renderizado pelo módulo M1.

### Cenário de Teste 1.3.2: Sequenciamento de Módulos
- **Objetivo**: Verificar se o runtime avança corretamente para o próximo módulo após a conclusão do anterior.
- **Pré-condição**: Uma atividade de teste com dois módulos (ex: M1 seguido de M9) existe no Supabase. Os módulos devem ter uma forma de sinalizar sua conclusão (ex: um botão "Finalizar Módulo" para este teste).
- **Passos**:
  1.  Acesse a URL da atividade de teste.
  2.  Verifique se o Módulo M1 é exibido.
  3.  Interaja com o Módulo M1 para acionar seu callback `onComplete`.
- **Resultado Esperado**:
  - O conteúdo do Módulo M1 deve ser removido da tela.
  - O conteúdo do Módulo M9 deve ser renderizado em seu lugar.

### Cenário de Teste 1.3.3: Tratamento de Erro de Carregamento
- **Objetivo**: Garantir que o sistema lida bem com um ID de atividade inválido.
- **Passos**:
  1.  Acesse a URL `.../atividade.html?id=uuid-invalido`.
- **Resultado Esperado**:
  - A página deve exibir uma mensagem de erro clara para o usuário, como "Atividade não encontrada".
  - O console não deve apresentar erros não tratados (uncaught errors).

## 4. Sumário de QA

Esta estória é a espinha dorsal da experiência do aluno. A arquitetura de orquestrador/módulo é sólida, mas o sucesso depende de um "contrato" claro e bem implementado entre o `activity-runtime.js` e os scripts de cada módulo. Os testes devem focar na transição suave entre os módulos e no tratamento de erros, garantindo que a aplicação seja resiliente a falhas de dados ou de rede.
