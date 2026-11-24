/* Service worker do Nossos Dates: deixa o site instalável e recebe notificações (Firebase Cloud Messaging). Fica na raiz do site. */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyC9QOjVvGRAh1ZIZpir8GxdNP_UBi7m9i4",
  authDomain: "nossosdates-app.firebaseapp.com",
  projectId: "nossosdates-app",
  storageBucket: "nossosdates-app.firebasestorage.app",
  messagingSenderId: "157852870199",
  appId: "1:157852870199:web:36273ec8a73ca8a3f7c1b2"
});
firebase.messaging();
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});   /* sem cache: o site sempre abre a versão mais nova */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
    for(const c of list){ if('focus' in c) return c.focus(); }
    return clients.openWindow('/');
  }));
});
