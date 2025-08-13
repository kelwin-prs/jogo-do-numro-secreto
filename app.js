let listaDeNumerosSorteados = [];
let numeroMaximo = 20;
let numeroAleatorio = gerarNmrAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

let mensagemInicialMX = `Escolha um número entre 1 e ${numeroMaximo}`

function exibirMesnsagemInicial() {
exibirTexto('h1', 'Jogo do Número Secreto');
exibirTexto('p', mensagemInicialMX);
}

exibirMesnsagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroAleatorio);

    if(chute == numeroAleatorio) {
        exibirTexto('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabés, você descobriu o número secreto "${numeroAleatorio}", com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if(chute < numeroAleatorio) {
        exibirTexto('p',`O número secreto é maior que ${chute}`); 
        } else {
            exibirTexto('p',`O número secreto é menor que ${chute}`);
        }
    }
    tentativas++;
    limparCampo()
}

function gerarNmrAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let qntElementosNaLista = listaDeNumerosSorteados.length;

    if(qntElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNmrAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNmrAleatorio();
    limparCampo();
    exibirMesnsagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}