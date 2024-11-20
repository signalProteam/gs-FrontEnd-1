const perguntas = [
    {
        pergunta: "O que é o biogás?",
        respostas: {
            correto: "Uma fonte de energia renovável produzida pela decomposição de matéria orgânica",
            opcoes: [
                "Uma energia não renovável derivada de combustíveis fósseis",
                "Um gás tóxico gerado pelo excesso de poluição",
                "Uma fonte de energia renovável produzida pela decomposição de matéria orgânica",
                "Um combustível extraído de plantas específicas"
            ]
        },
        feedbackCorreto: "Correto! O biogás é uma fonte de energia renovável gerada pela decomposição de matéria orgânica, como resíduos agrícolas e lixo doméstico.",
        feedbackErrado: "Errado! O biogás é uma fonte de energia renovável produzida pela decomposição de matéria orgânica em ambientes fechados."
    },
    {
        pergunta: "Como o biogás é produzido?",
        respostas: {
            correto: "Pela decomposição de matéria orgânica em ambientes fechados sem oxigênio",
            opcoes: [
                "Pela decomposição de matéria orgânica em ambientes fechados sem oxigênio",
                "Pela queima de materiais recicláveis",
                "Através do processamento químico de combustíveis fósseis",
                "Por meio da energia solar concentrada"
            ]
        },
        feedbackCorreto: "Correto! O biogás é produzido em digestores, onde a matéria orgânica é decomposta na ausência de oxigênio.",
        feedbackErrado: "Errado! O biogás é gerado pela decomposição de matéria orgânica em ambientes fechados sem oxigênio, utilizando microorganismos."
    },
    {
        pergunta: "Qual é uma maneira prática de ajudar na produção de biogás?",
        respostas: {
            correto: "Separar resíduos orgânicos e descartá-los em pontos de coleta",
            opcoes: [
                "Queimar resíduos orgânicos no quintal de casa",
                "Separar resíduos orgânicos e descartá-los em pontos de coleta",
                "Misturar resíduos orgânicos com recicláveis",
                "Deixar resíduos orgânicos em aterros comuns"
            ]
        },
        feedbackCorreto: "Correto! Separar resíduos orgânicos e descartá-los em locais apropriados, como pontos de coleta, é uma ótima maneira de contribuir para a produção de biogás.",
        feedbackErrado: "Errado! A melhor forma de ajudar é separando os resíduos orgânicos e descartando-os nos locais adequados, como a Central de Reciclagem do Parque Ibirapuera."
    },
    {
        pergunta: "Onde fica a Central de Reciclagem que transforma resíduos orgânicos em biogás?",
        respostas: {
            correto: "No Parque Ibirapuera",
            opcoes: [
                "Na região central da cidade",
                "Próximo a grandes áreas industriais",
                "Em usinas nucleares",
                "No Parque Ibirapuera"
            ]
        },
        feedbackCorreto: "Correto! A Central de Reciclagem do Parque Ibirapuera transforma resíduos orgânicos em biogás ou compostagem.",
        feedbackErrado: "Errado! A Central de Reciclagem que realiza esse trabalho está localizada no Parque Ibirapuera."
    },
    {
        pergunta: "Quais materiais podem ser utilizados para a produção de biogás?",
        respostas: {
            correto: "Restos de alimentos, esterco animal e resíduos industriais",
            opcoes: [
                "Restos de alimentos, esterco animal e resíduos industriais",
                "Metais e plásticos recicláveis",
                "Somente combustíveis fósseis",
                "Papel e vidro recicláveis"
            ]
        },
        feedbackCorreto: "Correto! O biogás é produzido a partir de matéria orgânica, como restos de alimentos e resíduos agrícolas.",
        feedbackErrado: "Errado! Apenas materiais orgânicos, como restos de alimentos e esterco, são utilizados na produção de biogás."
    }
];


let respostas = {};

// Função para selecionar a resposta
function selecionarResposta(index, respostaEscolhida) {
    respostas[index] = respostaEscolhida;

    const botoes = document.querySelectorAll(`#pergunta-${index} .opcao-resposta`);

    botoes.forEach(botao => {
        botao.classList.remove("errada");
    });

    botoes.forEach(botao => {
        if (botao.textContent === respostaEscolhida) {
            botao.classList.add("selecionada");
        } else {
            botao.classList.remove("selecionada");
        }
    });

    verificarSeTodasRespondidas();
}

// Função para verificar se todas as respostas foram selecionadas
function verificarSeTodasRespondidas() {
    const todasRespondidas = perguntas.every((pergunta, index) => {
        return respostas[index + 1];
    });

    const enviarRespostasBotao = document.getElementById("enviar-respostas");
    if (todasRespondidas) {
        enviarRespostasBotao.disabled = false;
    } else {
        enviarRespostasBotao.disabled = true;
    }
}

