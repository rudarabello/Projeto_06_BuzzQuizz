
function mudarTelaCriacao() {
    let telaInicial = document.querySelector(".tela-principal")
    telaInicial.classList.add("escondido")
    let telaCriacao = document.querySelector(".tela-criarQuizz")
    telaCriacao.classList.remove("escondido")
}

let input = document.querySelectorAll(".tela-criarQuizz input")

function validarQuizz () {
    // inputs values
    let titulo = input[0].value
    let URL = input[1].value
    let perguntas = input[2].value
    let niveis = input[3].value
    
    // validações
    let validacoes = 0
    
    // validando titulo
    if (!(titulo.length < 20 || titulo.length > 65)) {
        validacoes += 1
    }
    
    // validando URl
    let link = ""
    let https = "https"
    for (let i = 0; i < https.length; i++){
        link += URL[i]
    }
    if (link == https) {
        validacoes += 1
    }
    // validando QTD perguntas
    if (!(perguntas < 3)) {
        validacoes += 1
    }
    
    // validando nivel
    if (!(niveis < 2)) {
        validacoes += 1
    }
    
    // não validado
    if (validacoes != 4){
        //alert("Preencha corretamente os espaços")
    }
    // validou
    if (validacoes == 4) {
        irParaPerguntas()
    }
    irParaPerguntas()
    
}

function irParaPerguntas () {
    let telaDePerguntas = document.querySelector(".tela-criarPerguntas")
    telaDePerguntas.classList.remove("escondido")
    let telaCriacao = document.querySelector(".tela-criarQuizz")
    telaCriacao.classList.add("escondido")
    colocarPerguntas()
}

function colocarPerguntas () {
    let perguntas = input[2].value
    let criarPerguntas = document.querySelector(".tela-criarPerguntas")
    for (let i = 0; i < perguntas; i++){
        criarPerguntas.innerHTML += `
        <div class="caixa-pergunta">
        <div class="menu-pergunta">
        Pergunta ${[i + 1]}
        <ion-icon name="create-outline" onclick="abrirPergunta(this)"></ion-icon>
        </div>
        </div>
        `
    }
    criarPerguntas.innerHTML += `
    <div class="botao-prosseguir" onclick="validarPerguntas()">Prosseguir pra criar níveis</div>
    `
}

function abrirPergunta (botao) {
    botao.classList.add("escondido")
    let pai = botao.parentNode
    let vovo = pai.parentNode
    vovo.innerHTML += `
    <div class="configuracao-pergunta">
    <input type="text" placeholder="Texto da pergunta" class="texto-da-pergunta">
    <input type="text" placeholder="Cor de fundo da pergunta" class="background">
    Resposta Certa
    <input type="text" placeholder="Resposta certa" class="resposta-correta">
    <input type="text" placeholder="URL da imagem" class="URL-correta">
    Respostas Incorretas
    <input type="text" placeholder="Resposta Incorreta 1" class="resposta-incorreta">
    <input type="text" placeholder="URL da imagem 1" class="URL-incorreta">
    <input type="text" placeholder="Resposta Incorreta 2" class="resposta-incorreta">
    <input type="text" placeholder="URL da imagem 2" class="URL-incorreta">
    <input type="text" placeholder="Resposta Incorreta 3" class="resposta-incorreta">
    <input type="text" placeholder="URL da imagem 3" class="URL-incorreta">
    </div>`
}
function validarPerguntas () {
    let textoDaPergunta = document.querySelectorAll(".configuracao-pergunta .texto-da-pergunta")
    let background = document.querySelectorAll(".configuracao-pergunta .background")
    let respostaCorreta = document.querySelectorAll(".configuracao-pergunta .resposta-correta")
    let urlCorreta = document.querySelectorAll(".configuracao-pergunta .URL-correta")
    let respostaIncorreta = document.querySelectorAll(".configuracao-pergunta .resposta-incorreta")
    let urlncorretas = document.querySelectorAll(".configuracao-pergunta .URL-incorreta")
    
    
    //validacoes
    let validacoes = 0
    let validacaoPerguntas = 0
    let validacoesBackground = 0
    let validacoesRespostasCorretas = 0
    let validacoesURLCorreta = 0
    let validacoesErros = 0
    let validacoesURLIncorreta = 0

    
    let quantidadePerguntas = input[2].value

    //validando pergunta
    for (let i = 0; i < textoDaPergunta.length; i++) {
        let pergunta = textoDaPergunta[i].value
        if (pergunta.length >= 20){
            validacaoPerguntas += 1
        }
    }

    if (validacaoPerguntas == textoDaPergunta.length && textoDaPergunta.length == quantidadePerguntas) {
        validacoes += 1
    }
    
    //validando background
    const caracteresValidas = ["a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "1", "2", "3",
    "4", "5", "6", "7", "8", "9", "0"]

    for (let i = 0; i < background.length; i++) {
        let cor = background[i].value
        if (cor[0] == "#") {
            validacoesBackground += 1
        }
        for (let i = 1; i <= cor.length; i++){
            for (let j = 0; j < caracteresValidas.length ; j++){
                if (cor[i] == caracteresValidas[j]) {
                    validacoesBackground += 1
                }
            }
        }

    }
    if(validacoesBackground == 7 * quantidadePerguntas) {
        validacoes += 1
    }

    //validando resposta correta
    for (let i = 0; i < respostaCorreta.length; i++){
        let resposta = respostaCorreta[i].value
        if (resposta.length >= 20){
            validacoesRespostasCorretas += 1
        }
    }
    if (validacoesRespostasCorretas == 1 * quantidadePerguntas){
        validacoes += 1
    }
    //validando url correta
    for (let i = 0; i < urlCorreta.length; i++){
        let imagemResposta = urlCorreta[i].value
        let link = ""
        if (imagemResposta.length >= 5){
            for (let j = 0; j < 5; j++){
                link += imagemResposta[j]
            }
            if (link == "https"){
                validacoesURLCorreta += 1
            }
        }
    }
    if (validacoesURLCorreta == 1 * quantidadePerguntas){
        validacoes += 1
    }


    //validando respostas incorretas
    for (let i = 0; i < respostaIncorreta.length; i++){
        let erro = respostaIncorreta[i].value
        if (erro.length >= 20) {
            validacoesErros += 1

        }
    }
    if (validacoesErros == 3 * quantidadePerguntas){
        validacoes += 1
    }
    
    //validando URL incorreta
    for (let i = 0; i < urlncorretas.length; i++) {
        let imagemRespostaIncorreta = urlncorretas[i].value
        let link = ""
        if (imagemRespostaIncorreta.length >= 5){
            for (let j = 0; j < 5; j++){
                link += imagemRespostaIncorreta[j]
            }
            console.log(link)
            if (link == "https"){
                validacoesURLIncorreta += 1
            }
        }
    }
    if (validacoesURLIncorreta == 3 * quantidadePerguntas){
        validacoes += 1
    }

    //não validou
    if (validacoes != 6){
        alert("Preencha os dados corretamente.")
    }

    //validou
    if (validacoes == 6) {
        irParaNiveis()
    }
    
    
    console.log(validacoesErros, validacoesURLIncorreta, validacoes)
}


