# syntax=docker/dockerfile:1

# ============================================================
# DEV: полный тулчейн + исходники, hot-reload через bind mount
# ============================================================
FROM node:22-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development \
    STRAPI_TELEMETRY_DISABLED=1

# sharp/libvips нужен и для develop, и для build
RUN apk add --no-cache libc6-compat vips

COPY package*.json ./
RUN npm ci

COPY . .
# В dev намеренно остаёмся под root: /app перекрыт bind-mount'ом с хоста,
# и не-node пользователь там упирается в права на Windows/macOS

EXPOSE 1337
CMD ["npm", "run", "develop"]

# ============================================================
# BUILD: компиляция TS -> dist/, админка Strapi 5 -> dist/build/
# ============================================================
FROM node:22-alpine AS build
WORKDIR /app
# ВАЖНО: NODE_ENV=production здесь ставить НЕЛЬЗЯ. npm выставляет --omit=dev
# из NODE_ENV и пропускает devDependencies, а `strapi build` нужен typescript
# и @types/* для компиляции config/ и src/.
# Собираемый код всё равно попадает в prod-стадию с NODE_ENV=production.

RUN apk add --no-cache libc6-compat vips

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ============================================================
# PROD: только рантайм
# ============================================================
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache vips

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# КРИТИЧНО: копируем tsconfig.json.
# `strapi start` читает ./tsconfig.json, чтобы вычислить outDir (dist).
# Если его нет — distDir становится равен appDir (/app), и Strapi ищет
# собранную админку в /app/build (его не существует), а не в /app/dist/build.
# Итог: API работает, а /admin отдаёт 404.
COPY --from=build /app/tsconfig.json ./tsconfig.json

# dist содержит: dist/config, dist/src и dist/build (собранная админка).
COPY --from=build /app/dist ./dist

# Публичные файлы и загрузки
COPY --from=build /app/public ./public

# Каталог загрузок должен существовать и принадлежать node:
# иначе именованный том strapi_uploads будет создан от root и запись в него упадёт
RUN mkdir -p /app/public/uploads /app/.tmp && chown -R node:node /app

USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