// Função para exibir as perguntas
function carregarPerguntas() {
    const container = document.querySelector(".perguntas")

    container.innerHTML = "";

    perguntas.forEach((perguntaObj, index) => {
        const perguntaDiv = document.createElement("div");
        perguntaDiv.classList.add("pergunta");
        perguntaDiv.setAttribute("id", `pergunta-${index + 1}`);

        const perguntaTexto = document.createElement("p");
        perguntaTexto.textContent = perguntaObj.pergunta;
        perguntaDiv.appendChild(perguntaTexto);

        perguntaObj.respostas.opcoes.forEach(opcao => {
            const botao = document.createElement("button");
            botao.classList.add("opcao-resposta");
            botao.textContent = opcao;
            botao.addEventListener("click", function () {
                selecionarResposta(index + 1, opcao);
            });
            perguntaDiv.appendChild(botao);
        });

        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback");
        feedbackDiv.setAttribute("id", `feedback-${index + 1}`);
        feedbackDiv.style.display = "none";
        perguntaDiv.appendChild(feedbackDiv);

        container.appendChild(perguntaDiv);
    });
}


// Função para verificar as respostas e exibir feedback
function enviarRespostas() {
    let acertos = 0;

    perguntas.forEach((perguntaObj, index) => {
        const feedbackDiv = document.getElementById(`feedback-${index + 1}`);
        const respostaEscolhida = respostas[index + 1];

        const botoes = document.querySelectorAll(`#pergunta-${index + 1} .opcao-resposta`);

        botoes.forEach(botao => {
            botao.disabled = true;

            if (botao.textContent === respostaEscolhida && respostaEscolhida !== perguntaObj.respostas.correto) {
                botao.classList.add("errada");
            }

            if (botao.textContent === perguntaObj.respostas.correto) {
                if (respostaEscolhida === perguntaObj.respostas.correto) {
                    botao.classList.add("correta");
                }
            }
        });

        if (respostaEscolhida === perguntaObj.respostas.correto) {
            feedbackDiv.textContent = perguntaObj.feedbackCorreto;
            feedbackDiv.style.color = "green";
            acertos++;
        } else {
            feedbackDiv.textContent = perguntaObj.feedbackErrado;
            feedbackDiv.style.color = "red";
        }

        feedbackDiv.style.display = "block";
    });

    exibirResultadoFinal(acertos);
    document.getElementById("enviar-respostas").disabled = true;

    document.getElementById("tentar-novamente").style.display = "block";
}


// Função para exibir o resultado final
function exibirResultadoFinal(acertos) {
    const totalPerguntas = perguntas.length;
    const resultadoFinalDiv = document.getElementById("resultado-final");
    const acertosSpan = document.getElementById("acertos");
    const totalPerguntasSpan = document.getElementById("total-perguntas");
    const mensagemResult = document.getElementById("mensagem-resultados");

    acertosSpan.textContent = acertos;
    totalPerguntasSpan.textContent = totalPerguntas;

    if (acertos === totalPerguntas) {
        mensagemResult.textContent = "Parabéns! Você acertou todas as perguntas!";
    } else if (acertos >= totalPerguntas / 2) {
        mensagemResult.textContent = "Bom trabalho! Você acertou mais da metade!";
    } else {
        mensagemResult.textContent = "Tente novamente! Você pode melhorar!";
    }

    resultadoFinalDiv.style.display = "block";
}

// Função para tentar novamente
function tentarNovamente() {
    respostas = {};

    document.getElementById("resultado-final").style.display = "none";
    document.getElementById("tentar-novamente").style.display = "none";

    perguntas.forEach((perguntaObj, index) => {
        const feedbackDiv = document.getElementById(`feedback-${index + 1}`);
        feedbackDiv.style.display = "none";
    });

    perguntas.forEach((perguntaObj, index) => {
        const botoes = document.querySelectorAll(`#pergunta-${index + 1} .opcao-resposta`);
        botoes.forEach(botao => {
            botao.classList.remove("selecionada", "errada");
            botao.disabled = false;
        });
    });

    const container = document.querySelector(".perguntas")
    container.innerHTML = "";

    carregarPerguntas();

    document.getElementById("enviar-respostas").disabled = false;

    document.getElementById("enviar-respostas").disabled = true;
}


document.getElementById("tentar-novamente").addEventListener("click", tentarNovamente);

document.getElementById("enviar-respostas").addEventListener("click", enviarRespostas);

window.onload = carregarPerguntas;