# App Streaming

Application de streaming — écran sondage.

## Sondage

Page de formulaire (HTML/CSS/JS) pour recueillir des avis sur les apps de streaming.

### Lancer en local

Depuis la racine du dépôt :

```bash
python3 -m http.server 5173
```

Puis ouvrir [http://localhost:5173](http://localhost:5173).

Les réponses sont enregistrées dans `localStorage` (clé `app-streaming-survey-responses`) et affichées dans la console du navigateur.
