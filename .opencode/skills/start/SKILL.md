---
name: start
description: >
  Use this skill whenever the user wants to start the local dev server, clear cache,
  or build and sync web assets to the mobile app. Trigger on phrases like "start",
  "start server", "run server", "dev server", "local server", "clear cache",
  "fresh start".
---

# Skill: start

# Start Server, Build & Clear Cache

Runs preconditions before development: clears cache, syncs web assets to mobile, and starts the local server at http://127.0.0.1:3000/.

## When to use

Trigger on phrases like: "login", "start", "start server", "run server", "dev server", "local server", "run locally", "clear cache", "fresh start", "http://127.0.0.1:3000"

## Workflow

### Step 1: Kill any existing server on port 3000

```powershell
$proc = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($proc) { foreach ($p in $proc) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue } }
```

### Step 2: Clear Service Worker cache

```powershell
# Remove any cached service worker files
$wwwDir = "F:\Data Engineering\Simple EMI calculator\www"
$swFile = Join-Path $wwwDir "sw.js"
if (Test-Path $swFile) {
    $ts = Get-Date -Format "yyyyMMdd-HHmmss"
    Rename-Item $swFile "sw.js.bak.$ts" -Force -ErrorAction SilentlyContinue
    Write-Output "Old sw.js cleared"
}

# Clear any cache storage directories
$cacheDir = "F:\Data Engineering\Simple EMI calculator\.cache"
if (Test-Path $cacheDir) { Remove-Item $cacheDir -Recurse -Force -ErrorAction SilentlyContinue }
```

### Step 3: Build and sync web assets to mobile

```powershell
cd 'F:\Data Engineering\Simple EMI calculator'; npm run build; if ($?) { npx cap copy android }
```

### Step 4: Start local HTTP server on port 3000

```powershell
Start-Process python -ArgumentList '-m', 'http.server', '3000' -WorkingDirectory 'F:\Data Engineering\Simple EMI calculator' -WindowStyle Hidden
```

If Python is not available, try Node:

```powershell
Start-Process npx -ArgumentList 'serve', '-l', '3000', '-s', '.' -WorkingDirectory 'F:\Data Engineering\Simple EMI calculator' -WindowStyle Hidden
```

### Step 5: Verify server is running and confirm

```powershell
Start-Sleep -Seconds 2
try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:3000/index.html" -UseBasicParsing -TimeoutSec 5
    Write-Output "Server is UP - Status: $($r.StatusCode)"
    Write-Output "Food Calculator: http://127.0.0.1:3000/food.html"
} catch {
    Write-Output "Server may still be starting. Try: http://127.0.0.1:3000/index.html"
}
```

## Notes

- The server serves files from the project root `F:\Data Engineering\Simple EMI calculator`
- After clearing cache, do a hard refresh in browser: `Ctrl+Shift+R` or `Ctrl+F5`
- If using the Android app, clear app data or reinstall to fully reset cache
