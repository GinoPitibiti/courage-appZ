# Guide des Notifications d'Encouragement - Courage App

Ce guide explique comment fonctionnent les notifications d'encouragement pendant les expositions.

## 🎯 Qu'est-ce que c'est ?

Les **notifications d'encouragement** sont des messages automatiques qui apparaissent pendant tes expositions pour te soutenir, même si tu n'es pas sur l'onglet de l'app.

### Exemples de notifications :
- 💪 "Continue de t'exposer ! L'anxiété va finir par baisser !"
- 🔥 "Le pic est là ! C'est normal, tiens bon. Ça va bientôt redescendre naturellement !"
- 🎯 "Excellent ! Ton anxiété baisse ! C'est l'habituation en action. Tu vois ? Ça marche !"
- 📝 "Ça fait 5 minutes ! Note ton niveau d'anxiété MAINTENANT pour suivre ta courbe d'habituation."
- 🎉 "BRAVO ! Tu peux arrêter maintenant ! L'exposition est RÉUSSIE !"

## ✨ Comment ça fonctionne ?

### Comportement automatique :

1. **Si tu es sur l'onglet de l'app** : Les messages apparaissent normalement dans l'interface
2. **Si tu es sur un autre onglet ou app** : Tu reçois une notification push sur ton appareil

C'est **automatique** ! Les notifications s'adaptent selon que tu regardes l'app ou non.

## 🔔 Activation des notifications

### Sur ordinateur (Desktop) :

1. **Ouvre l'app** Courage
2. Sur la page d'accueil, cherche la boîte orange **"🔔 Notifications"**
3. Clique sur le bouton **"Activer"**
4. Une popup du navigateur apparaît → Clique sur **"Autoriser"**
5. ✅ Une notification de test apparaît : "Notifications activées ! 🎉"
6. C'est tout ! Les notifications fonctionnent maintenant

### Sur mobile (téléphone) :

1. **Ouvre l'app** sur ton téléphone (via Vercel)
2. Clique sur **"Activer"** les notifications
3. Accepte la permission dans la popup
4. ✅ Tu recevras maintenant des notifications même si l'app est fermée !

## 📱 Cas d'usage typique

Imagine que tu fais une exposition en situation réelle (par exemple, aller au supermarché) :

1. Tu **lances l'exposition** sur l'app
2. Tu **mets le téléphone dans ta poche** et tu rentres dans le magasin
3. L'app continue de tourner en arrière-plan
4. **Après 5 minutes**, tu reçois une notification : "📝 Ça fait 5 minutes ! Note ton niveau d'anxiété..."
5. Tu sors le téléphone, notes ton anxiété, et tu le remets dans ta poche
6. **Le pic arrive**, tu reçois : "🔥 Le pic est là ! Tiens bon, ça va redescendre !"
7. **Ton anxiété baisse**, tu reçois : "🎯 Excellent ! Ton anxiété baisse !"
8. **Critère de réussite atteint**, tu reçois : "🎉 BRAVO ! Tu peux arrêter maintenant !"

**Tout ça sans avoir à regarder l'écran constamment !**

## 🧪 Tester les notifications

### Test simple :

1. Active les notifications dans l'app
2. Lance une exposition
3. **Change d'onglet** ou minimise le navigateur
4. Attends quelques secondes
5. Tu devrais recevoir des notifications d'encouragement !

### Test sur mobile :

1. Active les notifications
2. Lance une exposition
3. **Verrouille ton téléphone** ou passe à une autre app
4. Les notifications apparaîtront sur ton écran de verrouillage !

## 🔍 Quand les notifications apparaissent-elles ?

Les notifications sont envoyées **automatiquement** dans ces situations :

### Pendant l'exposition :
- ⏰ **Toutes les minutes** après 5 minutes (si anxiété ≥ 6) : Messages de motivation
- 📝 **Toutes les 5 minutes** : Rappel de noter l'anxiété
- 🔥 **Au pic d'anxiété** : Message de soutien
- 🎯 **Quand l'anxiété baisse** : Message de félicitations
- ✨ **Au plateau** : Message d'encouragement

### Quand tu notes ton anxiété :
- 🎉 **Amélioration de 2+ points** : "Wow ! Tu gères de mieux en mieux !"
- ✨ **Légère baisse** : "Ça baisse ! Continue, c'est parfait !"

