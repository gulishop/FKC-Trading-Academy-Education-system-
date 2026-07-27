// Firebase Messaging Service Worker
// Handles push notifications when the site/tab is closed or in the
// background. Must live at the ROOT of your GitHub Pages site
// (same folder as index.html) -- browsers only let a service worker
// control paths at or below where the file itself is served from.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// ⚠️ REPLACE with your own Firebase project config (see setup guide --
// this is public/client-side config, safe to expose, NOT a secret key).
firebase.initializeApp({
    apiKey: "AIzaSyCuOHTmziW-GdCTD1cB8aGpBjlNCQNtAgY",
    authDomain: "fkc-trading-alerts.firebaseapp.com",
    projectId: "fkc-trading-alerts",
    storageBucket: "fkc-trading-alerts.firebasestorage.app",
    messagingSenderId: "74755956797",
    appId: "1:74755956797:web:77a6619f25de3a30804a54"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || '🏛️ FKC Trading Signal';
    const options = {
        body: payload.notification?.body || 'New signal available.',
        icon: '/icon-192.png', // optional -- add your own icon at this path, or remove this line
        tag: 'fkc-signal'
    };
    self.registration.showNotification(title, options);
});
