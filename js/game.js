document.addEventListener("DOMContentLoaded", async () => {
    // 1. VERIFICAÇÃO INICIAL E PREPARAÇÃO
    // Verifica se há um usuário logado no sessionStorage. Se não, volta para a tela de login.
    if (!sessionStorage.getItem("usuarioLogado")) {
        window.location.href = "index.html";
        return; // Para a execução do script
    }
    
    // Pega as referências dos elementos HTML que vamos manipular
    const enunciadoElement = document.getElementById("enunciado");
    const alternativasForm = document.getElementById("alternativas-form");
    const alternativasContainer = document.getElementById("alternativas-container");
    const pontuacaoElement = document.getElementById("pontuacao-atual");
    const logoutButton = document.getElementById("logout-button");

    let perguntas = [];
    let perguntaAtualIndex = 0;
    let pontuacao = 0;

    // Função para carregar as perguntas do arquivo JSON
    async function carregarPerguntas() {
        try {
            const response = await fetch("perguntas.json"); // Busca o arquivo
            perguntas = await response.json(); // Converte a resposta em JSON
        } catch (error) {
            console.error("Erro ao carregar as perguntas:", error);
            enunciadoElement.textContent = "Não foi possível carregar o jogo. Tente novamente.";
        }
    }

    // 2. LÓGICA DE EXIBIÇÃO
    // Função para mostrar a pergunta na tela
    function exibirPergunta() {
        // Verifica se o jogo acabou (não há mais perguntas)
        if (perguntaAtualIndex >= perguntas.length) {
            finalizarJogo(true); // Finaliza o jogo com vitória
            return;
        }

        // Limpa as alternativas da pergunta anterior
        alternativasContainer.innerHTML = "";
        
        // Pega a pergunta atual
        const pergunta = perguntas[perguntaAtualIndex];
        
        // Atualiza os textos na tela
        enunciadoElement.textContent = pergunta.enunciado;
        pontuacaoElement.textContent = pontuacao;

        // Cria os botões de rádio para cada alternativa
        pergunta.alternativas.forEach((alternativa, index) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "resposta";
            input.value = index;
            input.id = `alt-${index}`;

            const label = document.createElement("label");
            label.htmlFor = `alt-${index}`;
            label.textContent = alternativa;

            // Adiciona o input e o label no container de alternativas
            const div = document.createElement("div");
            div.appendChild(input);
            div.appendChild(label);
            alternativasContainer.appendChild(div);
        });
    }

    // 3. LÓGICA DE RESPOSTA E PONTUAÇÃO
    // Função para verificar a resposta escolhida pelo usuário
    function verificarResposta(event) {
        event.preventDefault(); // Previne o recarregamento da página

        const respostaSelecionada = alternativasForm.querySelector('input[name="resposta"]:checked');

        // Se nenhuma resposta foi selecionada, não faz nada
        if (!respostaSelecionada) {
            alert("Por favor, escolha uma alternativa!");
            return;
        }

        const respostaCorreta = perguntas[perguntaAtualIndex].resposta;
        const respostaDoUsuario = parseInt(respostaSelecionada.value);

        if (respostaDoUsuario === respostaCorreta) {
            // Se acertou, aumenta a pontuação e vai para a próxima pergunta
            pontuacao++;
            perguntaAtualIndex++;
            exibirPergunta();
        } else {
            // Se errou, finaliza o jogo
            finalizarJogo(false);
        }
    }
    
    // Função para lidar com o fim do jogo
    function finalizarJogo() {
        // Salva a pontuação final no sessionStorage para a tela de game over poder ler
        sessionStorage.setItem("pontuacaoFinal", pontuacao);
        // Redireciona para a tela de game over
        window.location.href = "gameover.html";
    }

    // Função de logout
    function fazerLogout() {
        sessionStorage.clear(); // Limpa todos os dados da sessão
        window.location.href = "index.html";
    }


    // 4. INICIALIZAÇÃO DO JOGO
    await carregarPerguntas(); // Espera as perguntas carregarem
    exibirPergunta(); // Exibe a primeira pergunta

    // Adiciona os "ouvintes" de eventos para o formulário e o botão de logout
    alternativasForm.addEventListener("submit", verificarResposta);
    logoutButton.addEventListener("click", fazerLogout);
});