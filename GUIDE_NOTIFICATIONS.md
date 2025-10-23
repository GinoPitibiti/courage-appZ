# Guide des Notifications Push - Courage App

Ce guide explique comment utiliser les notifications push dans l'application Courage.

## 📱 Ce qui fonctionne maintenant

### Infrastructure complète
- ✅ Service Worker configuré pour recevoir les notifications
- ✅ Demande de permission dans l'interface utilisateur
- ✅ Enregistrement des tokens FCM dans Firestore
- ✅ Notifications en arrière-plan (app fermée)
- ✅ Notifications en premier plan (app ouverte)
- ✅ Support mobile et desktop

## 🔧 Configuration Firebase (OBLIGATOIRE)

### Étape 1 : Activer Cloud Messaging

1. Va sur la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionne ton projet : **courage-therapie**
3. Dans le menu de gauche, va dans **Build → Cloud Messaging**
4. Clique sur **Get started** si ce n'est pas déjà activé

### Étape 2 : Générer la clé VAPID (optionnel mais recommandé)

1. Dans Cloud Messaging, va dans l'onglet **Web configuration**
2. Sous **Web Push certificates**, clique sur **Generate key pair**
3. Copie la clé générée (elle commence par `B...`)
4. Dans `index.html.html`, trouve cette ligne (environ ligne 275) :
   ```javascript
   const token = await messaging.getToken({
       serviceWorkerRegistration: registration
   });
   ```
5. Remplace-la par :
   ```javascript
   const token = await messaging.getToken({
       vapidKey: 'TA_CLE_VAPID_ICI',
       serviceWorkerRegistration: registration
   });
   ```

## 📤 Comment envoyer des notifications manuellement

### Méthode 1 : Via l'onglet Cloud Messaging (Facile)

1. Va sur la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionne ton projet
3. Dans le menu, va dans **Messaging**
4. Clique sur **Create your first campaign** ou **New campaign**
5. Sélectionne **Firebase Notification messages**
6. Remplis :
   - **Notification title** : "Nouveau commentaire !"
   - **Notification text** : "Quelqu'un t'encourage sur ton exposition"
   - **Image** (optionnel)
7. Clique sur **Next**
8. Dans **Target** :
   - Sélectionne **User segment**
   - Choisis **All users** pour envoyer à tout le monde
   - OU clique sur **Add condition** → **User in audience** pour cibler des utilisateurs spécifiques
9. Clique sur **Next**
10. Dans **Scheduling** : choisis **Now** ou programme pour plus tard
11. Clique sur **Review** puis **Publish**

### Méthode 2 : Via l'API REST (Avancé)

#### Récupérer les tokens FCM des utilisateurs

1. Va dans **Firestore Database**
2. Collection : `users`
3. Chaque document utilisateur contient :
   - `fcmToken` : le token pour envoyer des notifications
   - `notificationsEnabled` : true/false

#### Envoyer via cURL

```bash
curl -X POST https://fcm.googleapis.com/v1/projects/courage-therapie/messages:send \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "message": {
    "token": "TOKEN_FCM_DU_USER",
    "notification": {
      "title": "Nouveau commentaire !",
      "body": "Quelqu\'un t\'encourage sur ton exposition"
    },
    "webpush": {
      "notification": {
        "icon": "/icon-192x192.png",
        "badge": "/badge-72x72.png",
        "vibrate": [200, 100, 200]
      }
    }
  }
}'
```

#### Récupérer l'Access Token

```bash
# Installer gcloud CLI
curl https://sdk.cloud.google.com | bash

# Se connecter à Firebase
gcloud auth application-default login

# Récupérer le token
gcloud auth application-default print-access-token
```

## 🎯 Exemples de notifications par cas d'usage

### Nouveau commentaire sur une exposition

```json
{
  "notification": {
    "title": "💬 Nouveau commentaire !",
    "body": "Marie t'encourage : 'Bravo pour ton courage !'"
  },
  "data": {
    "type": "new_comment",
    "exposureId": "abc123"
  }
}
```

### Encouragement pendant une exposition

