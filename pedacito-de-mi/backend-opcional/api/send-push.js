// backend-opcional/api/send-push.js
// -----------------------------------------------------------------------
// Función serverless de ejemplo para Vercel. Envía una notificación push
// real a la suscripción guardada. Se debe llamar desde un cron externo
// (por ejemplo cron-job.org) a cada hora definida en config.js.
//
// Variables de entorno necesarias (configurar en el panel de Vercel,
// NUNCA escribirlas directamente en este archivo):
//   VAPID_PUBLIC_KEY
//   VAPID_PRIVATE_KEY
//   VAPID_CONTACT_EMAIL   (ej: "mailto:tu-correo@ejemplo.com")
//
// Requiere guardar antes la "suscripción" del navegador de tu novia
// (ver subscribe-ejemplo.js). Este ejemplo asume que la guardaste en
// Vercel KV bajo la clave "subscription". Ajusta según dónde la guardes.
// -----------------------------------------------------------------------

const webpush = require("web-push");

module.exports = async (req, res) => {
  try {
    webpush.setVapidDetails(
      process.env.VAPID_CONTACT_EMAIL,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    // Ejemplo: reemplaza esto por cómo estés guardando la suscripción
    // (Vercel KV, Firestore, un JSON en una base de datos, etc.)
    const subscription = await obtenerSuscripcionGuardada();
    if (!subscription) {
      res.status(404).json({ error: "No hay suscripción guardada todavía." });
      return;
    }

    const hora = new URL(req.url, "https://x").searchParams.get("hora") || "default";
    const mensajes = require("../mensajes-servidor.json");
    const texto = mensajes[hora] || mensajes.default;

    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title: "Un pedacito de mí ❤️", body: texto })
    );

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo enviar la notificación." });
  }
};

async function obtenerSuscripcionGuardada() {
  // Implementa aquí la lectura desde tu almacenamiento elegido.
  // Ejemplo con Vercel KV:
  // const { kv } = require('@vercel/kv');
  // return await kv.get('subscription');
  return null;
}
