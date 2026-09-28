#!/usr/bin/env bash
# ============================================================
# Генерация .env для прод-деплоя (VPS / Dockploy).
#
#   ./scripts/init-env.sh
#
# Скрипт создаёт .env из .env.example и подставляет свежие случайные
# секреты. Запускать НА СЕРВЕРЕ, а не локально: секреты сразу попадают
# куда им и нужно, и не светятся в переписке.
#
# Переменные, зависящие от домена (STRAPI_PUBLIC_URL, STRAPI_ADMIN_URL,
# CORS_ORIGIN), скрипт оставляет как есть - их надо заполнить руками.
# ============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
  echo "ВНИМАНИЕ: $ENV_FILE уже существует." >&2
  echo "Скрипт НЕ трогает существующие секреты (иначе сломает сессии" >&2
  echo "админа и API-токены). Если нужно пересоздать - удали .env вручную." >&2
  exit 1
fi

if [ ! -f .env.example ]; then
  echo "Нет .env.example рядом с $0" >&2
  exit 1
fi

# openssl есть не везде; fallback на /dev/urandom, чтобы скрипт работал
# и на голом VPS без openssl.
gen_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 48 | tr -d '\n'
  else
    head -c 48 /dev/urandom | base64 | tr -d '\n'
  fi
}

echo "Генерирую секреты..."
PG_PASS="$(gen_secret)"
S1="$(gen_secret)"
S2="$(gen_secret)"

# Пишем .env на основе шаблона, подставляя значения вместо пустых строк.
sed \
  -e "s|^POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=${PG_PASS}|" \
  -e "s|^APP_KEYS=.*|APP_KEYS=${S1},${S2}|" \
  -e "s|^API_TOKEN_SALT=.*|API_TOKEN_SALT=$(gen_secret)|" \
  -e "s|^ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=$(gen_secret)|" \
  -e "s|^TRANSFER_TOKEN_SALT=.*|TRANSFER_TOKEN_SALT=$(gen_secret)|" \
  -e "s|^JWT_SECRET=.*|JWT_SECRET=$(gen_secret)|" \
  -e "s|^ENCRYPTION_KEY=.*|ENCRYPTION_KEY=$(gen_secret)|" \
  .env.example > "$ENV_FILE"

chmod 600 "$ENV_FILE"

echo "OK: создан $ENV_FILE (права 600)"
echo ""
echo "Осталось заполнить руками - от этого зависит, заработает ли"
echo "админка за доменом:"
echo "  STRAPI_PUBLIC_URL   сейчас: $(grep '^STRAPI_PUBLIC_URL=' "$ENV_FILE" | cut -d= -f2-)"
echo "  STRAPI_ADMIN_URL    сейчас: $(grep '^STRAPI_ADMIN_URL=' "$ENV_FILE" | cut -d= -f2-)"
echo "  CORS_ORIGIN         сейчас: $(grep '^CORS_ORIGIN=' "$ENV_FILE" | cut -d= -f2-)"
echo ""
echo "Если админка на отдельном поддомене - выставь, например:"
echo "  STRAPI_ADMIN_URL=https://admin.example.com"
echo "  STRAPI_PUBLIC_URL=https://api.example.com"
echo "  CORS_ORIGIN=https://example.com"
echo ""
echo "Проверка перед запуском:"
echo "  docker compose config --quiet && echo 'compose OK'"
