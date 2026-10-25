# App Streaming

Application de streaming — écran sondage.

## Sondage

Page de formulaire (HTML/CSS/JS) couvrant streaming et messagerie&nbsp;:

1. Email (optionnel)
2. Avis sur les apps de streaming (YouTube, Netflix, Spotify, …)
3. Préférence
4. Pourquoi
5. Intérêt pour une app tout-en-un (échelle 1–5)
6. Avis sur WhatsApp
7. Pourquoi WhatsApp
8. Connaissance d’alternatives plus sécurisées
9. Pourquoi ne pas les utiliser (facultatif)

### Lancer en local

Depuis la racine du dépôt&nbsp;:

```bash
python3 -m http.server 5173
```

Puis ouvrir [http://localhost:5173](http://localhost:5173).

Les réponses sont enregistrées dans `localStorage` (clé `app-streaming-survey-responses`) et affichées dans la console du navigateur.