function irParaNiveis () {
    let telaDeNiveis = document.querySelector(".tela-criarNiveis")
    telaDeNiveis.classList.remove("escondido")
    let telaDePerguntas = document.querySelector(".tela-criarPerguntas")
    telaDePerguntas.classList.add("escondido")
}











let InitialScreen;
let Single;
let QuizSelected;
let quizzUnico;
let containerPerguntas;
let contadorPergunta = 0;
let containerClicado;
let containerRespostas;
let containerSelecionado;
let respostaSelecionada;
let acertos = 0;
let erros = 0;












function BuscarQuizzes() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(RenderizaQuiz);
    promise.catch(QuizzErro);
}


function RenderizaQuiz(InitialScreen) {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    InitialScreen = InitialScreen.data;

    for (let i = 0; i < InitialScreen.length; i++) {
        container.innerHTML += `
     <div class="quizz" onclick="CallQuizz(this)"> 
        <img src="${InitialScreen[i].image}">
        <div class="quizz-title">${InitialScreen[i].title}</div> 
        <div class="quizz-id escondido">${InitialScreen[i].id}</div>
     </div>`
    }
}


function QuizzErro(erro) {
    alert("Houve algum erro inexperado, por favor tente novamente, ou verifique o erro:" + erro.response.status + "A tela será recarregada em breve aguarde!");
    setTimeout(window.location.reload(), 4000);
}

function CallQuizz(selected) {
    let id = Number(selected.querySelector(".quizz-id").innerHTML);
    QuizzScren(id);
}


function QuizzScren(id) {

    promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(SingleQuizz);
    promise.catch(QuizzErro);

    let telaPrincipal = document.querySelector(".tela-principal");
    telaPrincipal.classList.add("escondido");
}



function SingleQuizz(Single) {
    Single = Single.data;

    QuizSelected = Single;

    adicionaBanner(QuizSelected);

    adicionaPerguntas(QuizSelected);
}

function adicionaBanner(QuizSelected) {
    document.querySelector(".tela-pagina-quizz").innerHTML += `
    <div class="banner-quizz">
    <img src="${QuizSelected.image}">
    <span class="pagina-quizz-titulo">${QuizSelected.title}</span>
    </div>`;
}



