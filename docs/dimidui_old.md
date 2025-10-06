# Dimidui - EspecificaÃ§Ã£o TÃ©cnica Completa

**VersÃ£o:** 1.0  
**Data:** Outubro 2025  
**Status:** Aprovado para Desenvolvimento

---

## 1. VISÃƒO GERAL DO PROJETO

### 1.1 Identidade

**Nome:** Dimidui  
**Tagline:** Aprenda Fazendo, Ensine Crescendo  
**PropÃ³sito:** Plataforma modular de atividades educacionais para prÃ¡tica supervisionada em matemÃ¡tica e portuguÃªs, focada em fluÃªncia conceitual e resoluÃ§Ã£o de problemas integrados.

### 1.2 Contexto

**PÃºblico-Alvo:**
- PrimÃ¡rio: Alunos 4Âº-6Âº ano Fundamental I (9-12 anos)
- SecundÃ¡rio: Professor como facilitador/monitor

**Ambiente de Uso:**
- Local: LaboratÃ³rio escolar (computadores desktop)
- FrequÃªncia: 20min/semana (fluÃªncia) ou 20min/semana opcional (integraÃ§Ã£o)
- Modelo: Aula supervisionada, trabalho individual
- Conectividade: Online (Supabase backend)

### 1.3 Objetivos PedagÃ³gicos

**PrimÃ¡rios:**
1. Desenvolver fluÃªncia em operaÃ§Ãµes matemÃ¡ticas bÃ¡sicas, leitura e interpretaÃ§Ã£o de texto
2. Construir compreensÃ£o conceitual atravÃ©s de problemas integrados (PortuguÃªs + MatemÃ¡tica)
3. Treinar metacogniÃ§Ã£o via ensino do "Jeremias" (tÃ©cnica Feynman)
4. Fortalecer interpretaÃ§Ã£o de texto em contextos matemÃ¡ticos e gramÃ¡tica e interpretaÃ§Ã£o em portuguÃªs

**NÃ£o-Objetivos:**
- Substituir ensino tradicional
- Funcionar sem supervisÃ£o adulta
- Cobrir todo currÃ­culo BNCC
- GamificaÃ§Ã£o competitiva (ranks, leaderboards)

---

## 2. PRINCÃPIOS DE DESIGN

**P1. Modularidade Radical**  
Todo componente Ã© configurÃ¡vel via JSON. Professor cria atividades combinando mÃ³dulos.

**P2. Feedback Formativo, NÃ£o Punitivo**  
Erro = oportunidade de diagnÃ³stico. Sem "game over" ou penalidades dramÃ¡ticas.

**P3. Respeito Cognitivo**  
Interface clara sem infantilizaÃ§Ã£o. Paleta madura, cores passivas exceto por botÃµes de aÃ§Ã£o, tipografia generosa Ã  leitura.

**P4. Economia de AtenÃ§Ã£o**  
Cada interaÃ§Ã£o tem propÃ³sito pedagÃ³gico. Sem animaÃ§Ãµes/sons decorativos. Uso estratÃ©gico de emojis para facilidade em relacionar imagem e termos.

**P5. TransparÃªncia de Progresso**  
Aluno e professor veem claramente domÃ­nio vs necessidade de prÃ¡tica.

**P6. ProgressÃ£o DesbloqueÃ¡vel**  
ConteÃºdo avanÃ§ado sÃ³ acessÃ­vel apÃ³s demonstrar prÃ©-requisitos.

---

## 3. IDENTIDADE VISUAL

### 3.1 Tipografia

```
HIERARQUIA:
H1: 32px / 700 / Atkinson Hyperlegible     # TÃ­tulo de atividade
H2: 24px / 700 / Atkinson Hyperlegible     # SeÃ§Ã£o
Question: 20px / 700 / Atkinson Hyperlegible  # Enunciados
Body: 18px / 400 / Atkinson Hyperlegible   # Texto corrido
Dialogue: 18px / 400 / Comic Sans MS       # Falas do Jeremias
Feedback: 16px / 400 / Atkinson Hyperlegible  # Feedback inline
Meta: 14px / 400 / Atkinson Hyperlegible   # InformaÃ§Ãµes secundÃ¡rias

ACESSIBILIDADE:
- Line Height: 1.6 (mÃ­nimo)
- Letter Spacing: 0.01em
- Max Line Length: 65ch
```

**Fontes:**
- **Primary:** Atkinson Hyperlegible (Google Fonts)
- **Alternative:** OpenDyslexic (asset local .woff2) - toggle no settings
- **Character:** Comic Sans MS (system font) - apenas diÃ¡logos do Jeremias

### 3.2 Paleta de Cores

#### LIGHT MODE

```javascript
{
  background: "#E8EDF2",        // Cinza azulado claro
  surface: "#FFFFFF",           // Cards/mÃ³dulos
  
  primary: {
    base: "#6B46C1",            // Roxo mÃ©dio
    light: "#9F7AEA",           // Roxo claro (gradiente)
    dark: "#553C9A"             // Roxo escuro (gradiente)
  },
  
  text: {
    onLight: "#2D3748",         // Preto suave em fundos claros
    onDark: "#FFFFFF",          // Branco em fundos escuros
    secondary: "#4A5568"        // Texto secundÃ¡rio
  },
  
  semantic: {
    correct: "#48BB78",         // Verde
    incorrect: "#F56565",       // Vermelho
    warning: "#ED8936",         // Laranja
    info: "#4299E1"             // Azul
  },
  
  actions: {
    primary: "#F6AD55",         // Laranja quente (aÃ§Ãµes principais)
    secondary: "#A0AEC0",       // Cinza (aÃ§Ãµes secundÃ¡rias)
    danger: "#E53E3E"           // Vermelho (encerramento/cancelar)
  }
}
```

#### DARK MODE

```javascript
{
  background: "#1A202C",        // Azul escuro profundo
  surface: "#2D3748",           // Cards/mÃ³dulos
  
  primary: {
    base: "#9F7AEA",            // Roxo claro
    light: "#B794F4",           // Roxo mais claro (gradiente)
    dark: "#805AD5"             // Roxo mÃ©dio (gradiente)
  },
  
  text: {
    onLight: "#E2E8F0",         // Branco suave
    onDark: "#1A202C",          // Preto em elementos claros
    secondary: "#A0AEC0"        // Texto secundÃ¡rio
  },
  
  semantic: {
    correct: "#68D391",         // Verde claro
    incorrect: "#FC8181",       // Vermelho claro
    warning: "#F6AD55",         // Laranja claro
    info: "#63B3ED"             // Azul claro
  },
  
  actions: {
    primary: "#FBD38D",         // Laranja claro
    secondary: "#718096",       // Cinza mÃ©dio
    danger: "#FC8181"           // Vermelho claro
  }
}
```

