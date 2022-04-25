
function mudarTelaCriacao() {
    let telaInicial = document.querySelector(".tela-principal")
    telaInicial.classList.add("escondido")
    let telaCriacao = document.querySelector(".tela-criarQuizz")
    console.log(telaCriacao)
    telaCriacao.classList.remove("escondido")
}

function criarQuizz() {
    let input = document.querySelectorAll(".tela-criarQuizz input")
    let titulo = input[0].value
    let URL = input[1].value
    let perguntas = input[2].value
    let niveis = input[3].value
    if (titulo.length < 20 || titulo.length > 65) {
        alertarErro()
    }
    let https = "https"
    for (let i = 0; i < https.length; i++) {
        if (https[i] != URL[i]) {
            alertarErro()
        }
    }
    if (perguntas < 3) {
        alertarErro()
    }
    if (niveis < 2) {
        alertarErro()
    }
}
function alertarErro() {
    alert("Preencha os campos corretamente")
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


