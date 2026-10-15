/**
 * Insurance logo registry.
 *
 * `__INSURANCE_LOGOS__` is a `{ [slug]: '/insurance/<file>' }` map inlined at
 * build time by `vite.config.js`, which scans `public/insurance/`. Anything not
 * present in the map has no artwork supplied yet and is rendered as a wordmark
 * lockup instead (see `src/components/InsuranceLogo.jsx`).
 *
 * To add a logo: drop `<slug>.svg` (or `.png`/`.webp`) into `public/insurance/`
 * using the slug from `insurances` in `src/data/site.js`, then rebuild.
 */
export const INSURANCE_LOGOS = __INSURANCE_LOGOS__ || {}

/** Absolute path to a plan's logo, or `null` when no artwork is supplied. */
export function insuranceLogoSrc(slug) {
  return INSURANCE_LOGOS[slug] || null
}

/** Slugs that currently have artwork, handy for build tooling and QA. */
export function insuranceLogoSlugs() {
  return Object.keys(INSURANCE_LOGOS)
}