### 3.3 EspaÃ§amento & Layout

```javascript
spacing: {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px"
}

layout: {
  containerMaxWidth: "1200px",
  contentMaxWidth: "800px",
  
  moduleCard: {
    padding: "24px",
    borderRadius: "12px",
    shadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  
  clickTarget: "min 48px Ã— 48px",  // Acessibilidade
  betweenOptions: "16px"           // Evita clique acidental
}
```

### 3.4 AnimaÃ§Ãµes

```javascript
transitions: {
  instant: "100ms",    // Hover
  fast: "200ms",       // BotÃµes, inputs
  normal: "350ms",     // TransiÃ§Ãµes padrÃ£o
  slow: "600ms",       // Revelar conteÃºdo
  
  easing: {
    standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    enter: "cubic-bezier(0.0, 0.0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0.0, 1, 1)"
  }
}

animations: {
  feedbackCorrect: {
    type: "subtle-glow",
    duration: "600ms",
    color: "semantic.correct"
  },
  
  feedbackIncorrect: {
    type: "shake-horizontal",
    duration: "400ms",
    amplitude: "8px"
  },
  
  jeremiasMood: {
    type: "bounce",
    duration: "500ms",
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }
}
```

### 3.5 Uso de Emojis

**REGRA:**
- âœ… DecoraÃ§Ã£o/estado emocional: Emojis OK (Jeremias ðŸ˜• vs ðŸ˜Š)
- âŒ ConteÃºdo pedagÃ³gico: SVGs customizados (garantia de consistÃªncia)

**Exemplo:**
```
âŒ "Complete o padrÃ£o: ðŸ”´ðŸ”µðŸ”´ðŸ”µ__"  (inconsistente entre OSs)
âœ… "Complete o padrÃ£o: â—â—â—â—__" (cÃ­rculos CSS/SVG controlados)
```

---

## 4. SISTEMA DE PERSONAGENS

### 4.1 Jeremias (MVP - Ãšnico Personagem)

**FunÃ§Ã£o PedagÃ³gica:**  
Aluno virtual que comete erros conceituais tÃ­picos. CrianÃ§a identifica erro, explica correÃ§Ã£o, resolve problema similar (tÃ©cnica Feynman).

**Personalidade:**
- Curioso e colaborativo
- Confiante mas humilde quando corrigido
- Linguagem similar Ã  crianÃ§a (gÃ­rias sutis: "tipo", "cara")

#### Estados Emocionais

```javascript
moods: {
  neutral: {
    emoji: "ðŸ™‚",
    description: "Pronto para aprender"
  },
  thinking: {
    emoji: "ðŸ¤”",
    description: "Tentando resolver"
  },
  confused: {
    emoji: "ðŸ˜•",
    description: "NÃ£o tenho certeza..."
  },
  eureka: {
    emoji: "ðŸ˜®",
    description: "Ah! Entendi!"
  },
  confident: {
    emoji: "ðŸ˜Š",
    description: "Acho que sei fazer isso"
  },
  grateful: {
    emoji: "ðŸ™",
    description: "Obrigado por me ensinar!"
  }
}
```

#### NÃ­veis de Maturidade

```javascript
levels: {
  1: {
    label: "Iniciante",
    errorFrequency: "alta",
    errorTypes: ["operaÃ§Ã£o_bÃ¡sica", "leitura_superficial"],
    unlockAt: 0, // inÃ­cio
    dialogue: "Estou comeÃ§ando a aprender isso..."
  },
  
  2: {
    label: "Praticando",
    errorFrequency: "mÃ©dia-alta",
    errorTypes: ["reagrupamento", "interpretaÃ§Ã£o_literal"],
    unlockAt: 5, // apÃ³s 5 correÃ§Ãµes
    dialogue: "JÃ¡ melhorei, mas ainda confundo algumas coisas."
  },
  
  3: {
    label: "Em Progresso",
    errorFrequency: "mÃ©dia",
    errorTypes: ["ordem_operaÃ§Ãµes", "contexto_problema"],
    unlockAt: 10,
    dialogue: "Estou ficando bom nisso!"
  },
  
  4: {
    label: "AvanÃ§ado",
    errorFrequency: "baixa",
    errorTypes: ["erros_sutis", "casos_especiais"],
    unlockAt: 20,
    dialogue: "Raramente erro agora. Valeu pela ajuda!"
  },
  
  5: {
    label: "Mestre",
    errorFrequency: "nenhuma",
    errorTypes: [],
    unlockAt: 35,
    dialogue: "Agora eu ensino vocÃª! Crie um problema para EU resolver?"
  }
}
```

#### Avatar Visual

**DecisÃ£o:** Emoji grande (96x96px) + nome "Jeremias"
- Custo zero de produÃ§Ã£o
- Consistente com mood system
- RÃ¡pido de implementar

### 4.2 Personagens Futuros (VersÃ£o 2+)

**Tia Jandira:** Sistema de hints quando aluno trava  
**PavÃ£o:** Antagonista que sÃ³ serve para atrapalhar (se houver demanda pedagÃ³gica validada)

---

## 5. CATÃLOGO DE ERROS DO JEREMIAS - Exemplos

### 5.1 MatemÃ¡tica

#### AdiÃ§Ã£o/SubtraÃ§Ã£o

**NÃ­vel 1: Inverte OperaÃ§Ã£o**
```
Problema: 5 + 3 = ?
Erro Jeremias: "Ã‰ 5 - 3 = 2!"
Tipo: confunde_operacao
CorreÃ§Ã£o: Identificar sÃ­mbolo correto
```

**NÃ­vel 2: Esquece Reagrupamento**
```
Problema: 27 + 15 = ?
Erro Jeremias: "Ã‰ 312 porque 2+1=3, 7+5=12"
Tipo: esquece_vai_um
CorreÃ§Ã£o: Revisar reagrupamento
```

**NÃ­vel 3: Ordem em Problema Verbal**
```
Problema: "JoÃ£o tinha 15 maÃ§Ã£s, deu 8 para Maria"
Erro Jeremias: "Ã‰ 8 - 15 = -7"
Tipo: ordem_subtraÃ§Ã£o
CorreÃ§Ã£o: Identificar ordem correta
```

#### MultiplicaÃ§Ã£o

**NÃ­vel 1: Confunde com AdiÃ§Ã£o**
```
Problema: 3 Ã— 4 = ?
Erro Jeremias: "Ã‰ 3 + 4 = 7"
Tipo: confunde_multiplicacao_adicao
CorreÃ§Ã£o: DiferenÃ§a entre operaÃ§Ãµes
```

