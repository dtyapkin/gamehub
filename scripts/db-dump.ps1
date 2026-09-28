<#
.SYNOPSIS
    Дамп локальной (нативной) PostgreSQL в custom format - ready for pg_restore.

.DESCRIPTION
    Источник  : любой PostgreSQL (по умолчанию локальный на 127.0.0.1:5432)
    Формат   : pg_dump -Fc  (сжатый, поддерживает -j и частичное восстановление)
    Результат: dumps\<db>-<yyyyMMdd-HHmmss>.dump

    Пароль НЕ хранится в файле и НЕ передаётся аргументом командной строки
    (иначе он попадёт в историю процессов). Используется PGPASSWORD из окружения
    либо .pgpass.

.EXAMPLE
    # пароль спросится интерактивно и не сохранится нигде
    $env:PGPASSWORD = 'strapi'; .\db-dump.ps1 -DbName strapi -DbUser strapi

.EXAMPLE
    .\db-dump.ps1 -DbName strapi -DbUser strapi
#>
[CmdletBinding()]
param(
    [string]$DbHost = '127.0.0.1',
    [int]   $Port = 5432,
    [Parameter(Mandatory)][string]$DbName,
    [string]$DbUser = 'postgres',
    # Вложенный Join-Path, а не один с тремя аргументами: в Windows
    # PowerShell 5.1 у Join-Path всего два параметра пути, третий
    # (AdditionalChildPath) появился только в PowerShell 7.
    [string]$OutDir = (Join-Path (Join-Path $PSScriptRoot '..') 'dumps'),
    [switch]$NoClean
)

$ErrorActionPreference = 'Stop'

# ---- ищем pg_dump -----------------------------------------------------
$pgDump = Get-ChildItem 'C:\Program Files\PostgreSQL\*\bin\pg_dump.exe' -ErrorAction SilentlyContinue |
          Sort-Object FullName -Descending | Select-Object -First 1 -ExpandProperty FullName
if (-not $pgDump) {
    $cmd = Get-Command pg_dump -ErrorAction SilentlyContinue
    if ($cmd) { $pgDump = $cmd.Source }
}
if (-not $pgDump) { throw "pg_dump не найден. Установи PostgreSQL Client Tools." }
Write-Host "pg_dump: $pgDump" -ForegroundColor DarkGray

# ---- пароль ----------------------------------------------------------
if (-not $env:PGPASSWORD) {
    $secure = Read-Host -Prompt "Пароль пользователя '$DbUser'" -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { $env:PGPASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

# ---- выходной файл ----------------------------------------------------
if (-not (Test-Path -LiteralPath $OutDir)) { New-Item -ItemType Directory -Path $OutDir | Out-Null }
$OutDir = (Resolve-Path -LiteralPath $OutDir).Path
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$target = Join-Path $OutDir "$DbName-$stamp.dump"

# ---- снимаем список таблиц, чтобы положить в лог ----------------------
$pgIsReady = Join-Path (Split-Path $pgDump) 'pg_isready.exe'
if (Test-Path $pgIsReady) { & $pgIsReady -h $DbHost -p $Port -t 5 | Out-Null }

Write-Host "Дамплю $DbName@$DbHost`:$Port ..." -ForegroundColor Cyan
$args = @(
    '-h', $DbHost,
    '-p', $Port,
    '-U', $DbUser,
    '-d', $DbName,
    '-Fc',                 # custom format
    '--no-owner',          # роли на VPS могут называться иначе
    '--no-privileges',     # не тащить GRANT'ы на несуществующие роли
    '--clean',             # IF EXISTS ... DROP перед CREATE (нужно для перезаливки)
    '--if-exists',
    '-f', $target,
    '--verbose'
)

# Windows PowerShell 5.1 при $ErrorActionPreference='Stop' превращает ЛЮБОЙ
# вывод нативной команды в stderr в терминирующее исключение. pg_dump пишет
# туда служебные сообщения даже при успехе, поэтому на время вызова
# снижаем политику и судим по реальному коду возврата.
$ErrorActionPreference = 'Continue'
& $pgDump @args
$dumpExit = $LASTEXITCODE
$ErrorActionPreference = 'Stop'
if ($dumpExit -ne 0) { throw "pg_dump завершился с кодом $dumpExit" }

Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue

if (-not (Test-Path -LiteralPath $target)) { throw "Файл дампа не создан: $target" }
if ((Get-Item $target).Length -eq 0) { throw "Файл дампа пустой: $target" }
$size = [math]::Round((Get-Item $target).Length / 1MB, 2)

Write-Host ""
Write-Host "OK: $target ($size MB)" -ForegroundColor Green
Write-Host "Теперь залей его в контейнер:"
Write-Host "  .\db-restore-container.ps1 -DbName <db> -DumpFile `"$target`"" -ForegroundColor Cyan
