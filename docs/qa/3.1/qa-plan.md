# Plano de Qualidade e Testes - Estória 3.1

- **Estória**: 3.1: Implementação dos Módulos M2, M6, M8
- **Agente de QA**: Quinn
- **Data**: 2025-10-06

## 1. Análise de Requisitos Não-Funcionais (NFR)

- **Usabilidade**: **ALTO IMPACTO**. Esta estória introduz interações mais complexas que as anteriores (arrastar e soltar, seleção de texto). A intuitividade e a resposta tátil (feedback visual) dessas interações são cruciais para que não se tornem frustrantes, especialmente em telas de toque.
- **Manutenibilidade**: **MÉDIO IMPACTO**. A lógica de interatividade (especialmente o drag-and-drop do M2 e o processamento de texto do M6) pode ser complexa. É importante que essa lógica seja bem encapsulada dentro de cada módulo, sem vazar para o runtime ou outros módulos.
- **Compatibilidade**: **MÉDIO IMPACTO**. Interações como drag-and-drop podem ter implementações e comportamentos diferentes entre navegadores (especialmente mobile vs. desktop). O teste deve cobrir diferentes ambientes para garantir uma experiência consistente.

## 2. Análise de Risco

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| **1. Lógica de Drag-and-Drop (M2) com bugs** | Alta | Alto | A implementação de arrastar e soltar do zero é propensa a bugs de cálculo de posição e de eventos de toque/mouse. A mitigação é testar em diferentes tamanhos de tela e dispositivos, e considerar o uso de uma microbiblioteca de drag-and-drop se a implementação nativa se mostrar muito complexa. |
| **2. Processamento de texto (M6) falha com pontuação** | Alta | Médio | A lógica que divide o texto em `<span>`s pode falhar ao lidar com pontuação (vírgulas, pontos), tornando a palavra incorreta clicável. A mitigação é usar uma expressão regular robusta para separar as palavras, preservando a pontuação como elementos não clicáveis. |
| **3. Reutilização da lógica de 3 tentativas** | Baixa | Alto | Se a lógica de 3 tentativas não for reutilizada da Estória 1.4 e for reescrita, há um risco de inconsistência no comportamento de feedback entre os módulos. A mitigação é garantir que a Tarefa 1 da Estória 1.4 tenha produzido uma função/classe reutilizável e que ela seja usada aqui. |

## 3. Plano de Teste (Test Design)

Estes testes devem ser executados manualmente pelo desenvolvedor para cada novo módulo.

### Cenário de Teste 3.1.1: Funcionalidade do Módulo M2 (Linha Numérica)
- **Objetivo**: Garantir que a interação de arrastar e soltar e a validação funcionam corretamente (AC 1).
- **Passos**:
  1.  Carregue uma atividade com um módulo M2.
  2.  Arraste um ponto para uma posição incorreta (fora da tolerância) e solte.
  3.  Arraste o mesmo ponto para a posição correta (dentro da tolerância) e solte.
- **Resultado Esperado**:
  - Ao soltar na posição incorreta, um feedback de erro deve ser exibido.
  - Ao soltar na posição correta, um feedback de sucesso deve ser exibido e o ponto deve travar no lugar.

### Cenário de Teste 3.1.2: Funcionalidade do Módulo M6 (Destaca Palavra)
- **Objetivo**: Garantir que a seleção de palavras e a validação funcionam (AC 2).
- **Passos**:
  1.  Carregue uma atividade com um módulo M6.
  2.  Clique em uma palavra incorreta. O estado de seleção deve ser visível (ex: cor de fundo diferente).
  3.  Clique em uma palavra correta. O estado de seleção também deve ser visível.
  4.  Clique novamente em uma palavra selecionada para desmarcá-la.
  5.  Clique no botão "Verificar".
- **Resultado Esperado**:
  - O clique deve alternar o estado de seleção da palavra.
  - O feedback após a verificação deve indicar corretamente se o conjunto de palavras selecionadas está certo ou errado.

### Cenário de Teste 3.1.3: Funcionalidade do Módulo M8 (Corrige Ortografia)
- **Objetivo**: Garantir que a seleção de múltipla escolha funciona (AC 3).
- **Passos**:
  1.  Carregue uma atividade com um módulo M8.
  2.  Clique na alternativa incorreta. Verifique o feedback de erro.
  3.  Clique na alternativa correta.
- **Resultado Esperado**:
  - O feedback de erro/sucesso deve ser exibido corretamente. Após a seleção correta, o usuário deve avançar.

### Cenário de Teste 3.1.4: Validação da Lógica de 3 Tentativas
- **Objetivo**: Garantir que a lógica de feedback progressivo é aplicada consistentemente nos novos módulos (AC 4).
- **Passos**: Para cada um dos módulos (M2, M6, M8), execute o ciclo completo de 3 respostas incorretas, conforme descrito no Cenário de Teste 1.4.2.
- **Resultado Esperado**: O feedback de "Tente outra vez", a exibição da dica e a revelação da resposta correta devem funcionar de forma idêntica aos módulos anteriores.

## 4. Sumário de QA

O desafio desta estória está na implementação de interações de UI mais ricas (drag-and-drop e seleção de texto) de forma robusta e compatível com diferentes navegadores. A reutilização da lógica de tentativas da estória 1.4 é crucial para a consistência da experiência do usuário. Os testes devem focar na precisão dessas novas interações e na consistência do feedback em todos os tipos de módulo.
