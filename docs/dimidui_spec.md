# Dimidui MVP - Especificação Técnica Final

---

## 1. STACK & ARQUITETURA

```
Frontend: HTML + CSS + Vanilla JS
Backend: Supabase (PostgreSQL + Auth)
Deploy: Vercel
```

**Estrutura de Pastas:**
```
/dimidui-mvp
├── /assets
│   ├── /fonts (Atkinson Hyperlegible)
│   └── /icons (Lucide SVG)
├── /styles
│   ├── variables.css (design tokens)
│   ├── global.css
│   └── modules.css
├── /scripts
│   ├── supabase-client.js
│   ├── auth.js
│   ├── modules/
│   │   ├── m1-bateria.js
│   │   ├── m2-linha.js
│   │   ├── m5-operacao.js
│   │   ├── m6-palavra.js
│   │   ├── m8-ortografia.js
│   │   └── m9-leitura.js
│   ├── activity-runtime.js
│   └── dashboard.js
├── login.html
├── aluno-dashboard.html
├── atividade.html (runtime genérico)
├── professor-dashboard.html
├── professor-criar.html
└── professor-banco-questoes.html
```

---

## 2. SCHEMA SUPABASE

```sql
-- TABELA: students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  password TEXT NOT NULL, -- plaintext no MVP (hash em prod)
  grade_level INT CHECK (grade_level IN (4,5,6)),
  created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('fluencia', 'integracao')),
  bncc_codes TEXT[],
  estimated_duration INT, -- minutos
  unlocked_by UUID REFERENCES activities(id), -- NULL se sempre disponível
  modules JSONB NOT NULL, -- [{type: 'm1', config: {...}}, ...]
  created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: question_bank (novo - para reutilização)
CREATE TABLE question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_type TEXT, -- 'm1', 'm5', etc
  content JSONB, -- estrutura varia por módulo
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- TABELA: student_attempts
CREATE TABLE student_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  module_index INT, -- posição na cadeia
  module_type TEXT,
  
  -- Dados de desempenho
  questions_data JSONB, -- [{question_id, correct, attempts, time_spent}, ...]
  correct_count INT,
  total_count INT,
  accuracy FLOAT GENERATED ALWAYS AS (correct_count::float / NULLIF(total_count, 0)) STORED,
  
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- TABELA: activity_assignments
CREATE TABLE activity_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, activity_id)
);

-- VIEW: concept_mastery
CREATE VIEW concept_mastery AS
SELECT 
  sa.student_id,
  unnest(a.bncc_codes) AS bncc_code,
  AVG(sa.accuracy) AS avg_accuracy,
  COUNT(*) AS attempts,
  MAX(sa.completed_at) AS last_practiced
FROM student_attempts sa
JOIN activities a ON sa.activity_id = a.id
WHERE sa.completed_at IS NOT NULL
GROUP BY sa.student_id, bncc_code;

-- VIEW: student_progress_summary
CREATE VIEW student_progress_summary AS
SELECT 
  s.id AS student_id,
  s.name,
  COUNT(DISTINCT sa.activity_id) FILTER (WHERE sa.completed_at IS NOT NULL) AS completed_activities,
  AVG(sa.accuracy) FILTER (WHERE sa.completed_at IS NOT NULL) AS overall_accuracy,
  COUNT(DISTINCT cm.bncc_code) FILTER (WHERE cm.avg_accuracy >= 0.70) AS mastered_concepts
FROM students s
LEFT JOIN student_attempts sa ON s.id = sa.student_id
LEFT JOIN concept_mastery cm ON s.id = cm.student_id
GROUP BY s.id, s.name;
```

---

## 3. MÓDULOS - ESTRUTURA JSON

### M1: BateriaRápida
```json
{
  "type": "m1",
  "config": {
    "timer_enabled": true,
    "timer_seconds": 600,
    "questions": [
      {
        "id": "q1",
        "prompt": "17 ÷ 5 = ?",
        "answer": "3 resto 2",
        "hint": "Quantas vezes o 5 cabe no 17?"
      }
    ]
  }
}
```

### M2: LinhaNumérica
```json
{
  "type": "m2",
  "config": {
    "range_min": 0,
    "range_max": 1000,
    "targets": [347, 782, 123],
    "tolerance": 10
  }
}
```

### M5: IdentificaOperação
```json
{
  "type": "m5",
  "config": {
    "questions": [
      {
        "id": "q1",
        "problem": "João tinha 15 maçãs e deu 8 para Maria. Quantas sobraram?",
        "correct_operation": "subtracao",
        "hint": "Ele tinha algo e deu parte. Aumentou ou diminuiu?"
      }
    ]
  }
}
```

