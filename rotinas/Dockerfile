FROM node:22.17.0-alpine

WORKDIR /app

COPY .npmrc package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "rotinas:cron"]
