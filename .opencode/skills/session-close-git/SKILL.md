---
name: session-close-git
description: >
  Use this skill when the user ends a working session and wants all work safely saved:
  automatically document any undocumented changes, commit the code with a clear
  conventional commit message, and push it to the current remote branch.
  Trigger on phrases like "logout", "logoff", "log off", "signoff", "sign off", "session end",
  "end session", "close session", "wrap up", "wrap up session", "save my work",
  "commit and push everything", "commit all changes", "push my changes",
  "finish up", "shutdown", or any request to close/end the session while preserving work.
  This skill combines an auto-documentation pass with a git add/commit/push workflow.
---

# Session Close — Auto Document, Commit & Push

When the user logs off / signs off / ends the session, run this workflow so that
nothing is lost: undocumented changes get documented, the code is committed with a
proper message, and the branch is pushed to the remote.

> Treat this as a single atomic "save the session" routine. Do not stop halfway.

## Pre-flight checks

Run these first and bail out early with a clear message if something is wrong:

1. **Inside a git repo?**
   ```bash
   git rev-parse --is-inside-work-tree
   ```
   If not, stop and tell the user the project is not a git repository.

2. **Current branch & remote**
   ```bash
   git branch --show-current
   git remote -v
   ```
   Remember the branch name and the remote (default `origin`). If there is no
   remote configured, you can still document and commit locally, but warn the user
   that pushing is not possible and skip the push step.

3. **Git identity configured?** (avoids commit failures)
   ```bash
   git config user.name; git config user.email
   ```
   If missing, tell the user to set them (`git config user.name "..."`) — do not
   guess or invent an identity.

## Step 1 — Collect the changes

```bash
git status --short
git diff --stat
git diff
git log --oneline -5
```

Classify what changed:
- **Modified tracked files** → `M`
- **Untracked files** → `??` (review each; only stage source, not build output)
- **Deleted/renamed** → `D` / `R`

Ignore anything already excluded by `.gitignore` (e.g. `node_modules/`, `android/`,
`www/`, `.env`, `.opencode/`). If an untracked file looks like a secret
(`.env`, `*.key`, `*.pem`, `*.keystore`, credentials), **do not stage it** — warn
the user instead.

## Step 2 — Document the undocumented changes

Make sure every change is reflected in project documentation before committing.

1. Find existing documentation (prefer a `*DOCUMENTATION.md`, `docs/*.md`, then
   `README.md`). If none exists, create one (see the *auto-documenter* skill for the
   template and scanning approach).
2. For each changed file/group of changes, ensure the docs cover:
   - New or changed features / functions / UI fields
   - New behavior the user asked for (e.g. new calculator inputs, charts, workflows)
   - Any API, config, or dependency changes
3. Add a short **Changelog / Session Notes** entry at the top or bottom of the doc
   with the date and a one-line summary of this session's work.
4. Keep edits surgical — update only what changed; never rewrite a healthy doc.

If documentation already fully covers the changes, say so and move on. Do not create
noise by duplicating content.

## Step 3 — Compose the commit message

Write a clear, conventional-commit style message. Structure:

```
<type>(<scope>): <short summary>

<1-3 sentence explanation of what changed and why>

Changes:
- path/to/file: what changed
- path/to/file: what changed

Docs: <documentation file> updated/created
```

**Type guide:**
| Type | Use for |
|------|---------|
| `feat` | New feature / capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Restructure without behavior change |
| `style` | Formatting / UI styling |
| `chore` | Misc / tooling |

Keep the summary under ~72 chars. Use the imperative mood ("add", "fix", "update").
If multiple unrelated features changed, you may split into a few logical commits,
but for a session-close it is usually fine to make **one** cohesive commit that
documents the whole session (prefer clarity over splitting).

## Step 4 — Stage and commit

```bash
git add <specific files or patterns>
git commit -m "$(cat <<'EOF'
<composed message>
EOF
)"
```

Rules:
- **Stage explicitly** (named files/patterns), never `git add -A` blindly. This
  avoids accidentally committing secrets or huge build artifacts.
- Respect `.gitignore`; if a needed file is ignored, the user must decide — do not
  force-add secrets.
- Do **not** use `--amend` (never rewrite existing history) and **never** `--force`
  push.

## Step 5 — Push to the remote branch

```bash
git push origin <branch>
```

- If the push is rejected (remote has new commits), **do not force push**. Instead:
  ```bash
  git pull --rebase origin <branch>
  ```
  resolve any conflicts, then `git push origin <branch>`.
- If there is no remote, skip this step and clearly tell the user the work is
  committed locally only.

## Step 6 — Report

End with a concise summary:

```
Session saved ✅
Branch: <branch>  (pushed to origin)
Commit: <short-hash> — <summary>
Docs:   <doc file> updated

Changes committed:
  M common.js
  M weightloss.js
  ...
```

If anything was skipped (secret not committed, no remote, push failed), say exactly
what and why, and give the manual command the user can run.

## Safety rules (must not be violated)

- Never commit secrets, keys, tokens, `.env`, `*.keystore`, or credentials.
- Never `git add -A` / `git add .` without reviewing the file list first.
- Never `--force` push or `--amend` another commit.
- If a destructive or ambiguous action is needed (e.g. resolving a rebase conflict),
  pause and ask the user rather than guessing.
- On a detached HEAD, stop and tell the user to check out a branch first.

## Edge cases

- **Nothing to commit** (`git status` clean): say "No changes to save" and stop.
- **Only documentation changed**: still commit (type `docs`).
- **Detached HEAD**: stop, explain, suggest `git checkout -` or the right branch.
- **Huge untracked dir** (e.g. `node_modules`): it should be gitignored; if not,
  warn and do not stage it.
- **Multiple unrelated features**: prefer one clear session commit; only split if the
  user explicitly asks for separate commits.
