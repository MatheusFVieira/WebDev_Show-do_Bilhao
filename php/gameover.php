<?php
session_start();

// Obtém a pontuação final antes de destruir a sessão
$pontuacao = isset($_SESSION['pontuacao']) ? $_SESSION['pontuacao'] : 0;

// Salva a pontuação final em um cookie para exibir na próxima vez
setcookie("ultima_pontuacao", $pontuacao, time() + 3600); // Expira em 1 hora

// Destroi a sessão para reiniciar o jogo
session_destroy();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Over</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>😢 Game Over!</h1>
    <p>Você respondeu corretamente <strong><?php echo $pontuacao; ?></strong> perguntas.</p>

    <?php if (isset($_COOKIE['ultima_pontuacao'])): ?>
        <p>🏆 Última pontuação: <strong><?php echo $_COOKIE['ultima_pontuacao']; ?></strong></p>
    <?php endif; ?>

    <a href="index.php"><button>🔄 Jogar Novamente</button></a>
</div>

<footer>
    <?php include 'rodape.inc'; ?>
</footer>

</body>
</html>
