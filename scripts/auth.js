import { supabase } from './supabase-client.js';

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = loginForm.name.value;
    const password = loginForm.password.value;

    try {
        const { data, error } = await supabase
            .from('students')
            .select('id')
            .eq('name', name)
            .eq('password', password)
            .single(); // .single() para esperar um único resultado ou nenhum

        if (error && error.code !== 'PGRST116') { // PGRST116: "exact-one-row-not-found"
            throw error;
        }

        if (data) {
            console.log('Login bem-sucedido!', data);
            localStorage.setItem('student_id', data.id);
            window.location.href = '/aluno-dashboard.html';
        } else {
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }

    } catch (error) {
        console.error('Erro no login:', error);
        errorMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
    }
});
