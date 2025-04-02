<?php
session_start();
require_once "Question.php";

if (!isset($_SESSION["usuario"])) {
    header("Location: index.php");
    exit();
}

if (!isset($_POST["id"]) || !isset($_POST["resposta"])) {
    header("Location: gameover.php");
    exit();
}

$id = (int) $_POST["id"];
$resposta = (int) $_POST["resposta"];
$pergunta = Question::carregarPergunta($id);

if ($pergunta->resposta === $resposta) {
    $id++;
    header("Location: perguntas.php?id=$id");
} else {
    header("Location: gameover.php");
}
exit();
?>