**NÃ­vel 2: Esquece Dezenas**
```
Problema: 23 Ã— 4 = ?
Erro Jeremias: "20Ã—4=80, 3Ã—4=12, entÃ£o 8012"
Tipo: esquece_reagrupamento_mult
CorreÃ§Ã£o: Reagrupamento em multiplicaÃ§Ã£o
```

**NÃ­vel 3: Confunde Unidades**
```
Problema: "3 caixas com 5 bolas cada"
Erro Jeremias: "Preciso de 3+5=8 caixas"
Tipo: confunde_unidade_total
CorreÃ§Ã£o: Identificar o que estÃ¡ sendo multiplicado
```

#### DivisÃ£o

**NÃ­vel 1: Inverte Dividendo/Divisor**
```
Problema: 12 Ã· 3 = ?
Erro Jeremias: "Ã‰ 3 Ã· 12 = 0,25"
Tipo: inverte_ordem_divisao
CorreÃ§Ã£o: Ordem na divisÃ£o importa
```

**NÃ­vel 2: Ignora Resto**
```
Problema: 17 Ã· 5 = ?
Erro Jeremias: "Ã‰ 3"
Tipo: ignora_resto
CorreÃ§Ã£o: Identificar e representar resto
```

**NÃ­vel 3: Confunde DistribuiÃ§Ã£o**
```
Problema: "23 figurinhas para 4 amigos"
Erro Jeremias: "Cada um recebe 4"
Tipo: confunde_dividendo_divisor
CorreÃ§Ã£o: Identificar quem recebe o quÃª
```

#### FraÃ§Ãµes

**NÃ­vel 1: Compara Apenas Numerador**
```
Problema: 1/4 vs 1/3, qual maior?
Erro Jeremias: "1/4 Ã© maior porque 4>3"
Tipo: compara_so_numerador
CorreÃ§Ã£o: Denominador maior = partes menores
```

**NÃ­vel 2: Soma Direto**
```
Problema: 1/4 + 1/4 = ?
Erro Jeremias: "Ã‰ 2/8"
Tipo: soma_numerador_denominador
CorreÃ§Ã£o: Soma com mesmo denominador
```

**NÃ­vel 3: EquivalÃªncia Literal**
```
Problema: 1/2 = 2/4?
Erro Jeremias: "NÃ£o, porque nÃºmeros diferentes"
Tipo: nao_entende_equivalencia
CorreÃ§Ã£o: Conceito de fraÃ§Ãµes equivalentes
```

#### Geometria

**NÃ­vel 1: Confunde PerÃ­metro/Ãrea**
```
Problema: "Ãrea do retÃ¢ngulo 4Ã—5"
Erro Jeremias: "Ã‰ 4+5+4+5=18"
Tipo: confunde_perimetro_area
CorreÃ§Ã£o: DiferenÃ§a entre medidas
```

**NÃ­vel 2: Conta Cantos como Lados**
```
Problema: "Quantos lados tem o quadrado?"
Erro Jeremias: "Tem 8, 4 lados e 4 cantos"
Tipo: confunde_lado_vertice
CorreÃ§Ã£o: Lado vs vÃ©rtice
```

### 5.2 PortuguÃªs

#### Ortografia

**NÃ­vel 1: ss/s/Ã§**
```
Palavra: passar
Erro Jeremias: "pasar"
Tipo: uso_ss_entre_vogais
CorreÃ§Ã£o: Regra do ss
```

**NÃ­vel 2: mais/mas**
```
Frase: "Eu quero ____ sorvete"
Erro Jeremias: "mas" (ao invÃ©s de mais)
Tipo: confunde_mais_mas
CorreÃ§Ã£o: mais=quantidade, mas=oposiÃ§Ã£o
```

**NÃ­vel 3: AcentuaÃ§Ã£o**
```
Palavra: mÃºsica
Erro Jeremias: "musica"
Tipo: falta_acento_tonico
CorreÃ§Ã£o: Identificar sÃ­laba tÃ´nica e regra
```

#### ConcordÃ¢ncia

**NÃ­vel 1: Singular/Plural Verbo**
```
Frase: "Os menino corre"
Erro Jeremias: mantÃ©m verbo no singular
Tipo: concordancia_verbal
CorreÃ§Ã£o: Verbo concorda com sujeito
```

**NÃ­vel 2: Singular/Plural Adjetivo**
```
Frase: "As casa bonita"
Erro Jeremias: nÃ£o pluraliza adjetivo
Tipo: concordancia_nominal
CorreÃ§Ã£o: Adjetivo concorda com substantivo
```

#### InterpretaÃ§Ã£o

**NÃ­vel 1: Literal Demais**
```
Texto: "Maria estÃ¡ azul hoje"
Erro Jeremias: "Maria pintou a pele de azul"
Tipo: interpretacao_literal
CorreÃ§Ã£o: Identificar linguagem figurada
```

**NÃ­vel 2: InformaÃ§Ã£o ImplÃ­cita**
```
Texto: "Pedro saiu de casaco"
Pergunta: Estava frio?
Erro Jeremias: "NÃ£o diz no texto"
Tipo: nao_faz_inferencia
CorreÃ§Ã£o: Fazer inferÃªncias razoÃ¡veis
```

**NÃ­vel 3: Causa/ConsequÃªncia**
```
Erro Jeremias: Inverte ordem de eventos
Tipo: confunde_cronologia
CorreÃ§Ã£o: Identificar relaÃ§Ã£o temporal
```

#### PontuaÃ§Ã£o

**NÃ­vel 1: Esquece Ponto Final**
```
Erro Jeremias: MÃºltiplas frases sem pontuaÃ§Ã£o
Tipo: falta_ponto_final
CorreÃ§Ã£o: Finalizar frases
```

**NÃ­vel 2: VÃ­rgula Muda Sentido**
```
Exemplos: "NÃ£o, pode entrar" vs "NÃ£o pode entrar"
Erro Jeremias: NÃ£o percebe diferenÃ§a
Tipo: impacto_virgula
CorreÃ§Ã£o: VÃ­rgula altera significado
```

---

## 6. HABILIDADES BNCC (10 PrioritÃ¡rias MVP)

### 6.1 MatemÃ¡tica (6 habilidades)

**EF04MA02 - Ordem de Grandeza**  
Ler, escrever e ordenar nÃºmeros atÃ© dezena de milhar  
*MÃ³dulos:* M4 (OrdemCrescente), M2 (LinhaNumÃ©rica)

