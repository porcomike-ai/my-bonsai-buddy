// Service Worker pour les notifications push

self.addEventListener("push", (event) => {
  const data = event.data?.json();
  
  const options = {
    body: data?.body || "Nouvelle notification",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: {
      url: data?.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(data?.title || "Bonsaï Studio", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const url = event.notification.data?.url || "/";
  
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Si une fenêtre est déjà ouverte, focus sur celle-ci
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // Sinon, ouvrir une nouvelle fenêtre
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
