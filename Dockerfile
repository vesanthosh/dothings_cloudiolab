# Build frontend

FROM node:alpine AS frontend

ENV NODE_ENV=production

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install --production && npm cache clean --force

COPY frontend/ .

RUN npm run build

# api
FROM node:alpine AS api

ENV NODE_ENV=production

WORKDIR /app/api

COPY api/package*.json ./

RUN npm install --production && npm cache clean --force

COPY api/ .

# Production dothings

FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY api/package*.json ./

RUN npm install --production && npm cache clean --force

COPY --from=frontend /app/frontend/build ./frontend/build
COPY --from=api /app/api .

CMD [ "node", "server.js"]