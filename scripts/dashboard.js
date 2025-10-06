// Proteção de Rota
const studentId = localStorage.getItem('student_id');
if (!studentId) {
    window.location.href = '/login.html';
}

console.log(`Bem-vindo, aluno ${studentId}!`);

// A lógica para buscar e renderizar as atividades será adicionada na Estória 1.5
