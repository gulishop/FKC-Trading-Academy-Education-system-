// firebase-messaging-sw.js
// This file MUST live at your site's ROOT (same folder as index.html),
// e.g. https://gulishop.github.io/firebase-messaging-sw.js
//
// It lets Firebase Cloud Messaging deliver push notifications even when
// the browser tab / app is closed. The config below must match the
// firebaseConfig object inside index.html.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCuOHTmziW-GdCTD1cB8aGpBjlNCQNtAgY",
    authDomain: "fkc-trading-alerts.firebaseapp.com",
    projectId: "fkc-trading-alerts",
    storageBucket: "fkc-trading-alerts.firebasestorage.app",
    messagingSenderId: "74755956797",
    appId: "1:74755956797:web:77a6619f25de3a30804a54"
});

const messaging = firebase.messaging();

// Show a notification when a push arrives while the app/tab is in the
// background or fully closed.
messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'FKC Trading Academy';
    const options = {
        body: (payload.notification && payload.notification.body) || '',
        icon: (payload.notification && payload.notification.icon) || undefined,
        data: payload.data || {}
    };
    self.registration.showNotification(title, options);
});

// Optional: focus/open the app when the user taps the notification.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
