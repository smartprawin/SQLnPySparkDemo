---
name: app-distribute
description: >
  Use this skill whenever the user wants to get the built Android app onto a
  device or distribute it. Trigger on phrases like "download the app", "install
  the app", "get the app on my phone", "install apk", "adb install", "side
  load", "distribute the app", "publish to playstore", "play store", "ship the
  app", "how do i install". This skill explains the three options for delivering
  the APK/AAB to a device: direct APK install, ADB install, and Play Store
  upload, and runs the steps.
---

# App Distribute / Install Agent

Helps the user get the built Android app (`in.simplecalculator.app`) onto a
device or publish it. The release artifacts are produced by the
`android-rebuild` skill first:

- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

If the artifact does not exist yet, run the build first (see `android-rebuild`):
```powershell
npm run rebuild            # APK only
npm run rebuild:bundle     # APK + AAB (for Play Store)
```

## Option A — Direct APK install (fastest for testing)

For the user's own phone, no USB or tooling required.

1. Copy `android/app/build/outputs/apk/release/app-release.apk` to the phone
   (USB file transfer, email, Google Drive, etc.).
2. On the phone: enable **Settings → Security → Install unknown apps** for the
   file app used to open it.
3. Tap the APK → **Install**.

Tell the user the exact APK path so they can locate/copy it.

## Option B — Via ADB (phone connected by USB with USB debugging on)

Fastest when a device is already plugged in.

1. Verify a device is connected:
   ```powershell
   adb devices
   ```
   If empty, the phone is not detected — prompt the user to enable USB debugging
   and authorize the computer.
2. Install (replaces any existing build):
   ```powershell
   adb install -r "android\app\build\outputs\apk\release\app-release.apk"
   ```

## Option C — Distribute publicly (Play Store)

Use only when the user wants a public release. Play Store accepts **AAB only**,
not APK.

1. Build the AAB:
   ```powershell
   npm run rebuild:bundle
   ```
2. Upload `android/app/build/outputs/bundle/release/app-release.aab` to the
   Google Play Console.
3. Requires a Play developer account (one-time $25 fee) and a completed store
   listing (icon, screenshots, description, privacy policy).

For personal use, Option A or B is simplest.

## Output

After any install, confirm success:

- Direct copy: tell the user the APK path and the phone-side steps.
- ADB: confirm `adb install` printed `Success`.
- Play Store: tell the user the AAB path and that the rest is done in the Play
  Console.
