import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Scans `public/insurance/` for logo artwork and returns `{ [slug]: src }`.
 *
 * Naming contract: `<slug>.<ext>` where `<slug>` matches the `slug` field on an
 * entry in `insurances` (`src/data/site.js`), e.g. `aetna.svg`. When several
 * formats exist for the same slug the most preferred one wins, so an `.svg`
 * added later automatically supersedes a legacy `.png`.
 *
 * The result is inlined into both the client and the SSR bundle. That matters:
 * resolving artwork at runtime instead would make the prerendered HTML and the
 * hydrated app disagree whenever a file is missing, which React reports as a
 * hydration mismatch. Slugs with no file simply fall back to a wordmark.
 */
const LOGO_EXTENSION_RANK = { svg: 0, webp: 1, png: 2, jpg: 3, jpeg: 3 }

/**
 * Deploy base. `/` for production (custom domain); set VITE_BASE to a subpath
 * such as `/cornerstone-health-services-website/` for a GitHub Pages project
 * site. Normalised here so the value baked into the insurance manifest matches
 * the one Vite uses for bundled assets.
 */
function normalizeBase(value) {
  let base = value || '/'
  if (!base.startsWith('/')) base = `/${base}`
  if (!base.endsWith('/')) base += '/'
  return base
}

function insuranceLogoManifest(base) {
  const dir = path.resolve(process.cwd(), 'public/insurance')
  const winners = new Map()

  let entries = []
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    // Directory is optional — before any artwork is supplied this is the norm.
    return {}
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue
    const match = entry.name.match(/^(.+)\.([a-z0-9]+)$/i)
    if (!match) continue

    const slug = match[1].toLowerCase()
    const ext = match[2].toLowerCase()
    const rank = LOGO_EXTENSION_RANK[ext]
    if (rank === undefined) continue

    const current = winners.get(slug)
    if (!current || rank < current.rank) {
      winners.set(slug, { rank, src: `${base}insurance/${entry.name}` })
    }
  }

  return Object.fromEntries([...winners].map(([slug, v]) => [slug, v.src]))
}

/**
 * `__BUILD_YEAR__` is inlined identically into both the client bundle and the
 * SSR bundle, so the prerendered HTML and the client's first render agree on
 * the footer copyright year. Without it, `new Date().getFullYear()` would be
 * evaluated on the server at build time and again in the browser, which is a
 * hydration mismatch across a year boundary.
 */
export default defineConfig(({ mode }) => {
  // `.env` files are not injected into `process.env` for the config file, so
  // read VITE_BASE through loadEnv. Real environment variables still win, which
  // is what `npm run deploy:pages` relies on.
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = normalizeBase(env.VITE_BASE || process.env.VITE_BASE)

  /**
   * Canonical origin baked into canonicals, Open Graph tags, JSON-LD, the
   * sitemap and robots.txt.
   *
   * Precedence:
   *   1. `VITE_SITE_URL` (explicit; what preview/staging deploys should use)
   *   2. Vercel's own production domain, so a Vercel deployment resolves its
   *      own URL with no configuration. `VERCEL_PROJECT_PRODUCTION_URL` is the
   *      stable domain; `VERCEL_URL` is the per-deployment one and is the only
   *      one available on a very first build.
   *   3. `''`, which tells seo.js to fall back to the practice's real domain.
   *
   * Inlined into BOTH the client and SSR bundles. seo.js must never read the
   * environment itself: the prerendered HTML and the hydrated client would then
   * disagree on the canonical and React would report a hydration mismatch.
   */
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const siteUrl = (
    env.VITE_SITE_URL ||
    process.env.VITE_SITE_URL ||
    (vercelHost ? `https://${vercelHost}` : '')
  ).replace(/\/+$/, '')

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
    },
    define: {
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
      __SITE_URL__: JSON.stringify(siteUrl),
      __INSURANCE_LOGOS__: JSON.stringify(insuranceLogoManifest(base)),
    },
  }
})
