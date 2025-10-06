# 4. Data Models (TypeScript Interfaces)
These interfaces represent the data structures that will be used in the frontend JavaScript code when interacting with the Supabase API.

```typescript
// From /scripts/supabase-client.js or a shared types file

export interface Student {
  id: string; // UUID
  name: string;
  grade_level: 4 | 5 | 6;
  created_at: string; // ISO 8601
}

export interface Activity {
  id: string; // UUID
  name: string;
  type: 'fluencia' | 'integracao';
  bncc_codes: string[];
  estimated_duration: number; // minutes
  unlocked_by: string | null; // UUID
  modules: any[]; // JSONB
}

export interface QuestionBankItem {
  id: string; // UUID
  module_type: string; // 'm1', 'm5', etc.
  content: any; // JSONB
  tags: string[];
}

export interface StudentAttempt {
  id: string; // UUID
  student_id: string; // UUID
  activity_id: string; // UUID
  module_index: number;
  module_type: string;
  questions_data: any; // JSONB
  correct_count: number;
  total_count: number;
  accuracy: number;
  started_at: string; // ISO 8601
  completed_at: string | null; // ISO 8601
}
```

---
