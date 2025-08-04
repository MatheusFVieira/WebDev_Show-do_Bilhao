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
    let perguntaAtualIndex = 0;
    const totalPerguntasParaVencer = 10;

    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function prepararJogo() {
        try {
            const response = await fetch("perguntas.json");
            todasPerguntas = await response.json();

            embaralharArray(todasPerguntas);

            perguntasDoJogo = todasPerguntas.slice(0, totalPerguntasParaVencer);

        } catch (error) {
            console.error("Erro ao carregar as perguntas:", error);
            enunciadoElement.textContent = "Não foi possível carregar o jogo. Tente novamente.";
        }
    }

    // 2. LÓGICA DE EXIBIÇÃO
    function exibirPergunta() {
        alternativasContainer.innerHTML = "";
        
        const pergunta = perguntasDoJogo[perguntaAtualIndex];
        
        enunciadoElement.textContent = pergunta.enunciado;
        pontuacaoElement.textContent = `${perguntaAtualIndex + 1} / ${totalPerguntasParaVencer}`;

        pergunta.alternativas.forEach((alternativa, index) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "resposta";
            input.value = index;
            input.id = `alt-${index}`;
            input.required = true;

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
            perguntaAtualIndex++;

            if (perguntaAtualIndex >= totalPerguntasParaVencer) {
                window.location.href = "vitoria.html";
            } else {
                exibirPergunta();
            }

        } else {
            sessionStorage.setItem("pontuacaoFinal", perguntaAtualIndex);
            window.location.href = "gameover.html";
        }
    }
    
    function fazerLogout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }

    // 4. INICIALIZAÇÃO DO JOGO
    await prepararJogo();
    exibirPergunta(); 

    alternativasForm.addEventListener("submit", verificarResposta);
    logoutButton.addEventListener("click", fazerLogout);
});