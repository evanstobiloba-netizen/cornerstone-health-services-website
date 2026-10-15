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
import { ROUTER_BASENAME } from './lib/asset.js'

export function render(url) {
  // The client mounts <BrowserRouter basename={ROUTER_BASENAME}>, so the router
  // has to see the same basename here. Otherwise every <Link> would render a
  // bare "/about" into the static HTML while the hydrated client renders
  // "/<base>/about", which React reports as a hydration mismatch.
  const entry = ROUTER_BASENAME === '/' ? url : `${ROUTER_BASENAME}${url}`

  return renderToString(
    createElement(
      MemoryRouter,
      { basename: ROUTER_BASENAME, initialEntries: [entry] },
      createElement(App),
    ),
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
