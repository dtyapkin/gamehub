# Деплой на VPS через Dockploy

Проверено локально на этой машине: стек поднимается, `/admin` отдаёт 200,
API работает, данные на месте. Ниже — только то, что нужно на сервере.

---

## 1. Подготовка сервера

```bash
# Docker + плагин compose (Debian/Ubuntu)
apt update && apt install -y docker.io docker-compose-v2
docker run --rm hello-world    # проверка
```

В Dockploy сервер настраивается через веб-интерфейс, отдельно ставить
ничего не нужно — нужен только доступ по SSH для переноса данных.

**Открой наружу только 80 и 443.** Порты 1337 и 3000 в firewall открывать
не нужно: к ним обращается только внутренний реверс-прокси Dockploy.

---

## 2. Залить репозиторий

```bash
git clone <твой-репозиторий> gamedoor
cd gamedoor
```

> В проекте три вложенных git-репозитория (`backend`, `frontend` — сабмодули).
> Если они лежат в репозитории как gitlink, после `git clone` выполни:
> ```bash
> git submodule update --init --recursive
> ```
> Если Dockploy клонирует по URL, проверь, что сабмодули подтянулись:
> `ls backend/config/server.ts frontend/package.json` — файлы должны существовать.

---

## 3. Сгенерировать `.env` с секретами

```bash
./scripts/init-env.sh
```

Скрипт создаст `.env` с правами `600` и подставит свежие случайные
значения в `POSTGRES_PASSWORD`, `APP_KEYS`, `API_TOKEN_SALT`,
`ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`.

**Секреты генерируются прямо на сервере** — они не светятся в переписке
и не попадают в git.

Проверка перед стартом:

```bash
docker compose config --quiet && echo "compose OK"
```

---

## 4. Заполнить доменные переменные

Это единственное, что скрипт оставить не может — он не знает твой домен.

| Переменная | Значение | Комментарий |
|---|---|---|
| `STRAPI_PUBLIC_URL` | `/` | адрес API, на котором Strapi строит ссылки |
| `STRAPI_ADMIN_URL` | `/admin` | публичный URL админки |
| `CORS_ORIGIN` | `*` | список доменов через запятую, либо `*` |
| `BACKEND_PORT` | `1337` | хостовый порт backend, поменяй если занят |
| `FRONTEND_PORT` | `3000` | хостовый порт frontend, поменяй если занят |

### Вариант А — всё на одном домене (проще)

Домен `example.com` отдаёт фронтенд, `/admin` и `/api` уходят на backend.

```env
STRAPI_PUBLIC_URL=/
STRAPI_ADMIN_URL=/admin
CORS_ORIGIN=*
```

В Dockploy настрой один домен с правилами маршрутизации:
- `/` → сервис `frontend`, порт 3000
- `/admin*` → сервис `backend`, порт 1337
- `/api*`, `/uploads*` → сервис `backend`, порт 1337

### Вариант Б — отдельный поддомен под админку

```env
STRAPI_ADMIN_URL=https://admin.example.com
STRAPI_PUBLIC_URL=https://api.example.com
CORS_ORIGIN=https://example.com
```

Три домена: `example.com` → frontend, `api.example.com` → backend,
`admin.example.com` → backend.

> **Почему это важно.** Без `STRAPI_BEHIND_PROXY=true` Strapi собирает
> абсолютные ссылки вида `http://backend:1337/admin` — такой адрес из
> браузера не открывается, и после логина в админку тебя выкинет.
> Это самая частая ошибка при первом деплое за прокси.

---

## 5. Поднять стек

```bash
docker compose up -d --build
docker compose ps          # все три сервиса должны быть healthy
```

Strapi применит миграции сам при первом старте. Админка будет доступна,
но **пользователя в ней ещё нет** — зайди на `/admin` и зарегистрируй первого
админа.

---

## 6. Залить данные

Если на сервере нужны 84 рекламных слота с локальной машины:

```bash
# сделать дамп на своей машине (PowerShell)
$env:PGPASSWORD = 'пароль локальной БД'
.\scripts\db-dump.ps1 -DbName strapi -DbUser strapi

# скопировать на сервер
scp dumps\strapi-<дата>.dump user@vps:/opt/gamedoor/dumps/
```

```bash
# на сервере
docker compose stop backend
./scripts/db-restore.sh dumps/strapi-<дата>.dump gamedoor
docker compose up -d
```

Либо вручную через `pg_restore` (скрипт делает ровно то же самое):

```bash
docker cp dumps/strapi.dump gamehub-postgres-1:/tmp/d.dump
docker exec gamehub-postgres-1 pg_restore \
  -U gamedoor -d gamedoor --clean --if-exists --no-owner --no-privileges /tmp/d.dump
docker compose up -d
```

> **Имя контейнера** — `gamehub-postgres-1`, потому что в `docker-compose.yml`
> стоит `name: gamehub`. Убедись: `docker compose ps` или
> `docker compose ps -q postgres`.

---

## 7. Проверка после деплоя

```bash
# изнутри сервера
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:1337/admin
curl -s http://127.0.0.1:1337/api/ad-placements | head -c 200

# снаружи, с твоей машины
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/admin
```

Ожидается: `200`, `200` и JSON с массивом `data`.

Если `/admin` отдаёт 200 снаружи, но после логина редиректит на
`http://backend:1337/admin` — не выставлен `STRAPI_ADMIN_URL`
(см. раздел 4).

---

## 8. Бэкапы на сервере

Регулярный дамп БД (по cron):

```bash
0 3 * * * cd /opt/gamedoor && ./scripts/db-dump.sh >> /var/log/gamedoor-backup.log 2>&1
```

Загруженные файлы в дамп БД **не** попадают — они лежат в томе
`gamehub_strapi_uploads`. Их надо снимать отдельно:

```bash
docker run --rm \
  -v gamehub_strapi_uploads:/data \
  -v /opt/gamedoor/dumps:/backup \
  alpine tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .
```

---

## 9. Если что-то пошло не так

| Симптом | Причина |
|---|---|
| `/admin` 404 | в образ нет `tsconfig.json`, `distDir` уехал в `/app` вместо `/app/dist` |
| редирект на `backend:1337` после логина | не задан `STRAPI_ADMIN_URL` |
| `relation "..." already exists` при заливке | нужен флаг `--clean` |
| postgres не стартует: `unused mount` | том смонтирован на `/var/lib/postgresql/data`, надо на `/var/lib/postgresql` |
| `403` на `/api/...` | нет прав у роли Public, либо в БД их залито не было |
| реклама не показывается, API 200 | смотри лог frontend: `docker compose logs frontend` |

---

## Что где лежит

| Что | Где |
|---|---|
| настройки Strapi за прокси | `backend/config/server.ts` (`proxy`, `url`) |
| публичный URL админки | `backend/config/admin.ts` (`url`) |
| CORS | `backend/config/middlewares.ts` |
| порты, healthcheck, логи | `docker-compose.yml` |
| переменные | `.env` (не в git), шаблон — `.env.example` |
| генерация секретов | `scripts/init-env.sh` |
| дамп / заливка БД | `scripts/db-dump.sh`, `scripts/db-restore.sh` (на сервере), `.ps1`-версии (на Windows) |
