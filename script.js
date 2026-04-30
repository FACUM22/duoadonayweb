import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// Firebase config
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "duo-adonay.firebaseapp.com",
  projectId: "duo-adonay",
  messagingSenderId: "1053035827307",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// UI
window.irAlPedido = function() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("pedido").style.display = "block";
};

// calcular total
function calcularTotal() {
  return (
    document.getElementById("simple").value * 100 +
    document.getElementById("completa").value * 150 +
    document.getElementById("combo").value * 1550
  );
}

// pagar
window.pagarConMercadoPago = async function() {
  const total = calcularTotal();

  const res = await fetch("https://TU-APP.onrender.com/crear-pago", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      titulo: "Pedido Dúo Adonay",
      precio: total,
      cantidad: 1
    })
  });

  const data = await res.json();
  window.location.href = data.init_point;
};

// notificaciones
async function activarNotificaciones() {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "TU_VAPID_KEY"
    });

    await fetch("https://duo-adonay-default-rtdb.firebaseio.com/tokens.json", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ token })
    });
  }
}

activarNotificaciones();