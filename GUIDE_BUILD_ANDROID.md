# 📱 Guide de Build Android - Courage App

Ce guide t'explique comment transformer ton app web en app Android native pour le Play Store.

## ✅ Prérequis

### 1. Node.js et npm
```bash
# Vérifie que tu as Node.js installé
node --version  # Doit être >= 16
npm --version
```

Si pas installé, télécharge depuis : https://nodejs.org/

### 2. Android Studio
- Télécharge Android Studio : https://developer.android.com/studio
- Installe-le avec les options par défaut
- Lors du premier lancement, laisse installer tous les SDK Android

### 3. Java JDK
Android Studio installe normalement Java automatiquement. Vérifie :
```bash
java --version  # Doit être >= 11
```

## 🚀 Étape 1 : Installation des dépendances

Dans le dossier du projet :

```bash
# Installe les dépendances Capacitor
npm install
```

Ça va installer :
- `@capacitor/core` : Le cœur de Capacitor
- `@capacitor/android` : Support Android
- `@capacitor/cli` : Outils en ligne de commande
- Plugins : notifications push, splash screen, etc.

## 📦 Étape 2 : Initialiser le projet Android

```bash
# Crée le projet Android
npx cap add android
```

Cette commande va :
- ✅ Créer le dossier `android/` avec le projet Android Studio
- ✅ Copier tes fichiers web dedans
- ✅ Configurer le projet Android

**Résultat attendu :**
```
✔ Adding native android project in android in 2.45s
✔ add in 2.46s
✔ Copying web assets from . to android/app/src/main/assets/public in 324.83ms
✔ Creating capacitor.config.json in android/app/src/main/assets in 1.75ms
✔ copy android in 351.37ms
✔ Updating Android plugins in 2.24ms
```

## 🔧 Étape 3 : Configuration Firebase Android

