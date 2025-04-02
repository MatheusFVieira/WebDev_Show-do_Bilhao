# Show do Bilhão - Jogo de Perguntas e Respostas

Este projeto implementa um jogo de perguntas e respostas baseado no formato do programa **"Show do Bilhão"**. O objetivo é que um jogador responda corretamente a uma sequência de perguntas de conhecimento geral, acumulando pontos a cada acerto. O jogo termina quando o jogador erra uma resposta.

---

## 📌 Tecnologias Utilizadas
- **PHP**: Lógica do jogo e manipulação de sessões e arquivos
- **HTML/CSS**: Estrutura e estilização da interface
- **JSON**: Persistência de dados (usuários e perguntas)

---

## 🎮 Funcionalidades

### 📝 1. Exibição de Perguntas
- As perguntas são armazenadas em um arquivo JSON e carregadas dinamicamente.
- Cada pergunta tem um enunciado, alternativas e a resposta correta.
- As perguntas são exibidas sequencialmente, uma por página.

### 📊 2. Progresso do Jogo
- O jogador avança ao responder corretamente.
- O jogo finaliza ao errar uma pergunta.
- Exibição do progresso com a quantidade de perguntas respondidas corretamente.

### 🔐 3. Autenticação de Jogadores
- Cadastro de usuários (**nome, e-mail, login e senha**).
- Armazenamento de credenciais em um arquivo JSON.
- Login e controle de **sessão** para garantir que apenas usuários autenticados possam jogar.
- **Cookies** armazenam informações sobre última partida e pontuação.

### 💾 4. Persistência de Dados
- Perguntas e usuários são armazenados em arquivos **JSON**.
- Sistema de **leitura e gravação** para manipular os dados.

---

## 🚀 Como Executar
1. Configure um servidor local como **XAMPP** ou **Laragon**.
2. Coloque os arquivos do projeto na pasta `htdocs` (XAMPP) ou `www` (Laragon).
3. Inicie o servidor Apache.
4. Acesse o jogo pelo navegador: `http://localhost/show_do_bilhao/`.

---

## 📌 Melhorias Futuras
- [ ] Implementação de um banco de dados SQL para maior escalabilidade.
- [ ] Sistema de ranking com pontuações dos jogadores.
- [ ] Melhorias no design e responsividade.

---

