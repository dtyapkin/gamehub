FROM node:22-alpine AS strapi-build
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
ENV APP_KEYS="dummy,dummy" \
    API_TOKEN_SALT="dummy" \
    ADMIN_JWT_SECRET="dummy" \
    TRANSFER_TOKEN_SALT="dummy" \
    JWT_SECRET="dummy" \
    ENCRYPTION_KEY="dummy"
COPY backend/ ./
RUN npm run build

FROM node:22-alpine AS next-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
ENV NEXT_TELEMETRY_DISABLED=1
COPY frontend/ ./
RUN npm run build

FROM node:22-bookworm-slim
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        supervisor \
        postgresql-15 \
        curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend
COPY --from=strapi-build /app/node_modules ./node_modules
COPY --from=strapi-build /app/dist ./dist
COPY --from=strapi-build /app/dist/config ./config
COPY --from=strapi-build /app/dist/src ./src
COPY --from=strapi-build /app/package.json /app/package-lock.json ./
COPY --from=strapi-build /app/public ./public
COPY --from=strapi-build /app/favicon.* ./

WORKDIR /app/frontend
COPY --from=next-build /app/.next/standalone ./
COPY --from=next-build /app/.next/static ./.next/static
COPY --from=next-build /app/public ./public

WORKDIR /app
COPY scripts/ ./scripts/
COPY supervisord.conf ./supervisord.conf
RUN chmod +x ./scripts/*.sh

EXPOSE 3000 1337 5432
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -fs http://127.0.0.1:1337/_health || exit 1

CMD ["supervisord", "-c", "/app/supervisord.conf"]