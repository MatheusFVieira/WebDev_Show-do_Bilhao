<?php
class User {
    public $login;
    public $senha;
    public $email;
    public $nome;

    public function __construct($login, $senha, $email, $nome) {
        $this->login = $login;
        $this->senha = $senha;
        $this->email = $email;
        $this->nome = $nome;
    }

    public static function autenticar($login, $senha) {
        $usuarios = json_decode(file_get_contents("usuarios.json"), true);
        foreach ($usuarios as $user) {
            if ($user["login"] === $login && $user["senha"] === $senha) {
                session_start();
                $_SESSION["usuario"] = $user["login"];
                return true;
            }
        }
        return false;
    }
}
?>
