function irAlPedido() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("pedido").style.display = "block";
}

function calcularTotal() {
  const simple = Number(document.getElementById("simple").value || 0);
  const completa = Number(document.getElementById("completa").value || 0);
  const combo = Number(document.getElementById("combo").value || 0);

  return simple * 100 + completa * 150 + combo * 1550;
}

function actualizarTotal() {
  document.getElementById("total").innerText = "Total: $" + calcularTotal();
}

function pagar() {
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;

  const simple = Number(document.getElementById("simple").value || 0);
  const completa = Number(document.getElementById("completa").value || 0);
  const combo = Number(document.getElementById("combo").value || 0);

  if (!nombre || !telefono || !direccion) {
    alert("Completa los datos");
    return;
  }

  fetch("https://duoadonay.onrender.com/crear-pago", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre, telefono, direccion, simple, completa, combo })
  })
  .then(res => res.json())
  .then(data => {
    window.location.href = data.init_point;
  });
}