**EF04MA07 - Problemas de MultiplicaÃ§Ã£o**  
Resolver problemas envolvendo diferentes significados da multiplicaÃ§Ã£o  
*MÃ³dulos:* M1 (BateriaRÃ¡pida), M10 (AlexTentaResolver), M5 (IdentificaOperaÃ§Ã£o)

**EF05MA03 - DivisÃ£o com Resto**  
Identificar e representar divisÃ£o com resto  
*MÃ³dulos:* M1 (BateriaRÃ¡pida), M10 (AlexTentaResolver)

**EF05MA08 - FraÃ§Ãµes**  
Representar e comparar fraÃ§Ãµes  
*MÃ³dulos:* M3 (FraÃ§Ã£oVisual)

**EF05MA20 - Figuras Planas**  
Reconhecer propriedades de triÃ¢ngulos e quadrilÃ¡teros  
*MÃ³dulos:* M16 (ConstruÃ§Ã£oGeomÃ©trica)

**EF06MA24 - GrÃ¡ficos**  
Resolver problemas com dados em grÃ¡ficos  
*MÃ³dulos:* M17 (GrÃ¡ficoInterativo)

### 6.2 PortuguÃªs (4 habilidades)

**EF04LP04 - Ortografia e ConcordÃ¢ncia**  
Usar regras bÃ¡sicas de concordÃ¢ncia nominal e verbal  
*MÃ³dulos:* M8 (CorrigeOrtografia)

**EF04LP15 - LocalizaÃ§Ã£o de InformaÃ§Ã£o**  
Localizar informaÃ§Ãµes explÃ­citas em texto  
*MÃ³dulos:* M9 (CompreensÃ£oLeitora), M6 (DestacaPalavraChave)

**EF05LP05 - Ortografia: AcentuaÃ§Ã£o**  
Grafar palavras com regras de acentuaÃ§Ã£o  
*MÃ³dulos:* M8 (CorrigeOrtografia)

**EF05LP15 - InterpretaÃ§Ã£o Inferencial**  
Reconhecer relaÃ§Ãµes lÃ³gicas entre partes de texto  
*MÃ³dulos:* M9 (CompreensÃ£oLeitora), M11 (CenÃ¡rioSequencial)

---

## 7. BIBLIOTECA DE MÃ“DULOS (20 Componentes)

### CATEGORIA 1: FLUÃŠNCIA - PrÃ¡tica Repetitiva

#### M1. BateriaRÃ¡pida
**FunÃ§Ã£o:** Gera N problemas matemÃ¡ticos do mesmo tipo. Feedback imediato.  
**Config:** tipo operaÃ§Ã£o, alcance numÃ©rico, quantidade, tempo limite  
**Use Case:** 30 contas de divisÃ£o, 40 multiplicaÃ§Ãµes

#### M2. LinhaNumÃ©ricaInterativa
**FunÃ§Ã£o:** Arrastar marcador para posiÃ§Ã£o correta na reta.  
**Config:** alcance, alvos, tolerÃ¢ncia, saltos disponÃ­veis  
**Use Case:** Localizar 347 na reta 0-1000

#### M3. FraÃ§Ã£oVisual
**FunÃ§Ã£o:** Manipular representaÃ§Ãµes visuais de fraÃ§Ãµes.  
**Config:** tipo representaÃ§Ã£o (barra/pizza/grid), fraÃ§Ãµes alvo, modo  
**Use Case:** Construir 3/8, comparar 1/4 vs 1/3

#### M4. OrdemCrescente
**FunÃ§Ã£o:** Ordenar nÃºmeros por arrastar ou clicar em sequÃªncia.  
**Config:** lista de nÃºmeros, modo interaÃ§Ã£o  
**Use Case:** Ordenar 347, 89, 1205, 456

#### M5. IdentificaOperaÃ§Ã£o
**FunÃ§Ã£o:** Ler problema verbal, identificar operaÃ§Ã£o.  
**Config:** lista de problemas, opÃ§Ãµes de operaÃ§Ã£o  
**Use Case:** "JoÃ£o tinha 5 e ganhou 3" â†’ adiÃ§Ã£o

### CATEGORIA 2: INTERPRETAÃ‡ÃƒO - PortuguÃªs

#### M6. DestacaPalavraChave
**FunÃ§Ã£o:** Clicar em palavras especÃ­ficas em texto.  
**Config:** texto, categorias alvo (substantivos/verbos), feedback  
**Use Case:** Identificar todos os substantivos

#### M7. OrdenaSentenÃ§a
**FunÃ§Ã£o:** Arrastar palavras para formar frase correta.  
**Config:** palavras embaralhadas, soluÃ§Ã£o  
**Use Case:** Formar frase gramaticalmente correta

#### M8. CorrigeOrtografia
**FunÃ§Ã£o:** Clicar em palavras erradas e corrigir.  
**Config:** texto com erros, tipo interaÃ§Ã£o (selecionar/digitar)  
**Use Case:** Encontrar "pesso" â†’ "pesou"

#### M9. CompreensÃ£oLeitora
**FunÃ§Ã£o:** Ler texto, responder perguntas mÃºltipla escolha.  
**Config:** texto, lista de perguntas, tipo (literal/inferencial)  
**Use Case:** "Qual era o problema do personagem?"

### CATEGORIA 3: INTEGRAÃ‡ÃƒO - Jeremias & GalÃ¡ticos

#### M10. JeremiasResolver
**FunÃ§Ã£o:** Jeremias mostra raciocÃ­nio com erro. Aluno identifica + corrige.  
**Config:** problema, raciocÃ­nio, passo do erro, tipo de erro  
**Use Case:** Jeremias confunde adiÃ§Ã£o com multiplicaÃ§Ã£o

#### M11. CenÃ¡rioSequencial
**FunÃ§Ã£o:** SequÃªncia de mÃ³dulos encadeados formando problema complexo.  
**Config:** lista de fases (cada fase Ã© um mÃ³dulo)  
**Use Case:** Ler carta â†’ identificar operaÃ§Ã£o â†’ resolver â†’ ensinar Jeremias

#### M12. ProblemaAberto
**FunÃ§Ã£o:** Problema com mÃºltiplas soluÃ§Ãµes vÃ¡lidas.  
**Config:** contexto, constraints, critÃ©rios validaÃ§Ã£o  
**Use Case:** "Comprar material com R$50, â‰¥3 itens"

### CATEGORIA 4: METACOGNIÃ‡ÃƒO

#### M13. PrevisÃ£oDesempenho
**FunÃ§Ã£o:** Aluno estima quantas questÃµes acertarÃ¡.  
**Config:** tipo atividade, escala previsÃ£o  
**Use Case:** "Acha que vai acertar quantas de 30?"

