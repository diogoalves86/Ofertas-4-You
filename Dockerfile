FROM node:22.17.0-alpine AS base

FROM base AS dependencias
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY .npmrc package.json package-lock.json ./
RUN npm ci

FROM base AS construtor
WORKDIR /app
COPY --from=dependencias /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS aplicacao
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=construtor /app/public ./public
COPY --from=construtor --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=construtor --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p media .next/cache
RUN chown -R nextjs:nodejs media .next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
