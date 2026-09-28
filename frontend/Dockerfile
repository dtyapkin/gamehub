# syntax=docker/dockerfile:1

# ============================================================
# DEV: полный тулчейн + hot-reload через bind mount
# ============================================================
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
# dev:docker = next dev --webpack + WATCHPACK_POLLING (см. docker-compose.dev.yml).
# По умолчанию (turbopack) hot-reload через bind-mount на Windows/macOS не работает.
CMD ["npm", "run", "dev:docker"]

# ============================================================
# BUILD
# ============================================================
FROM node:22-alpine AS build
WORKDIR /app
# ВАЖНО: NODE_ENV=production здесь ставить НЕЛЬЗЯ. npm выставляет --omit=dev
# из NODE_ENV и молча пропускает devDependencies, без которых `next build`
# падает с "Cannot find module '@tailwindcss/postcss'".
# Сам next build выставит NODE_ENV=production сам.
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ============================================================
# PROD: standalone-сервер Next.js
# ============================================================
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Без HOSTNAME=0.0.0.0 Next standalone слушает имя контейнера,
# и docker healthcheck по 127.0.0.1 получает "connection refused"
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# next/image кладёт оптимизированные картинки в .next/cache — каталог должен
# существовать до смены пользователя, иначе сервер стартует от root
RUN mkdir -p /app/.next/cache && chown -R node:node /app

USER node
EXPOSE 3000
CMD ["node", "server.js"]
