// Interacción con íconos/apps/ejecutables
document.querySelectorAll(".icon").forEach(icon =>{
    icon.addEventListener("dblclick", ()=>{
        const appName = icon.getAttribute("data-app")
        document.getElementById(`${appName}-window`).style.display = "block"
    })
})
// Cerrar ventanas con "X"
document.querySelectorAll(".close-btn").forEach(btn =>{
    btn.addEventListener("click", (e)=>{
        btn.closest(".window").style.display = "none"
    })
})
// Arrastrar ventanas
document.querySelectorAll(".window").forEach(wdw =>{
    const titleBar = wdw.querySelector(".title-bar")
    let isDragging = false
    let offsetX, offsetY
    
    titleBar.addEventListener("mousedown", (e)=>{
        isDragging = true
        offsetX = e.clientX - wdw.getBoundingClientRect().left
        offsetY = e.clientY - wdw.getBoundingClientRect().top
        e.preventDefault()
    })
    document.addEventListener("mousemove", (e)=>{
        if (!isDragging) return;
        wdw.style.left = `${e.clientX - offsetX}px`
        wdw.style.top = `${e.clientY - offsetY}px`
    })
    document.addEventListener("mouseup", ()=>{
        isDragging = false
    })
    document.addEventListener("mouseleave", ()=>{
        isDragging = false
    })
})

// Funciones de apps
document.forms["calculadora-form"].addEventListener("submit", function(e){
    e.preventDefault() // No recarga la página

    const name1 = this.name1.value
    const num1 = Number(this.num1.value)
    const name2 = this.name2.value
    const num2 = Number(this.num2.value)

    if (isNaN(num1) || isNaN(num2)) {
        const errores = [
            `ERROR: ${name2} no sabe contar manzanas.`,
            "¡MANZANA OVERFLOW! Demasiadas frutas para MS-DOS.",
            "¿Eso es un número? Parece un código binario mal compilado."
        ];
        const errorAleatorio = errores[Math.floor(Math.random() * errores.length)];
        document.getElementById("calculadora-output").innerHTML = 
            `<span style="color: red;">💥 ${errorAleatorio}<br>Código: 0x${Math.random().toString(16).slice(2, 6).toUpperCase()}</span>`;
        return;
    }
    
    let res = num1 - num2
    if (res < 0) {
        document.getElementById("calculadora-output").innerHTML = `
            <span style="color: red;">
            ⚠️ ALERTA: ${name2} ahora debe ${Math.abs(res)} manzanas a ${name1}.<br>
            ¡LLAMANDO A LA POLICÍA DE MANZANAS!
            </span>
            <marquee behavior="alternate" scrollamount="30">🚨 ¡LADRÓN ENCUESTRO! 🚨</marquee>
        `;
    } else {
        document.getElementById("calculadora-output").innerText = 
            `Resultado: ${name1} ahora tiene ${res} manzanas. ${name2} es un/a ladrón/na.`;
    }
})

document.getElementById("terminal-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const terminalOutput = document.getElementById("terminal-output")
        const line = e.target.value;
        terminalOutput.value += `\n> ${line}`;
        const targs = line.match(/"[^"]*"|[^\s]+/g) || [];
        const cmd = targs.shift();
        const args = targs.map(arg => arg.replace(/^["']|["']$/g, ''));

        // Ejecutar comando
        if (cmd === "echo") {
            const text = args.join(" "); // Une los argumentos: "'Hola Mundo' --bold"
            terminalOutput.value += `\n${text}`; // Elimina comillas
        } else if (cmd === "help") {
            terminalOutput.value += "\nEn proceso...";
        } else if (cmd === "clear" || cmd == "cls") {
            terminalOutput.value = "";
        } else if (cmd === "test") {
            terminalOutput.value += `\ncmd: ${cmd} || args: ${args}`
        } else if (cmd === "sudo") {
            terminalOutput.value += "\n┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻\nERROR: Necesitas ser admin (pero no lo eres).";
        } else if (cmd === "neofetch") {
            terminalOutput.value += `\nOS: Windows 93 Virtual Edition
CPU: 8-bit Potato
RAM: 640KB (¿suficiente?)
GPU: Voodoo 1 (emulado)
        `;
        } else if (cmd === "love") {
            terminalOutput.value += "\n¿Qué es el amor? \n(●´ω｀●)";
        } else if (cmd === "bsod") {
            terminalOutput.value = "";
            document.body.innerHTML = `
            <div style="height: 100vh; background: #0078d7; color: white; padding: 20px; font-family: sans-serif;">
                <h1>:(</h1>
                <p>Windows 93 ha muerto. Pero no te preocupes, es 100% falso.</p>
                <button onclick="location.reload()" style="background: none; border: none; color: white; text-decoration: underline; cursor: pointer;">Reiniciar</button>
            </div>
            `;
        } else if (cmd === "shutdown") {
            terminalOutput.value += "\nIniciando autodestrucción en 3... 2... 1...";
            setTimeout(() => {
                document.body.innerHTML = `
                <div style="background: #000; color: red; height: 100vh; display: grid; place-items: center; font-family: monospace;">
                    <h1>SYSTEM FAILURE</h1>
                    <p>Windows 93 se ha autodestruido. (Nahh mentira, recarga la página).</p>
                </div>
                `;
            }, 3000);
        } else {
            terminalOutput.value += `\nComando desconocido: ${cmd}`;
        }

        e.target.value = ""; // Limpiar input
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
