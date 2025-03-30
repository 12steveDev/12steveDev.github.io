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