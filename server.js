/**
 * Production static server for the prerendered site in dist/.
 *
 * Deployed on a Node host (Render / Railway / similar) that injects PORT and
 * runs `npm start`. The build (`npm run build`) must run before this: dist/ is
 * generated, not committed.
 *
 * Behaviour mirrors vercel.json so the move off Vercel's edge loses nothing:
 *   - the same security headers (CSP, HSTS, X-Frame-Options, ...)
 *   - trailingSlash: false  ->  /about/ 308-redirects to /about
 *   - /assets/* cached immutably, hero/insurance/brand art cached 7 days
 *   - unknown routes answer with 404.html AND a real 404 status
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, 'dist')

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html not found - run `npm run build` first.')
  process.exit(1)
}

const app = express()
const port = process.env.PORT || 3000

/* ------------------------------------------------------------ headers */

// Mirror of vercel.json's global header block. `vercel.live` is intentionally
// dropped from the CSP: it only exists for Vercel's live-feedback widget and
// would be an unnecessary third-party allowance on this host.
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.openstreetmap.org; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'",
  })
  next()
})

/* ------------------------------------------------- trailing slash: false */

// vercel.json sets trailingSlash: false. Strip the slash BEFORE static so the
// request lands on the clean URL, exactly as it would on Vercel. Root "/" is
// left alone; the query string travels with the redirect.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length) // includes '?' when present
    return res.redirect(308, req.path.replace(/\/+$/, '') + query)
  }
  next()
})

/* -------------------------------------------------------------- static */

// Hashed build output: safe to cache forever (vercel.json's /assets rule).
app.use(
  '/assets',
  express.static(path.join(dist, 'assets'), { immutable: true, maxAge: '365d' }),
)

// Hero / insurance / brand artwork: 7 days, also from vercel.json.
app.use(
  /^\/(hero|insurance|brand)\//,
  express.static(dist, { maxAge: '7d', redirect: false }),
)

// Everything else in dist (index.html, sitemap.xml, robots.txt, favicon...).
// redirect: false suppresses express's default /about -> /about/ directory
// redirect; prerendered route directories are resolved by the fallback below.
app.use(express.static(dist, { redirect: false }))

/* -------------------------------------------------- routes + 404 fallback */

// Prerendered routes live at dist/<route>/index.html ("/" is handled by
// express.static above). The containment check rejects any path that would
// resolve outside dist (e.g. encoded "..%2f" tricks).
app.use((req, res) => {
  let decoded = req.path
  try {
    decoded = decodeURIComponent(req.path)
  } catch {
    // Malformed percent-encoding: fall through to the 404 page.
  }
  const clean = decoded.replace(/^[/\\]+|[/\\]+$/g, '')
  const file = path.resolve(dist, clean, 'index.html')

  if (clean && file.startsWith(dist + path.sep) && fs.existsSync(file)) {
    return res.sendFile(file)
  }

  // Real 404 status: search engines must see it, and prerendered 404.html is
  // already rendered with a noindex head (see scripts/prerender.mjs).
  res.status(404).sendFile(path.join(dist, '404.html'))
})

/* -------------------------------------------------------------- listen */

app.listen(port, () => {
  console.log(`serving dist/ on http://localhost:${port}`)
})