#### M14. AutoAvaliaÃ§Ã£o
**FunÃ§Ã£o:** Aluno classifica prÃ³pria compreensÃ£o.  
**Config:** lista conceitos, escala (3-5 nÃ­veis)  
**Use Case:** "DivisÃ£o com resto: NÃ£o entendo / Entendo um pouco / Domino / Sei ensinar"

#### M15. ReflexÃ£oPÃ³s
**FunÃ§Ã£o:** Perguntas sobre processo (seleÃ§Ã£o de opÃ§Ãµes).  
**Config:** lista perguntas, opÃ§Ãµes prÃ©-definidas  
**Use Case:** "O que foi mais difÃ­cil? (cÃ¡lculo/interpretaÃ§Ã£o/outro)"

### CATEGORIA 5: VISUAL-ESPACIAL

#### M16. ConstruÃ§Ã£oGeomÃ©trica
**FunÃ§Ã£o:** Clicar em grid para formar figura com constraints.  
**Config:** tamanho grid, objetivo (Ã¡rea/perÃ­metro), modo  
**Use Case:** "Forme retÃ¢ngulo de Ã¡rea 24"

#### M17. GrÃ¡ficoInterativo
**FunÃ§Ã£o:** Construir ou completar grÃ¡fico.  
**Config:** dados iniciais, tarefa  
**Use Case:** "Adicione barra de quarta-feira com valor 7"

#### M18. PadrÃ£oVisual
**FunÃ§Ã£o:** Identificar regra e completar sequÃªncia.  
**Config:** sequÃªncia inicial, tipo padrÃ£o  
**Use Case:** "â—â—â—â—__?" ou "2,4,6,8,__?"

### CATEGORIA 6: INTERFACE/FEEDBACK

#### M19. BarraProgresso
**FunÃ§Ã£o:** Barra visual mostrando avanÃ§o + marcos.  
**Config:** total mÃ³dulos, marcos (mensagens em pontos)  
**Use Case:** "3/5 mÃ³dulos. Jeremias estÃ¡ entendendo!"

#### M20. EstadoJeremias
**FunÃ§Ã£o:** Exibe avatar do Jeremias com mood + diÃ¡logo.  
**Config:** estado emocional, texto  
**Use Case:** TransiÃ§Ãµes entre mÃ³dulos, feedback narrativo

---

## 8. ARQUITETURA DO SISTEMA

### 8.1 Estrutura de RotaÃ§Ã£o

```
TIPO A: FLUÃŠNCIA (20min)
â”œâ”€ IntroduÃ§Ã£o (M20 - EstadoJeremias) - 2min
â”œâ”€ PrÃ¡tica em Volume (M1 - BateriaRÃ¡pida) - 15min
â””â”€ AutoavaliaÃ§Ã£o (M14) - 3min

TIPO B: INTEGRAÃ‡ÃƒO (20min)
â”œâ”€ Contexto Narrativo (M9 ou M11) - 3min
â”œâ”€ Jeremias Tenta Resolver (M10) - 8min
â”œâ”€ Aluno Resolve Similar - 7min
â””â”€ ReflexÃ£o (M15) - 2min

ROTAÃ‡ÃƒO:
Turma ManhÃ£: TerÃ§a (FluÃªncia) + Quinta (IntegraÃ§Ã£o)
Turma Tarde: Quarta (FluÃªncia apenas)

Turma ManhÃ£: TerÃ§a (FluÃªncia apenas)
Turma Tarde: Quarta (FluÃªncia) + Quinta (IntegraÃ§Ã£o)

ObservaÃ§Ã£o: Alunos mais avanÃ§ados e que fazem as tarefas mais rÃ¡pido, poderÃ£o fazer FluÃªncia + IntegraÃ§Ã£o no mesmo dia, para completar o tempo.
```

### 8.2 Sistema de ProgressÃ£o Conceitual

```javascript
grafo_conceitos: {
  "multiplicaÃ§Ã£o_bÃ¡sica": {
    prerequisitos: ["adiÃ§Ã£o_bÃ¡sica"],
    desbloqueia: ["divisÃ£o_simples", "Ã¡rea_retÃ¢ngulo"],
    threshold: 0.80  // 80% acerto em 15+ tentativas
  },
  
  "divisÃ£o_com_resto": {
    prerequisitos: ["divisÃ£o_simples"],
    desbloqueia: ["problema_integrado_feira"],
    threshold: 0.75
  }
}

regra_desbloqueio: {
  atividade_integrada: {
    requer: ["conceito_A", "conceito_B", "conceito_C"],
    logica: "todos acima do threshold"
  }
}
```

---

## 9. SCHEMA DO BANCO DE DADOS

### 9.1 Estrutura (Supabase PostgreSQL)

```sql
-- TABELA: students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  grade_level INT CHECK (grade_level IN (4,5,6)),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- PreferÃªncias
  font_preference TEXT DEFAULT 'atkinson' 
    CHECK (font_preference IN ('atkinson', 'opendyslexic')),
  theme_preference TEXT DEFAULT 'light' 
    CHECK (theme_preference IN ('light', 'dark'))
);

-- TABELA: activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  week_number INT,
  type TEXT CHECK (type IN ('fluencia', 'integracao')),
  bncc_codes TEXT[],
  estimated_duration INT, -- minutos
  
  -- ConfiguraÃ§Ã£o em JSON
  modules JSONB NOT NULL,
  
  created_at TIMESTAMP DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE
);

-- TABELA: student_progress
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  
  -- Status
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  time_spent INT, -- segundos
  
  -- Dados de desempenho
  interactions JSONB, -- Array de cada interaÃ§Ã£o
  final_score FLOAT,
  
  UNIQUE(student_id, activity_id)
);

-- TABELA: concept_mastery
CREATE TABLE concept_mastery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  bncc_code TEXT NOT NULL,
  
  -- MÃ©tricas
  attempts INT DEFAULT 0,
  correct INT DEFAULT 0,
  incorrect INT DEFAULT 0,
  mastery_level FLOAT DEFAULT 0.0, -- 0.0 a 1.0
  
  last_practiced TIMESTAMP,
  
  UNIQUE(student_id, bncc_code)
);

-- TABELA: jeremias_state
CREATE TABLE jeremias_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  
  -- Estado
  maturity_level INT DEFAULT 1 
    CHECK (maturity_level BETWEEN 1 AND 5),
  concepts_taught TEXT[],
  
  -- Contadores
  times_taught INT DEFAULT 0,
  corrections_made INT DEFAULT 0,
  
  -- Narrativa
  last_dialogue TEXT,
  last_mood TEXT,
  last_interaction TIMESTAMP,
  
  UNIQUE(student_id)
);

-- VIEW: Dashboard do Professor
CREATE VIEW teacher_dashboard AS
SELECT 
  s.name AS student_name,
  s.grade_level,
  COUNT(DISTINCT sp.activity_id) FILTER 
    (WHERE sp.status = 'completed') AS activities_completed,
  AVG(sp.final_score) AS avg_score,
  j.maturity_level AS jeremias_level,
  COUNT(DISTINCT cm.bncc_code) FILTER 
    (WHERE cm.mastery_level >= 0.75) AS concepts_mastered
FROM students s
LEFT JOIN student_progress sp ON s.id = sp.student_id
LEFT JOIN jeremias_state j ON s.id = j.student_id
LEFT JOIN concept_mastery cm ON s.id = cm.student_id
GROUP BY s.id, s.name, s.grade_level, j.maturity_level;
```

