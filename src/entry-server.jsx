/**
 * Server render entry, used only by `scripts/prerender.mjs`.
 *
 * The app is rendered with MemoryRouter at the same path the client's
 * BrowserRouter will read, so the prerendered markup and the client's first
 * render agree during hydration.
 *
 * Vite builds this file to `dist-ssr/entry-server.js`, which is why `seo.js`
 * re-exported here resolves `import.meta.env.VITE_SITE_URL` correctly (Vite
 * inlines it at build time, exactly as it does for the client bundle).
 */
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    createElement(MemoryRouter, { initialEntries: [url] }, createElement(App)),
  )
}

export {
  ROUTES,
  SITE_URL,
  SITE_NAME,
  renderHeadHtml,
  getSeo,
  canonicalFor,
} from './data/seo.js'
