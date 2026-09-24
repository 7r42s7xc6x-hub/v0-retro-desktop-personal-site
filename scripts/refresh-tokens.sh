#!/bin/bash
# Daily job: rebuild public/tokens.json from local Claude Code logs and push it to main.
# Runs in its own clone so it never touches a working copy you're editing.
# Installed by scripts/com.salvadorduarte.tokens.plist (see README in that file).
set -euo pipefail

REPO_URL="https://github.com/7r42s7xc6x-hub/v0-retro-desktop-personal-site.git"
CLONE="$HOME/.salvadorduarte-tokens/repo"
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"

if [ ! -d "$CLONE/.git" ]; then
  mkdir -p "$(dirname "$CLONE")"
  git clone --quiet "$REPO_URL" "$CLONE"
fi

cd "$CLONE"
git fetch --quiet origin main
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
git push --quiet origin main
echo "Pushed token stats."
