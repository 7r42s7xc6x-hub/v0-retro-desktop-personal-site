#!/bin/bash
# Daily job: rebuild public/tokens.json from local Claude Code logs and push it to main.
# Runs in its own clone so it never touches a working copy you're editing.
# Installed by scripts/com.salvadorduarte.tokens.plist (see README in that file).
set -euo pipefail

# Launchd runs this with no terminal and the screen possibly locked. If gh's
# credential helper ever needs the macOS Keychain and nobody is there to
# approve the access prompt, the git command hangs forever — which blocks
# every later scheduled run too, since launchd won't start a second instance
# on top of one that's still "running".
#
# To make that impossible, the real work below runs under a watchdog: past
# TIMEOUT seconds the whole process group is killed and this script exits,
# so tomorrow's run is never blocked by today's. A day that got killed before
# pushing is simply missed and picked up by the next successful run, as long
# as its logs haven't aged out (see build-tokens.mjs's merge logic).
TIMEOUT=600 # 10 minutes is generous for a clone plus two small pushes.

if [ -z "${REFRESH_TOKENS_WATCHED:-}" ]; then
  export REFRESH_TOKENS_WATCHED=1
  set -m # put the child in its own process group so the watchdog can kill it whole
  "$0" "$@" &
  CHILD=$!
  set +m
  (
    sleep "$TIMEOUT"
    kill -TERM -- -"$CHILD" 2>/dev/null
    sleep 5
    kill -KILL -- -"$CHILD" 2>/dev/null
  ) &
  WATCHDOG=$!

  set +e
  wait "$CHILD"
  STATUS=$?
  set -e

  kill "$WATCHDOG" 2>/dev/null || true
  wait "$WATCHDOG" 2>/dev/null || true
  if [ "$STATUS" -ne 0 ]; then
    echo "refresh-tokens.sh did not finish within ${TIMEOUT}s (status $STATUS) — skipping today, will retry tomorrow." >&2
  fi
  exit "$STATUS"
fi

# Fail fast instead of hanging if git itself wants a terminal prompt.
export GIT_TERMINAL_PROMPT=0
# Abort a stalled network transfer instead of hanging on it.
export GIT_HTTP_LOW_SPEED_LIMIT=1000
export GIT_HTTP_LOW_SPEED_TIME=30

REPO_URL="https://github.com/7r42s7xc6x-hub/v0-retro-desktop-personal-site.git"
CLONE="$HOME/.salvadorduarte-tokens/repo"
export PATH="$HOME/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
GIT_AUTH=(-c credential.helper= -c credential.helper="!$(command -v gh) auth git-credential")

if [ ! -d "$CLONE/.git" ]; then
  mkdir -p "$(dirname "$CLONE")"
  git "${GIT_AUTH[@]}" clone --quiet "$REPO_URL" "$CLONE"
fi

cd "$CLONE"
git "${GIT_AUTH[@]}" fetch --quiet origin main
git checkout --quiet main
git reset --quiet --hard origin/main

node scripts/build-tokens.mjs public/tokens.json

# updatedAt changes every run, so compare everything else.
strip() { sed 's/"updatedAt":"[^"]*",//'; }
if [ "$(git show HEAD:public/tokens.json 2>/dev/null | strip)" = "$(strip < public/tokens.json)" ]; then
  echo "No changes."
  exit 0
fi

git add public/tokens.json
git commit --quiet -m "Update token stats" -m "Automated daily refresh."
git "${GIT_AUTH[@]}" push --quiet origin main
echo "Pushed token stats."