```json
{
  "notification": {
    "title": "💪 Tu y arrives !",
    "body": "Continue, tu es en train de progresser !"
  },
  "data": {
    "type": "encouragement"
  }
}
```

### Rappel d'exposition

```json
{
  "notification": {
    "title": "🌟 C'est le moment !",
    "body": "N'oublie pas ta pratique d'exposition aujourd'hui"
  },
  "data": {
    "type": "reminder"
  }
}
```

### Badge débloqué

```json
{
  "notification": {
    "title": "🏆 Nouveau badge !",
    "body": "Tu as débloqué le badge 'Guerrier' !"
  },
  "data": {
    "type": "badge_unlocked",
    "badgeId": "warrior"
  }
}
```

## 📊 Voir les utilisateurs qui ont activé les notifications

### Requête Firestore

Dans la console Firebase, va dans Firestore et exécute cette requête :

```
Collection: users
Filters:
  - notificationsEnabled == true
```

Tu verras tous les utilisateurs avec leur `fcmToken`.

## 🔍 Tester les notifications

### Test simple

1. Active les notifications dans l'app
2. Ouvre la console du navigateur (F12)
3. Vérifie que tu vois :
   ```
   ✅ Service Worker enregistré
   ✅ Token FCM reçu: eyJhb...
   ✅ Token sauvegardé dans Firestore
   ```
4. Envoie une notification test depuis Firebase Console
5. Tu devrais recevoir la notification !

### Test en arrière-plan

1. Active les notifications
2. Ferme l'onglet de l'app (ou minimise le navigateur)
3. Envoie une notification depuis Firebase Console
4. La notification devrait apparaître sur ton téléphone/desktop

### Test sur mobile

1. Déploie l'app sur Vercel
2. Ouvre l'app sur ton mobile (Chrome ou Safari sur iOS 16.4+)
3. Clique sur "Activer" les notifications
4. Accepte la permission
5. Envoie une notification test
6. Ferme le navigateur → tu devrais recevoir la notification !

## ⚠️ Dépannage

### "Erreur enregistrement Service Worker"

- Vérifie que le fichier `firebase-messaging-sw.js` est accessible à la racine
- Sur Vercel, assure-toi qu'il est déployé (vérifie l'URL : `https://ton-app.vercel.app/firebase-messaging-sw.js`)

### "Permission bloquée"

- L'utilisateur a refusé les notifications
- Il faut aller dans les paramètres du navigateur pour réautoriser
- Chrome : Paramètres → Confidentialité → Paramètres des sites → Notifications

### "Token non reçu"

- Vérifie que Cloud Messaging est activé dans Firebase
- Regarde la console du navigateur pour les erreurs
- Essaye de générer une clé VAPID (voir Étape 2)

### Les notifications n'arrivent pas

1. Vérifie que le token FCM est bien sauvegardé dans Firestore
2. Teste avec **All users** dans Firebase Console
3. Vérifie que les notifications ne sont pas bloquées par l'OS
4. Sur mobile, vérifie que les notifications ne sont pas en mode silencieux

## 🚀 Pour aller plus loin (Cloud Functions)

Pour automatiser les notifications (par exemple, envoyer automatiquement quand quelqu'un commente), tu devras :

1. Passer au **plan Blaze** de Firebase (payant, mais quelques centimes/mois)
2. Créer des Cloud Functions qui écoutent Firestore
3. Exemple : quand un nouveau commentaire est ajouté, envoyer une notification à l'auteur de l'exposition

Je peux t'aider avec ça plus tard si tu veux ! Pour l'instant, l'envoi manuel via la console Firebase est gratuit et fonctionnel.

## 📝 Notes importantes

- Les tokens FCM peuvent expirer, il faut les rafraîchir périodiquement
- Les notifications sur iOS nécessitent iOS 16.4+ et Safari
- Sur Android, ça fonctionne avec Chrome, Firefox, Edge
- Les notifications en arrière-plan nécessitent HTTPS (Vercel le fournit automatiquement)
- Les utilisateurs peuvent désactiver les notifications à tout moment via les paramètres du navigateur

---

**Besoin d'aide ?** Ouvre un problème ou consulte la [documentation Firebase](https://firebase.google.com/docs/cloud-messaging/js/client)
