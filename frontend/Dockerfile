# Build frontend

FROM node:alpine AS builder

ENV NODE_ENV=production

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY . .

RUN npm run build

# Getting ready for production
FROM node:alpine

RUN npm install -g serve

WORKDIR /usr/src/app/frontend

COPY --from=builder /usr/src/app/frontend/build .

CMD [ "serve", "-p", "3003", "-s", "." ]