function validar() {
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var posicaoArroba = email.indexOf("@");
    var posicaoPonto = email.lastIndexOf(".")

    if (nome == null || nome == "") {
        alert("O campo nome esta vazio!");
        return false;
    }

    if (posicaoArroba < 1 || posicaoPonto < posicaoArroba + 2 || posicaoPonto + 2 >= email.length) {
        alert("Coloque um email valido");
        return false
    }
}  