# Run this in PowerShell AS ADMINISTRATOR (right-click PowerShell → Run as administrator)
# Then paste these commands:

$extract = "$env:TEMP\pgvector_pg18"
$pg = "C:\Program Files\PostgreSQL\18"

if (-not (Test-Path "$extract\lib\vector.dll")) {
  Write-Host "ERROR: pgvector zip not extracted at $extract"
  Write-Host "Ask Cursor to re-download it, or download:"
  Write-Host "https://github.com/andreiramani/pgvector_pgsql_windows/releases/download/0.8.6_18/vector.v0.8.6-pg18.zip"
  exit 1
}

Copy-Item "$extract\lib\vector.dll" "$pg\lib\vector.dll" -Force
Copy-Item "$extract\share\extension\*" "$pg\share\extension\" -Force
Restart-Service postgresql-x64-18
Start-Sleep -Seconds 3

# Set your postgres password for this window only:
if (-not $env:PGPASSWORD) {
  $secure = Read-Host "Postgres password" -AsSecureString
  $env:PGPASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  )
}

$psql = "$pg\bin\psql.exe"
& $psql -U postgres -d tog_rag -v ON_ERROR_STOP=1 -f "C:\Users\DONI BUTT\Documents\rag-project\backend\scripts\init_schema.sql"
& $psql -U postgres -d tog_rag -c "\dx vector"
Write-Host "If you see extension 'vector' above, you are done."
