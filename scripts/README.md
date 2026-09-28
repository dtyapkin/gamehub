# Скрипты работы с базой данных

Всё живёт в томах Docker, поэтому «просто скопировать папку» нельзя — нужен `pg_dump`.

## Рабочий цикл на твоём компе (Windows)

### 1. Вылить локальную PostgreSQL 18 в контейнер

```powershell
# пароль берётся из $env:PGPASSWORD или .pgpass, в .env он НЕ лежит
$env:PGPASSWORD = '...'
.\scripts\db-dump.ps1 -DbName strapi -DbUser strapi

# положит в .\dumps\strapi-<дата>.dump

# залить в контейнер (по умолчанию gamehub-postgres-1)
.\scripts\db-restore-container.ps1 -DbName gamedoor -DumpFile .\dumps\strapi-<дата>.dump -Clean

docker compose restart backend
```

- `-Container` — если контейнер называется иначе (`gamedoor-dev-postgres-1` для dev).
- `-DbUser` — если в `.env` задан не `gamedoor`; по умолчанию берётся из `.env`.
- **`-Clean` нужен почти всегда.** Без него `pg_restore` падает с
  `relation "..." already exists`, потому что Strapi при старте создаёт свои
  таблицы раньше, чем ты успеваешь залить дамп.

## Перенос на VPS (Linux / Dockploy)

```bash
# 1. Залить репозиторий на VPS
git clone <repo> && cd <repo>

# 2. Создать .env (скопировать .env.example и заполнить)

# 3. Поднять
docker compose up -d --build

# 4. Залить дамп
./scripts/db-restore.sh dumps/strapi-<дата>.dump gamedoor

# 5. Перезапустить backend
docker compose restart backend
```

## Бэкапы на VPS

```bash
./scripts/db-dump.sh                 # -> dumps/gamedoor-<дата>.dump
./scripts/db-dump.sh gamedoor my.dump # явное имя
```

Дамп в формате `pg_dump -Fc` (custom): сжатый, восстанавливается только через `pg_restore`,
поддерживает `-j` для параллельного восстановления и частичное восстановление отдельных таблиц.

## Важно

- **Major-версия PostgreSQL должна совпадать** на обоих концах. Сейчас везде 18:
  локальная машина, `docker-compose.yml` и `docker-compose.dev.yml` — все на
  `postgres:18-alpine`. Дамп из 18.x в `postgres:16-alpine` не восстановится.
- **В `postgres:18` том монтируется на `/var/lib/postgresql`, а не на
  `/var/lib/postgresql/data`.** Со 18-го мажора образ кладёт данные в
  подкаталог с номером версии и на старом пути падает с `unused mount`.
  Если меняешь версию — сначала вылей дамп, потом пересоздай том.
- **Имя тома = `name:` проекта + имя тома из compose.** Для prod это
  `gamehub_postgres_data` (в compose `name: gamehub`), для dev —
  `gamedoor-dev_dev_postgres_data`. Не угадывай, смотри `docker volume ls`.
- `db-dump.sh` / `db-dump.ps1` делают `--clean --if-exists`: при повторной заливке таблицы сначала дропаются. Сделай `db-dump.sh` на VPS **до** любых экспериментов.
- Скрипты `.ps1` — для **Windows PowerShell 5.1**. В них намеренно нет
  `Join-Path` с тремя аргументами и `-AdditionalChildPath`: в 5.1 их нет,
  а файлы лежат с UTF-8 BOM, иначе кириллица в комментариях ломает парсинг.
- Глобальные роли (`--globals`) намеренно не выгружаются — на VPS имена ролей другие, и их импорт всё ломает. Пользователь/пароль задаются через `POSTGRES_USER`/`POSTGRES_PASSWORD` в `.env`. Скрипты читают `.env` grep'ом, а не через `$POSTGRES_USER`: `.env` не экспортируется в окружение, и `${POSTGRES_USER:-postgres}` молча подставил бы неверного пользователя.
- Загруженные файлы лежат в томе `strapi_uploads`, а не в БД. Дамп БД их **не** покрывает. Для полного бэкапа:

  ```bash
  docker run --rm -v gamehub_strapi_uploads:/data -v "$PWD":/backup alpine \
    tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .
  ```
