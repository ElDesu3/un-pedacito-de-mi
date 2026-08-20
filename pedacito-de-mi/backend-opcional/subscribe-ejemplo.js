// backend-opcional/subscribe-ejemplo.js
// -----------------------------------------------------------------------
// EJEMPLO de cómo suscribir el teléfono de tu novia a push real.
// Este código NO está activo en la app principal; cópialo dentro de
// notifications.js solo si decides montar el backend opcional.
// -----------------------------------------------------------------------

const VAPID_PUBLIC_KEY = "PEGA_AQUI_TU_CLAVE_PUBLICA_VAPID";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

async function suscribirsePushReal(swRegistration) {
  const suscripcion = await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  // Envía la suscripción a tu backend para que la guarde.
  await fetch("/api/guardar-suscripcion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(suscripcion),
  });
}
