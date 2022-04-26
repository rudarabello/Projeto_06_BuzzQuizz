function mudarTelaCriacao() {
    let telaInicial = document.querySelector(".tela-principal")
    telaInicial.classList.add("escondido")
    let telaCriacao = document.querySelector(".tela-criarQuizz")
    telaCriacao.classList.remove("escondido")
}

let input = document.querySelectorAll(".tela-criarQuizz input")
let titulo
let url
let perguntas
let niveis

function validarQuizz () {
    // inputs values
    titulo = input[0].value
    url = input[1].value
    perguntas = input[2].value
    niveis = input[3].value
    console.log(input)
    
    // validações
    let validacoes = 0
    
    // validando titulo
    if (!(titulo.length < 20 || titulo.length > 65)) {
        validacoes += 1
        objeto.title = titulo
    }
    
    // validando url
    let link = ""
    let https = "https"
    for (let i = 0; i < https.length; i++){
        link += url[i]
    }
    if (link == https) {
        validacoes += 1
        objeto.image = url
    }
    // validando QTD perguntas
    if (perguntas >= 1) {
        validacoes += 1
        objeto.questions.length = perguntas
        for (let i = 0; i < perguntas; i++){
            objeto.questions[i] = {title:"", color:"", answers:[]}
        }
    }
    
    // validando nivel
    if (niveis >= 1) {
        validacoes += 1
        objeto.levels.length = niveis
        for (let i = 0; i < niveis; i++){
            objeto.levels[i] = {title:"", image:"", text:"", minValue: 0}
        }
    }
    
    // não validado
    if (validacoes != 4){
        //alert("Preencha corretamente os espaços")
        irParaPerguntas()
    }
    // validou
    if (validacoes == 4) {
        irParaPerguntas()
    }
    
}

function irParaPerguntas () {
    let telaDePerguntas = document.querySelector(".tela-criarPerguntas")
    telaDePerguntas.classList.remove("escondido")
    let telaCriacao = document.querySelector(".tela-criarQuizz")
    telaCriacao.classList.add("escondido")
    colocarPerguntas()
}