### 3.1. Créer l'app Android dans Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionne ton projet : **courage-therapie**
3. Clique sur ⚙️ **Project Settings**
4. Scroll jusqu'à **Your apps**
5. Clique sur l'icône **Android** (robot)
6. Remplis :
   - **Android package name** : `com.courage.therapie`
   - **App nickname** : Courage Android
   - **Debug signing certificate** : (laisse vide pour l'instant)
7. Clique sur **Register app**

### 3.2. Télécharger google-services.json

1. Firebase te donne un fichier **google-services.json**
2. **Télécharge-le**
3. **Place-le** dans : `android/app/google-services.json`

```bash
# Vérifie que le fichier est au bon endroit
ls android/app/google-services.json
```

### 3.3. Configurer Firestore et Auth pour Android

Dans Firebase Console :
1. **Authentication** → Onglet **Sign-in method** → Ajoute Android :
   - Package name : `com.courage.therapie`
   - SHA-1 (pour Google Sign-In) : On le génèrera plus tard si besoin

2. **Firestore Database** :
   - Pas de config supplémentaire, les règles sont déjà en place

## 🔄 Étape 4 : Sync et Open

Chaque fois que tu modifies ton code web, tu dois synchroniser :

```bash
# Synchronise les fichiers web vers Android
npm run android:sync
```

Puis ouvre Android Studio :

```bash
# Ouvre le projet dans Android Studio
npm run android:open
```

**Ou les deux d'un coup :**
```bash
npm run android:build
```

## 🏗️ Étape 5 : Build l'app Android

### Option A : Via Android Studio (Recommandé pour débuter)

1. Android Studio s'ouvre avec ton projet
2. Attends que Gradle finisse de synchroniser (en bas : "Gradle sync")
3. Vérifie qu'un **émulateur** ou **appareil réel** est détecté (en haut)
4. Clique sur le bouton **▶️ Run** (ou Shift + F10)
5. L'app se lance sur l'émulateur/téléphone !

### Option B : Via la ligne de commande

```bash
# Build un APK de debug
cd android
./gradlew assembleDebug

# L'APK sera dans :
# android/app/build/outputs/apk/debug/app-debug.apk
```

Tu peux installer cet APK sur n'importe quel Android !

## 📲 Étape 6 : Tester sur ton téléphone

### Test rapide (sans câble)

1. Build l'APK : `cd android && ./gradlew assembleDebug`
2. Récupère le fichier : `android/app/build/outputs/apk/debug/app-debug.apk`
3. Envoie-le sur ton téléphone (email, Google Drive, etc.)
4. Sur le téléphone : Active **"Sources inconnues"** dans Paramètres → Sécurité
5. Installe l'APK !

### Test avec câble USB

1. Active le **mode développeur** sur ton Android :
   - Paramètres → À propos du téléphone
   - Tape 7 fois sur "Numéro de build"
2. Active le **débogage USB** :
   - Paramètres → Options de développement → Débogage USB
3. Branche ton téléphone en USB
4. Dans Android Studio, clique sur **▶️ Run**
5. Sélectionne ton téléphone dans la liste

## 🎨 Étape 7 : Personnaliser l'app

### Icône de l'app

1. Crée une icône **1024x1024 px** (format PNG)
2. Va sur : https://icon.kitchen/
3. Upload ton icône
4. Télécharge le pack Android
5. Copie les fichiers dans :
   ```
   android/app/src/main/res/
   ├── mipmap-hdpi/
   ├── mipmap-mdpi/
   ├── mipmap-xhdpi/
   ├── mipmap-xxhdpi/
   └── mipmap-xxxhdpi/
   ```

### Splash Screen

1. Crée une image **2732x2732 px** (PNG avec fond)
2. Renomme-la en `splash.png`
3. Place-la dans :
   ```
   android/app/src/main/res/drawable/splash.png
   ```

### Nom de l'app

Édite `android/app/src/main/res/values/strings.xml` :
```xml
<resources>
    <string name="app_name">Courage</string>
    <string name="title_activity_main">Courage</string>
</resources>
```

## 🏪 Étape 8 : Build pour le Play Store

### 8.1. Créer une clé de signature (Keystore)

```bash
# Génère une clé de signature
keytool -genkeypair -v -storetype PKCS12 \
  -keystore courage-release-key.keystore \
  -alias courage-key \
  -keyalg RSA -keysize 2048 -validity 10000

# Il va te demander :
# - Mot de passe : GARDE-LE PRÉCIEUSEMENT !
# - Nom, organisation, etc. : Remplis ce que tu veux
```

**⚠️ IMPORTANT : Sauvegarde ce fichier et le mot de passe !**
Si tu les perds, tu ne pourras JAMAIS mettre à jour ton app sur le Play Store.

### 8.2. Configurer Gradle pour la signature

Crée le fichier `android/key.properties` :
```properties
storePassword=TON_MOT_DE_PASSE
keyPassword=TON_MOT_DE_PASSE
keyAlias=courage-key
storeFile=../courage-release-key.keystore
```

**⚠️ Ajoute ce fichier au .gitignore !**

Édite `android/app/build.gradle`, trouve la section `android {` et ajoute :

```gradle
android {
    // ... existing config ...

    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("key.properties")
            def keystoreProperties = new Properties()
            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 8.3. Build l'APK de production

```bash
cd android
./gradlew assembleRelease

# L'APK signé sera dans :
# android/app/build/outputs/apk/release/app-release.apk
```

Cet APK est prêt pour le Play Store ! 🎉

## 📤 Étape 9 : Publier sur le Play Store

### 9.1. Créer un compte Google Play Developer

1. Va sur : https://play.google.com/console/signup
2. Paye les **25$ one-time** (valable à vie)
3. Remplis les infos sur toi/ton entreprise

### 9.2. Créer une nouvelle app

1. Dans la [Play Console](https://play.google.com/console)
2. Clique sur **Créer une application**
3. Remplis :
   - **Nom** : Courage
   - **Langue par défaut** : Français
   - **Application ou jeu** : Application
   - **Gratuite ou payante** : Payante (1€)

### 9.3. Remplir la fiche de l'app

Tu devras fournir :

**Textes :**
- **Description courte** (80 caractères max)
- **Description complète** (4000 caractères max)
- **Captures d'écran** (téléphone : min 2, recommandé 8)
  - Taille : 16:9 ou 9:16
  - Min : 320px sur le côté court
- **Icône haute résolution** : 512x512 px
- **Bannière de fonctionnalité** : 1024x500 px (optionnel mais recommandé)

**Catégorie :**
- Santé et remise en forme

**Coordonnées :**
- Email de contact
- Politique de confidentialité (URL)

**Tarification :**
- Prix : 1,00 EUR
- Disponible dans : (sélectionne les pays)

### 9.4. Upload l'APK

1. Va dans **Production** → **Créer une version**
2. Upload `app-release.apk`
3. Remplis les **Notes de version** :
   ```
   Version 1.0 - Première version
   - Suivi des expositions thérapeutiques
   - Graphiques d'anxiété
   - Feed de groupe
   - Notifications d'encouragement
   ```
4. Clique sur **Enregistrer** puis **Examiner la version**
5. Si tout est OK, clique sur **Démarrer le déploiement en production**

### 9.5. Attendre la validation

- Google va examiner ton app (1-7 jours généralement)
- Tu recevras un email quand c'est validé
- Ton app sera disponible sur le Play Store ! 🎉

## 🔄 Workflow de mise à jour

Quand tu veux mettre à jour l'app :

```bash
# 1. Modifie ton code web (index.html.html)
git add .
git commit -m "Nouvelles fonctionnalités"
git push  # Vercel se met à jour automatiquement

# 2. Synchronise vers Android
npm run android:sync

# 3. Incrémente la version dans android/app/build.gradle :
# versionCode 2 (était 1)
# versionName "1.1" (était "1.0")

# 4. Build le nouvel APK
cd android
./gradlew assembleRelease

# 5. Upload sur Play Console
# Va dans Production → Créer une version
# Upload le nouvel app-release.apk
```

## 🐛 Dépannage

### "SDK location not found"

```bash
# Crée android/local.properties avec :
sdk.dir=/Users/TON_NOM/Library/Android/sdk  # Mac
# ou
sdk.dir=C\:\\Users\\TON_NOM\\AppData\\Local\\Android\\Sdk  # Windows
```

### "Gradle sync failed"

1. Dans Android Studio : File → Invalidate Caches / Restart
2. Ou en ligne de commande :
```bash
cd android
./gradlew clean
./gradlew build
```

### L'app ne se lance pas

Vérifie les logs :
```bash
# Via Android Studio : Logcat (en bas)
# Ou en ligne de commande :
adb logcat | grep Courage
```

### Firebase ne fonctionne pas

1. Vérifie que `google-services.json` est dans `android/app/`
2. Vérifie que le package name est `com.courage.therapie` partout
3. Dans Firebase Console, ajoute le SHA-1 de debug :
```bash
cd android
./gradlew signingReport
# Copie le SHA-1 et ajoute-le dans Firebase Console
```

## 📊 Statistiques et revenus

Une fois publiée, tu pourras voir dans Play Console :
- **Nombre de téléchargements**
- **Revenus générés** (1€ × nombre de ventes - 15% de commission)
- **Notes et avis** des utilisateurs
- **Crashs** et erreurs
- **Statistiques d'utilisation**

## 💰 Revenus estimés

Si tu vends à **1,00 EUR** :
- Google prend **15%** (si < $1M/an de revenus)
- TVA locale (environ 20% en France)
- **Tu touches environ 0,68 EUR par vente**

Exemple :
- 100 ventes = ~68 EUR
- 1000 ventes = ~680 EUR
- 10000 ventes = ~6800 EUR

## 🎯 Next Steps

Une fois que l'app Android est publiée :

1. **Marketing** : Partage le lien Play Store sur les réseaux
2. **Feedback** : Écoute les avis utilisateurs
3. **Mises à jour** : Améliore l'app régulièrement
4. **iOS** : Si ça marche bien, on peut faire la version iOS !

## 📞 Besoin d'aide ?

Si tu bloques quelque part :
1. Vérifie les logs dans Android Studio
2. Google ton erreur + "Capacitor Android"
3. Docs officielles : https://capacitorjs.com/docs/android

---

**Tu es prêt à créer ton app Android ! 🚀**

Commence par l'Étape 1 et suis le guide pas à pas.
