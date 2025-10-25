# 🚀 Quick Start - Build Android en 10 minutes

Tu veux juste build l'app Android rapidement ? Voici les commandes essentielles.

## ⚡ Version super rapide

```bash
# 1. Installe les dépendances (1ère fois seulement)
npm install

# 2. Crée le projet Android (1ère fois seulement)
npx cap add android

# 3. Build et ouvre Android Studio
npm run android:build

# 4. Dans Android Studio, clique sur le bouton ▶️ Run
```

C'est tout ! L'app se lance sur l'émulateur ou ton téléphone.

## 📱 Pour installer sur ton téléphone (sans câble)

```bash
# Build un APK
cd android
./gradlew assembleDebug

# L'APK est créé dans :
# android/app/build/outputs/apk/debug/app-debug.apk

# Envoie ce fichier sur ton téléphone et installe-le !
```

## 🏪 Pour le Play Store

```bash
# 1. Crée une clé de signature (1ère fois seulement)
keytool -genkeypair -v -storetype PKCS12 \
  -keystore courage-release-key.keystore \
  -alias courage-key \
  -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure android/key.properties (voir GUIDE_BUILD_ANDROID.md)

# 3. Build l'APK de production
cd android
./gradlew assembleRelease

# 4. Upload sur Play Console
# Fichier : android/app/build/outputs/apk/release/app-release.apk
```

## 🔄 Après avoir modifié ton code web

```bash
# Synchronise les changements
npm run android:sync

# Puis rebuild dans Android Studio
```

## ⚙️ Prérequis

- **Node.js** : https://nodejs.org/
- **Android Studio** : https://developer.android.com/studio
- **Firebase config** : Télécharge `google-services.json` depuis Firebase Console et place-le dans `android/app/`

## 📖 Guide complet

Pour les détails complets, consulte **GUIDE_BUILD_ANDROID.md**

## 🆘 Problème ?

### L'app ne build pas
```bash
cd android
./gradlew clean
./gradlew build
```

### Android Studio ne trouve pas le SDK
Crée `android/local.properties` :
```
sdk.dir=/path/to/your/Android/sdk
```

### Firebase ne fonctionne pas
1. Vérifie que `android/app/google-services.json` existe
2. Vérifie que le package name est `com.courage.therapie`

---

**Bon build ! 🎉**
