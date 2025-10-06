import { supabase } from './supabase-client.js';
import { renderM1 } from './modules/m1-bateria.js';
import { renderM9 } from './modules/m9-leitura.js';

const activityContainer = document.getElementById('activity-container');

// Mapeamento de tipos de módulo para suas funções de renderização
const moduleRenderers = {
    'm1': renderM1,
    'm9': renderM9,
    // Outros módulos serão adicionados aqui em estórias futuras
};

let currentActivity = null;
let currentModuleIndex = 0;

async function loadActivity(activityId) {
    try {
        const { data, error } = await supabase
            .from('activities')
            .select('*')
            .eq('id', activityId)
            .single();

        if (error) throw error;

        currentActivity = data;
        renderCurrentModule();
    } catch (error) {
        console.error("Erro ao carregar atividade:", error);
        activityContainer.innerHTML = `<p style="color: red;">Erro ao carregar a atividade. Verifique o ID e tente novamente.</p>`;
    }
}

function renderCurrentModule() {
    if (!currentActivity || currentModuleIndex >= currentActivity.modules.length) {
        activityContainer.innerHTML = `<h1>Atividade Concluída!</h1><p>Parabéns!</p>`;
        // Lógica de salvar conclusão da atividade virá depois
        return;
    }

    const moduleData = currentActivity.modules[currentModuleIndex];
    const renderFunction = moduleRenderers[moduleData.type];

    if (renderFunction) {
        renderFunction(moduleData.config, activityContainer, () => {
            currentModuleIndex++;
            renderCurrentModule();
        });
    } else {
        console.error(`Renderizador para o módulo tipo "${moduleData.type}" não encontrado.`);
        // Pula para o próximo módulo em caso de erro
        currentModuleIndex++;
        renderCurrentModule();
    }
}

// Inicia o runtime
function start() {
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get('id');

    if (activityId) {
        loadActivity(activityId);
    } else {
        activityContainer.innerHTML = `<p style="color: red;">Nenhum ID de atividade fornecido na URL.</p>`;
    }
}

start();
