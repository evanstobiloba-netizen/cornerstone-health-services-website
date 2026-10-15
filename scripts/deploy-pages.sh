#!/usr/bin/env bash
#
# Publish the prerendered site to the `gh-pages` branch for a client preview.
#
# GitHub Pages *project* sites are served from a subpath
# (https://<owner>.github.io/<repo>/), so the build has to be told about it:
#
#   VITE_BASE      -> base path Vite prefixes on every bundled + public asset
#   VITE_SITE_URL  -> canonical origin used by <link rel=canonical>, og:url,
#                     the sitemap and robots.txt
#
# Both are derived from the `origin` remote, so renaming the repo or moving it
# to a different owner needs no edit here. Override either by exporting it.
#
# Usage:  npm run deploy:pages
#
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_DIR"

REMOTE="${REMOTE:-$(git remote get-url origin)}"

# git@github.com:owner/repo.git  ->  owner/repo
# https://github.com/owner/repo.git -> owner/repo
SLUG="$(printf '%s' "$REMOTE" | sed -E 's#\.git$##; s#.*[:/]([^/]+/[^/]+)$#\1#')"
OWNER="${SLUG%%/*}"
REPO="${SLUG##*/}"

if [ "$REPO" = "$OWNER.github.io" ]; then
  # A user/organisation page is served from the domain root.
  DEFAULT_BASE="/"
  DEFAULT_URL="https://$OWNER.github.io"
else
  DEFAULT_BASE="/$REPO/"
  DEFAULT_URL="https://$OWNER.github.io/$REPO"
fi

export VITE_BASE="${VITE_BASE:-$DEFAULT_BASE}"
export VITE_SITE_URL="${VITE_SITE_URL:-$DEFAULT_URL}"

echo "Publishing preview"
echo "  repo            : $SLUG"
echo "  VITE_BASE       : $VITE_BASE"
echo "  VITE_SITE_URL   : $VITE_SITE_URL"
echo

npm run build

# Stage the build into a throwaway repo so the published branch never carries
# build output into the source history.
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
cp -R dist/. "$STAGE/"

# Belt and braces: Jekyll would otherwise ignore files that start with "_".
touch "$STAGE/.nojekyll"

cd "$STAGE"
git init -q
git checkout -q -b gh-pages
git add -A
git \
  -c user.name="${GIT_AUTHOR_NAME:-$(git -C "$REPO_DIR" config user.name || echo deploy)}" \
  -c user.email="${GIT_AUTHOR_EMAIL:-$(git -C "$REPO_DIR" config user.email || echo deploy@localhost)}" \
  commit -q -m "Deploy preview ($(date -u +%Y-%m-%dT%H:%MZ))"
git remote add origin "$REMOTE"
git push -q -f origin gh-pages

echo
echo "Pushed gh-pages. Preview: $VITE_SITE_URL/"
