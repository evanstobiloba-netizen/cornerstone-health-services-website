/**
 * Public-asset URL helper.
 *
 * Vite's `base` option lets one build be served from a subpath — for example a
 * GitHub Pages project site at `/cornerstone-health-services-website/` — without
 * changing any code. Vite rewrites the asset URLs it processes (bundled imports,
 * `index.html`), but a plain string that points into `public/` is opaque to it,
 * so those have to be prefixed at runtime with `import.meta.env.BASE_URL`.
 *
 * `BASE_URL` is inlined at build time and always ends with a slash, so it is
 * `/` for a root deploy and `/cornerstone-health-services-website/` for a
 * project page. The same value reaches the client bundle and the SSR bundle,
 * which keeps the prerendered HTML and the hydrated app in agreement.
 */

/** Deploy base, always with a trailing slash. */
export const BASE_URL = import.meta.env.BASE_URL || '/'

/** Same value shaped for `<BrowserRouter basename>`: no trailing slash, `/` at root. */
export const ROUTER_BASENAME = BASE_URL.replace(/\/$/, '') || '/'

/** Resolve a `public/`-relative path (e.g. `hero/slide-1.jpg`) against the base. */
export function asset(path) {
  return `${BASE_URL}${String(path).replace(/^\/+/, '')}`
}