### 9.2 LÃ³gica de EvoluÃ§Ã£o do Jeremias

```javascript
// Quando aluno ensina Jeremias corretamente
function updateJeremiasProgress(studentId, conceptTaught, wasCorrect) {
  if (wasCorrect) {
    await supabase
      .from('jeremias_state')
      .update({
        concepts_taught: sql`array_append(concepts_taught, '${conceptTaught}')`,
        times_taught: sql`times_taught + 1`,
        corrections_made: sql`corrections_made + 1`,
        
        // A cada 5 correÃ§Ãµes, Jeremias "amadurece"
        maturity_level: sql`
          CASE 
            WHEN (corrections_made + 1) % 5 = 0 
            THEN LEAST(maturity_level + 1, 5)
            ELSE maturity_level
          END
        `
      })
      .eq('student_id', studentId);
  }
}

// Quando gera erro do Jeremias
function generateJeremiasError(concept, studentMaturityLevel) {
  const errorCatalog = {
    "multiplicaÃ§Ã£o": {
      level1: "confunde_com_adicao",
      level2: "esquece_reagrupamento",
      level3: "ordem_operacoes",
      level4: "erro_sutil_unidade",
      level5: null // nÃ£o erra mais
    }
  };
  
  // Jeremias comete erros do nÃ­vel ABAIXO do aluno
  const errorLevel = Math.max(1, studentMaturityLevel - 1);
  
  return errorCatalog[concept][`level${errorLevel}`];
}
```

---

## 10. STACK TECNOLÃ“GICA

```javascript
stack: {
  frontend: {
    framework: "React 18",
    language: "JavaScript",
    styling: "Tailwind CSS 3.x",
    stateManagement: "React Context API",
    routing: "React Router 6",
    animations: "Framer Motion",
    audio: "Tone.js (sÃ­ntese contextual)"
  },
  
  backend: {
    platform: "Supabase",
    database: "PostgreSQL 14+",
    auth: "Supabase Auth (simplificado)",
    storage: "Supabase Storage",
    realtime: "Supabase Realtime"
  },
  
  assets: {
    fonts: [
      "Atkinson Hyperlegible (Google Fonts)",
      "OpenDyslexic (local .woff2)",
      "Comic Sans MS (system)"
    ],
    icons: "Lucide React (SVG)",
    illustrations: "Emoji 96px (Jeremias)"
  },
  
  development: {
    bundler: "Vite",
    linter: "ESLint",
    formatter: "Prettier",
    versionControl: "Git + GitHub"
  },
  
  deployment: {
    hosting: "Vercel (free tier)",
    ci_cd: "GitHub Actions",
    analytics: "Plausible (LGPD-compliant)"
  }
}
```

---

## 11. SISTEMA DE FEEDBACK AUDITIVO

### 11.1 PrincÃ­pio

Sons = informaÃ§Ã£o, nÃ£o recompensa pavloviana. SÃ­ntese em tempo real via Tone.js (nÃ£o arquivos MP3).

### 11.2 Mapeamento de Sons

```javascript
sounds: {
  math: {
    number_placement_correct: {
      type: "pitched_tone",
      mapping: "logarithmic",
      // Tom varia com magnitude: 5=nota mÃ©dia, 500=nota aguda
    },
    
    balance_achieved: {
      type: "harmony",
      notes: ["C4", "G4"], // Quinta perfeita
      duration: "500ms"
    },
    
    pattern_recognized: {
      type: "melodic_sequence",
      // Ex: 2,4,6,8 â†’ do-re-mi-fa
    }
  },
  
  portuguese: {
    syllable_click: {
      type: "pitched_click",
      // SÃ­laba tÃ´nica = tom mais alto
    },
    
    punctuation: {
      period: "descending_tone",      // FinalizaÃ§Ã£o
      comma: "pause_tone",            // SuspensÃ£o
      question: "rising_tone",        // InterrogaÃ§Ã£o
      exclamation: "emphatic_tone"    // ÃŠnfase
    }
  },
  
  jeremias: {
    realizes_mistake: {
      type: "discovery_chord",
      progression: ["Dm", "G", "C"], // ResoluÃ§Ã£o harmÃ´nica
      duration: "800ms"
    },
    
    mood_change: {
      confused: "descending_minor",
      eureka: "ascending_major",
      grateful: "warm_chord"
    }
  }
}
```

---

## 12. FLUXOS CRÃTICOS (USER STORIES)

### 12.1 Login Aluno

```
1. Tela inicial exibe logo Dimidui + lista de nomes
2. Aluno clica em seu nome
3. Sistema carrega:
   - PreferÃªncias (fonte/tema)
   - Estado do Jeremias
   - Progresso conceitual
4. Redireciona para Dashboard Aluno
```

### 12.2 Dashboard Aluno

```
LAYOUT:
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Header: "OlÃ¡, [Nome]" | âš™ï¸ Settings     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                         â”‚
â”‚ ðŸ“Š MEU PROGRESSO                        â”‚
â”‚ â”œâ”€ Conceitos dominados: 7/10           â”‚
â”‚ â””â”€ Atividades completadas: 12          â”‚
â”‚                                         â”‚
â”‚ ðŸŽ¯ ATIVIDADE DESTA SEMANA               â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚ â”‚ DivisÃ£o com Resto - PrÃ¡tica       â”‚   â”‚
â”‚ â”‚ Tipo: FluÃªncia | 20min            â”‚   â”‚
â”‚ â”‚                                   â”‚   â”‚
â”‚ â”‚ [ComeÃ§ar] â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–º     â”‚   â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚                                         â”‚
â”‚ ðŸ¤ JEREMIAS                             â”‚
â”‚ â”œâ”€ NÃ­vel: 3 (Em Progresso)             â”‚
â”‚ â”œâ”€ Conceitos aprendidos: 5              â”‚
â”‚ â””â”€ "Estou ficando bom nisso!"          â”‚
â”‚                                         â”‚
â”‚ ðŸ“š ATIVIDADES ANTERIORES                â”‚
â”‚ â””â”€ [Lista com histÃ³rico]                â”‚
â”‚                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### 12.3 Atividade de FluÃªncia (Exemplo)

```
FLUXO:
1. M20 - EstadoJeremias (2min)
   â”œâ”€ Avatar ðŸ˜Š + "Vamos praticar divisÃ£o!"
   â””â”€ [ComeÃ§ar]

