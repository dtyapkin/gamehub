<#
.SYNOPSIS
    Импорт дампа в PostgreSQL, запущенный в Docker.

.DESCRIPTION
    Работает и с контейнером из docker-compose.yml (gamehub-postgres-1),
    и с любым другим контейнером, - укажи его имя через -Container.

    ВАЖНО: -Clean сносит существующие таблицы перед восстановлением.
    Без этого флага pg_restore выдаст ошибки "already exists".

.EXAMPLE
    .\db-restore-container.ps1 -DbName gamedoor -DumpFile ..\dumps\strapi-20260928-120000.dump

.EXAMPLE
    # полная перезаливка с предварительным дропом
    .\db-restore-container.ps1 -DbName gamedoor -DumpFile ..\dumps\strapi.dump -Clean
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$DbName,
    [Parameter(Mandatory)][string]$DumpFile,
    [string]$Container = 'gamehub-postgres-1',
    [string]$DbUser = '',          # пусто = взять из .env (POSTGRES_USER)
    [switch]$Clean,
    [int]$Jobs = 4
)

$ErrorActionPreference = 'Stop'

# ---- проверки ---------------------------------------------------------
if (-not (Test-Path -LiteralPath $DumpFile)) { throw "Файл дампа не найден: $DumpFile" }
$DumpFile = (Resolve-Path -LiteralPath $DumpFile).Path

$running = docker ps --format '{{.Names}}'
if ($running -notcontains $Container) {
    throw @"
Контейнер '$Container' не запущен.
Запусти: docker compose up -d postgres
Либо укажи другое имя: -Container <имя>
"@
}

# ---- креды из .env ----------------------------------------------------
# Вложенный Join-Path: в Windows PowerShell 5.1 у Join-Path всего два
# параметра пути, третий (AdditionalChildPath) есть только в PowerShell 7.
$envFile = Join-Path (Join-Path $PSScriptRoot '..') '.env'
if (-not $DbUser) {
    if (-not (Test-Path -LiteralPath $envFile)) { throw "Нет .env в корне проекта и не задан -DbUser" }
    $line = Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^\s*POSTGRES_USER=' } | Select-Object -First 1
    if (-not $line) { throw "POSTGRES_USER не найден в .env" }
    $DbUser = ($line -split '=', 2)[1].Trim()
}
Write-Host "Контейнер : $Container"
Write-Host "База     : $DbName (user: $DbUser)"
Write-Host "Дамп     : $DumpFile ($([math]::Round((Get-Item $DumpFile).Length/1MB,2)) MB)" -ForegroundColor DarkGray

# ---- копируем дамп внутрь контейнера ---------------------------------
$remote = "/tmp/restore.dump"
Write-Host "Копирую дамп в контейнер..." -ForegroundColor Cyan
docker cp $DumpFile "${Container}:$remote"
if ($LASTEXITCODE -ne 0) { throw "docker cp не удался" }

# ---- параметры pg_restore --------------------------------------------
# Порядок важен: -d указывает БД ОДИН раз, последним позиционным аргументом
# идёт файл дампа. Лишний второй -d заставил бы pg_restore считать именем БД
# путь к дампу.
$pgRestore = @(
    'pg_restore', '-U', $DbUser, '-d', $DbName,
    '--no-owner', '--no-privileges'
)
if ($Clean) { $pgRestore += '--clean', '--if-exists' }
if ($Jobs -gt 1) { $pgRestore += "-j$Jobs" }
$pgRestore += $remote

Write-Host "Восстанавливаю..." -ForegroundColor Cyan

# stderr у pg_restore содержит Warnings (не ошибки), поэтому гоняем через sh -c,
# чтобы получить exit code именно pg_restore
$cmd = ($pgRestore -join ' ')
docker exec $Container sh -c "set -o pipefail 2>/dev/null; $cmd" 2>&1 | ForEach-Object {
    if ($_ -match 'WARNING|warning') { Write-Host $_ -ForegroundColor DarkYellow }
    else { Write-Host $_ }
}
$code = $LASTEXITCODE

# чистим за собой
docker exec $Container rm -f $remote 2>&1 | Out-Null

if ($code -ne 0) {
    Write-Host ""
    Write-Host "pg_restore завершился с кодом $code" -ForegroundColor Red
    throw "Проверь, что дамп сделан с ТОЙ ЖЕ major-версией PostgreSQL, что и в контейнере (18)."
}

Write-Host ""
Write-Host "OK: база '$DbName' в контейнере '$Container' восстановлена" -ForegroundColor Green
Write-Host "Перезапусти backend, чтобы он подхватил схему:"
Write-Host "  docker compose restart backend" -ForegroundColor Cyan
