// 🔥 IMPORTANTE: usar type="module" en el HTML

// ============================
// 🔹 FIREBASE
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "duo-adonay.firebaseapp.com",
  projectId: "duo-adonay",
  messagingSenderId: "1053035827307",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ============================
// 🔹 UI
// ============================
window.irAlPedido = function() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("pedido").style.display = "block";
};

// ============================
// 🔹 CALCULAR TOTAL
// ============================
function calcularTotal() {
  const simple = Number(document.getElementById("simple").value) * 100;
  const completa = Number(document.getElementById("completa").value) * 150;
  const combo = Number(document.getElementById("combo").value) * 1550;

  return simple + completa + combo;
}

// ============================
// 🔹 PAGO MERCADO PAGO
// ============================
window.pagarConMercadoPago = async function() {
  try {
    alert("Botón funcionando ✅");

    const total = calcularTotal();
    console.log("Total:", total);

    if (total <= 0) {
      alert("Elegí al menos un producto");
      return;
    }

    const res = await fetch("https://duoadonay.onrender.com/crear-pago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: "Pedido Dúo Adonay",
        precio: total,
        cantidad: 1
      })
    });

    const data = await res.json();
    console.log("Respuesta servidor:", data);

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Error al generar el pago");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Error conectando con el servidor");
  }
};

// ============================
// 🔹 NOTIFICACIONES
// ============================
async function activarNotificaciones() {
  try {
    const permiso = await Notification.requestPermission();

    if (permiso === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "TU_VAPID_KEY"
      });

      console.log("TOKEN:", token);

      await fetch("https://duo-adonay-default-rtdb.firebaseio.com/tokens.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      console.log("Token guardado");
    }

  } catch (error) {
    console.error("Error notificaciones:", error);
  }
}

// ejecutar al cargar
activarNotificaciones();
