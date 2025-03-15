function mostrarMas(btn) {
    let extraText = btn.nextElementSibling;
    if (extraText.style.display === "none") {
        extraText.style.display = "block";
        btn.innerText = "Ver menos";
    } else {
        extraText.style.display = "none";
        btn.innerText = "Ver más";
    }
}
const texto = "Mi Web Básica";
let i = 0;
function escribirTitulo() {
    if (i < texto.length) {
        document.getElementById("titulo").innerHTML += texto.charAt(i);
        i++;
        setTimeout(escribirTitulo, 150);
    }
}
document.addEventListener("DOMContentLoaded", escribirTitulo);
