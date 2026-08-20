/**
 * config.js
 * -----------------------------------------------------------------------
 * ÚNICO archivo que necesitas tocar para personalizar los datos básicos.
 * No necesitas saber programar para editar esto: solo cambia lo que está
 * entre comillas " " y guarda el archivo.
 * -----------------------------------------------------------------------
 */

const CONFIG = {
  // Nombre de tu novia (se usa en el saludo y en varios mensajes)
  partnerName: "Mi Amor",

  // Fecha en la que empezaron su relación. Formato: "AAAA-MM-DD"
  relationshipStart: "2025-02-15",

  // Nombre corto que aparece en el título de la pestaña del navegador
  appShortName: "Un pedacito de mí",

  // Enlace a una canción especial (Spotify o YouTube). Ver sección
  // "MÚSICA" en README-INSTRUCCIONES.md sobre limitaciones de autoplay.
  songUrl: "https://www.youtube.com/watch?v=c66imHOBacU&list=RDc66imHOBacU&start_radio=1",
  songLabel: "Nuestra canción",

  // Horas (formato 24h "HH:MM") en las que se debe intentar mostrar una
  // notificación mientras la app esté abierta o recién abierta.
  // El mensaje real se toma de messages.js según el día de la semana.
  notificationTimes: ["08:00", "12:30", "15:30", "18:30", "21:00"],
};

// No modificar esta línea:
if (typeof module !== "undefined") module.exports = CONFIG;
