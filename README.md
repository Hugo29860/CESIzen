# CESIzen

Application web de gestion du bien-être développée dans le cadre du titre **Concepteur Développeur d'Applications (CDA)** au CESI – Promotion 2023-2024.

**Auteur :** Hugo Bithore-Lebot

---

## Présentation

CESIzen est une SPA (Single Page Application) permettant aux utilisateurs de gérer leur stress au quotidien grâce à :

- Des **exercices de respiration guidée** (cohérence cardiaque, etc.)
- Un **diagnostic de stress** personnalisé
- Des **ressources bien-être** consultables
- Une **interface d'administration** pour gérer les contenus et les utilisateurs

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | Vue 3 + Vite (SPA) |
| Backend | Node.js + Express 5 (API REST) |
| Base de données | MongoDB 7 (Mongoose) |
| Authentification | JWT + bcrypt |
| Serveur web | Nginx (reverse proxy + assets statiques) |
| Conteneurisation | Docker + Docker Compose |
| CI/CD | GitHub Actions |

---

## Lancer le projet en local

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose v2
- Git

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/[votre-repo]/CESIzen.git
cd CESIzen

# 2. Configurer les variables d'environnement
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos valeurs (MONGO_URI, JWT_SECRET)

# 3. Démarrer la stack complète
docker-compose up --build -d

# 4. Vérifier que les conteneurs sont actifs
docker-compose ps
```

L'application est accessible sur **http://localhost**  
L'API est accessible sur **http://localhost:3000**

### Arrêter la stack

```bash
docker-compose down
```

---

## Architecture de déploiement

```
┌─────────────────────────────────────────┐
│            cesizen-network              │
│                                         │
│  ┌─────────────┐    ┌────────────────┐  │
│  │  Frontend   │    │    Backend     │  │
│  │  Nginx:80   │───▶│  Express:3000  │  │
│  │  (Vue 3)    │    │  (API REST)    │  │
│  └─────────────┘    └───────┬────────┘  │
│                             │           │
│                    ┌────────▼────────┐  │
│                    │    MongoDB 7    │  │
│                    │  (volume perst.)│  │
│                    └─────────────────┘  │
└─────────────────────────────────────────┘
```

Les trois services sont orchestrés par Docker Compose avec healthchecks et redémarrage automatique (`restart: unless-stopped`).

---

## Pipeline CI/CD

Le pipeline GitHub Actions (`.github/workflows/deploy.yml`) s'exécute automatiquement à chaque push :

```
push → main / develop
         │
         ▼
    ┌─────────┐
    │   CI    │  Lint ESLint + Build Vite + Vérification dist/
    └────┬────┘
         │ (si branche main uniquement)
         ▼
    ┌─────────┐
    │ Deploy  │  rsync SSH → PM2 reload → Smoke tests API
    └─────────┘
```

---

## Structure du projet

```
CESIzen/
├── .github/workflows/   # Pipeline CI/CD GitHub Actions
├── backend/
│   ├── middleware/      # Authentification JWT
│   ├── models/          # Schémas Mongoose (User, Exercise, Ressource, Session)
│   ├── routes/          # Routes API REST
│   ├── server.js        # Point d'entrée Express
│   └── Dockerfile
├── src/
│   ├── views/           # Pages Vue (Home, Login, Admin, Respiration, Ressources, Diagnostic)
│   ├── router/          # Routeur Vue Router
│   └── stores/          # Store d'authentification
├── docker-compose.yml   # Orchestration des 3 conteneurs
├── Dockerfile           # Build multi-stage frontend (Vite → Nginx)
└── nginx.conf           # Configuration Nginx (proxy, cache, headers sécurité)
```

---

## Compte administrateur par défaut

Un script de création du compte admin est fourni :

```bash
docker-compose exec backend node createAdmin.js
```

---

## Documentation

Le plan de déploiement complet (architecture, étapes CI/CD, procédures de rollback) est disponible dans les livrables du projet.
