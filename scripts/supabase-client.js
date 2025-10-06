import { createClient } from '@supabase/supabase-js'

// ATENÇÃO: Crie um arquivo .env na raiz do projeto com as variáveis abaixo
const supabaseUrl = "https://vzpqqqdtrgtsfytmrklg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cHFxcWR0cmd0c2Z5dG1ya2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzgzMjgsImV4cCI6MjA3NTM1NDMyOH0.TdXGARLzv6mJvL4w_d7LSoCoFtOZsz7-orXfrojGaKM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
