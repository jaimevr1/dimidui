# 5. Database Schema
*The following SQL DDL is the source of truth for the database structure, as defined in the specification.* 

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
