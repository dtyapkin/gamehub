#!/usr/bin/env bash
# ============================================================
# Восстановление дампа в PostgreSQL из docker-compose сервиса postgres.
#
#   ./scripts/db-restore.sh dumps/gamedoor-20260928-120000.dump
#   ./scripts/db-restore.sh dump.dump gamedoor
#
# ВНИМАНИЕ: делает --clean --if-exists, то есть СНОСИТ существующие
# таблицы перед восстановлением. Дамп должен быть с ТОЙ ЖЕ major-версией
# PostgreSQL, что и в контейнере (18.x -> 18.x).
# ============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

DUMP_FILE="${1:-}"
DB_NAME="${2:-}"
DB_USER="${3:-}"

# .env НЕ экспортируется в окружение, поэтому переменные читаем grep'ом.
# Иначе ${POSTGRES_USER:-postgres} молча подставил бы неверного пользователя.
read_env() {
  [ -f .env ] || return 0
  grep -E "^$1=" .env | head -1 | cut -d= -f2- | tr -d '\r' | tr -d '"'
}

[ -n "$DB_NAME" ] || DB_NAME="$(read_env POSTGRES_DB)"
[ -n "$DB_USER" ] || DB_USER="$(read_env POSTGRES_USER)"
DB_NAME="${DB_NAME:-gamedoor}"
DB_USER="${DB_USER:-gamedoor}"

if [ -z "$DUMP_FILE" ]; then
  echo "Использование: $0 <файл.dump> [имя_базы] [пользователь]" >&2
  exit 1
fi
if [ ! -f "$DUMP_FILE" ]; then
  echo "Файл дампа не найден: $DUMP_FILE" >&2
  exit 1
fi

echo "Compose file : $COMPOSE_FILE"
echo "Dump         : $DUMP_FILE ($(du -h "$DUMP_FILE" | cut -f1))"
echo "Database     : $DB_NAME (user: $DB_USER)"

# копируем дамп внутрь контейнера (pg_restore не умеет читать с хоста)
CONTAINER_ID="$(docker compose -f "$COMPOSE_FILE" ps -q postgres)"
if [ -z "$CONTAINER_ID" ]; then
  echo "Сервис postgres не запущен. Сначала: docker compose up -d postgres" >&2
  exit 1
fi

docker cp "$DUMP_FILE" "${CONTAINER_ID}:/tmp/restore.dump"

set +e
# -d указывает БД ровно один раз, файл дампа идёт последним позиционным
# аргументом. Лишний -d съедал следующий за ним -j и ломал команду.
docker exec -i "$CONTAINER_ID" pg_restore \
    -U "$DB_USER" -d "$DB_NAME" \
    --clean --if-exists --no-owner --no-privileges \
    -j "$(nproc 2>/dev/null || echo 2)" \
    /tmp/restore.dump
CODE=$?
set -e

docker exec "$CONTAINER_ID" rm -f /tmp/restore.dump >/dev/null 2>&1 || true

if [ $CODE -ne 0 ]; then
  echo "pg_restore завершился с кодом $CODE" >&2
  exit $CODE
fi

echo "OK: база '$DB_NAME' восстановлена"
echo "Перезапусти backend: docker compose restart backend"
