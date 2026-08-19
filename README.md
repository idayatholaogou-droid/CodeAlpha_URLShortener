# Task 1 — Simple URL Shortener

Backend Node.js/Express avec MySQL, réalisé dans le cadre de l'internship CodeAlpha.

## Fonctionnalités
- `POST /api/shorten` — crée une URL courte à partir d'une URL longue (code personnalisé optionnel)
- `GET /:shortCode` — redirige vers l'URL d'origine et incrémente le compteur de clics
- `GET /api/stats/:shortCode` — retourne les statistiques (nombre de clics, date de création)
- `GET /api/urls` — liste toutes les URLs raccourcies
- Petit frontend (`public/index.html`) pour tester le raccourcissement dans le navigateur

## Installation

```bash
npm install
cp .env.example .env
# Renseigner les identifiants MySQL dans .env
```


```bash
mysql -u root -p < sql/schema.sql
```

## Lancer le serveur

```bash
npm run dev   # avec nodemon
# ou
npm start
```

Le serveur démarre sur `http://localhost:3000` par défaut.

## Exemple d'utilisation (avec curl)

```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \


Réponse :
```json
{
  "shortUrl": "http://localhost:3000/aZ3kLp",
  "shortCode": "aZ3kLp",
  "clicks": 0
}
```

## Structure du projet

task1-url-shortener/
 config/db.js
 controllers/urlController.js
 models/urlModel.js
 routes/urlRoutes.js
 public/index.html
 sql/schema.sql
 server.js
 .env.example
 package.json