2. M1 - BateriaRÃ¡pida (15min)
   â”œâ”€ Problema 1/30: "17 Ã· 5 = ?"
   â”œâ”€ Input numÃ©rico
   â”œâ”€ Feedback imediato: âœ“ ou âœ— com correÃ§Ã£o
   â”œâ”€ Barra progresso: 15/30
   â””â”€ Repete atÃ© 30 ou timeout

3. M14 - AutoAvaliaÃ§Ã£o (3min)
   â”œâ”€ "Como vocÃª se sente com divisÃ£o agora?"
   â”œâ”€ [Preciso praticar mais]
   â”œâ”€ [Estou melhorando]
   â””â”€ [JÃ¡ domino]

4. CONCLUSÃƒO
   â”œâ”€ "VocÃª acertou 24/30 (80%)"
   â”œâ”€ Jeremias: "VocÃª estÃ¡ indo bem!"
   â”œâ”€ Atualiza concept_mastery
   â”œâ”€ Verifica desbloqueio de atividade integrada
   â””â”€ [Voltar ao Dashboard]
```

### 12.4 Atividade de IntegraÃ§Ã£o (Exemplo)

```
FLUXO:
1. M9 - CompreensÃ£oLeitora (3min)
   â”œâ”€ Texto: Problema da feira de ciÃªncias
   â””â”€ Perguntas: Extrair informaÃ§Ãµes chave

2. M5 - IdentificaOperaÃ§Ã£o (2min)
   â””â”€ "Qual operaÃ§Ã£o resolve?" [Mult][Div][Adic][Sub]

3. M10 - JeremiasResolver (8min)
   â”œâ”€ Jeremias mostra raciocÃ­nio passo-a-passo
   â”œâ”€ Comete erro no passo 3
   â”œâ”€ "Clique onde Jeremias errou"
   â”œâ”€ Aluno clica passo 3
   â”œâ”€ "Qual foi o erro?"
   â”‚   â””â”€ [Confundiu unidade com total]
   â”‚   â””â”€ [Errou conta]
   â”‚   â””â”€ [NÃ£o leu direito]
   â”œâ”€ Aluno seleciona "Confundiu unidade com total"
   â”œâ”€ Jeremias: "Ah! EntÃ£o eu preciso multiplicar DEPOIS dividir!"
   â””â”€ Atualiza jeremias_state

4. ALUNO RESOLVE SIMILAR (7min)
   â”œâ”€ Problema anÃ¡logo com nÃºmeros diferentes
   â”œâ”€ Sem ajuda do Jeremias
   â””â”€ Feedback final

5. M15 - ReflexÃ£o (2min)
   â”œâ”€ "Foi fÃ¡cil encontrar erro do Jeremias?"
   â””â”€ "O que vocÃª aprendeu?"

6. CONCLUSÃƒO
   â”œâ”€ Jeremias evolui para nÃ­vel 4
   â””â”€ [Voltar ao Dashboard]
```

### 12.5 Dashboard Professor

```
LAYOUT:
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Dimidui | Professor                     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚                                         â”‚
â”‚ ðŸ“Š VISÃƒO GERAL DA TURMA                 â”‚
â”‚ â”œâ”€ Alunos ativos: 12                   â”‚
â”‚ â”œâ”€ Atividade desta semana: 8/12 (67%)  â”‚
â”‚ â””â”€ Tempo mÃ©dio: 18min                   â”‚
â”‚                                         â”‚
â”‚ ðŸŽ¯ CONCEITOS COM MAIS ERROS             â”‚
â”‚ â”œâ”€ DivisÃ£o com resto: 45% erro         â”‚
â”‚ â”œâ”€ FraÃ§Ãµes equivalentes: 38%           â”‚
â”‚ â””â”€ InterpretaÃ§Ã£o inferencial: 32%      â”‚
â”‚                                         â”‚
â”‚ ðŸ‘¥ DESEMPENHO POR ALUNO                 â”‚
â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”‚
â”‚ â”‚ Ana (5Âº)   | â­â­â­â­ | 9/10    â”‚     â”‚
â”‚ â”‚ Bruno (4Âº) | â­â­â­   | 6/10    â”‚     â”‚
â”‚ â”‚ Carlos (6Âº)| â­â­â­â­â­| 10/10  â”‚     â”‚
â”‚ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â”‚
â”‚                                         â”‚
â”‚ âž• CRIAR NOVA ATIVIDADE                 â”‚
â”‚ [+ Nova FluÃªncia] [+ Nova IntegraÃ§Ã£o]   â”‚
â”‚                                         â”‚
â”‚ ðŸ“ ATIVIDADES ANTERIORES                â”‚
â”‚ ðŸ“Š EXPORTAR DADOS (CSV)                 â”‚
â”‚                                         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 13. PRIORIZAÃ‡ÃƒO (MoSCoW)

### MUST HAVE (MVP - Semanas 1-3)

**MÃ³dulos:**
- [x] M1 - BateriaRÃ¡pida
- [x] M5 - IdentificaOperaÃ§Ã£o
- [x] M10 - JeremiasResolver
- [x] M14 - AutoAvaliaÃ§Ã£o
- [x] M20 - EstadoJeremias

**Sistema:**
- [x] Login simples (selecionar nome)
- [x] Dashboard aluno bÃ¡sico
- [x] Runtime de atividades (JSON â†’ UI)
- [x] Salvar progresso (Supabase)
- [x] Sistema de progressÃ£o conceitual
- [x] Estado do Jeremias (5 nÃ­veis)

**Interface:**
- [x] Editor de atividade (formulÃ¡rio simples)
- [x] Toggle de fonte (Atkinson â†” OpenDyslexic)
- [x] Toggle de tema (Light â†” Dark)

### SHOULD HAVE (VersÃ£o 2 - Semanas 4-6)