function adicionaPerguntas(QuizSelected) {
    let qtdRespostas = 0;
    let arr = [];

    for (let i = 0; i < QuizSelected.questions.length; i++) {
        document.querySelector(".tela-pagina-quizz").innerHTML += `
    <div class="pg-qz-container-pergunta">
    </div>`;
    }

    containerPerguntas = document.querySelectorAll(".pg-qz-container-pergunta");


    for (let i = 0; i < QuizSelected.questions.length; i++) {
        containerPerguntas[i].innerHTML = `
        <div class="pg-qz-pergunta" style="background-color: ${QuizSelected.questions[i].color}">${QuizSelected.questions[i].title}
        </div>
        <div class="pg-qz-respostas">
        </div>
        `

        qtdRespostas = QuizSelected.questions[i].answers.length;


        let arr = [];
        
        for (let i = 0; i < qtdRespostas; i++) {
            arr.push(i);
        }
              
        arr.sort( function randomize() {
            return Math.random() - 0.5;
        });

       
        containerRespostas = document.querySelectorAll(".pg-qz-respostas");


        for (let j = 0; j < QuizSelected.questions[i].answers.length; j++) {

            containerRespostas[i].innerHTML += `<div class="pg-qz-resposta" onclick="clicarResposta(this)">
            <img src="${QuizSelected.questions[i].answers[arr[j]].image}" alt="">
            <div class="pg-qz-resposta-titulo">${QuizSelected.questions[i].answers[arr[j]].text}</div>
            <div class="resposta-certa escondido">${QuizSelected.questions[i].answers[arr[j]].isCorrectAnswer}</div>
        </div>`
        }

        arr = [];
    }



    containerSelecionado = containerPerguntas[contadorPergunta];
    document.body.scrollTop = document.documentElement.scrollTop = 0;


}



function clicarResposta(respostaClicada) {

    containerClicado = respostaClicada.parentElement.parentElement;
    let respostas = containerClicado.querySelectorAll(".pg-qz-resposta");
    let respostaCorreta;



    if (containerClicado === containerSelecionado) {

        if (containerClicado.querySelector(".resposta-clicada") === null) {

            for (let i = 0; i < respostas.length; i++) {
                respostas[i].classList.add("resposta-nao-clicada");
                respostas[i].classList.add("pg-qz-resposta-errada");

                if (respostas[i].querySelector(".resposta-certa").innerHTML == "true") {
                    respostaCorreta = respostas[i];
                }
            }
            respostaClicada.classList.toggle("resposta-nao-clicada");
            respostaClicada.classList.toggle("resposta-clicada");
            respostaCorreta.classList.toggle("pg-qz-resposta-errada");
            respostaCorreta.classList.toggle("pg-qz-resposta-certa");

            setTimeout(proximaPergunta, 2000);
            setTimeout(containerFoco, 2000);

            respostaSelecionada = containerClicado.querySelector(".resposta-clicada");
            let respostaSelecionadaValue = containerClicado.querySelector(".resposta-clicada").querySelector(".resposta-certa").innerHTML;

            if (respostaSelecionadaValue == 'true') {
                acertos += 1;
            } else {
                erros += 1;
            }
        }

    } else {
        containerFoco();
    }



}

function errosAcertos() {
    console.log("Acertos: " + acertos);
    console.log("Erros: " + erros);
}

function proximaPergunta() {
    let quantidadePerguntas = containerPerguntas.length - 1;

    if (contadorPergunta === quantidadePerguntas) {
        quizzFinalizado();
    } else {

        contadorPergunta += 1;
        containerSelecionado = containerPerguntas[contadorPergunta];

    }
}


function containerFoco() {

    containerSelecionado.scrollIntoView();

}


function quizzFinalizado() {
    let totalPerguntas = QuizSelected.questions.length;
    let resultado;
    let level = 0;

    resultado = Math.round(acertos / totalPerguntas * 100);
    console.log("Resultado: " + resultado);

    for (i = 0; i < QuizSelected.levels.length; i++) {
        if (resultado > QuizSelected.levels[i].minValue) {
            level = i;
        }
    }



    console.log("Level: " + level);

    let image = QuizSelected.levels[level].image;
    let text = QuizSelected.levels[level].text;
    let title = QuizSelected.levels[level].title;


    document.querySelector(".tela-pagina-quizz").innerHTML += `
     <div class="finalizacao-quizz">
     <div class="finalizacao-quizz-container">
     <div class="finalizacao-quizz-titulo">
         ${resultado}% de acerto: ${title}
     </div>
     <div class="finalizacao-quizz-conteudo">
         <img src="${image}" alt="">
         <div class="finalizacao-quiz-texto">
             ${text}
         </div>
     </div>
     </div>
     <div class="finalizacao-quizz-botao-reiniciar" onClick="reiniciarQuizz()">
         Reiniciar Quizz
     </div>
     <div class="finalizacao-quizz-botao-voltar-home" onClick="voltarHome()">
         Voltar Home
     </div>
    </div>
     `

    let finalizacaoQuizz = document.querySelector(".finalizacao-quizz-container");
    finalizacaoQuizz.scrollIntoView();
}

function zerarQuizz() {
    containerPerguntas = [];
    containerSelecionado = null;
    containerClicado = null;
    respostaSelecionada = null;
    contadorPergunta = 0;
    acertos = 0;
    erros = 0;
}

function carregarQuizz(quizzUnico) {
    QuizSelected = quizzUnico;

    document.querySelector(".tela-pagina-quizz").innerHTML = "";

    adicionaBanner(QuizSelected);
    adicionaPerguntas(QuizSelected);

}


function reiniciarQuizz() {
    zerarQuizz();
    carregarQuizz(QuizSelected);
}

function voltarHome() {
    window.location.reload();
}



BuscarQuizzes();


