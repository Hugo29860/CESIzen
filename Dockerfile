# ─────────────────────────────────────────────
# Dockerfile – CESIzen Frontend (Vue 3 + Vite)
# Build multi-stage : build → serve avec Nginx
# ─────────────────────────────────────────────

# ── ÉTAPE 1 : Build Vite ──
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Build de production (génère le dossier dist/)
RUN npm run build

# ── ÉTAPE 2 : Serveur Nginx (image ultra-légère) ──
FROM nginx:alpine

# Supprime la config Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie notre config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposition du port HTTP
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]