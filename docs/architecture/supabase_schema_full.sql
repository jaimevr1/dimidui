-- Enable UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
--------------------------------------------------------------------------------

-- Enum for activity types
CREATE TYPE activity_type_enum AS ENUM ('fluencia', 'integracao');

-- Enum for student grade levels
CREATE TYPE grade_level_enum AS ENUM ('4', '5', '6');

-- Enum for module types (based on dimidui_spec.md and prd.md)
-- M1: BateriaRápida, M2: LinhaNumérica, M5: IdentificaOperação, M6: DestacaPalavraChave, M8: CorrigeOrtografia, M9: CompreensãoLeitora
CREATE TYPE module_type_enum AS ENUM ('m1', 'm2', 'm5', 'm6', 'm8', 'm9');

-- TABLES
--------------------------------------------------------------------------------

-- TABELA: students
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  password TEXT NOT NULL, -- plaintext no MVP (hash em prod)
  grade_level grade_level_enum,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type activity_type_enum,
  bncc_codes TEXT[],
  estimated_duration INT, -- minutos
  unlocked_by UUID REFERENCES activities(id), -- NULL se sempre disponível
  modules JSONB NOT NULL, -- [{type: 'm1', config: {...}}, ...]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: question_bank
CREATE TABLE question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_type module_type_enum,
  content JSONB, -- estrutura varia por módulo
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABELA: student_attempts
CREATE TABLE student_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  module_index INT, -- posição na cadeia
  module_type module_type_enum,
  
  -- Dados de desempenho
  questions_data JSONB, -- [{question_id, correct, attempts, time_spent}, ...]
  correct_count INT,
  total_count INT,
  accuracy FLOAT GENERATED ALWAYS AS (correct_count::float / NULLIF(total_count, 0)) STORED,
  
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- TABELA: activity_assignments
CREATE TABLE activity_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, activity_id)
);

-- VIEWS
--------------------------------------------------------------------------------

-- VIEW: concept_mastery
CREATE OR REPLACE VIEW concept_mastery AS
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
CREATE OR REPLACE VIEW student_progress_summary AS
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

-- ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

-- Enable RLS for all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_assignments ENABLE ROW LEVEL SECURITY;

-- Policy for students table: Students can view and update their own data
CREATE POLICY "Students can view their own data" ON students
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students can update their own data" ON students
  FOR UPDATE USING (auth.uid() = id);

-- Policy for activities table: All authenticated users can view activities
CREATE POLICY "All authenticated users can view activities" ON activities
  FOR SELECT USING (true);

-- Policy for question_bank table: All authenticated users can view questions
CREATE POLICY "All authenticated users can view questions" ON question_bank
  FOR SELECT USING (true);

-- Policy for student_attempts table: Students can insert and view their own attempts
CREATE POLICY "Students can insert their own attempts" ON student_attempts
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can view their own attempts" ON student_attempts
  FOR SELECT USING (auth.uid() = student_id);

-- Policy for activity_assignments table: Students can view their own assignments
CREATE POLICY "Students can view their own assignments" ON activity_assignments
  FOR SELECT USING (auth.uid() = student_id);

-- FUNCTIONS
--------------------------------------------------------------------------------

-- Function to handle new user sign-up (insert into auth.users and public.students)
-- This function assumes that the 'auth.users' table is managed by Supabase Auth.
-- It's a placeholder for a trigger or a Supabase Edge Function that would
-- synchronize 'auth.users' with 'public.students' upon new user registration.
-- For MVP, direct insertion into 'public.students' is handled by the app.
-- This function is more for demonstrating how a more robust system would work.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.students (id, name, created_at)
  VALUES (NEW.id, NEW.email, NOW()); -- Assuming email as name for simplicity, adjust as needed
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- TRIGGERS
--------------------------------------------------------------------------------

-- Trigger to call handle_new_user function after a new user is created in auth.users
-- This trigger would typically be set up by Supabase itself or manually if needed.
-- For the current MVP, where students are created by teachers, this might not be directly used.
-- However, it's a good practice for future authentication expansion.
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- STORAGE BUCKETS
--------------------------------------------------------------------------------

-- Create a storage bucket for general assets (e.g., module images, future content)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Add RLS policy for the 'assets' bucket (e.g., allow authenticated users to read)
CREATE POLICY "Allow authenticated read access to assets" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'assets');

-- INDEXES
--------------------------------------------------------------------------------

-- Indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_student_attempts_student_id ON student_attempts (student_id);
CREATE INDEX IF NOT EXISTS idx_student_attempts_activity_id ON student_attempts (activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_assignments_student_id ON activity_assignments (student_id);
CREATE INDEX IF NOT EXISTS idx_activity_assignments_activity_id ON activity_assignments (activity_id);
CREATE INDEX IF NOT EXISTS idx_activities_unlocked_by ON activities (unlocked_by);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_students_name ON students (name);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities (type);
CREATE INDEX IF NOT EXISTS idx_question_bank_module_type ON question_bank (module_type);
CREATE INDEX IF NOT EXISTS idx_question_bank_tags ON question_bank USING GIN (tags); -- For array searching
CREATE INDEX IF NOT EXISTS idx_student_attempts_completed_at ON student_attempts (completed_at);