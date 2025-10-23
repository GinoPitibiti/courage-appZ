// firebase-messaging-sw.js - Service Worker pour les notifications push
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Configuration Firebase (doit être la même que dans index.html)
const firebaseConfig = {
    apiKey: "AIzaSyB_OJf0mMI5RILQJGuFYcWDx_hB3TjoNhc",
    authDomain: "courage-therapie.firebaseapp.com",
    projectId: "courage-therapie",
    storageBucket: "courage-therapie.firebasestorage.app",
    messagingSenderId: "991109980747",
    appId: "1:991109980747:web:f0b7610c87c8a044efe3ce",
    measurementId: "G-08VXV4JR6D"
};

// Initialiser Firebase dans le Service Worker
firebase.initializeApp(firebaseConfig);

// Récupérer l'instance de messaging
const messaging = firebase.messaging();

// Gérer les notifications en arrière-plan
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Message reçu en arrière-plan:', payload);

    const notificationTitle = payload.notification.title || 'Courage App';
    const notificationOptions = {
        body: payload.notification.body || 'Nouvelle notification',
        icon: '/icon-192x192.png', // Tu peux ajouter une icône plus tard
        badge: '/badge-72x72.png',
        tag: payload.data?.type || 'general',
        data: payload.data,
        requireInteraction: false,
        vibrate: [200, 100, 200],
        actions: [
            {
                action: 'open',
                title: 'Ouvrir'
            },
            {
                action: 'close',
                title: 'Fermer'
            }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gérer les clics sur les notifications
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification cliquée:', event);

    event.notification.close();

    if (event.action === 'open' || !event.action) {
        // Ouvrir l'application
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
