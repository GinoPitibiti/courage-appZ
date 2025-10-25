// Service Worker simple pour gérer les notifications d'encouragement
// Ce SW permet de cliquer sur les notifications pour revenir à l'app

console.log('🔧 Service Worker chargé');

// Gérer les clics sur les notifications
self.addEventListener('notificationclick', (event) => {
    console.log('👆 Notification cliquée:', event.notification.tag);

    // Fermer la notification
    event.notification.close();

    // Ouvrir ou ramener au premier plan l'app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Chercher si l'app est déjà ouverte
                for (let client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        console.log('✅ App trouvée, focus sur:', client.url);
                        return client.focus();
                    }
                }

                // Si l'app n'est pas ouverte, l'ouvrir
                if (clients.openWindow) {
                    console.log('🚀 Ouverture de l\'app');
                    return clients.openWindow('/');
                }
            })
    );
});

// Gérer l'installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('📦 Service Worker installé');
    // Activer immédiatement
    self.skipWaiting();
});

// Gérer l'activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activé');
    // Prendre le contrôle immédiatement
    event.waitUntil(clients.claim());
});
