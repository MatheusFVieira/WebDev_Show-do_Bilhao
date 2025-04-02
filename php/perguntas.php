<?php
session_start();
require_once "Question.php";

if (!isset($_SESSION["usuario"])) {
    header("Location: index.php");
    exit();
}

$id = isset($_GET["id"]) ? (int) $_GET["id"] : 0;
$pergunta = Question::carregarPergunta($id);

if (!$pergunta) {
    header("Location: gameover.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <title>Show do Bilhão</title>
</head>
<body>
    <h1><?php echo $pergunta->enunciado; ?></h1>
    <form action="game.php" method="POST">
        <?php foreach ($pergunta->alternativas as $indice => $alternativa): ?>
            <input type="radio" name="resposta" value="<?php echo $indice; ?>"> <?php echo $alternativa; ?><br>
        <?php endforeach; ?>
        <input type="hidden" name="id" value="<?php echo $id; ?>">
        <button type="submit">Responder</button>
    </form>
</body>
</html>
