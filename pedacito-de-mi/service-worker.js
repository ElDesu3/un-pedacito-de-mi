/**
 * service-worker.js
 * -----------------------------------------------------------------------
 * Responsabilidades:
 *  1) Cachear el "esqueleto" de la app para que abra rápido y funcione
 *     parcialmente sin conexión.
 *  2) Mostrar notificaciones locales que le pide app.js (showNotification).
 *  3) (Opcional / futuro) Recibir un evento "push" real si más adelante
 *     conectas un backend con Web Push / Firebase Cloud Messaging.
 *     Ver README-INSTRUCCIONES.md.
 * -----------------------------------------------------------------------
 */

const CACHE_NAME = "pedacito-de-mi-v1";
const ARCHIVOS_CACHE = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/config.js",
  "/js/messages.js",
  "/js/notifications.js",
  "/js/app.js",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );
  self.clients.claim();
});

// Estrategia: network-first para HTML (siempre lo más nuevo si hay
// conexión), cache-first para el resto (más rápido y funciona offline).
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((respuestaCache) => {
      return (
        respuestaCache ||
        fetch(request).then((respuestaRed) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, respuestaRed.clone());
            return respuestaRed;
          });
        })
      );
    })
  );
});

// Notificaciones locales pedidas por app.js mientras la app está abierta.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((listaClientes) => {
      if (listaClientes.length > 0) {
        return listaClientes[0].focus();
      }
      return self.clients.openWindow("/");
    })
  );
});

// -------------------------------------------------------------------
// PUSH REAL (solo se activa si en el futuro conectas un backend que
// envíe notificaciones Web Push verdaderas, con la app cerrada).
// Sin ese backend, este bloque nunca se dispara y no afecta nada.
// -------------------------------------------------------------------
self.addEventListener("push", (event) => {
  let datos = { title: "Un pedacito de mí ❤️", body: "Pensando en ti." };
  if (event.data) {
    try {
      datos = event.data.json();
    } catch (e) {
      datos.body = event.data.text();
    }
  }
  event.waitUntil(
    self.registration.showNotification(datos.title, {
      body: datos.body,
      icon: "/assets/icons/icon-192.png",
      badge: "/assets/icons/icon-192.png",
      vibrate: [200, 100, 200],
    })
  );
});
