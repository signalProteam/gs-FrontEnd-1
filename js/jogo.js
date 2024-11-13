const perguntas = [
    {
        pergunta: "O que é energia solar?",
        respostas: {
            correto: "Energia proveniente do sol",
            opcoes: ["Energia proveniente do sol", "Energia gerada por carvão", "Energia de reatores nucleares", "Energia geotérmica"]
        },
        feedbackCorreto: "Correto! A energia solar é gerada a partir da radiação solar e é uma fonte renovável.",
        feedbackErrado: "Errado! A energia solar é gerada a partir da radiação solar e é uma fonte renovável."
    },
    {
        pergunta: "Qual das opções abaixo é uma fonte de energia limpa?",
        respostas: {
            correto: "Solar",
            opcoes: ["Nuclear", "Solar", "Fóssil", "Hidrelétrica"]
        },
        feedbackCorreto: "Correto! A energia solar é uma fonte limpa.",
        feedbackErrado: "Errado! Energia nuclear e fóssil não são fontes limpas."
    },
    {
        pergunta: "Escolha a melhor fonte de energia para reduzir o impacto ambiental.",
        respostas: {
            correto: "Eólica",
            opcoes: ["Eólica", "Hidrelétrica", "Fóssil", "Carvão"]
        },
        feedbackCorreto: "Correto! A energia eólica tem um baixo impacto ambiental.",
        feedbackErrado: "Errado! A energia fóssil tem alto impacto ambiental."
    },
    {
        pergunta: "Qual é a principal vantagem da energia solar?",
        respostas: {
            correto: "Fonte renovável e limpa",
            opcoes: ["Fonte renovável e limpa", "Baixo custo inicial", "Alta eficiência", "Fácil armazenamento"]
        },
        feedbackCorreto: "Correto! A energia solar é renovável e limpa, o que a torna uma das melhores opções para o futuro.",
        feedbackErrado: "Errado! A principal vantagem da energia solar é ser uma fonte renovável e limpa."
    },
    {
        pergunta: "Qual dessas fontes de energia é não renovável?",
        respostas: {
            correto: "Fóssil",
            opcoes: ["Solar", "Eólica", "Fóssil", "Hidrelétrica"]
        },
        feedbackCorreto: "Correto! Fontes fósseis, como petróleo e carvão, são não renováveis.",
        feedbackErrado: "Errado! As fontes fósseis são não renováveis, enquanto as outras opções são renováveis."
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
            feedbackDiv.textContent = "Errado! Tente novamente. Lembre-se de que a energia solar é uma fonte renovável.";
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