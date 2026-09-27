#!/bin/sh
set -e

export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

for i in $(seq 1 120); do
    if curl -fs http://127.0.0.1:1337/_health >/dev/null 2>&1; then
        break
    fi
    sleep 1
done

cd /app/frontend
export PORT=3000
export HOSTNAME=0.0.0.0
exec node server.js