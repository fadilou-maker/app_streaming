# Envoi des réponses du questionnaire vers Google Sheets

Ce projet est un site statique (GitHub Pages). Un site statique ne peut pas envoyer directement un email depuis le navigateur sans un service intermédiaire.

La solution la plus simple est :

1. Créer une feuille Google Sheets
2. Créer un script Google Apps Script
3. Déployer ce script comme "Web App"
4. Remplacer la valeur `PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` dans `docs/google-sheet-submitter.js`
5. Ajouter le script dans la page HTML

## 1) Créer la feuille Google

- Ouvrir Google Sheets
- Créer un nouveau fichier
- Nommer le fichier : `Questionnaire streaming`
- Ajouter les colonnes principales : `submitted_at`, `email`, `consent`, `age`, etc.

## 2) Créer le script Apps Script

Dans Google Sheets :

- `Outils` > `Éditeur de scripts`
- Coller ce code :

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Feuille1');

    if (!sheet) {
      SpreadsheetApp.getActiveSpreadsheet().insertSheet('Feuille1');
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = [
      'submitted_at',
      'email',
      'consent',
      'age',
      'country',
      'city',
      'device',
      'connection',
      'freq_streaming',
      'freq_messaging',
      'content_types',
      'discovery',
      'streaming_opinion',
      'streaming_pref',
      'streaming_pref_other',
      'streaming_why',
      'all_in_one_interest',
      'whatsapp_opinion',
      'whatsapp_why',
      'secure_alts_known',
      'secure_alts_names',
      'alts_barriers',
      'african_messaging_known',
      'african_messaging_names',
      'barriers',
      'barriers_comment',
      'privacy_concern',
      'data_sensitive',
      'data_sensitive_comment',
      'ui_languages',
      'ui_language_other',
      'content_languages',
      'african_content_interest',
      'netflix_like',
      'music_features',
      'video_features'
    ];

    const row = headers.map((key) => {
      const value = payload[key];
      if (Array.isArray(value)) return value.join('; ');
      if (value === undefined || value === null) return '';
      return String(value);
    });

    sheet.appendRow(row);

    GmailApp.sendEmail(
      'radjifadilou@gmail.com',
      'Nouveau formulaire rempli',
      'Une nouvelle réponse a été reçue.\n\n' + JSON.stringify(payload, null, 2)
    );

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3) Déployer le script comme "Web App"

- `Déploiement` > `Nouveau déploiement`
- Type : `Application Web`
- Exécuter en tant que : `Moi`
- Qui a accès : `Tout le monde`
- Copier l'URL obtenue

Exemple :

```text
https://script.google.com/macros/s/AKfycb.../exec
```

## 4) Ajouter l'URL dans le script front-end

Dans le fichier `docs/google-sheet-submitter.js`, remplacer :

```javascript
const ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

par :

```javascript
const ENDPOINT = 'https://script.google.com/macros/s/AKfycb.../exec';
```

## 5) Brancher le script dans la page HTML

Ajouter ceci dans `docs/questionnaire-streaming.html` avant la fin du `</body>` :

```html
<script src="google-sheet-submitter.js"></script>
```

## 6) Tester

- Ouvrir la page du questionnaire
- Remplir le formulaire
- Vérifier que la ligne apparaît dans Google Sheets
- Vérifier que tu reçois l'email

Si tu veux, je peux maintenant te faire la dernière étape : modifier exactement le fichier HTML pour qu'il charge `google-sheet-submitter.js` et soit prêt à fonctionner dès que tu mets l'URL Google Script.
