FROM node:20-alpine

WORKDIR /app

# Copie les dépendances depuis la racine
COPY package*.json ./
RUN npm ci --omit=dev

# Copie le code backend
COPY backend/ ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]