# 🌟 Courage App - Compagnon d'exposition thérapeutique

Application d'accompagnement pour la thérapie d'exposition, conçue pour les personnes souffrant de phobie sociale. Disponible en **version web** (Vercel) et **app Android native** (Play Store).

## 💡 Concept

Une application qui accompagne les phobiques sociaux dans leurs expositions et garde en mémoire ces expositions tout en mettant en relation les utilisateurs à la manière de Strava, pour qu'ils se soutiennent et s'encouragent mutuellement.

## 📱 Deux versions, un seul code

### Version Web (Vercel)
- URL : `https://ton-app.vercel.app`
- Accessible depuis n'importe quel navigateur
- Gratuite et immédiatement disponible
- Auto-déployée à chaque push sur GitHub

### Version Android (Play Store)
- App native Android
- Téléchargeable depuis le Google Play Store
- Payante : 1€ (achat unique)
- Notifications natives améliorées
- Icône sur l'écran d'accueil

## 🏗️ Structure du projet

```
courage-appZ/
├── index.html.html              # ⭐ App web principale (NE PAS MODIFIER LE NOM)
├── index.html                   # Redirection vers index.html.html (pour Capacitor)
├── sw-notifications.js          # Service Worker pour notifications
├── firestore.rules              # Règles de sécurité Firebase
├── vercel.json                  # Configuration Vercel
│
├── package.json                 # Dépendances Capacitor
├── capacitor.config.json        # Configuration Capacitor
│
├── android/                     # 📱 Projet Android (généré)
│   ├── app/
│   │   ├── build.gradle
│   │   ├── google-services.json # ⚠️ À télécharger depuis Firebase
│   │   └── src/
│   └── build/
│
├── GUIDE_BUILD_ANDROID.md       # 📖 Guide complet Android
├── QUICK_START_ANDROID.md       # ⚡ Démarrage rapide Android
└── GUIDE_NOTIFICATIONS_ENCOURAGEMENT.md  # Guide des notifications
```

## 🚀 Démarrage rapide

### Pour la version WEB (Vercel)

```bash
# Modifier le code
vim index.html.html

# Commit et push
git add .
git commit -m "Nouvelle fonctionnalité"
git push

# Vercel déploie automatiquement ! ✅
```

### Pour la version ANDROID

```bash
# 1. Installe les dépendances (1ère fois)
npm install

# 2. Crée le projet Android (1ère fois)
npx cap add android

# 3. Build et test
npm run android:build

# Voir QUICK_START_ANDROID.md pour plus de détails
```

## 🔧 Technologies utilisées

- **Frontend** : React (via CDN), Tailwind CSS
- **Backend** : Firebase (Firestore + Authentication)
- **Déploiement web** : Vercel
- **App mobile** : Capacitor (Android)
- **Notifications** : Web Notification API + Service Worker

## ✨ Fonctionnalités

### Expositions thérapeutiques
- Suivi en temps réel de l'anxiété
- Graphiques d'habituation avec axes gradués
- Messages d'encouragement automatiques
- Historique complet des expositions

### Social
- Feed de groupe pour partager les progrès
- Système de commentaires avec encouragements
- Modération admin (supprimer contenus inappropriés)

### Gamification
- Système de niveaux et XP
- Badges de progression
- Streaks de pratique
- Statistiques détaillées

### Notifications
- Messages d'encouragement en arrière-plan
- Rappels pour noter l'anxiété
- Alertes de pic et habituation
- Support mobile et desktop

### Sécurité
- Rôles utilisateur/admin
- Règles Firestore strictes
- Les utilisateurs ne voient que leurs propres données privées
- Les admins peuvent modérer le contenu public uniquement

## 👥 Rôles

### Utilisateur normal
- Créer des expositions privées et publiques
- Voir le feed public
- Commenter les expositions publiques
- Supprimer ses propres commentaires et expositions

### Admin
- Toutes les permissions utilisateur
- Supprimer n'importe quelle exposition publique (modération)
- Supprimer n'importe quel commentaire (modération)
- Badge visible 👑 Admin

## 🔐 Configuration Firebase

### Firestore
- Collection `users` : Profils utilisateurs (level, xp, role, etc.)
- Collection `exposures` : Expositions privées
- Collection `public_exposures` : Expositions publiques partagées

### Authentication
- Google Sign-In
- Email/Password

### Règles de sécurité
Voir `firestore.rules` pour les règles détaillées.

## 📤 Déploiement

### Web (Vercel)
Automatique à chaque push sur GitHub. Aucune action requise.

### Android (Play Store)
1. Suis le guide dans `GUIDE_BUILD_ANDROID.md`
2. Build l'APK de production
3. Upload sur Google Play Console
4. Attends la validation (1-7 jours)

## 💰 Modèle économique

### Version Web
- **Gratuite**
- Accessible à tous
- Financée par la version payante Android

### Version Android
- **Payante : 1,00 EUR** (achat unique)
- Google prend 15% de commission
- Revenus nets : ~0,68 EUR par vente

## 🛠️ Développement

### Modifier l'app

```bash
# Édite index.html.html
vim index.html.html

# Teste localement
# Ouvre index.html.html dans un navigateur

# Commit
git add index.html.html
git commit -m "Ajout de fonctionnalité X"
git push

# Pour Android : synchronise
npm run android:sync
```

### Ajouter des dépendances Capacitor

```bash
# Exemple : ajouter le plugin Camera
npm install @capacitor/camera
npx cap sync android
```

## 📖 Guides disponibles

- **GUIDE_BUILD_ANDROID.md** : Guide complet pour créer l'app Android
- **QUICK_START_ANDROID.md** : Démarrage rapide Android (10 minutes)
- **GUIDE_NOTIFICATIONS_ENCOURAGEMENT.md** : Fonctionnement des notifications
- **SECURITE_FIREBASE.md** : Configuration de la sécurité Firebase
- **GUIDE_DEBOGAGE.md** : Résolution des problèmes courants

## 🐛 Dépannage

### Vercel ne déploie pas
- Vérifie que le repository GitHub est bien connecté
- Regarde les logs de build dans Vercel Dashboard

### Android ne build pas
```bash
cd android
./gradlew clean build
```

### Firebase ne fonctionne pas
- Vérifie les règles Firestore
- Vérifie que l'authentification est activée
- Pour Android : vérifie que `google-services.json` est présent

## 🤝 Contribution

Ce projet est privé. Modifications uniquement par les propriétaires.

## 📄 Licence

Propriétaire - Tous droits réservés

## 📞 Support

Pour toute question ou problème :
1. Consulte les guides dans le projet
2. Vérifie les logs (Vercel Dashboard, Android Logcat, Firebase Console)
3. Google ton erreur + "Capacitor" ou "Firebase"

---

**Fait avec ❤️ pour accompagner les personnes dans leur thérapie d'exposition**
