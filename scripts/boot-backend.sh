#!/bin/sh
set -e

export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PGBIN=/usr/lib/postgresql/15/bin

for i in $(seq 1 60); do
    if $PGBIN/pg_isready -h 127.0.0.1 -p 5432 >/dev/null 2>&1; then
        break
    fi
    sleep 1
done

DB_USER="${POSTGRES_USER:-gamedoor}"
DB_NAME="${POSTGRES_DB:-gamedoor}"

if ! su - postgres -c "$PGBIN/psql -tAc \"SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'\"" | grep -q 1; then
    su - postgres -c "$PGBIN/psql -c \"CREATE ROLE $DB_USER LOGIN PASSWORD '$POSTGRES_PASSWORD' CREATEDB\""
fi

if ! su - postgres -c "$PGBIN/psql -tAc \"SELECT 1 FROM pg_database WHERE datname='$DB_NAME'\"" | grep -q 1; then
    su - postgres -c "$PGBIN/createdb -O $DB_USER $DB_NAME"
fi

cd /app/backend
exec npm run start