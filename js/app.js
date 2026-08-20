/**
 * app.js — lógica principal de la interfaz.
 */

document.addEventListener("DOMContentLoaded", async () => {
  await Notificaciones.init();

  pintarSaludo();
  pintarFraseDelDia();
  iniciarReloj();
  iniciarContadorRelacion();
  revisarRegresoLargo();
  revisarHoraDormir();
  mostrarSorpresaAleatoria();
  configurarBotonesSituaciones();
  configurarBotonAbrazo();
  configurarPermisoNotificaciones();
  configurarInstalacion();

  // Guardamos la marca de "última vez vista" para poder saludar
  // distinto la próxima vez que abra la app tras varias horas.
  localStorage.setItem("ultimaVisita", Date.now().toString());
});

// ---------------------------------------------------------------------
// Saludo + frase del día
// ---------------------------------------------------------------------
function pintarSaludo() {
  const el = document.getElementById("saludo-nombre");
  if (el) el.textContent = CONFIG.partnerName;

  const horaActual = new Date().getHours();
  let saludo = "Hola";
  if (horaActual < 12) saludo = "Buenos días";
  else if (horaActual < 19) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  const saludoEl = document.getElementById("saludo-texto");
  if (saludoEl) saludoEl.textContent = saludo + ",";
}

function pintarFraseDelDia() {
  const frases = MESSAGES.frasesDelDia;
  const diaDelAnio = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const frase = frases[diaDelAnio % frases.length];
  const el = document.getElementById("frase-del-dia");
  if (el) el.textContent = frase;
}

// ---------------------------------------------------------------------
// Reloj en vivo
// ---------------------------------------------------------------------
function iniciarReloj() {
  const el = document.getElementById("hora-actual");
  if (!el) return;
  const actualizar = () => {
    const ahora = new Date();
    el.textContent = ahora.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  actualizar();
  setInterval(actualizar, 1000 * 15);
}

// ---------------------------------------------------------------------
// Contador de tiempo juntos
// ---------------------------------------------------------------------
function iniciarContadorRelacion() {
  const inicio = new Date(CONFIG.relationshipStart);
  const dEl = document.getElementById("contador-dias");
  const hEl = document.getElementById("contador-horas");
  const mEl = document.getElementById("contador-minutos");
  const sEl = document.getElementById("contador-segundos");

  if (!dEl) return;

  function actualizar() {
    const diff = Date.now() - inicio.getTime();

    if (diff < 0) return;

    const segundosTotales = Math.floor(diff / 1000);
    const dias = Math.floor(segundosTotales / 86400);
    const horas = Math.floor((segundosTotales % 86400) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    dEl.textContent = dias;
    hEl.textContent = String(horas).padStart(2, "0");
    mEl.textContent = String(minutos).padStart(2, "0");
    sEl.textContent = String(segundos).padStart(2, "0");
  }

  actualizar();
  setInterval(actualizar, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarContadorRelacion();
});
// ---------------------------------------------------------------------
// Mensaje especial si vuelve tras varias horas sin abrir la app
// ---------------------------------------------------------------------
function revisarRegresoLargo() {
  const ultima = parseInt(localStorage.getItem("ultimaVisita") || "0", 10);
  if (!ultima) return;
  const horasPasadas = (Date.now() - ultima) / 1000 / 3600;
  if (horasPasadas >= 4) {
    const banner = document.getElementById("banner-bienvenida");
    if (banner) {
      const opciones = MESSAGES.bienvenidaLarga;
      banner.textContent = opciones[Math.floor(Math.random() * opciones.length)];
      banner.classList.remove("oculto");
    }
  }
}

// ---------------------------------------------------------------------
// Pantalla / mensaje de buenas noches después de cierta hora
// ---------------------------------------------------------------------
function revisarHoraDormir() {
  const hora = new Date().getHours();
  if (hora >= 22 || hora < 5) {
    const el = document.getElementById("mensaje-principal");
    if (el) {
      const opciones = MESSAGES.buenasNoches;
      el.textContent = opciones[Math.floor(Math.random() * opciones.length)];
    }
    document.body.classList.add("modo-noche");
  }
}

// ---------------------------------------------------------------------
// Mensaje sorpresa aleatorio (a veces, no siempre, para que sea especial)
// ---------------------------------------------------------------------
function mostrarSorpresaAleatoria() {
  if (Math.random() > 0.35) return; // ~35% de probabilidad al abrir
  const el = document.getElementById("mensaje-sorpresa");
  if (!el) return;
  const opciones = MESSAGES.sorpresas;
  el.textContent = "✨ " + opciones[Math.floor(Math.random() * opciones.length)];
  el.classList.remove("oculto");
}

// ---------------------------------------------------------------------
// Sección "Cuando me extrañes"
// ---------------------------------------------------------------------
function configurarBotonesSituaciones() {
  const botones = document.querySelectorAll("[data-situacion]");
  const cajaMensaje = document.getElementById("mensaje-situacion");

  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const clave = btn.getAttribute("data-situacion");
      const opciones = MESSAGES.situaciones[clave];
      if (!opciones) return;
      const mensaje = opciones[Math.floor(Math.random() * opciones.length)];
      cajaMensaje.textContent = mensaje;
      cajaMensaje.classList.remove("oculto");
      cajaMensaje.classList.add("aparecer");
      setTimeout(() => cajaMensaje.classList.remove("aparecer"), 500);
    });
  });
}

