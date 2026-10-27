# Comment collecter les réponses du questionnaire Courant

## En résumé

| Quoi | Détail |
|------|--------|
| Formulaire | [`questionnaire-streaming.html`](./questionnaire-streaming.html) |
| Destination | E-mail **`radjifadilou@gmail.com`** via [FormSubmit.co](https://formsubmit.co) |
| Format reçu | E-mail avec tableau des réponses + champ `reponses_json` (JSON complet) |
| Lien à partager | Voir section « Lien public » ci-dessous (GitHub Pages) |

---

## Où atterrissent les réponses ?

Quand quelqu’un clique sur **Envoyer**, le navigateur envoie un POST JSON à :

`https://formsubmit.co/ajax/radjifadilou@gmail.com`

FormSubmit transfère ensuite un e-mail à **`radjifadilou@gmail.com`** avec :

- un sujet du type *Nouvelle réponse — Étude Courant streaming* ;
- chaque question / réponse (tableau) ;
- le JSON complet dans le champ `reponses_json` (pratique pour archiver ou coller dans un fichier).

**Fadilou voit les réponses dans sa boîte Gmail** (`radjifadilou@gmail.com`) — dossier Principal ou Spam au début. Aucun serveur ni base payante n’est requis.

Les boutons « Télécharger une copie JSON » / « Copier » restent disponibles en secours (copie locale sur l’appareil du répondant).

---

## Première activation FormSubmit (obligatoire une fois)

La **première** soumission vers une nouvelle adresse déclenche un e-mail d’activation FormSubmit.

1. Ouvrez la boîte **`radjifadilou@gmail.com`**.
2. Cherchez un message de **FormSubmit** (sujet du type *Confirm your email* / *Activate FormSubmit*).
3. Cliquez sur le lien de confirmation.
4. Ensuite, **toutes** les réponses suivantes arrivent normalement sans nouvelle confirmation.

Tant que ce lien n’est pas cliqué, l’envoi peut échouer et le formulaire affichera un message demandant d’activer FormSubmit.

Astuce : faites un premier test vous-même (remplir le minimum requis + Envoyer), puis activez l’e-mail avant de partager le lien largement.

---

## Lien public à partager

Le HTML du store Cursor n’est pas une URL publique. Le formulaire est **déjà sur `main`** du dépôt `fadilou-maker/app_streaming` (dossier `docs/`).

### Lien définitif — GitHub Pages (à activer une fois)

Le dépôt est **privé** : Pages public nécessite de le rendre public (ou un plan GitHub Pro). L’agent n’a pas pu changer ça via API.

**À faire dans GitHub (≈ 1 min) :**

1. Ouvrir https://github.com/fadilou-maker/app_streaming/settings  
2. Section **General** → **Danger Zone** → **Change repository visibility** → **Make public**  
3. Puis **Pages** (menu gauche) → Source **Deploy from a branch** → branche **`main`** → dossier **`/docs`** → Save  
4. Attendre 1–2 minutes, puis ouvrir :

   **`https://fadilou-maker.github.io/app_streaming/questionnaire-streaming.html`**

5. Partager ce lien WhatsApp / e-mail / réseaux.

### Option locale (tests seulement)

Ouvrir le fichier HTML localement fonctionne pour remplir le formulaire, mais l’envoi AJAX FormSubmit nécessite une connexion internet ; un hébergement HTTPS (Pages) est plus fiable pour les répondants.

---

## Comment ouvrir / télécharger les réponses

1. Dans Gmail, ouvrez chaque e-mail de réponse.
2. Lisez le tableau, ou copiez le contenu de `reponses_json` dans un fichier `.json`.
3. Pour un tableau unique : créez une Google Sheet et collez / importez les JSON au fil de l’eau (ou utilisez « Télécharger une copie JSON » côté répondant si vous collectez autrement).

Pas d’export automatique en fichier unique côté FormSubmit gratuit : chaque réponse = un e-mail. Pour une base centralisée plus tard, on pourra brancher une Google Sheet (Apps Script) ou une petite API.

---

## Changer l’e-mail de destination

Dans `questionnaire-streaming.html`, variable JS :

```js
var FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/radjifadilou@gmail.com";
```

Remplacez l’adresse, puis **réactivez** FormSubmit pour la nouvelle adresse (e-mail de confirmation une fois).

---

## Dépannage

| Symptôme | Que faire |
|----------|-----------|
| Message « Activez FormSubmit… » | Confirmer l’e-mail FormSubmit sur `radjifadilou@gmail.com` |
| Rien dans la boîte | Vérifier Spam / Promotions ; refaire un envoi test |
| Erreur réseau | Connexion internet du répondant ; sinon copie JSON locale |
| Lien Pages 404 | Vérifier Settings → Pages et le chemin du fichier |
