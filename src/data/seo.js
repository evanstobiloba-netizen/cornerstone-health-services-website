/**
 * SEO metadata — the single source of truth.
 *
 * This module is deliberately pure and environment-light so it can be consumed
 * by three different callers:
 *
 *   1. `src/components/Seo.jsx`      — updates <head> during client-side routing
 *   2. `src/entry-server.jsx`        — exposes the route list for prerendering
 *   3. `scripts/prerender.mjs`       — bakes the head into static HTML per route
 *
 * WHY PRERENDERING IS REQUIRED HERE
 * ---------------------------------
 * Open Graph and Twitter Card tags are read by scrapers (Facebook, LinkedIn,
 * X, WhatsApp, Slack, iMessage) that do NOT execute JavaScript. In a
 * client-rendered SPA the raw HTML contains no route-specific tags, so every
 * shared link shows the same generic card — or none at all. Google renders JS,
 * but a shared link does not. Prerendering is therefore an SEO/shareability
 * requirement, not an optimisation.
 *
 * CANONICAL ORIGIN
 * ----------------
 * Set VITE_SITE_URL when deploying to a preview/staging host, otherwise the
 * canonical tags would point at production and create duplicate-content
 * signals. On Vercel this is resolved automatically from the deployment's own
 * domain — see the `__SITE_URL__` define in vite.config.js.
 */
import { faqs, insurances, practice, services } from './site.js'

// Canonical origin comes from the practice record so there is one source of
// truth. Override with VITE_SITE_URL on preview/staging deploys.
const DEFAULT_SITE_URL = practice.url

/**
 * Build-time canonical override, inlined by Vite (see `define` in
 * vite.config.js).
 *
 * This deliberately does NOT read `process.env` or `import.meta.env` here.
 * This module is bundled three times — into the client app, into the SSR bundle
 * and, through that, into the prerenderer — and the value has to be identical
 * in all three. Reading the environment in this module would give the
 * prerendered HTML and the hydrated client different canonicals whenever the
 * two disagree, which React reports as a hydration mismatch.
 */
const OVERRIDE_SITE_URL = typeof __SITE_URL__ === 'string' ? __SITE_URL__ : ''

export const SITE_URL = (OVERRIDE_SITE_URL || DEFAULT_SITE_URL).replace(
  /\/+$/,
  '',
)

export const SITE_NAME = practice.name
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const OG_IMAGE_ALT = `${practice.name} — compassionate psychiatric care in Quincy, Massachusetts`

/** Every static route that gets its own prerendered HTML file. */
export const ROUTES = [
  '/',
  '/about',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/resources',
  '/faqs',
  '/insurance',
  '/contact',
  '/book',
  '/get-help',
  '/refer-a-loved-one',
  '/talk-to-a-specialist',
  '/volunteer-with-us',
  '/share-your-experience',
  '/privacy-policy',
  // The mobile screen duplicates "/" content, so it is prerendered but
  // noindexed to avoid a duplicate-content signal.
  '/mobile',
]

const TITLE_SUFFIX = 'Cornerstone Health Services Inc'

/**
 * Per-route title/description. Descriptions target 140–160 characters, which is
 * roughly what Google displays before truncating.
 */