// ---------------------------------------------------------------------
// Botón "Necesito un abrazo"
// ---------------------------------------------------------------------
function configurarBotonAbrazo() {
  const boton = document.getElementById("boton-abrazo");
  const caja = document.getElementById("mensaje-abrazo");
  const corazon = document.getElementById("animacion-abrazo");
  if (!boton) return;

  boton.addEventListener("click", () => {
    const opciones = MESSAGES.abrazo;
    const mensaje = opciones[Math.floor(Math.random() * opciones.length)];
    caja.textContent = mensaje;
    caja.classList.remove("oculto");
    corazon.classList.remove("oculto");
    corazon.classList.add("latir-fuerte");
    setTimeout(() => corazon.classList.remove("latir-fuerte"), 1200);

    registrarPresionAbrazo();
  });
}

// Guarda localmente cuántas veces / cuándo presionó "necesito un abrazo".
// NOTA DE LIMITACIÓN: esto se guarda SOLO en el teléfono de ella
// (localStorage). Para que tú puedas enterarte del otro lado sin backend
// propio, la opción gratuita más simple es un webhook (por ejemplo un
// webhook de Discord o un formulario de Formspree). Ver
// README-INSTRUCCIONES.md → "BOTÓN DE ABRAZO: CÓMO ENTERARTE TÚ".
// Deja WEBHOOK_URL vacío ("") si no quieres usar esta función.
const WEBHOOK_URL = "";

function registrarPresionAbrazo() {
  const registro = JSON.parse(localStorage.getItem("abrazos") || "[]");
  registro.push(new Date().toISOString());
  localStorage.setItem("abrazos", JSON.stringify(registro));

  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `${CONFIG.partnerName} presionó "Necesito un abrazo" 🥺 a las ${new Date().toLocaleString("es-PE")}`,
      }),
    }).catch((err) => console.warn("No se pudo enviar el aviso del abrazo:", err));
  }
}

// ---------------------------------------------------------------------
// Permiso de notificaciones + programación del día
// ---------------------------------------------------------------------
function configurarPermisoNotificaciones() {
  const boton = document.getElementById("boton-notificaciones");
  if (!boton) return;

  const actualizarEstadoBoton = () => {
    if (Notificaciones.permisoConcedido()) {
      boton.textContent = "Notificaciones activadas ❤️";
      boton.disabled = true;
      Notificaciones.programarNotificacionesDelDia();
    } else {
      boton.textContent = "Activar notificaciones";
      boton.disabled = false;
    }
  };

  boton.addEventListener("click", async () => {
    const concedido = await Notificaciones.pedirPermiso();
    if (concedido) {
      Notificaciones.mostrarNotificacion(
        "Un pedacito de mí ❤️",
        "Listo, ahora voy a poder acompañarte durante el día."
      );
    } else {
      alert(
        "No se activaron las notificaciones. Puedes intentarlo de nuevo desde el botón, o revisar los permisos del navegador."
      );
    }
    actualizarEstadoBoton();
  });

  actualizarEstadoBoton();
}

// ---------------------------------------------------------------------
// Instalar como app (Add to Home Screen)
// ---------------------------------------------------------------------
function configurarInstalacion() {
  let eventoDiferido = null;
  const boton = document.getElementById("boton-instalar");
  if (!boton) return;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoDiferido = e;
    boton.classList.remove("oculto");
  });

  boton.addEventListener("click", async () => {
    if (!eventoDiferido) {
      alert(
        "Para instalar en iPhone: toca el botón de compartir en Safari y elige 'Agregar a pantalla de inicio'."
      );
      return;
    }
    eventoDiferido.prompt();
    await eventoDiferido.userChoice;
    eventoDiferido = null;
    boton.classList.add("oculto");
  });
}
