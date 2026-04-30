// ============================
// 🔹 EFECTO NAVBAR (tu código)
// ============================

var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");
var navaction = document.getElementById("navAction");
var toToggle = document.querySelectorAll(".toggleColour");

document.addEventListener("scroll", function () {
    scrollpos = window.scrollY;

    if (scrollpos > 10) {
        if(header){
            header.classList.add("bg-white");
            header.classList.add("shadow");
        }
        if(navaction){
            navaction.classList.remove("bg-white");
            navaction.classList.add("gradient");
            navaction.classList.add("text-white");
        }

        for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-gray-800");
            toToggle[i].classList.remove("text-white");
        }

        if(navcontent){
            navcontent.classList.add("bg-white");
        }

    } else {
        if(header){
            header.classList.remove("bg-white");
            header.classList.remove("shadow");
        }

        if(navaction){
            navaction.classList.remove("gradient");
            navaction.classList.add("bg-white");
            navaction.classList.remove("text-white");
        }

        for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-white");
            toToggle[i].classList.remove("text-gray-800");
        }

        if(navcontent){
            navcontent.classList.remove("bg-white");
        }
    }
});

// ============================
// 🔹 MENU MOBILE
// ============================

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.addEventListener("click", function(e) {
    var target = e.target;

    if (navMenu && navMenuDiv) {
        if (!navMenuDiv.contains(target)) {
            if (navMenu.contains(target)) {
                navMenuDiv.classList.toggle("hidden");
            } else {
                navMenuDiv.classList.add("hidden");
            }
        }
    }
});

// ============================
// 🔹 CALCULAR TOTAL
// ============================

function calcularTotal() {
    var simple = Number(document.getElementById("simple")?.value || 0) * 100;
    var completa = Number(document.getElementById("completa")?.value || 0) * 150;
    var combo = Number(document.getElementById("combo")?.value || 0) * 1550;

    return simple + completa + combo;
}

// ============================
// 🔥 BOTON DE PAGO (FUNCIONA)
// ============================

function pagarConMercadoPago() {
    alert("Botón funcionando ✅");

    var total = calcularTotal();

    if (total <= 0) {
        alert("Elegí al menos un producto");
        return;
    }

    fetch("https://duoadonay.onrender.com/crear-pago", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: "Pedido Dúo Adonay",
            precio: total,
            cantidad: 1
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta:", data);

        if (data.init_point) {
            window.location.href = data.init_point;
        } else {
            alert("Error al crear el pago");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error conectando con el servidor");
    });
}

// ejecutar al cargar
activarNotificaciones();
