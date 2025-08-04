// Espera o conteúdo da página carregar completamente para executar o script
document.addEventListener("DOMContentLoaded", () => {
    // Encontra os formulários de login e cadastro na página
    const loginForm = document.querySelector("#login-form");
    const cadastroForm = document.querySelector("#cadastro-form");
    const erroContainer = document.querySelector("#error-message");

    // Adiciona um "ouvinte" para o evento de submissão do formulário de login
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            // Previne o comportamento padrão do formulário (que é recarregar a página)
            event.preventDefault();

            // Pega os valores dos campos de login e senha
            const login = event.target.login.value;
            const senha = event.target.senha.value;

            // Carrega a lista de usuários do localStorage. Se não houver, usa um array vazio.
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Procura por um usuário que tenha o mesmo login e senha
            const usuarioValido = usuarios.find(user => user.login === login && user.senha === senha);

            if (usuarioValido) {
                // Se o usuário for encontrado, armazena o login dele no sessionStorage
                // para indicar que ele está logado.
                sessionStorage.setItem("usuarioLogado", usuarioValido.login);
                // Redireciona para a página do jogo
                window.location.href = "game.html";
            } else {
                // Se o usuário não for encontrado, exibe uma mensagem de erro.
                erroContainer.textContent = "Usuário ou senha incorretos!";
            }
        });
    }

    // Adiciona um "ouvinte" para o evento de submissão do formulário de cadastro
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Pega os valores dos campos do formulário
            const nome = event.target.nome.value;
            const email = event.target.email.value;
            const login = event.target.login.value;
            const senha = event.target.senha.value; // ATENÇÃO: Senha em texto plano

            // Carrega os usuários existentes
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Verifica se o login que está sendo cadastrado já existe
            const usuarioExistente = usuarios.find(user => user.login === login);

            if (usuarioExistente) {
                erroContainer.textContent = "Este nome de usuário já existe!";
            } else {
                // Se não existir, adiciona o novo usuário à lista
                usuarios.push({ nome, email, login, senha });
                // Salva a lista atualizada de volta no localStorage
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                // Redireciona para a página de login
                window.location.href = "index.html";
            }
        });
    }
});