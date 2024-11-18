const perguntas = [
    {
        pergunta: "O que causa os efeitos negativos relacionados à qualidade de vida do ser humano?",
        respostas: {
            correto: "A emissão de gases de efeito estufa",
            opcoes: ["O aumento da quantidade de resíduos sólidos", "O uso de energias renováveis", "A emissão de gases de efeito estufa", "O uso excessivo de produtos recicláveis"]
        },
        feedbackCorreto: "Correto! A emissão de gases de efeito estufa é um dos principais fatores que afeta a qualidade de vida do ser humano, resultando em impactos negativos como o aquecimento global.",
        feedbackErrado: "Errado! A emissão de gases de efeito estufa é a principal causa dos problemas ambientais relacionados à qualidade de vida. Eles contribuem para o aquecimento global e outros impactos."
    },
    {
        pergunta: "Qual é a principal característica do biogás?",
        respostas: {
            correto: "O biogás é uma fonte de energia renovável produzida pela decomposição de matéria orgânica",
            opcoes: ["O biogás é uma fonte de energia não renovável", "O biogás é gerado pela queima de combustíveis fósseis", "O biogás é uma fonte de energia renovável produzida pela decomposição de matéria orgânica", "O biogás é composto principalmente por oxigênio e nitrogênio"]
        },
        feedbackCorreto: "Correto! O biogás é uma energia renovável gerada a partir da decomposição de materiais orgânicos, como resíduos agrícolas e lixo doméstico.",
        feedbackErrado: "Errado! O biogás é uma fonte de energia renovável, e sua produção ocorre pela decomposição de matéria orgânica em um ambiente sem oxigênio."
    },
    {
        pergunta: "Onde o biogás pode ser produzido?",
        respostas: {
            correto: "Em aterros sanitários, estações de tratamento de esgoto e digestores de resíduos agrícolas",
            opcoes: ["Somente em usinas de energia solar", "Em aterros sanitários, estações de tratamento de esgoto e digestores de resíduos agrícolas", "Apenas em usinas nucleares", "Em áreas com grandes reservas de petróleo"]
        },
        feedbackCorreto: "Correto! O biogás pode ser produzido em locais onde ocorre a decomposição anaeróbica de matéria orgânica, como aterros sanitários e estações de tratamento de esgoto.",
        feedbackErrado: "Errado! O biogás é produzido em ambientes onde a matéria orgânica se decompõe sem a presença de oxigênio, como em aterros sanitários e estações de tratamento de esgoto."
    },
    {
        pergunta: "Qual é um dos benefícios ambientais do uso do biogás?",
        respostas: {
            correto: "Redução da dependência de fontes não renováveis e redução de emissões de gases de efeito estufa",
            opcoes: ["Aumento da emissão de gases de efeito estufa", "Aumento da quantidade de resíduos sólidos em aterros sanitários", "Redução da dependência de fontes não renováveis e redução de emissões de gases de efeito estufa", "Aumento da poluição dos rios e oceanos"]
        },
        feedbackCorreto: "Correto! O uso do biogás ajuda a reduzir a dependência de fontes de energia não renováveis, ao mesmo tempo em que diminui a emissão de gases de efeito estufa.",
        feedbackErrado: "Errado! O biogás é uma alternativa limpa e renovável que ajuda a reduzir a poluição e a dependência de combustíveis fósseis, ao mesmo tempo que minimiza os impactos ambientais."
    },
    {
        pergunta: "O biogás é produzido principalmente por meio da decomposição de qual tipo de material?",
        respostas: {
            correto: "Matéria orgânica, como restos de alimentos e esterco",
            opcoes: ["Metais pesados", "Matéria orgânica, como restos de alimentos e esterco", "Plásticos recicláveis", "Combustíveis fósseis"]
        },
        feedbackCorreto: "Correto! O biogás é produzido pela decomposição de matéria orgânica, como restos de alimentos, esterco animal e resíduos agrícolas, em ambientes sem oxigênio.",
        feedbackErrado: "Errado! O biogás é gerado a partir da decomposição de matéria orgânica, como restos de alimentos e esterco. Materiais como plásticos e metais não contribuem para a formação de biogás."
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