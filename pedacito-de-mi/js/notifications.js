/**
 * notifications.js
 * -----------------------------------------------------------------------
 * IMPORTANTE — LEE ESTO ANTES DE ASUMIR QUE "YA FUNCIONA TODO":
 *
 * Lo que este archivo SÍ hace, solo con HTML/CSS/JS (sin backend):
 *   - Pedir permiso de notificaciones.
 *   - Programar notificaciones para las horas de config.js MIENTRAS la
 *     app está abierta (en primer o segundo plano) usando setTimeout +
 *     Service Worker (para que se vean como notificaciones nativas).
 *   - Mostrar una notificación inmediata al presionar botones (abrazo,
 *     "cuando me extrañes", etc.).
 *
 * Lo que este archivo NO puede garantizar (limitación real del navegador,
 * no del código):
 *   - Que la notificación de las 12:30 aparezca si ella cerró la app
 *     por completo y no la volvió a abrir en todo el día. Los
 *     navegadores NO permiten que JavaScript "despierte" solo a una
 *     hora exacta si la pestaña/app está completamente cerrada.
 *
 * La solución real a eso es un backend/servidor que envíe un "Web Push"
 * verdadero (con Firebase Cloud Messaging o el estándar Web Push) a esa
 * hora, incluso con la app cerrada. Está explicado paso a paso en
 * README-INSTRUCCIONES.md, sección "NOTIFICACIONES REALES EN SEGUNDO
 * PLANO", junto con la alternativa gratuita más simple
 * (carpeta /backend-opcional).
 * -----------------------------------------------------------------------
 */

const Notificaciones = (() => {
  const DIAS = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  let swRegistration = null;
  const timers = [];

  async function init() {
    if (!("serviceWorker" in navigator)) {
      console.warn("Este navegador no soporta Service Workers.");
      return;
    }
    try {
      swRegistration = await navigator.serviceWorker.register("/service-worker.js");
    } catch (err) {
      console.error("No se pudo registrar el service worker:", err);
    }
  }

  function permisoConcedido() {
    return "Notification" in window && Notification.permission === "granted";
  }

  async function pedirPermiso() {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones.");
      return false;
    }
    const resultado = await Notification.requestPermission();
    return resultado === "granted";
  }

  function mensajeDeHoy(hora) {
    const hoy = DIAS[new Date().getDay()];
    const porDia = MESSAGES.schedule[hoy] || {};
    return porDia[hora] || MESSAGES.schedule.default[hora] || null;
  }

  // Revisa si hoy es una fecha especial (aniversario, cumpleaños, etc.)
  function mensajeFechaEspecial() {
    const hoy = new Date();
    const clave = String(hoy.getMonth() + 1).padStart(2, "0") + "-" + String(hoy.getDate()).padStart(2, "0");
    return MESSAGES.fechasEspeciales[clave] || null;
  }

  async function mostrarNotificacion(titulo, cuerpo) {
    if (!permisoConcedido()) return;
    const opciones = {
      body: cuerpo,
      icon: "/assets/icons/icon-192.png",
      badge: "/assets/icons/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "pedacito-de-mi",
    };
    if (swRegistration) {
      swRegistration.showNotification(titulo, opciones);
    } else {
      new Notification(titulo, opciones);
    }
  }

  // Programa, para el resto del día, cada hora definida en
  // config.js que todavía no haya pasado. Solo funciona mientras la
  // pestaña siga abierta (ver limitación explicada arriba).
  function programarNotificacionesDelDia() {
    timers.forEach(clearTimeout);
    timers.length = 0;

    const especial = mensajeFechaEspecial();
    const ahora = new Date();

    CONFIG.notificationTimes.forEach((hora) => {
      const [h, m] = hora.split(":").map(Number);
      const objetivo = new Date();
      objetivo.setHours(h, m, 0, 0);

      const msFaltantes = objetivo.getTime() - ahora.getTime();
      if (msFaltantes <= 0) return; // esa hora ya pasó hoy

      const texto = especial || mensajeDeHoy(hora);
      if (!texto) return;

      const id = setTimeout(() => {
        mostrarNotificacion("Un pedacito de mí ❤️", texto);
      }, msFaltantes);
      timers.push(id);
    });
  }

  return {
    init,
    permisoConcedido,
    pedirPermiso,
    mostrarNotificacion,
    programarNotificacionesDelDia,
    mensajeDeHoy,
    mensajeFechaEspecial,
  };
})();