### M6: DestacaPalavraChave
```json
{
  "type": "m6",
  "config": {
    "text": "O menino correu rápido pelo parque.",
    "target_category": "substantivo",
    "correct_words": ["menino", "parque"],
    "hint": "Palavras que nomeiam seres ou lugares"
  }
}
```

### M8: CorrigeOrtografia
```json
{
  "type": "m8",
  "config": {
    "mode": "multiple_choice",
    "questions": [
      {
        "id": "q1",
        "text": "Eu preciso <erro>pasar</erro> na farmácia.",
        "error_word": "pasar",
        "options": ["passar", "paçar", "pazar"],
        "correct": "passar",
        "hint": "Entre vogais, usa-se SS"
      }
    ]
  }
}
```

### M9: CompreensãoLeitora
```json
{
  "type": "m9",
  "config": {
    "text": "Maria acordou cedo. O sol brilhava forte...",
    "questions": [
      {
        "id": "q1",
        "prompt": "Que horas do dia Maria acordou?",
        "alternatives": [
          {"id": "a", "text": "De manhã"},
          {"id": "b", "text": "À tarde"},
          {"id": "c", "text": "De noite"}
        ],
        "correct": "a",
        "hint": "O texto diz que o sol brilhava..."
      }
    ]
  }
}
```

---

## 4. LÓGICA DE TENTATIVAS & HINTS

```javascript
// activity-runtime.js
class QuestionAttempt {
  constructor(questionConfig) {
    this.config = questionConfig;
    this.attempts = 0;
    this.maxAttempts = 3;
  }
  
  checkAnswer(userAnswer) {
    this.attempts++;
    const correct = this.isCorrect(userAnswer);
    
    if (!correct && this.attempts === 1) {
      return { correct: false, message: "❌ Tente outra vez" };
    }
    
    if (!correct && this.attempts === 2) {
      return { 
        correct: false, 
        message: "💡 Dica: " + this.config.hint,
        showHint: true
      };
    }
    
    if (!correct && this.attempts === 3) {
      return {
        correct: false,
        message: "A resposta correta era: " + this.getCorrectAnswer(),
        showCorrect: true,
        lockQuestion: true
      };
    }
    
    return { correct: true, message: "✅ Correto!" };
  }
}
```

---

## 5. INTERFACE CRIAÇÃO DE ATIVIDADE

### Fluxo
1. **Metadados**: Nome, tipo, BNCC codes, duração estimada
2. **Vinculação** (se Integração): Dropdown de atividades Fluência
3. **Adicionar Módulos**: Botão "+ Adicionar M1/M2/M5/M6/M8/M9"
4. **Configurar Módulo**: Modal com campos específicos
   - Opção "Usar do Banco de Questões" ou "Criar Nova"
5. **Preview**: Visualizar fluxo antes de salvar
6. **Salvar**: INSERT em `activities`

### Wireframe Configurador M1
```
┌────────────────────────────────────────┐
│ Configurar M1 - Bateria Rápida        │
├────────────────────────────────────────┤
│ [✓] Usar timer  [___600___] segundos  │
│                                        │
│ QUESTÕES:                              │
│ ┌────────────────────────────────────┐ │
│ │ Questão 1                          │ │
│ │ Enunciado: [17 ÷ 5 = ?          ] │ │
│ │ Resposta:  [3 resto 2           ] │ │
│ │ Dica:      [Quantas vezes o 5...] │ │
│ │ [🗑️ Remover]                       │ │
│ └────────────────────────────────────┘ │
│                                        │
│ [+ Nova Questão] [📦 Do Banco]        │
│                                        │
│ [Cancelar]              [Salvar]      │
└────────────────────────────────────────┘
```

---

## 6. DASHBOARD PROFESSOR

### Visão Global
```
┌────────────────────────────────────────────┐
│ Dimidui | Professor                        │
├────────────────────────────────────────────┤
│ 📊 DESEMPENHO GERAL DA TURMA               │
│ ├─ Alunos ativos: 12                      │
│ ├─ Atividades concluídas esta semana: 9/12│
│ └─ Acurácia média: 74%                    │
│                                            │
│ 🎯 HABILIDADES BNCC (Média da Turma)       │
│ ┌────────────────────────────────────────┐ │
│ │ EF05MA03 - Divisão c/ resto   ████░ 78%│ │
│ │ EF04LP15 - Localizar info     ███░░ 65%│ │
│ │ EF05MA08 - Frações            █████ 85%│ │
│ └────────────────────────────────────────┘ │
│                                            │
│ 👥 DESEMPENHO INDIVIDUAL                   │
│ [Filtro: Todos ▾]  [Buscar: ________]    │
│ ┌────────────────────────────────────────┐ │
│ │ Ana Silva (5º)      85% │ 10/10 ativ  │ │
│ │ Bruno Costa (4º)    62% │  6/10 ativ  │ │
│ │ Carlos Lima (6º)    91% │ 10/10 ativ  │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ [+ Novo Aluno] [+ Nova Atividade]         │
└────────────────────────────────────────────┘
```

