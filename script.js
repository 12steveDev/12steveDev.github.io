document.getElementById("misterioso").addEventListener("click", function() {
    alert("¡Has descubierto el botón misterioso! Pero... ¿qué sigue? 😏");
});

// Simulación básica de Notroid CLI
document.getElementById("cmd").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        alert("Comando ejecutado: " + this.value);
        this.value = "";
    }
});

// Renderizar archivos .img de Notroid (solo muestra el contenido por ahora)
document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("imgRender").innerText = "Contenido: \n" + e.target.result;
    };
    reader.readAsText(file);
});