**MÃ³dulos:**
- [ ] M2 - LinhaNumÃ©rica
- [ ] M3 - FraÃ§Ã£oVisual
- [ ] M9 - CompreensÃ£oLeitora
- [ ] M11 - CenÃ¡rioSequencial
- [ ] M19 - BarraProgresso

**Sistema:**
- [ ] Dashboard professor (visÃ£o turma)
- [ ] Exportar dados (CSV)
- [ ] Sistema de hints progressivos
- [ ] Sons contextuais (Tone.js)

### COULD HAVE (VersÃ£o 3 - Semanas 7-10)

**MÃ³dulos:**
- [ ] M6, M7, M8 (mÃ³dulos portuguÃªs)
- [ ] M16, M17, M18 (mÃ³dulos visuais-espaciais)
- [ ] M12 - ProblemaAberto
- [ ] M13 - PrevisÃ£oDesempenho
- [ ] M15 - ReflexÃ£oPÃ³s

**Sistema:**
- [ ] Editor visual (drag-and-drop)
- [ ] Analytics dashboard
- [ ] Alertas professor (aluno travado)

### WON'T HAVE (Fora escopo V1)

- [ ] Modo mobile/tablet
- [ ] Multiplayer/colaboraÃ§Ã£o
- [ ] IA generativa
- [ ] Reconhecimento de voz
- [ ] GamificaÃ§Ã£o social
- [ ] Modo offline completo

---

## 14. MÃ‰TRICAS DE SUCESSO

### AdoÃ§Ã£o
- âœ“ 80%+ alunos completam atividade da semana
- âœ“ Professor cria 1 atividade nova/semana sem ajuda
- âœ“ Taxa de abandono <15%

### Efetividade PedagÃ³gica
- âœ“ Alunos fluÃªncia+integraÃ§Ã£o tÃªm >15% mais acerto em avaliaÃ§Ã£o externa
- âœ“ 70%+ demonstram domÃ­nio (threshold) apÃ³s 2 semanas
- âœ“ CorrelaÃ§Ã£o autoavaliaÃ§Ã£o vs real >0.6 apÃ³s 1 mÃªs

### EficiÃªncia
- âœ“ Tempo mÃ©dio fluÃªncia: 18-22min
- âœ“ Tempo mÃ©dio integraÃ§Ã£o: 18-25min
- âœ“ Professor gasta <5min/semana gerenciando

### Engagement
- âœ“ Alunos pedem atividade "extra" espontaneamente
- âœ“ <10% reclamaÃ§Ãµes sobre "atividade chata"
- âœ“ RetenÃ§Ã£o semanal >90%

### TÃ©cnico
- âœ“ Zero perda de dados
- âœ“ <2% sessÃµes com bugs crÃ­ticos
- âœ“ Carregamento <3seg

---

## 15. RISCOS & MITIGAÃ‡Ã•ES

| Risco | Impacto | Prob | MitigaÃ§Ã£o |
|-------|---------|------|-----------|
| Atividades repetitivas/tediosas | Alto | MÃ©dia | Variar mecÃ¢nicas; rotaÃ§Ã£o fluÃªncia/integraÃ§Ã£o |
| Professor nÃ£o cria atividades | Alto | MÃ©dia | Testar editor com usuÃ¡rio real; formulÃ¡rios simples |
| Bugs crÃ­ticos (perda dados) | CrÃ­tico | Baixa | Backup auto 2min; teste extensivo |
| Alunos nÃ£o conseguem usar | Alto | Baixa | Testar com 2-3 alunos antes de lanÃ§ar |
| Downtime Supabase | MÃ©dio | Baixa | Atividade backup em papel |
| Desenvolvimento demora | MÃ©dio | Alta | MVP radical (5 mÃ³dulos); versÃ£o 1 limitada |
| Jeremias Ã© irritante | MÃ©dio | MÃ©dia | Testar diÃ¡logos; permitir "modo sem narrativa" |

---

## 16. PRÃ“XIMOS PASSOS

### Fase 1: Setup (Semana 1)
- [ ] Criar repositÃ³rio Git
- [ ] Setup Vite + React + Tailwind
- [ ] Configurar Supabase (projeto + tabelas)
- [ ] Instalar dependÃªncias (Framer Motion, Tone.js, etc)
- [ ] Setup design tokens (cores, tipografia)

### Fase 2: Core Components (Semana 2)
- [ ] Implementar M20 (EstadoJeremias)
- [ ] Implementar M1 (BateriaRÃ¡pida)
- [ ] Implementar M14 (AutoAvaliaÃ§Ã£o)
- [ ] Sistema de login bÃ¡sico
- [ ] Dashboard aluno (versÃ£o mÃ­nima)

### Fase 3: IntegraÃ§Ã£o & Estado (Semana 3)
- [ ] Implementar M10 (JeremiasResolver)
- [ ] Implementar M5 (IdentificaOperaÃ§Ã£o)
- [ ] Sistema de progresso (concept_mastery)
- [ ] Sistema de evoluÃ§Ã£o Jeremias
- [ ] Salvar/carregar estado (Supabase)

### Fase 4: Testing & Polish (Semana 4)
- [ ] Testar com 2-3 alunos reais
- [ ] Ajustes baseados em feedback
- [ ] Editor de atividade (formulÃ¡rio)
- [ ] Criar 2-3 atividades de teste
- [ ] Deploy Vercel (produÃ§Ã£o)

---

## APÃŠNDICES

### A. GlossÃ¡rio

**BNCC:** Base Nacional Comum Curricular  
**FluÃªncia:** Velocidade + precisÃ£o em habilidade especÃ­fica  
**GalÃ¡ticos:** Modo de atividade integrada (mÃºltiplos conceitos)  
**Jeremias:** Personagem NPC que comete erros conceituais  
**MÃ³dulo:** Componente reutilizÃ¡vel de atividade  
**MVP:** Minimum Viable Product  
**Threshold:** Limite mÃ­nimo de desempenho para domÃ­nio

### B. ReferÃªncias PedagÃ³gicas

- TÃ©cnica Feynman (ensinar para aprender)
- PrÃ¡tica Deliberada (Ericsson)
- EspaÃ§amento de RevisÃ£o (Ebbinghaus)
- Feedback Formativo (Black & Wiliam)
- Scaffolding (Vygotsky - ZPD)

### C. Contatos & Recursos

**RepositÃ³rio:** [A definir]  
**Figma:** [A definir]  
**Supabase Project:** [A definir]  
**Deploy URL:** [A definir]

---

**FIM DA ESPECIFICAÃ‡ÃƒO**

*Documento vivo - atualizar conforme desenvolvimento evolui*