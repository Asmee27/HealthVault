/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

// Receive push notifications from HealthVault backend
self.addEventListener("push", (event) => {
  let data = {
    title: "HealthVault 💊",
    body: "It's time to take your medicine.",
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    tag: "healthvault-medicine-reminder",
    renotify: true,
    data: {
      url: "/prescriptions",
    },
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "HealthVault 💊",
      options
    )
  );
});

// Open HealthVault when patient clicks notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clientList) => {

      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate("/prescriptions");
          return client.focus();
        }
      }

      return clients.openWindow("/prescriptions");
    })
  );
});