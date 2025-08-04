document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.querySelector("#login-form");
    const cadastroForm = document.querySelector("#cadastro-form");
    const erroContainer = document.querySelector("#error-message");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const login = event.target.login.value;
            const senha = event.target.senha.value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioValido = usuarios.find(user => user.login === login && user.senha === senha);

            if (usuarioValido) {
                sessionStorage.setItem("usuarioLogado", usuarioValido.login);
                window.location.href = "game.html";
            } else {
                erroContainer.textContent = "Usuário ou senha incorretos!";
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = event.target.nome.value;
            const email = event.target.email.value;
            const login = event.target.login.value;
            const senha = event.target.senha.value;

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            const usuarioExistente = usuarios.find(user => user.login === login);

            if (usuarioExistente) {
                erroContainer.textContent = "Este nome de usuário já existe!";
            } else {
                usuarios.push({ nome, email, login, senha });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                window.location.href = "index.html";
            }
        });
    }
});