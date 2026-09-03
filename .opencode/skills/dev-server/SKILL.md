---
name: dev-server
description: >
  Use this skill whenever the user wants to start a local dev server or clear old
  cache so they see the latest code. Trigger on phrases like "start server",
  "dev server", "local server", "run locally", "clear cache", "fresh start",
  "serve the site".
---

# Skill: dev-server

# Dev Server & Cache Clear

Starts a local HTTP server and clears old cache so you always see the latest code.

## When to use

Trigger on phrases like: "login", "start server", "dev server", "local server", "run locally", "clear cache", "fresh start", "http://127.0.0.1:3000", "serve the site"

## Workflow

### Step 1: Kill any existing server on port 3000

```powershell
$proc = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($proc) { foreach ($p in $proc) { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue } }
```

### Step 2: Start local HTTP server on port 3000

```powershell
Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd 'F:\Data Engineering\Simple EMI calculator'; python -m http.server 3000"
```

If Python is not available, try Node:

```powershell
Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd 'F:\Data Engineering\Simple EMI calculator'; npx serve -l 3000 -s ."
```

### Step 3: Clear Service Worker cache

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

### Step 4: Verify server is running

```powershell
Start-Sleep -Seconds 2
try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:3000/index.html" -UseBasicParsing -TimeoutSec 5
    Write-Output "Server is UP - Status: $($r.StatusCode)"
    Write-Output "Open: http://127.0.0.1:3000/index.html"
} catch {
    Write-Output "Server may still be starting. Try: http://127.0.0.1:3000/index.html"
}
```

## Notes

- The server serves files from the project root `F:\Data Engineering\Simple EMI calculator`
- After clearing cache, do a hard refresh in browser: `Ctrl+Shift+R` or `Ctrl+F5`
- If using the Android app, clear app data or reinstall to fully reset cache
