<?php
session_start();

// Verifica se o usuário já está logado
if (isset($_SESSION['usuario'])) {
    header("Location: perguntas.php");
    exit();
}

// Verifica erro no login
$erro = isset($_GET['erro']) ? $_GET['erro'] : null;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show do Bilhão - Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao Show do Bilhão!</h1>
        <p>Faça login para começar o jogo ou crie uma conta.</p>

        <?php if ($erro): ?>
            <p class="error"><?= htmlspecialchars($erro) ?></p>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <input type="text" name="login" placeholder="Usuário" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>

        <p>Não tem uma conta? <a href="cadastro.php">Crie uma agora</a></p>
    </div>
</body>
</html>
