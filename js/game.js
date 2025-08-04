document.addEventListener("DOMContentLoaded", async () => {
    // 1. VERIFICAÇÃO INICIAL E PREPARAÇÃO
    if (!sessionStorage.getItem("usuarioLogado")) {
        window.location.href = "index.html";
        return;
    }
    
    const enunciadoElement = document.getElementById("enunciado");
    const alternativasForm = document.getElementById("alternativas-form");
    const alternativasContainer = document.getElementById("alternativas-container");
    const pontuacaoElement = document.getElementById("pontuacao-atual");
    const logoutButton = document.getElementById("logout-button");

    let todasPerguntas = [];
    let perguntasDoJogo = [];
    let perguntaAtualIndex = 0; // Agora controla o índice de 0 a 9
    const totalPerguntasParaVencer = 10;

    // Função para embaralhar um array (Algoritmo de Fisher-Yates)
    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
    }

    // Função para carregar e preparar as perguntas
    async function prepararJogo() {
        try {
            const response = await fetch("perguntas.json");
            todasPerguntas = await response.json();
            
            // Embaralha todas as perguntas carregadas
            embaralharArray(todasPerguntas);
            
            // Pega as 10 primeiras perguntas do array embaralhado
            perguntasDoJogo = todasPerguntas.slice(0, totalPerguntasParaVencer);

        } catch (error) {
            console.error("Erro ao carregar as perguntas:", error);
            enunciadoElement.textContent = "Não foi possível carregar o jogo. Tente novamente.";
        }
    }

    // 2. LÓGICA DE EXIBIÇÃO
    function exibirPergunta() {
        // Limpa as alternativas da pergunta anterior
        alternativasContainer.innerHTML = "";
        
        const pergunta = perguntasDoJogo[perguntaAtualIndex];
        
        enunciadoElement.textContent = pergunta.enunciado;
        // A pontuação agora mostra o progresso (Ex: 1 / 10)
        pontuacaoElement.textContent = `${perguntaAtualIndex + 1} / ${totalPerguntasParaVencer}`;

        pergunta.alternativas.forEach((alternativa, index) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "resposta";
            input.value = index;
            input.id = `alt-${index}`;
            input.required = true; // Torna obrigatório escolher uma opção

            const label = document.createElement("label");
            label.htmlFor = `alt-${index}`;
            label.textContent = alternativa;

            const div = document.createElement("div");
            div.appendChild(input);
            div.appendChild(label);
            alternativasContainer.appendChild(div);
        });
    }

    // 3. LÓGICA DE RESPOSTA E PONTUAÇÃO
    function verificarResposta(event) {
        event.preventDefault();

        const respostaSelecionada = alternativasForm.querySelector('input[name="resposta"]:checked');
        
        const respostaCorreta = perguntasDoJogo[perguntaAtualIndex].resposta;
        const respostaDoUsuario = parseInt(respostaSelecionada.value);

        if (respostaDoUsuario === respostaCorreta) {
            // Se acertou, avança para a próxima pergunta
            perguntaAtualIndex++;
            
            // Verifica se o jogador venceu
            if (perguntaAtualIndex >= totalPerguntasParaVencer) {
                window.location.href = "vitoria.html";
            } else {
                exibirPergunta();
            }

        } else {
            // Se errou, vai para a tela de game over
            // Salva a pontuação (quantas acertou antes de errar)
            sessionStorage.setItem("pontuacaoFinal", perguntaAtualIndex);
            window.location.href = "gameover.html";
        }
    }
    
    function fazerLogout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }

    // 4. INICIALIZAÇÃO DO JOGO
    await prepararJogo(); // Espera as perguntas carregarem e serem embaralhadas
    exibirPergunta(); // Exibe a primeira pergunta do desafio

    alternativasForm.addEventListener("submit", verificarResposta);
    logoutButton.addEventListener("click", fazerLogout);
});