# ─────────────────────────────────────────────
# Dockerfile – CESIzen Backend (Express.js)
# ─────────────────────────────────────────────

# Étape 1 : image de base Node.js LTS légère
FROM node:18-alpine

# Métadonnées
LABEL maintainer="CESIzen – CDA 2023/2024"
LABEL description="Backend API REST Express.js pour CESIzen"

# Répertoire de travail dans le container
WORKDIR /app

# Copie des fichiers de dépendances en premier (optimise le cache Docker)
COPY package*.json ./

# Installation des dépendances de production uniquement
RUN npm ci --omit=dev

# Copie du code source backend
COPY . .

# Exposition du port
EXPOSE 3000

# Healthcheck : vérifie que l'API répond
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Démarrage du serveur
CMD ["node", "server.js"]