# Production dothings-api

FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install --production && npm cache clean --force

COPY . .

CMD [ "node", "server.js"]