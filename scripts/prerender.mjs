/**
 * Static site generation.
 *
 * Runs after both Vite builds and turns the client-rendered SPA into a set of
 * real HTML files — one per route — each with the correct <head> already in the
 * markup. This is what makes Open Graph cards work, because scrapers such as
 * Facebook, LinkedIn, X, WhatsApp and Slack never execute JavaScript.
 *
 * Pipeline (see the `build` script in package.json):
 *   1. vite build                       -> dist/      (hashed client assets)
 *   2. vite build --ssr                 -> dist-ssr/  (render entry)
 *   3. node scripts/prerender.mjs       -> dist/**\/index.html, sitemap, robots
 *
 * The client bundle in dist/index.html is used as the shell so every generated
 * page points at the same hashed asset filenames.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

const { render, ROUTES, SITE_URL, renderHeadHtml, getSeo } = await import(
  pathToFileURL(ssrEntry).href
)

const shell = await readFile(join(distDir, 'index.html'), 'utf8')

/**
 * Insert the per-route head immediately before the document's closing head tag.
 *
 * `lastIndexOf` is deliberate. The shell is HTML, so comments in it may mention
 * tag names; targeting the LAST occurrence lands on the real closing tag rather
 * than a mention inside a comment. Getting this wrong once commented out the
 * stylesheet link, the canonical link and every Open Graph tag, which left the
 * page rendering completely unstyled.
 */
function injectHead(html, head) {
  const marker = '</head>'
  const at = html.lastIndexOf(marker)
  if (at === -1) {
    throw new Error('No closing head tag found in the shell HTML.')
  }
  return `${html.slice(0, at)}  ${head}\n  ${marker}${html.slice(at + marker.length)}`
}

/**
 * Strip the placeholder <title> so each page ends up with exactly one.
 *
 * Works backwards from the last closing title tag for the same reason as
 * `injectHead`: a regex such as /<title>[\s\S]*?<\/title>/ would start at a
 * mention inside a comment and delete everything up to the real element.
 */
function stripPlaceholderTitle(html) {
  const closeTag = '</title>'
  const openTag = '<title>'
  const close = html.lastIndexOf(closeTag)
  if (close === -1) return html
  const open = html.lastIndexOf(openTag, close)
  if (open === -1) return html
  return html.slice(0, open) + html.slice(close + closeTag.length)
}

const base = stripPlaceholderTitle(shell)

if (base === shell) {
  throw new Error(
    'Could not find the placeholder <title> in dist/index.html. ' +
      'The prerenderer relies on it to inject the per-route head.',
  )
}

/**
 * Build one complete HTML document.
 *
 * NOTE: every String.replace below uses a *function* replacer. The React output
 * and JSON-LD contain `$` characters, and a string replacement would interpret
 * `$&`, `$'`, `` $` `` etc. as special patterns and silently corrupt the page.
 */
function buildPage(route) {
  const body = render(route)
  const head = renderHeadHtml(route)

  let html = injectHead(base, head)

  // Inject the rendered app into the mount node.
  const rootRe = /<div id="root">\s*<\/div>/
  if (!rootRe.test(html)) {
    throw new Error('Mount node <div id="root"></div> not found in the shell.')
  }
  html = html.replace(rootRe, () => `<div id="root">${body}</div>`)

  return html
}

/** Map a route to its output file: "/" -> index.html, "/about" -> about/index.html */
function outFile(route) {
  if (route === '/') return join(distDir, 'index.html')
  const clean = route.replace(/^\/+|\/+$/g, '')
  return join(distDir, clean, 'index.html')
}

const written = []

for (const route of ROUTES) {
  const html = buildPage(route)
  const file = outFile(route)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
  written.push(route)
}

// A dedicated 404 page, which most static hosts serve automatically. Rendered
// from a path that matches no route so <NotFound /> renders, and its head comes
// from getSeo() reporting noindex.
const notFoundHtml = (() => {
  const body = render('/this-page-does-not-exist')
  const head = renderHeadHtml('/this-page-does-not-exist')
  let html = injectHead(base, head)
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    () => `<div id="root">${body}</div>`,
  )
  return html
})()

await writeFile(join(distDir, '404.html'), notFoundHtml, 'utf8')

/* ------------------------------------------------------------ sitemap.xml */

const today = new Date().toISOString().slice(0, 10)

// /mobile is intentionally excluded: it is noindex.
const sitemapRoutes = ROUTES.filter((r) => !getSeo(r).noindex)

const priorityFor = (route) => {
  if (route === '/') return '1.0'
  if (route === '/services' || route === '/book' || route === '/contact') return '0.9'
  if (route.startsWith('/services/')) return '0.8'
  if (route === '/get-help' || route === '/insurance' || route === '/about') return '0.8'
  return '0.6'
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(r)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

/* ------------------------------------------------------------- robots.txt */

// /mobile is deliberately NOT disallowed here. A Disallow rule would stop
// crawlers from ever reading its `noindex` meta tag, which is the opposite of
// what we want; the noindex tag is the correct mechanism.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

await writeFile(join(distDir, 'robots.txt'), robots, 'utf8')

/* ---------------------------------------------------------------- report */

const fmt = (n) => `${(n / 1024).toFixed(1)} kB`

console.log('\nPrerendered static HTML')
console.log(`  routes written   : ${written.length}`)
console.log('  404 page         : 404.html (noindex, excluded from sitemap)')
console.log(`  sitemap.xml      : ${sitemapRoutes.length} URLs`)
console.log(`  robots.txt       : sitemap -> ${SITE_URL}/sitemap.xml`)
console.log(`  canonical origin : ${SITE_URL}`)

const homeSize = (await readFile(join(distDir, 'index.html'))).length
console.log(`  home HTML        : ${fmt(homeSize)} (uncompressed)`)
console.log()
