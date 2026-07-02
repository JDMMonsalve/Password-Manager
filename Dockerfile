FROM node:20-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev --no-fund --no-audit --loglevel=error

COPY backend/ ./
COPY index.html script.js styles.css ./

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]