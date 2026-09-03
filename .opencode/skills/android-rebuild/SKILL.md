---
name: android-rebuild
description: >
  Use this skill whenever the user wants to rebuild, recompile, or ship the Android
  Capacitor app. Trigger on phrases like "rebuild", "build android", "build apk",
  "make apk", "generate aab", "release apk", "upload to playstore", "playstore
  version", "play store release", "ship the app", "rebuild the app", "update the
  android build", or any request to produce a new Android APK/AAB or publish to the
  Google Play Store. This skill automates copying the web assets into www/ and running
  the Gradle build (APK and/or AAB), and handles Play Store version bumps.
---

# Android Rebuild Agent

Automates building the Android app for this Capacitor project
(`in.simplecalculator.app`, webDir `www`).

## Context
- Web source: root `*.html`, `*.js`, `style.css`, etc.
- `npm run build` → `scripts/copy-web.js` copies web assets into `www/`
- `gradle assembleRelease` → signed APK
- `gradle bundleRelease` → AAB (required for Play Store)
- Signing config + keystore already configured in `android/app/build.gradle`
- Android SDK already installed at `$env:ANDROID_HOME`

## Decision: which build?

| User said | Action |
|-----------|--------|
| "rebuild" / "build apk" / "make apk" | APK only (`npm run rebuild`) |
| "generate aab" / "upload to playstore" / "playstore version" / "ship" | APK **and** AAB, and bump version |
| "playstore version" / "release version" | Also increment `versionCode` + `versionName` |

## Workflow

### Step 1: Copy web assets
```powershell
cd "<project-root>"
npm run build
```
This regenerates `www/` from the latest website code.

### Step 2: Build
For APK only:
```powershell
cd android
.\gradlew.bat assembleRelease --no-daemon
```
For Play Store (APK + AAB), run BOTH:
```powershell
.\gradlew.bat assembleRelease bundleRelease --no-daemon
```

Prefer the npm scripts already defined:
- `npm run rebuild` → APK
- `npm run rebuild:bundle` → APK + AAB

### Step 3: Play Store version bump (only if "playstore"/"version"/"ship")
Before building for release, increment in `android/app/build.gradle`:
- `versionCode` (integer, +1 every upload — Play requires this strictly increase)
- `versionName` (human string, e.g. "1.1")

Tell the user the new values so they can track submissions.

### Step 4: Report output
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

Verify APK is signed:
```powershell
& "$env:ANDROID_HOME\build-tools\34.0.0\apksigner.bat" verify --print-certs "android\app\build\outputs\apk\release\app-release.apk"
```

### Step 5 (optional): Install for testing
```powershell
adb install -r android\app\build\outputs\apk\release\app-release.apk
```

## Notes
- Do NOT skip `npm run build` — the APK bundles a frozen snapshot of `www/`, so
  website changes won't appear unless assets are re-copied first.
- Signing passwords are currently hardcoded in `android/app/build.gradle`;
  recommend moving them to `local.properties` if the user asks.
- Build takes ~10-40s when Gradle is warm.
