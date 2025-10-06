# Plano de Qualidade e Testes - Estória 1.4

- **Estória**: 1.4: Implementação dos Módulos M1 e M9
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. Esta estória é puramente focada na experiência do usuário. A clareza do feedback (AC 3), a intuitividade da interface de resposta (AC 1, 2) e a ausência de bugs visuais são cruciais para manter o aluno engajado e evitar frustração.
- **Manutenibilidade**: **MÉDIO IMPACTO**. A criação de uma lógica de tentativas reutilizável (Tarefa 1) é um ponto chave. Se cada módulo implementar sua própria versão da lógica de 3 tentativas, a manutenção se tornará um pesadelo. Uma implementação centralizada é essencial.
- **Funcionalidade**: **ALTO IMPACTO**. A validação correta das respostas é o cerne da funcionalidade. Um bug que marque uma resposta certa como errada (ou vice-versa) quebra a confiança do usuário na plataforma.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Lógica de validação de resposta incorreta** | Média | **Crítico** | Um bug na função que compara a resposta do usuário com a resposta correta pode invalidar a atividade inteira. A mitigação é ter múltiplos casos de teste, incluindo respostas com espaçamento diferente, maiúsculas/minúsculas, etc. |
| **2. Lógica de 3 tentativas com falhas** | Média | Alto | Se a contagem de tentativas não for gerenciada corretamente, o usuário pode não receber a dica no momento certo ou a resposta correta pode ser mostrada prematuramente. A mitigação é testar exaustivamente o ciclo completo de 3 erros (Cenário 1.4.2). |
| **3. Quebra de layout com diferentes conteúdos** | Alta | Baixo | O layout pode quebrar se o texto do enunciado ou das alternativas for muito longo. A mitigação é testar com conteúdos de tamanhos variados e garantir que o CSS lide com overflow de texto. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor para cada módulo (M1 e M9).

### Cenário de Teste 1.4.1: Fluxo de Resposta Correta
- **Objetivo**: Garantir que uma resposta correta recebe o feedback apropriado e avança o estado da atividade (AC 1, 2).
- **Pré-condição**: Uma atividade com um módulo M1 (ou M9) está carregada.
- **Passos**:
  1.  Visualize a primeira questão.
  2.  Forneça a resposta exata definida no `config` da questão.
  3.  Submeta a resposta.
- **Resultado Esperado**:
  - Uma mensagem de sucesso (ex: "✅ Correto!") é exibida.
  - A questão é marcada como concluída e o usuário avança para a próxima, ou o módulo é finalizado se for a última questão.

### Cenário de Teste 1.4.2: Ciclo Completo de 3 Tentativas
- **Objetivo**: Verificar se a lógica de feedback progressivo funciona conforme especificado (AC 3).
- **Pré-condição**: Uma atividade com um módulo M1 (ou M9) está carregada.
- **Passos**:
  1.  Visualize uma questão.
  2.  **Tentativa 1**: Forneça uma resposta incorreta e submeta. Verifique se a mensagem é "❌ Tente outra vez".
  3.  **Tentativa 2**: Forneça outra resposta incorreta e submeta. Verifique se a mensagem de feedback contém a dica da questão (ex: "💡 Dica: ...").
  4.  **Tentativa 3**: Forneça uma terceira resposta incorreta e submeta. Verifique se a mensagem mostra a resposta correta (ex: "A resposta correta era: ...") e se a questão é bloqueada, impedindo novas tentativas.
- **Resultado Esperado**: O feedback em cada etapa deve corresponder exatamente ao esperado.

### Cenário de Teste 1.4.3: Validação da Lógica Específica do Módulo
- **Objetivo**: Garantir que a mecânica de cada módulo funciona.
- **Passos (para M1)**:
  1.  Verifique se o campo de input de texto aceita a resposta.
  2.  Se o timer estiver ativado, verifique se ele está visível e contando.
- **Passos (para M9)**:
  1.  Verifique se o texto principal é exibido corretamente.
  2.  Verifique se as alternativas são renderizadas como botões clicáveis.
  3.  Clique em uma alternativa e verifique se o estado de seleção é visualmente claro.
- **Resultado Esperado**: A interação específica de cada módulo deve funcionar de forma intuitiva.

## 4. Sumário de QA

Esta estória é de alta importância para a experiência do usuário. A qualidade da implementação da lógica de tentativas e da validação das respostas definirá o sucesso do núcleo de aprendizado da plataforma. Recomenda-se a criação de uma função ou classe `QuestionAttempt` genérica e bem testada para garantir consistência entre todos os módulos. Os testes manuais devem ser rigorosos, cobrindo todos os passos do ciclo de 3 tentativas para cada tipo de módulo.
