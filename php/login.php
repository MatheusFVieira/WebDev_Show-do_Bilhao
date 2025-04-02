<?php
session_start();

// Carrega os usuários do arquivo JSON
$usuarios = json_decode(file_get_contents("usuarios.json"), true) ?? [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST["login"];
    $senha = $_POST["senha"];

    foreach ($usuarios as $usuario) {
        if ($usuario["login"] === $login && password_verify($senha, $usuario["senha"])) {
            $_SESSION["usuario"] = $usuario["login"];
            header("Location: perguntas.php");
            exit();
        }
    }

    header("Location: index.php?erro=Usuário ou senha incorretos!");
    exit();
}
?>
