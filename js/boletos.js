// Página de boletos: filtro de localidades y cálculo de la compra

// ----- Filtro de la tabla de precios -----
const chips = document.querySelectorAll(".chip");
const filasPrecio = document.querySelectorAll("#precios tbody tr");
const avisoZona = document.getElementById("aviso-zona");

function mostrarZona(zona) {
  for (const fila of filasPrecio) {
    fila.hidden = zona !== "todas" && fila.dataset.zona !== zona;
  }

  for (const chip of chips) {
    chip.classList.toggle("chip-activo", chip.dataset.zona === zona);
    chip.setAttribute("aria-pressed", chip.dataset.zona === zona);
  }

  if (zona === "todas") {
    avisoZona.textContent = "Se muestran las " + filasPrecio.length + " localidades.";
  } else {
    avisoZona.textContent = "Precios de la localidad " + zona + ".";
  }
}

for (const chip of chips) {
  chip.addEventListener("click", () => mostrarZona(chip.dataset.zona));
}

// ----- Compra -----
const formCompra = document.getElementById("form-compra");
const zona = document.getElementById("zona");
const adultos = document.getElementById("adultos");
const reducidos = document.getElementById("reducidos");
const total = document.getElementById("total");
const avisoCompra = document.getElementById("aviso-compra");

const MAXIMO = 10;

function leerCantidad(campo) {
  const numero = Number(campo.value);
  return Number.isInteger(numero) && numero >= 0 ? numero : -1;
}

function calcularTotal() {
  const precios = zona.selectedOptions[0].dataset;
  const nAdultos = Math.max(leerCantidad(adultos), 0);
  const nReducidos = Math.max(leerCantidad(reducidos), 0);
  return nAdultos * Number(precios.adulto) + nReducidos * Number(precios.reducido);
}

function actualizarTotal() {
  total.textContent = "$" + calcularTotal().toFixed(2);
  avisoCompra.textContent = "";
}

function avisar(texto, correcto) {
  avisoCompra.textContent = texto;
  avisoCompra.className = correcto ? "aviso aviso-bien" : "aviso aviso-mal";
}

formCompra.addEventListener("input", actualizarTotal);

formCompra.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nAdultos = leerCantidad(adultos);
  const nReducidos = leerCantidad(reducidos);

  if (nAdultos < 0 || nReducidos < 0) {
    avisar("Escribe cantidades válidas (números enteros).", false);
    return;
  }

  const boletos = nAdultos + nReducidos;

  if (boletos === 0) {
    avisar("Elige al menos un boleto.", false);
    return;
  }

  if (boletos > MAXIMO) {
    avisar("Solo se pueden comprar hasta " + MAXIMO + " boletos por persona.", false);
    return;
  }

  avisar("¡Listo! Reservaste " + boletos + " boleto(s) en " + zona.value +
    " por $" + calcularTotal().toFixed(2) + ".", true);
});

actualizarTotal();
