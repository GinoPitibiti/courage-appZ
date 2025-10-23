# 🔍 Guide de débogage - Courage App

## Problème : Les expositions disparaissent après reconnexion

### 🧪 Étapes de diagnostic

#### 1. Ouvrir la console du navigateur
- Appuyez sur **F12** (ou Cmd+Option+I sur Mac)
- Allez dans l'onglet **Console**

#### 2. Se reconnecter à l'application
- Déconnectez-vous puis reconnectez-vous
- Regardez les messages dans la console

#### 3. Analyser les logs

Vous devriez voir :
```
🔄 Chargement des données utilisateur... [uid]
👤 Utilisateur chargé - Nom: [votre nom] Rôle: user
📚 Chargement des expositions...
✅ 3 exposition(s) chargée(s) depuis Firebase
```

### ❌ Si vous voyez "0 exposition(s) chargée(s)"

**Causes possibles :**

#### A. Index Firestore manquant

**Symptôme** : Une erreur comme :
```
Error: The query requires an index
```

**Solution** :
1. Firebase va afficher un **lien cliquable** dans l'erreur
2. **Cliquez sur le lien** - il vous emmènera directement sur Firebase Console
3. **Cliquez sur "Create Index"**
4. **Attendez 2-5 minutes** que l'index se crée
5. **Rechargez la page** de l'application

#### B. Règles de sécurité trop strictes

**Symptôme** : Une erreur comme :
```
Error: Missing or insufficient permissions
Code: permission-denied
```

**Solution** :
1. Allez sur **Firebase Console** → Votre projet
2. **Firestore Database** → **Règles**
3. Vérifiez que les règles permettent la lecture :

```javascript
// Dans la collection exposures
match /exposures/{exposureId} {
  allow read: if isOwner(resource.data.userId);
  // ...
}
```

4. Si vous n'avez PAS encore appliqué les règles de `firestore.rules`, **faites-le maintenant** (voir SECURITE_FIREBASE.md)

#### C. Problème de date/timestamp

**Symptôme** : Pas d'erreur, mais 0 expositions

**Solution temporaire** :
Dans la console du navigateur, tapez :
```javascript
// Lister toutes vos expositions sans orderBy
db.collection('exposures')
  .where('userId', '==', firebase.auth().currentUser.uid)
  .get()
  .then(snap => console.log("Expositions trouvées:", snap.size))
```

Si des expositions sont trouvées, c'est un problème d'index sur `createdAt`.

### 🆕 Créer un index manuellement

Si Firebase ne crée pas automatiquement l'index :

1. Allez sur **Firebase Console** → **Firestore Database** → **Index**
2. Cliquez sur **"Create Index"**
3. Configurez :
   - **Collection ID** : `exposures`
   - **Champs** :
     - `userId` (Ascending)
     - `createdAt` (Descending)
   - **Query scopes** : Collection
4. Cliquez sur **"Create"**
5. Attendez que le statut passe à "Enabled" (vert)

---

## Problème : Nom "USER" au lieu du nom Google

### 🧪 Étapes de diagnostic

#### 1. Ouvrir la console lors de la création d'exposition

Créez une exposition publique et regardez la console :

**Logs attendus :**
```
📤 Création d'une exposition publique...
✓ Nom depuis Firebase Auth: Jean Dupont
✅ Nom utilisateur stocké: Jean Dupont
```

**Si vous voyez :**
```
⚠️ Aucun displayName trouvé, utilisation de 'Utilisateur'
```

### ❌ Solutions selon le problème

#### A. Compte Google sans nom configuré

Votre compte Google n'a peut-être pas de nom public configuré.

**Vérification** :
1. Allez sur https://myaccount.google.com/
2. Vérifiez dans "Informations personnelles" → "Nom"
3. Assurez-vous qu'un nom est configuré

**Solution rapide** : L'app utilisera la première partie de votre email

#### B. Mise à jour du displayName

Si vous venez de changer votre nom Google :

