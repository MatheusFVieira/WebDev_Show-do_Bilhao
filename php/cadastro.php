<?php
session_start();

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST["nome"]);
    $email = trim($_POST["email"]);
    $login = trim($_POST["login"]);
    $senha = password_hash($_POST["senha"], PASSWORD_DEFAULT);

    // Carregar usuários existentes
    $usuarios = json_decode(file_get_contents("usuarios.json"), true) ?? [];

    // Verifica se o login já existe
    foreach ($usuarios as $usuario) {
        if ($usuario['login'] === $login) {
            header("Location: cadastro.php?erro=Usuário já existe!");
            exit();
        }
    }

    // Adiciona novo usuário
    $usuarios[] = ["nome" => $nome, "email" => $email, "login" => $login, "senha" => $senha];
    file_put_contents("usuarios.json", json_encode($usuarios, JSON_PRETTY_PRINT));

    header("Location: index.php");
    exit();
}

// Verifica erro no cadastro
$erro = isset($_GET['erro']) ? $_GET['erro'] : null;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Show do Bilhão</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Crie sua conta</h1>

        <?php if ($erro): ?>
            <p class="error"><?= htmlspecialchars($erro) ?></p>
        <?php endif; ?>

        <form action="cadastro.php" method="POST">
            <input type="text" name="nome" placeholder="Nome Completo" required>
            <input type="email" name="email" placeholder="E-mail" required>
            <input type="text" name="login" placeholder="Usuário" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <button type="submit">Cadastrar</button>
        </form>

        <p>Já tem uma conta? <a href="index.php">Faça login</a></p>
    </div>
</body>
</html>
