# Webchat Socket

<div align="center"><img src="https://user-images.githubusercontent.com/36240511/152342775-e063edb8-b0bb-4b79-986d-981e3e704135.png" width="100"></div>

Tabela de conteúdos
=================
   * [Sobre](#Sobre)
   * [Status do Projeto](#Status)
   * [Features](#Features)
   * [Instalação](#instalação)
   * [Como usar](#como-usar)
   * [Pré Requisitos](#pre-requisitos)
   * [Testes](#testes)
   * [Tecnologias](#tecnologias)
   
   <hr>
   
   <h3>Sobre</h3>
   
   <div align="justify"><p text-align: justify>Deu vontade de teclar um pouco com os amigos? Webchat Socket está prontinho para lhe satisfazer. Webchat Socket utiliza um moderno sistema de troca de mensagens instântaneas, baseado no modelo de comunicação full-duplex, onde se abre um canal permanete de comunicação entre cliente e servidor. Assim seu papo estará sempre em dia e as notícias sempre bem atualizadas.
      Webchat Socket teve seu front-end simplesmente desenvolvido em HTML5 e JavaScript. Para o Back-end utilizamos Node.js, algumas bibliotecas suplementares, bem como, não poderia faltar, a biblioteaca Socket.io. Foi utilizado um Banco de Dados NoSQL MongoDB para armazenar as mensagens.
<h1 align="left">
    <a href="https://nodejs.org/">🔗 Node</a>
</h1>
<p align="left">🚀 lib para construção de API's</p>

<h1 align="center">
    <a href="https://socket.io/">🔗 Socket.io</a>
</h1>
<p align="center">🚀 lib para utilização de Socket</p>
</div>

<hr>
<h3>Status</h3>

<h4 align="left"> 
  Node.js 🚀 Concluído
  
  <hr>
  
  ### Features

- [x] Envio e recebimento de mensagens
- [x] Alteração de nickname
- [x] Persisteência de dados
  
</h4>

<hr>

<h3>Instalação</h3>

<h3>Pré-Requisitos</h3>
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<div>

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <git@github.com:sergioabarbosa/webchat.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd webchat

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3333>
  
```
  <hr>
  
  ### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [HTML5](https://www.w3.org/)
- [Node.js](https://nodejs.org/en/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/)
- [Socket](https://reactnative.dev/)
  
    <div>
  <img align="center" alt="Sérgio-HTML" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
  <img align="center" alt="Sérgio-CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
  <img align="center" alt="Sérgio-Node" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="Sérgio-git" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg">
  <img align="center" alt="Sérgio-socketio" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg">
   </div>
  
  <div align="justify">
  <h3>Como usar</h3>
  Com o servidor iniciado:
  
  - Com o projeto devidamente clonado e com as dependências instaladas(NPM) digite em seu terminal: npm start.
  - Acesse o endereço do site. Para acesso local digite em seu navegador: http://localhost:3000.
  - Em seguida digite seu nome de usuário(Nickname) no campo Nickname. Caso opte por enviar mensagens anonimanete deixe esse campo vazio que automaticamente será     gerado um token de acesso ao chat. Veja na imagem abaixo os campos:
    
  <div align="center"><img src="https://user-images.githubusercontent.com/36240511/152368828-5b344049-7ef5-4b95-9123-6f9d86226557.png" width="750"></div>
  </div>
  
  <hr>
  
  <h3>Testes</h3>
  Teste 1 - Back-end: Conexão simultânea de clientes e troca de mensagens em chat público;
            -Será validado que todos os clientes que estão conectados ao chat podem enviar e receber mensagens;
  
  Teste 2 - Interface de Usuário para interação dos clientes;
            - Será validado que o front-end tem um campo de texto para preencher um nome de usuário e um botão para alterar o apelido (nickname);
  
  Reste 3 - Verifique se as mensagens são persistentes;
            - Será validado que o histórico de 30 mensagens irá aparecer quando o cliente se conectar;
  
  Execução dos testes:
  
 <p>Com o servidor rodando digite em seu terminal : npm test tests/teste[numero_do_teste]</p>
  <p>Exempĺos:</p>
   <p>-> npm test tests/teste1;</p>
   <p>-> npm test tests/teste2;</p>
   <p>-> npm test tests/teste3.</p>
  
 <hr>
  
<h3>Author</h3>
  
<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/36240511?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Sérgio Barbosa</b></sub></a> <a href="" title="Rocketseat">🚀</a>


  Feito com ❤️ por Sérgio Barbosa👋🏽 Entre em contato!

  [![Instagram Badge](https://img.shields.io/badge/-@sergiobarbo-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/Sergio20barbosa)](https://twitter.com/@Sergio20barbosa) [![Linkedin Badge](https://img.shields.io/badge/-Sergio-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/sergio-alves-barbosa)](https://www.linkedin.com/in/sergio-alves-barbosa/) 
  [![Gmail Badge](https://img.shields.io/badge/-sergio.alvesbarbosa@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:sergio.alvesbarbosa@gmail.com)](mailto:sergio.alvesbarbosa@gmail.com)
            
  
  

 
  
  



