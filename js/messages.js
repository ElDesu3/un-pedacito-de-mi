/**
 * messages.js
 * -----------------------------------------------------------------------
 * Aquí viven TODOS los mensajes. Puedes editarlos, agregar más o
 * quitarlos sin tocar ningún otro archivo. La estructura está pensada
 * para que sea fácil de mantener aunque no sepas programar: solo
 * respeta las comillas " " y las comas , al final de cada línea.
 * -----------------------------------------------------------------------
 */

const MESSAGES = {
  // ---------------------------------------------------------------------
  // 1) Mensajes programados por día de la semana y hora.
  //    Si un día no tiene un horario definido, se usa "default".
  // ---------------------------------------------------------------------
  schedule: {
    default: {
      "08:00": "Buenos días, amor ❤️. Espero que hoy tengas un día bonito. Yo voy a estar trabajando, pero quería que empezaras el día sabiendo que te amo.",
      "12:30": "Amor, probablemente estés haciendo tus cosas ahora, pero solo quería recordarte que estoy pensando en ti ❤️.",
      "15:30": "Ya falta un poquito menos para que termine mi trabajo. Aguanta, preciosa. Después quiero saber cómo estuvo tu día.",
      "18:30": "Ya casi puedo volver a hablar contigo como quiero. Te extrañé mucho hoy ❤️.",
      "21:00": "Terminó mi día y ahora sí quiero mi ratito contigo. ❤️",
    },
    lunes: {
      "08:00": "Otra semana empezando, pero contigo en la cabeza es más fácil. Buenos días, mi amor.",
    },
    viernes: {
      "18:30": "Por fin viernes. Ya casi termino y lo único que quiero es verte. Te amo ❤️.",
    },
    // Puedes agregar "martes", "miercoles", "jueves", "sabado", "domingo"
    // con la misma estructura si quieres mensajes distintos ese día.
  },

  // ---------------------------------------------------------------------
  // 2) Mensajes especiales por botón / situación (Sección "Cuando me
  //    extrañes"). Cada arreglo puede tener varios mensajes: la app
  //    elige uno al azar cada vez que se presiona el botón.
  // ---------------------------------------------------------------------
  situaciones: {
    triste: [
      "Sé que estás triste y no puedo estar ahí en este momento, pero quiero que sepas que no estás sola. Yo estoy contigo aunque no me veas.",
      "Está bien no estar bien. Cuando pueda, quiero abrazarte fuerte y escucharte todo lo que necesites contar.",
    ],
    extraño: [
      "Yo también te extraño, todo el tiempo, incluso cuando estoy concentrado trabajando. Ya falta menos.",
      "Si pudiera pausar mi día un segundo para escribirte más seguido, lo haría. Te tengo muy presente.",
    ],
    dia_horrible: [
      "Los días difíciles pesan más cuando se viven solos. Este mensaje es para recordarte que, aunque hoy no pueda estar ahí, quiero ser tu lugar seguro cuando volvamos a hablar.",
      "Respira. El día horrible se va a terminar y yo voy a estar ahí para que me cuentes todo con calma.",
    ],
    lejos: [
      "Sé que a veces se siente que estoy lejos por el trabajo, pero nunca estás fuera de mis pensamientos. Estás en todo lo que hago.",
      "La distancia de hoy no cambia nada de lo que siento. Sigues siendo lo primero en mi cabeza.",
    ],
    recordar_amor: [
      "Te amo por cómo eres, por cómo me haces sentir en calma y por cómo te esfuerzas incluso en los días difíciles.",
      "Si tuviera que resumir por qué te amo, no me alcanzaría un solo mensaje. Pero hoy elijo recordarte que eres muy importante para mí.",
    ],
  },

  // ---------------------------------------------------------------------
  // 3) Botón "Necesito un abrazo 🥺"
  // ---------------------------------------------------------------------
  abrazo: [
    "Ven acá 🥺❤️. No puedo abrazarte físicamente ahora mismo, pero imagina que te estoy abrazando muy fuerte y que no pienso soltarte.",
    "Cierra los ojos un segundo. Imagina mis brazos rodeándote. Eso es justo lo que estoy enviándote ahora mismo.",
  ],

  // ---------------------------------------------------------------------
  // 4) Fechas importantes. Formato "MM-DD" (sin el año, se repite cada
  //    año). Si hoy coincide, se muestra este mensaje en vez del normal.
  // ---------------------------------------------------------------------
  fechasEspeciales: {
    // "02-14": "Feliz aniversario, mi amor. Cada año contigo confirma que elegí bien.",
    // "07-20": "Feliz cumpleaños, preciosa. Hoy el mundo se puso mejor porque naciste tú.",
  },

  // ---------------------------------------------------------------------
  // 5) Mensaje de buenas noches (aparece después de cierta hora, ver
  //    app.js) y mensaje de bienvenida al volver tras varias horas.
  // ---------------------------------------------------------------------
  buenasNoches: [
    "Que descanses, mi amor. Mañana empiezo otro día pensando en ti desde el primer minuto. 🌙❤️",
  ],
  bienvenidaLarga: [
    "Te extrañé ❤️. Aunque estuve en silencio, no dejé de pensar en ti ni un momento.",
  ],

  // ---------------------------------------------------------------------
  // 6) Frases del día (rotan). La app elige una según el día del año,
  //    así que se mantiene igual todo el día pero cambia cada día.
  // ---------------------------------------------------------------------
  frasesDelDia: [
    "Contigo hasta lo aburrido se vuelve mi lugar favorito.",
    "No necesito estar cerca para elegirte todos los días.",
    "Eres el mensaje que más quiero escribir y el que más quiero leer.",
    "De todo lo bueno que me pasó este año, tú sigues siendo lo mejor.",
    "Hoy también, entre reunión y reunión, pensé en ti.",
  ],

  // ---------------------------------------------------------------------
  // 7) Mensajes sorpresa (aparecen aleatoriamente al abrir la app).
  // ---------------------------------------------------------------------
  sorpresas: [
    "Dato random: en este momento estoy pensando en ti. Así que ya sabes, siempre hay una probabilidad muy alta de que sea cierto.",
    "Si esto fuera una app de verdad hecha por una empresa, no tendría esta cantidad de cariño metida en el código. La hice yo, para ti.",
  ],
};

// No modificar esta línea:
if (typeof module !== "undefined") module.exports = MESSAGES;