1. **Déconnectez-vous** de l'application
2. **Reconnectez-vous** avec Google
3. Le nom devrait se mettre à jour automatiquement

**Vérifiez dans la console** :
```
🔐 Connexion Google réussie
Nom Google: Jean Dupont
✅ DisplayName mis à jour: Jean Dupont
```

#### C. Correction manuelle dans Firestore

Si le nom ne se met pas à jour :

1. Allez sur **Firebase Console** → **Firestore Database** → **Data**
2. Collection **users** → Votre document (cherchez avec votre email)
3. Modifiez le champ **displayName**
4. Rechargez l'application

---

## 🛠️ Commandes de débogage utiles

### Dans la console du navigateur

#### Vérifier l'utilisateur connecté
```javascript
console.log("User:", firebase.auth().currentUser);
console.log("DisplayName:", firebase.auth().currentUser.displayName);
```

#### Compter les expositions
```javascript
db.collection('exposures')
  .where('userId', '==', firebase.auth().currentUser.uid)
  .get()
  .then(snap => console.log("Total expositions:", snap.size))
```

#### Lister toutes les expositions
```javascript
db.collection('exposures')
  .where('userId', '==', firebase.auth().currentUser.uid)
  .get()
  .then(snap => {
    snap.forEach(doc => {
      console.log("Exposition:", doc.data());
    });
  })
```

#### Vérifier le profil utilisateur
```javascript
db.collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then(doc => console.log("Profil:", doc.data()))
```

#### Forcer la mise à jour du displayName
```javascript
const uid = firebase.auth().currentUser.uid;
const displayName = firebase.auth().currentUser.displayName;
db.collection('users').doc(uid).update({ displayName: displayName })
  .then(() => console.log("✅ DisplayName mis à jour"))
  .then(() => window.location.reload())
```

---

## 📊 Vérifier l'état de Firebase

### Index requis

Dans **Firebase Console** → **Firestore Database** → **Index**, vous devriez avoir :

1. **Collection** : `exposures`
   - **Champs** : `userId` (ASC), `createdAt` (DESC)
   - **Statut** : Enabled ✅

2. **Collection** : `public_exposures`
   - **Champs** : `createdAt` (DESC)
   - **Statut** : Enabled ✅

### Règles de sécurité appliquées

Dans **Firestore Database** → **Règles**, vérifiez que les règles sont bien celles du fichier `firestore.rules`.

La première ligne devrait être :
```javascript
rules_version = '2';
```

---

## 🚨 Problèmes courants et solutions rapides

| Problème | Solution rapide |
|----------|----------------|
| 0 expositions après reconnexion | Créer l'index Firestore pour `exposures` |
| Nom "USER" | Se reconnecter avec Google |
| Erreur "permission-denied" | Appliquer les règles de sécurité |
| Expositions ne s'affichent pas | Vérifier la console pour les erreurs |
| Lenteur de chargement | Vérifier la connexion internet |

---

## 📞 Besoin d'aide ?

Si le problème persiste :

1. **Ouvrez la console** (F12)
2. **Reproduisez le problème**
3. **Copiez TOUS les messages de la console**
4. **Notez les étapes exactes** pour reproduire
5. **Partagez les informations** avec votre développeur

### Informations utiles à fournir

- Version du navigateur
- Messages d'erreur exacts
- Capture d'écran de la console
- Ce que vous avez essayé
- Quand le problème a commencé

---

## ✅ Checklist de vérification

Avant de demander de l'aide, vérifiez :

- [ ] La console est ouverte (F12)
- [ ] Les logs s'affichent correctement
- [ ] Les règles Firebase sont appliquées
- [ ] Les index Firestore sont créés (et "Enabled")
- [ ] J'ai essayé de me déconnecter/reconnecter
- [ ] J'ai vérifié que mon compte Google a un nom
- [ ] J'ai attendu quelques minutes après la création des index

Bonne chance ! 🍀
