// Pedido de snacks: se guarda en un arreglo y se vuelve a dibujar la lista

let pedido = [];

const lista = document.getElementById("pedido-lista");
const vacio = document.getElementById("pedido-vacio");
const totalPedido = document.getElementById("pedido-total");

function dibujarPedido() {
  lista.innerHTML = "";
  let suma = 0;

  pedido.forEach((item, posicion) => {
    suma += item.precio;

    const li = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = item.nombre + " · $" + item.precio.toFixed(2);

    const quitar = document.createElement("button");
    quitar.type = "button";
    quitar.className = "quitar";
    quitar.textContent = "Quitar";
    quitar.setAttribute("aria-label", "Quitar " + item.nombre);
    quitar.addEventListener("click", () => {
      pedido.splice(posicion, 1);
      dibujarPedido();
    });

    li.append(texto, quitar);
    lista.append(li);
  });

  vacio.hidden = pedido.length > 0;
  totalPedido.textContent = "$" + suma.toFixed(2);
}

document.querySelectorAll(".snack").forEach((snack) => {
  snack.querySelector(".agregar").addEventListener("click", () => {
    const tamano = snack.querySelector("select");
    let nombre = snack.dataset.nombre;
    let precio = Number(snack.dataset.precio);

    if (tamano) {
      const opcion = tamano.selectedOptions[0];
      nombre += " (" + opcion.textContent.split(" · ")[0].toLowerCase() + ")";
      precio = Number(tamano.value);
    }

    pedido.push({ nombre: nombre, precio: precio });
    dibujarPedido();
  });
});

document.getElementById("vaciar").addEventListener("click", () => {
  pedido = [];
  dibujarPedido();
});

dibujarPedido();