### Critère de réussite :
- 🎉 **Anxiété sous 6** (après le pic) : "BRAVO ! Tu peux arrêter maintenant !"
- 🌟 **Anxiété ≤ 3** : "EXCELLENT ! Exposition exceptionnellement réussie !"

## 💡 Avantages

✅ **Mains libres** : Tu n'as pas besoin de regarder l'écran constamment
✅ **En situation réelle** : Parfait pour les expositions in vivo (supermarché, transport, etc.)
✅ **Encouragement continu** : Tu restes motivé même si tu ne vois pas l'interface
✅ **Rappels importants** : Tu n'oublies pas de noter ton anxiété toutes les 5 minutes
✅ **Renforcement positif** : Tu sais immédiatement quand tu progresses

## ⚙️ Paramètres

### Désactiver les notifications :

**Sur Chrome (Desktop) :**
1. Clique sur le **cadenas** 🔒 dans la barre d'adresse
2. À côté de "Notifications", sélectionne **"Bloquer"**

**Sur Chrome (Mobile) :**
1. Paramètres du navigateur → Paramètres des sites → Notifications
2. Trouve "Courage App" et désactive

**Sur Safari (iOS) :**
1. Réglages iOS → Safari → Notifications
2. Désactive pour le site Courage

### Réactiver après avoir bloqué :

1. Supprime le blocage dans les paramètres du navigateur
2. Rafraîchis l'app
3. Clique à nouveau sur **"Activer"**

## 🛠️ Dépannage

### "Je ne reçois pas de notifications"

**Vérifie que :**
1. Tu as cliqué sur **"Activer"** dans l'app
2. Tu as accepté la permission dans la popup du navigateur
3. Les notifications ne sont pas bloquées dans les paramètres de l'OS
4. Tu as **changé d'onglet** ou minimisé le navigateur (sinon les messages apparaissent dans l'interface)

### "Les notifications n'apparaissent pas sur mobile"

**Sur Android :**
- Vérifie que les notifications de Chrome/Firefox ne sont pas en mode silencieux
- Paramètres Android → Notifications → Chrome → Autorisé

**Sur iOS (16.4+) :**
- Vérifie que Safari a la permission dans Réglages iOS → Safari → Notifications

### "La notification de test n'apparaît pas"

C'est peut-être que :
- Tu es encore sur l'onglet de l'app (change d'onglet pour voir la notification)
- Les notifications sont bloquées dans les paramètres du navigateur
- Tu dois recharger la page après avoir changé les permissions

### "Je reçois trop de notifications"

Les notifications suivent la thérapie d'exposition :
- Beaucoup de messages au début (pour maintenir la motivation)
- Messages espacés de 1 minute minimum
- Si tu trouves ça trop, tu peux désactiver les notifications et suivre l'interface normalement

## 📊 Notifications vs Interface

| Situation | Interface | Notification |
|-----------|-----------|--------------|
| Sur l'onglet de l'app | ✅ Messages visibles | ❌ Pas de notification |
| Autre onglet (ordi) | ❌ Pas visible | ✅ Notification push |
| App en arrière-plan (mobile) | ❌ Pas visible | ✅ Notification push |
| Téléphone verrouillé | ❌ Pas visible | ✅ Sur l'écran de verrouillage |

## 🔐 Vie privée

- ✅ Les notifications sont **locales** (elles ne passent pas par un serveur)
- ✅ Tes données ne sont **jamais partagées**
- ✅ Aucun tracking ou analyse des notifications
- ✅ Tu contrôles complètement quand tu les actives/désactives

## 🚀 Technologie

Les notifications d'encouragement utilisent :
- **Web Notification API** : API standard du navigateur
- **Page Visibility API** : Détecte si l'onglet est visible ou non
- **Notifications locales** : Pas besoin de serveur ou de connexion internet pendant l'exposition

Tout fonctionne **en local** sur ton appareil !

---

**Besoin d'aide ?** Les notifications ne sont pas obligatoires. Tu peux toujours utiliser l'app normalement sans les activer. Elles sont juste là pour améliorer ton expérience pendant les expositions en situation réelle ! 💪
