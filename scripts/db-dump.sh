#!/usr/bin/env bash
# ============================================================
# Дамп PostgreSQL из docker-compose сервиса postgres.
# Работает локально и на VPS (Linux/Dockploy).
#
#   ./scripts/db-dump.sh                      # из .env: POSTGRES_DB
#   ./scripts/db-dump.sh gamedoor             # конкретная база
#   ./scripts/db-dump.sh gamedoor my.dump     # явное имя файла
#
# Формат custom (pg_dump -Fc) -> восстанавливается через db-restore.sh
# ============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"

# .env НЕ экспортируется в окружение, поэтому читаем grep'ом. Иначе
# ${POSTGRES_USER:-postgres} молча подставил бы неверного пользователя.
read_env() {
  [ -f .env ] || return 0
  grep -E "^$1=" .env | head -1 | cut -d= -f2- | tr -d '\r' | tr -d '"'
}

DB_NAME="${1:-$(read_env POSTGRES_DB)}"
DB_NAME="${DB_NAME:-gamedoor}"
DB_USER="$(read_env POSTGRES_USER)"
DB_USER="${DB_USER:-gamedoor}"

if [ -n "${2:-}" ]; then
  OUT_FILE="$2"
else
  mkdir -p dumps
  OUT_FILE="dumps/${DB_NAME}-$(date +%Y%m%d-%H%M%S).dump"
fi

echo "Compose file : $COMPOSE_FILE"
echo "Database     : $DB_NAME (user: $DB_USER)"
echo "Output       : $OUT_FILE"

# pg_dumpall --globals выносит роли в отдельный файл - роли на VPS
# могут называться иначе, поэтому глобалы НЕ тащим
docker compose -f "$COMPOSE_FILE" exec -T postgres \
  pg_dump -U "$DB_USER" -d "$DB_NAME" \
    -Fc --no-owner --no-privileges --clean --if-exists \
  > "$OUT_FILE"

SIZE="$(du -h "$OUT_FILE" | cut -f1)"
echo "OK: $OUT_FILE ($SIZE)"
echo "Восстановление: ./scripts/db-restore.sh $OUT_FILE $DB_NAME"
