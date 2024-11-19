const form = document.getElementById("form-contato");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroMensagem = document.getElementById("erro-mensagem");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let formularioValido = true;

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroMensagem.textContent = "";
    mensagemSucesso.textContent = "";

    if (!validarNome()) {
        formularioValido = false;
        erroNome.textContent = "Por favor, insira um nome válido.";
    }

    if (!validarEmail()) {
        formularioValido = false;
        erroEmail.textContent = "Por favor, insira um e-mail válido.";
    }

    if (!validarMensagem()) {
        formularioValido = false;
        erroMensagem.textContent = "Por favor, escreva sua mensagem.";
    }

    if (formularioValido) {
        mensagemSucesso.textContent = "Mensagem enviada com sucesso!";
        mensagemSucesso.classList.add("mensagem-sucesso");
        form.reset();
    }
});

function validarNome() {
    const nomeValue = nome.value.trim();
    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;

    if (nomeValue === "" || nomeValue.length < 2 || !regexNome.test(nomeValue)) {
        return false;
    }
    return true;
}

function validarEmail() {
    const emailValue = email.value.trim();
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "" || !regexEmail.test(emailValue)) {
        return false;
    }
    return true;
}

function validarMensagem() {
    const msgValue = mensagem.value.trim();

    if (msgValue === "" || msgValue.length < 2) {
        return false;
    }
    return true;
}