import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ROUTER_BASENAME } from './lib/asset.js'
import './index.css'

const container = document.getElementById('root')

const tree = (
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * The production build prerenders every route (see scripts/prerender.mjs), so
 * in production `#root` arrives with markup already in it and we hydrate to
 * keep it. In `npm run dev` there is no prerendered markup and we mount
 * normally.
 *
 * Clean DOM nodes matter here: if the prerendered HTML were produced with a
 * template tool, stray whitespace text nodes could make the tree mismatch and
 * React would fall back to a client render. Prerendering injects the string
 * produced by renderToString directly, so the node set matches exactly.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree, {
    onRecoverableError(error) {
      // A recoverable error during hydration almost always means the
      // prerendered markup and the client's first render disagreed. React
      // silently throws away the prerendered DOM and re-renders on the client,
      // which is exactly the performance and SEO failure this build prevents -
      // so surface it loudly rather than letting it pass unnoticed.
      console.error('[cornerstone] hydration mismatch:', error)
    },
  })
} else {
  createRoot(container).render(tree)
}
