// Carregando Supabase via CDN para compatibilidade com navegador
const supabaseUrl = "https://vzpqqqdtrgtsfytmrklg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cHFxcWR0cmd0c2Z5dG1ya2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzgzMjgsImV4cCI6MjA3NTM1NDMyOH0.TdXGARLzv6mJvL4w_d7LSoCoFtOZsz7-orXfrojGaKM"

// Aguardar o Supabase carregar do CDN
const initSupabase = () => {
    if (typeof window.supabase !== 'undefined') {
        return window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    }
    return null;
};

export const supabase = initSupabase();