function colocarPerguntas () {
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
    <input type="text" placeholder="url da imagem" class="url-correta">
    Respostas Incorretas
    <input type="text" placeholder="Resposta Incorreta 1" class="resposta-incorreta">
    <input type="text" placeholder="url da imagem 1" class="url-incorreta">
    <input type="text" placeholder="Resposta Incorreta 2" class="resposta-incorreta">
    <input type="text" placeholder="url da imagem 2" class="url-incorreta">
    <input type="text" placeholder="Resposta Incorreta 3" class="resposta-incorreta">
    <input type="text" placeholder="url da imagem 3" class="url-incorreta">
    </div>`
}
function validarPerguntas () {
    let textoDaPergunta = document.querySelectorAll(".configuracao-pergunta .texto-da-pergunta")
    let background = document.querySelectorAll(".configuracao-pergunta .background")
    let respostaCorreta = document.querySelectorAll(".configuracao-pergunta .resposta-correta")
    let urlCorreta = document.querySelectorAll(".configuracao-pergunta .url-correta")
    let respostaIncorreta = document.querySelectorAll(".configuracao-pergunta .resposta-incorreta")
    let urlncorretas = document.querySelectorAll(".configuracao-pergunta .url-incorreta")
    
    
    //validacoes
    let validacoes = 0
    let validacaoPerguntas = 0
    let validacoesBackground = 0
    let validacoesRespostasCorretas = 0
    let validacoesurlCorreta = 0
    let validacoesErros = 0
    let validacoesurlIncorreta = 0

    
    let quantidadePerguntas = input[2].value

    for (let i = 0; i < quantidadePerguntas; i++){
        for (let j =0; j < 4; j++){
            objeto.questions[i].answers[j] = {text:"", image:"", isCorrectAnswer:undefined}
        }
    }
    //validando pergunta
    for (let i = 0; i < textoDaPergunta.length; i++) {
        let pergunta = textoDaPergunta[i].value
        if (pergunta.length >= 20){
            validacaoPerguntas += 1

        }
    }

    if (validacaoPerguntas == textoDaPergunta.length && textoDaPergunta.length == quantidadePerguntas) {
        validacoes += 1
        for (let i = 0; i < quantidadePerguntas; i++){
            objeto.questions[i].title = textoDaPergunta[i].value
        }
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
        for (let i = 0; i < quantidadePerguntas; i ++){
            objeto.questions[i].color = background[i].value
        }
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
        for (let i = 0; i < quantidadePerguntas; i ++){
            objeto.questions[i].answers[0].text = respostaCorreta[i].value
            objeto.questions[i].answers[0].isCorrectAnswer = true
        }
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
                validacoesurlCorreta += 1
            }
        }
    }
    if (validacoesurlCorreta == 1 * quantidadePerguntas){
        validacoes += 1
        for (let i = 0; i < quantidadePerguntas; i ++){
            objeto.questions[i].answers[0].image = urlCorreta[i].value
        }
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
        for (let i = 0; i < quantidadePerguntas; i ++){
            for (let j = 1; j < 4; j++){
                objeto.questions[i].answers[j].text = respostaIncorreta[(j-1) + (i * 3)].value
                objeto.questions[i].answers[j].isCorrectAnswer = false
            }
        }
    }
    
    //validando url incorreta
    for (let i = 0; i < urlncorretas.length; i++) {
        let imagemRespostaIncorreta = urlncorretas[i].value
        let link = ""
        if (imagemRespostaIncorreta.length >= 5){
            for (let j = 0; j < 5; j++){
                link += imagemRespostaIncorreta[j]
            }
            console.log(link)
            if (link == "https"){
                validacoesurlIncorreta += 1
            }
        }
    }
    if (validacoesurlIncorreta == 3 * quantidadePerguntas){
        validacoes += 1
        for (let i = 0; i < quantidadePerguntas; i ++){
            for (let j = 1; j < 4; j++){
                objeto.questions[i].answers[j].image = urlncorretas[(j-1)+(i*3)].value
            }
        }
    }

    //não validou
    if (validacoes != 6){
        // alert("Preencha os dados corretamente.")
        irParaNiveis()
    }

    //validou
    if (validacoes == 6) {
        irParaNiveis()
    }
}


function irParaNiveis () {
    let telaDeNiveis = document.querySelector(".tela-criarNiveis")
    telaDeNiveis.classList.remove("escondido")
    let telaDePerguntas = document.querySelector(".tela-criarPerguntas")
    telaDePerguntas.classList.add("escondido")
    colocarNiveis()
}

function colocarNiveis () {
    let niveis = input[3].value
    let criarNiveis = document.querySelector(".tela-criarNiveis")
    for (let i = 0; i < niveis; i++){
        criarNiveis.innerHTML += `
        <div class="caixa-nivel">
        <div class="menu-nivel">
        Nível ${[i + 1]}
        <ion-icon name="create-outline" onclick="abrirNivel(this)"></ion-icon>
        </div>
        </div>
        `
    }
    criarNiveis.innerHTML += `
    <div class="botao-finalizar" onclick="validarNiveis()">FInalizar quizz</div>
    `
}
function abrirNivel (botao) {
    botao.classList.add("escondido")
    let pai = botao.parentNode
    let vovo = pai.parentNode
    vovo.innerHTML += `
    <div class="configuracao-nivel">
    <input type="text" placeholder="Título do nível" class="titulo-do-nivel">
    <input type="text" placeholder="% de acerto mínima" class="percentual-acerto">
    <input type="text" placeholder="url da imagem do nível" class="url-nivel">
    <input type="text" placeholder="Descrição do nível" class="descricao-nivel">
    </div>`
}

function validarNiveis () {
    let tituloNivel = document.querySelectorAll(".titulo-do-nivel")
    let percentualAcerto = document.querySelectorAll(".percentual-acerto")
    let urlNivel = document.querySelectorAll(".url-nivel")
    let descricaoNivel = document.querySelectorAll(".descricao-nivel")



    let validacoes = 0
    let validacaoTitulo = 0
    let validacaoPercentual = 0
    let validacaourl = 0
    let validacaoDescricao = 0
    
    let quandtidadeDeNiveis = input[3].value
    
    //validando titulo
    for (let i = 0; i < tituloNivel.length; i++) {
        let nivel = tituloNivel[i].value
        if (nivel.length >= 10) {
            validacaoTitulo += 1
        }
    }
    
    if (validacaoTitulo == tituloNivel.length && tituloNivel.length == quandtidadeDeNiveis) {
        validacoes += 1
        for (let i = 0; i < quandtidadeDeNiveis; i++){
            objeto.levels[i].title = tituloNivel[i].value
        }
    }


    //validando percentual de acerto
    for (let i = 0; i < percentualAcerto.length; i++){
        let percentual = percentualAcerto[i].value
        if (percentual >= 0 && percentual <= 100 && percentual != ""){
            validacaoPercentual += 1
        }
    }

    if (validacaoPercentual == percentualAcerto.length && percentualAcerto.length == quandtidadeDeNiveis){
        validacoes += 1
        for (let i = 0; i < quandtidadeDeNiveis; i++){
            objeto.levels[i].minValue = parseInt(percentualAcerto[i].value)
        }
    }


    //validando url
    for (let i = 0; i < urlNivel.length; i++){
        let url = urlNivel[i].value
        link = ""
        if (url.length >= 5){
            for (let j = 0; j < 5; j++){
                link += url[j]
            }
            if (link == "https"){
                validacaourl += 1
            }
        }
    }

    if (validacaourl == urlNivel.length && urlNivel.length == quandtidadeDeNiveis){
        validacoes += 1
        for (let i = 0; i < quandtidadeDeNiveis ; i++){
            objeto.levels[i].image = urlNivel[i].value
        }
    }


    //validando descricao 
    for (let i = 0; i < descricaoNivel.length; i++){    
        let descricao = descricaoNivel[i].value
        if (descricao.length >= 30){
            validacaoDescricao += 1
        }
    }

    if (validacaoDescricao == descricaoNivel.length && descricaoNivel.length == quandtidadeDeNiveis){
        validacoes += 1
        for (let i = 0; i < quandtidadeDeNiveis ; i++){
            objeto.levels[i].text = descricaoNivel[i].value
        }
    }

    //não validou
    if (validacoes !== 4){
        // alert("Preencha os campos corretamente")
        irParaQuizzCriado()
    }

    //validou
    if (validacoes == 4){
        let enviarQuizz = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", objeto)
        enviarQuizz.then(enviarQuizzAPI)
        enviarQuizz.catch(deuErro)
        irParaQuizzCriado()
    }
}
// let idQUizzAtual = undefined
function enviarQuizzAPI (resposta){
    let data = resposta.data
    console.log(data)
//     idQUizzAtual = data.id
}
function deuErro(erro){
    console.log(erro)
}

function irParaQuizzCriado () {
    console.log("entrei")
    let telaQuizzCriado = document.querySelector(".tela-quizzCriado")
    telaQuizzCriado.classList.remove("escondido")
    let telaDeNiveis = document.querySelector(".tela-criarNiveis")
    telaDeNiveis.classList.add("escondido")
    colocarQuizzCriado()
}

function colocarQuizzCriado () {
    let quizzCriado = document.querySelector(".tela-quizzCriado")
    let url = input[1].value
    let titulo = input[0].value
    quizzCriado.innerHTML += `
    <div class="capaQuizz">
        <img src="${url}"/>
        <div class="quizz-titulo">${titulo}</div>
    </div>
    `
    quizzCriado.innerHTML += `
    <div class="acessar-quizz" onclick="acessarQuizz()">Acessar Quizz</div>
    <div class="voltar-home" onclick="voltarHome()">Voltar pra Home</div>
    `
}
let objeto = {
    title: "",
    image: "",
    questions: [],
    levels: [],
     
}
function acessarQuizz () {
    console.log(objeto)
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


