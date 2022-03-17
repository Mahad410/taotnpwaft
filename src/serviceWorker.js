if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: './src/serviceWorker.js' })
    .then((reg) => {
      // registration worked
      console.log('Service Worker Registered. Scope is ' + reg.scope);
    }).catch((error) => {
      console.log('Registration failed with ' + error);
    });
})


self.addEventListener('install', event => console.log('ServiceWorker installed'));
self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.openWindow('/'));
});
self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.matchAll().then(clients => {
    if (clients.length) { // check if at least one tab is already open
      clients[0].focus();
    } else {
      self.clients.openWindow('/');
    }
  }));
});
self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.matchAll().then(clients => {
    if (clients.length) { // check if at least one tab is already open
      clients[0].focus();
      clients[0].postMessage('Push notification clicked!');
    } else {
      self.clients.openWindow('/');
    }
  }));
});