### Visão Individual (Clique em Aluno)
```
┌────────────────────────────────────────────┐
│ ← Voltar | Bruno Costa - 4º Ano           │
├────────────────────────────────────────────┤
│ PROGRESSO GERAL: 62% (6/10 atividades)    │
│                                            │
│ HABILIDADES BNCC:                          │
│ ┌────────────────────────────────────────┐ │
│ │ EF05MA03 - Divisão  ███░░ 58%  ⚠️      │ │
│ │ EF04LP15 - Leitura  ████░ 70%          │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ HISTÓRICO DE ATIVIDADES:                   │
│ ┌────────────────────────────────────────┐ │
│ │ Atividade 1 - Fluência  ✅ 80% 18min   │ │
│ │ Atividade 2 - Integração ✅ 65% 22min  │ │
│ │ Atividade 3 - Fluência  ❌ 45% 12min   │ │
│ │   └─ M1: 12/30 (40%) ⚠️ Precisa reforço│ │
│ └────────────────────────────────────────┘ │
│                                            │
│ [Atribuir Nova Atividade]                 │
└────────────────────────────────────────────┘
```

---

## 7. LÓGICA DE DESBLOQUEIO

```javascript
// Ao carregar dashboard do aluno
async function getAvailableActivities(studentId) {
  // 1. Buscar atividades atribuídas
  const assigned = await supabase
    .from('activity_assignments')
    .select('activity_id')
    .eq('student_id', studentId);
  
  // 2. Buscar conclusões do aluno
  const completed = await supabase
    .from('student_attempts')
    .select('activity_id, accuracy')
    .eq('student_id', studentId)
    .not('completed_at', 'is', null);
  
  const completedIds = completed
    .filter(a => a.accuracy >= 0.70)
    .map(a => a.activity_id);
  
  // 3. Buscar atividades e filtrar
  const activities = await supabase
    .from('activities')
    .select('*')
    .in('id', assigned.map(a => a.activity_id));
  
  return activities.filter(activity => {
    if (!activity.unlocked_by) return true; // Sempre disponível
    return completedIds.includes(activity.unlocked_by);
  });
}
```

---

## 8. PALETA DE CORES (Light Mode Apenas MVP)

```css
:root {
  --bg-primary: #E8EDF2;
  --surface: #FFFFFF;
  
  --primary: #6B46C1;
  --primary-light: #9F7AEA;
  
  --text-primary: #2D3748;
  --text-secondary: #4A5568;
  
  --correct: #48BB78;
  --incorrect: #F56565;
  --warning: #ED8936;
  
  --action-primary: #F6AD55;
  --action-secondary: #A0AEC0;
  
  --border: #CBD5E0;
  --shadow: rgba(0,0,0,0.1);
}
```

---

## 9. CRONOGRAMA EXECUTÁVEL (5 Semanas)

### Semana 1: Infra + M1 + M9
- [ ] Supabase setup (tabelas + RLS policies)
- [ ] Login dropdown + auth
- [ ] M1 completo (com timer opcional)
- [ ] M9 completo
- [ ] Runtime básico (JSON → render)

### Semana 2: Dashboard Aluno + M5
- [ ] Dashboard aluno (lista atividades)
- [ ] M5 (IdentificaOperação)
- [ ] Salvar tentativas no Supabase
- [ ] Lógica 3 tentativas + hint

### Semana 3: Criar Atividade + Banco Questões
- [ ] Interface criar atividade (metadados + módulos)
- [ ] Banco de questões (CRUD simples)
- [ ] Integração banco → configurador
- [ ] Preview atividade

### Semana 4: M2, M6, M8 + Desbloqueio
- [ ] M2 (LinhaNumérica drag-drop)
- [ ] M6 (DestacaPalavra - clique)
- [ ] M8 (CorrigeOrtografia - múltipla escolha)
- [ ] Sistema vinculação/desbloqueio

### Semana 5: Dashboard Professor + Polish
- [ ] Dashboard professor (global + individual)
- [ ] Gestão alunos (cadastro + atribuição)
- [ ] Views BNCC (concept_mastery)
- [ ] Teste com 3 alunos reais
- [ ] Deploy Vercel

---

## 10. DECISÕES FINAIS CONFIRMADAS

✅ **M8**: Múltipla escolha apenas (3 opções)  
✅ **Tentativas**: 3 máximo (erro 1 → "tente novamente", erro 2 → hint, erro 3 → mostrar resposta)  
✅ **Senha**: Professor define individual no cadastro  
✅ **Refazer**: Ilimitado  
✅ **Banco de questões**: Interface de gestão incluída  

---

Pronto para implementação. Começar pela Semana 1?