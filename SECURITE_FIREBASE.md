# 🔒 Guide de sécurité Firebase pour Courage App

## Pourquoi la sécurité est importante ?

Dans une application thérapeutique, **la confidentialité est primordiale**. Les utilisateurs partagent des informations sensibles sur leur anxiété, leurs peurs, et leurs progrès. Il est essentiel de :

1. ✅ Protéger les expositions privées (personne d'autre ne doit y accéder)
2. ✅ Permettre le partage contrôlé via les expositions publiques
3. ✅ Permettre à un modérateur (thérapeute) de gérer le contenu inapproprié
4. ✅ Empêcher les modifications non autorisées des données

## 📋 Étape 1 : Appliquer les règles de sécurité Firestore

### Via la Console Firebase (Recommandé)

1. **Connecte-toi à Firebase Console** : https://console.firebase.google.com/
2. **Sélectionne ton projet** "courage-therapie"
3. **Va dans "Firestore Database"** (dans le menu de gauche)
4. **Clique sur l'onglet "Règles"** (Rules)
5. **Copie-colle le contenu du fichier `firestore.rules`** dans l'éditeur
6. **Clique sur "Publier"** (Publish)

### Via Firebase CLI (Alternative)

```bash
# Installe Firebase CLI si pas déjà fait
npm install -g firebase-tools

# Connecte-toi
firebase login

# Initialise le projet (si pas déjà fait)
firebase init firestore

# Déploie les règles
firebase deploy --only firestore:rules
```

## 👤 Étape 2 : Te définir comme Admin

Pour que tu puisses modérer le contenu, il faut ajouter le rôle "admin" à ton compte.

### Option A : Via la Console Firestore (Plus simple)

1. Va dans **Firestore Database** → **Data**
2. Ouvre la collection **"users"**
3. Trouve **ton document utilisateur** (cherche ton email ou displayName)
4. Clique sur le document pour l'éditer
5. **Ajoute un nouveau champ** :
   - Nom du champ : `role`
   - Type : `string`
   - Valeur : `admin`
6. Sauvegarde

### Option B : Via le code (une seule fois)

Ajoute ce code temporaire dans ton app (dans la console du navigateur) après t'être connecté :

```javascript
// À exécuter UNE SEULE FOIS dans la console du navigateur
const userId = firebase.auth().currentUser.uid;
firebase.firestore().collection('users').doc(userId).update({
  role: 'admin'
}).then(() => {
  console.log("✅ Rôle admin ajouté avec succès !");
  alert("Tu es maintenant admin ! Recharge la page.");
}).catch((error) => {
  console.error("Erreur:", error);
});
```

## 🎯 Étape 3 : Ajouter d'autres admins (optionnel)

Si tu veux donner les droits d'admin à d'autres thérapeutes :

1. Va dans Firestore Database → Data
2. Trouve le document de l'utilisateur dans la collection "users"
3. Ajoute le champ `role: "admin"`

## 🧪 Étape 4 : Tester la sécurité

### Test 1 : Expositions privées
1. Connecte-toi avec un compte utilisateur (non-admin)
2. Crée une exposition **privée**
3. Déconnecte-toi et connecte-toi avec un autre compte
4. Tu ne dois **PAS** pouvoir voir l'exposition privée du premier utilisateur ✅

### Test 2 : Expositions publiques
1. Crée une exposition **publique**
2. Elle doit apparaître dans le feed pour tous les utilisateurs ✅

### Test 3 : Droits admin
1. Connecte-toi avec ton compte admin
2. Tu dois pouvoir supprimer n'importe quelle exposition inappropriée ✅

## ⚠️ Règles de sécurité en résumé

### Collection `users`
- ✅ Chaque utilisateur peut lire/modifier son propre profil
- ✅ Les admins peuvent lire tous les profils
- ❌ Personne ne peut changer son propre rôle (anti-escalade de privilèges)

### Collection `exposures` (expositions privées)
- ✅ Chaque utilisateur voit uniquement ses propres expositions
- ✅ Les admins peuvent supprimer (mais avec accès limité aux détails)
- ❌ Impossible d'accéder aux expositions privées des autres

### Collection `public_exposures` (feed public)
- ✅ Tous les utilisateurs authentifiés peuvent lire
- ✅ Chacun peut ajouter des commentaires et incrémenter les vues
- ✅ Le propriétaire peut modifier/supprimer son exposition
- ✅ Les admins peuvent supprimer les contenus inappropriés

## 🔐 Sécurité supplémentaire recommandée

### 1. Règles d'authentification
Dans Firebase Console → Authentication → Settings :
- Active l'option "Email enumeration protection"
- Configure les templates d'emails (reset password, verification)

### 2. Limite de requêtes
Dans Firestore → Usage → Set budget alerts :
- Configure des alertes pour détecter un usage anormal
- Limite les lectures/écritures par utilisateur

### 3. Backup régulier
- Active les exports automatiques de Firestore
- Garde des backups de ta base de données

## 🚨 En cas de problème

### Erreur "Missing or insufficient permissions"
➡️ Les règles sont bien actives ! Vérifie que :
- L'utilisateur est bien connecté
- Il essaie d'accéder à ses propres données
- Le rôle admin est bien configuré si nécessaire

### Les utilisateurs ne peuvent plus créer d'expositions
➡️ Vérifie que :
- Le champ `userId` correspond bien à `request.auth.uid`
- Tous les champs requis sont présents lors de la création

### Besoin de désactiver temporairement les règles (URGENCE UNIQUEMENT)
```javascript
// À utiliser UNIQUEMENT en cas d'urgence, JAMAIS en production
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📞 Support

Si tu as des questions ou des problèmes avec la configuration :
1. Vérifie les logs dans Firebase Console → Firestore → Rules → "View requests"
2. Regarde la console du navigateur pour les erreurs JavaScript
3. Teste avec différents comptes utilisateurs

## ✅ Checklist finale

- [ ] Règles Firestore déployées
- [ ] Rôle admin ajouté à ton compte
- [ ] Testé avec un compte utilisateur normal (ne voit pas les expositions privées des autres)
- [ ] Testé avec ton compte admin (peut supprimer du contenu)
- [ ] Les expositions publiques apparaissent dans le feed
- [ ] Les commentaires fonctionnent
- [ ] La suppression de commentaires fonctionne

Bravo ! Ton application est maintenant sécurisée ! 🎉🔒
