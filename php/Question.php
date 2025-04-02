<?php
class Question {
    public $enunciado;
    public $alternativas;
    public $resposta;

    public function __construct($enunciado, $alternativas, $resposta) {
        $this->enunciado = $enunciado;
        $this->alternativas = $alternativas;
        $this->resposta = $resposta;
    }

    public static function carregarPergunta($id) {
        $perguntas = json_decode(file_get_contents("perguntas.json"), true);
        if (isset($perguntas[$id])) {
            return new Question(
                $perguntas[$id]["enunciado"],
                $perguntas[$id]["alternativas"],
                $perguntas[$id]["resposta"]
            );
        }
        return null;
    }
}
?>
