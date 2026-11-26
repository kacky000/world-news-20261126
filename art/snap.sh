#!/usr/bin/env bash
# snap.sh — build the sheet and photograph it with headless Chrome into entry.png (1024 x 1024).
#   bash art/snap.sh
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
root="$(dirname "$here")"
node "$here/sheet.mjs"

chrome="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
profile="$(mktemp -d)"
page="file:///$(cygpath -m "$here/front-page.html" 2>/dev/null || echo "$here/front-page.html")"
shot="$(cygpath -m "$root/entry.png" 2>/dev/null || echo "$root/entry.png")"

"$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --user-data-dir="$(cygpath -m "$profile" 2>/dev/null || echo "$profile")" \
  --window-size=1024,1024 --screenshot="$shot" "$page" >/dev/null 2>&1

rm -rf "$profile"
ls -l "$root/entry.png"