const META = {
  '/': {
    title: `Cornerstone Health Services Inc | Psychiatric Care in Quincy, MA`,
    description:
      'Evidence-based psychiatric care for adults 18–80 in Quincy, MA. Diagnosis, medication management and psychotherapy, in person or by telehealth.',
  },
  '/about': {
    title: `About Us | ${TITLE_SUFFIX}`,
    description:
      'Founded in September 2024, Cornerstone Health Services Inc provides compassionate, evidence-based outpatient psychiatric care in Quincy, Massachusetts.',
  },
  '/services': {
    title: 'Services | Psychiatric Care in Quincy, MA',
    description:
      'Four core services for adults 18–80: diagnosis of mental illness, medications management, treatment management and psychotherapy. In person or by telehealth.',
  },
  '/resources': {
    title: `Mental Health Resources | ${TITLE_SUFFIX}`,
    description:
      'Trusted national mental health organisations and information, including NAMI, the American Psychiatric Association and the 988 Suicide & Crisis Lifeline.',
  },
  '/faqs': {
    title: `Frequently Asked Questions | ${TITLE_SUFFIX}`,
    description:
      'Answers to common questions about booking an appointment, referring a loved one, talking to a specialist, volunteering and sharing your experience.',
  },
  '/insurance': {
    title: `Insurance Accepted | ${TITLE_SUFFIX}`,
    description: `We accept ${insurances.length} major insurance plans including Medicare, MassHealth, BCBS, Aetna, Tufts and Harvard Pilgrim. Coverage is verified before your first appointment.`,
  },
  '/contact': {
    title: `Contact Us | ${TITLE_SUFFIX}`,
    description: `Contact Cornerstone Health Services Inc in Quincy, MA. Call ${practice.phoneDisplay}, email us, or send a message and our team will get back to you.`,
  },
  '/book': {
    title: `Book an Appointment | ${TITLE_SUFFIX}`,
    description:
      'Request a psychiatric appointment online. Our team contacts you to confirm a time. Telehealth across Massachusetts, or in person in Quincy.',
  },
  '/get-help': {
    title: 'Get Help | Crisis Support and the 988 Lifeline',
    description:
      'You are not alone. If you are in crisis, call or text 988 — free and confidential, 24/7. For a life-threatening emergency, call 911.',
  },
  '/refer-a-loved-one': {
    title: `Refer a Loved One | ${TITLE_SUFFIX}`,
    description:
      'Refer a loved one for compassionate psychiatric care in Quincy, MA. We contact them only with their consent and guide them through the next steps.',
  },
  '/talk-to-a-specialist': {
    title: `Talk to a Specialist | ${TITLE_SUFFIX}`,
    description:
      'Speak with an experienced mental health professional. Tell us how to reach you and a clinician will call to answer your questions — no obligation.',
  },
  '/volunteer-with-us': {
    title: `Volunteer with Us | ${TITLE_SUFFIX}`,
    description:
      'Make a difference in our community. Volunteer with Cornerstone Health Services Inc to support mental health outreach and events in Quincy, MA.',
  },
  '/share-your-experience': {
    title: `Share Your Experience | ${TITLE_SUFFIX}`,
    description:
      'Share your experience of Cornerstone Health Services Inc. Your story can inspire others on their mental health journey — published only with your permission.',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${TITLE_SUFFIX}`,
    description:
      'How this website handles your information, and where to read the full privacy policy for Cornerstone Health Services Inc.',
  },
  '/mobile': {
    title: `Cornerstone Health Services Inc | Mobile`,
    description:
      'Mobile view of Cornerstone Health Services Inc — psychiatric care for adults in Quincy, MA.',
    noindex: true,
  },
}

/** Normalise a pathname for lookup: strip query/hash and any trailing slash. */
function normalise(pathname) {
  const bare = String(pathname || '/').split(/[?#]/)[0]
  if (bare.length > 1 && bare.endsWith('/')) return bare.replace(/\/+$/, '')
  return bare || '/'
}

export function canonicalFor(pathname) {
  const p = normalise(pathname)
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`
}

/**
 * Resolve metadata for any pathname, including the dynamic service pages and
 * anything unmatched (which returns the 404 metadata).
 */
export function getSeo(pathname) {
  const p = normalise(pathname)

  if (META[p]) return { ...META[p], path: p }

  const service = services.find((s) => `/services/${s.slug}` === p)
  if (service) {
    return {
      path: p,
      title: `${service.title} | ${TITLE_SUFFIX}`,
      description: `${service.tagline}. Outpatient psychiatric care for adults 18–80 in Quincy, MA and by telehealth across Massachusetts.`,
      service,
    }
  }

  return {
    path: p,
    title: `Page Not Found | ${TITLE_SUFFIX}`,
    description: 'The page you were looking for could not be found.',
    noindex: true,
    notFound: true,
  }
}

/* ------------------------------------------------------------------ schema */

/** schema.org MedicalClinic node for the practice. */
function clinicNode() {
  return {
    '@type': 'MedicalClinic',
    '@id': `${SITE_URL}/#clinic`,
    name: practice.legalName,
    alternateName: practice.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/logo-primary.png`,
    image: OG_IMAGE,
    telephone: '+1-351-231-2513',
    email: practice.email,
    foundingDate: '2024-09',
    medicalSpecialty: 'Psychiatric',
    isAcceptingNewPatients: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${practice.address.line1} ${practice.address.line2}`,
      addressLocality: practice.address.city,
      addressRegion: practice.address.state,
      postalCode: practice.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: practice.geo.lat,
      longitude: practice.geo.lon,
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    availableService: services.map((s) => ({
      '@type': 'MedicalTherapy',
      name: s.title,
      description: s.card,
    })),
    sameAs: [practice.social.facebook, practice.social.instagram],
  }
}

/**
 * Build the JSON-LD graph for a route. Returns an array of schema.org nodes;
 * the prerenderer and the client both serialise this into a single
 * <script type="application/ld+json">.
 */
export function buildJsonLd(pathname) {
  const seo = getSeo(pathname)
  const url = canonicalFor(seo.path)
  const graph = [clinicNode()]

  if (seo.path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: practice.name,
      publisher: { '@id': `${SITE_URL}/#clinic` },
      inLanguage: 'en-US',
    })
  }

  if (seo.path === '/faqs') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  if (seo.service) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${SITE_URL}/services`,
        },
        { '@type': 'ListItem', position: 3, name: seo.service.title },
      ],
    })
    graph.push({
      '@type': 'MedicalWebPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      about: { '@id': `${SITE_URL}/#clinic` },
      inLanguage: 'en-US',
    })
  }

  if (seo.path === '/contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      about: { '@id': `${SITE_URL}/#clinic` },
    })
  }

  if (seo.path === '/about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      about: { '@id': `${SITE_URL}/#clinic` },
    })
  }

  return graph
}

/* ------------------------------------------------------- server-side head */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c])

/**
 * Serialise the full <head> additions for a route as an HTML string.
 * Used only by the prerenderer; the client uses Seo.jsx instead.
 */
export function renderHeadHtml(pathname) {
  const seo = getSeo(pathname)
  const url = canonicalFor(seo.path)

  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    seo.noindex
      ? '<meta name="robots" content="noindex, follow" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildJsonLd(pathname))}</script>`,
  ]

  return tags.join('\n    ')
}
