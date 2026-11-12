// Validación del formulario de registro

const formulario = document.getElementById("form-cuenta");
const aviso = document.getElementById("aviso-cuenta");

// Muestra el error, marca el campo en rojo y pone el cursor en él
function mostrarError(campo, texto) {
  campo.classList.add("con-fallo");
  campo.focus();
  aviso.className = "aviso aviso-mal";
  aviso.textContent = texto;
}

function limpiarErrores() {
  const marcados = formulario.querySelectorAll(".con-fallo");
  for (const campo of marcados) {
    campo.classList.remove("con-fallo");
  }
  aviso.textContent = "";
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarErrores();

  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const cedula = document.getElementById("cedula");
  const celular = document.getElementById("celular");
  const canton = document.getElementById("canton");
  const email = document.getElementById("email");
  const clave = document.getElementById("clave");
  const repetir = document.getElementById("repetir");
  const acepto = document.getElementById("acepto");

  if (nombre.value.trim() === "") {
    mostrarError(nombre, "Escribe tus nombres.");
    return;
  }

  if (apellido.value.trim() === "") {
    mostrarError(apellido, "Escribe tus apellidos.");
    return;
  }

  if (cedula.value.length !== 10 || isNaN(cedula.value)) {
    mostrarError(cedula, "La cédula debe tener 10 números.");
    return;
  }

  if (celular.value.length !== 10 || isNaN(celular.value)) {
    mostrarError(celular, "El celular debe tener 10 números.");
    return;
  }

  if (canton.value === "") {
    mostrarError(canton, "Elige tu cantón.");
    return;
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    mostrarError(email, "Escribe un correo válido, por ejemplo nombre@correo.com.");
    return;
  }

  if (clave.value.length < 8) {
    mostrarError(clave, "La contraseña debe tener mínimo 8 caracteres.");
    return;
  }

  if (repetir.value !== clave.value) {
    mostrarError(repetir, "Las contraseñas no son iguales.");
    return;
  }

  if (!acepto.checked) {
    mostrarError(acepto, "Debes aceptar los términos y condiciones.");
    return;
  }

  aviso.className = "aviso aviso-bien";
  aviso.textContent = "¡Registro exitoso! Bienvenido, " + nombre.value.trim() + ".";
  formulario.reset();
});
