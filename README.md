# Cornerstone Health Services Inc — Website

Marketing and intake site for Cornerstone Health Services Inc, a psychiatric
practice at 21 Mayor Thomas J. McGrath Hwy., Ste. 306, Quincy, Massachusetts
02169.

Built with **React 19 + Vite 8 + Tailwind CSS 4** (no TypeScript, no CSS
preprocessor — Tailwind v4's CSS-first `@theme` config lives in
`src/index.css`).

> **This build was aligned to the practice's live site.** Content, page
> structure, logo, colours and fonts were taken from
> <https://www.cornerstonehealthinc.com> so the rebuild matches the real brand
> rather than an approximation. See *Brand fidelity* below for exactly what was
> sourced and from where.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client bundle + SSR bundle + prerender -> dist/
npm run preview  # serve the production build locally
```

`npm run build` is three steps, not one — see
[SEO, sharing metadata and prerendering](#seo-sharing-metadata-and-prerendering):

```bash
npm run build:client   # vite build                      -> dist/      (hashed assets)
npm run build:ssr      # vite build --ssr src/entry-server.jsx -> dist-ssr/
npm run prerender      # node scripts/prerender.mjs      -> dist/**/index.html + sitemap + robots
```

---

## Routes

The site now mirrors the live site's page structure, plus the PRD's dedicated
mobile screen.

| Route | Page | File |
| --- | --- | --- |
| `/` | Home | `src/pages/Home.jsx` |
| `/about` | About Us | `src/pages/About.jsx` |
| `/services` | Services (index) | `src/pages/Services.jsx` |
| `/services/:slug` | Service detail ×4 | `src/pages/ServiceDetail.jsx` |
| `/resources` | Resources | `src/pages/Resources.jsx` |
| `/faqs` | FAQ's | `src/pages/Faqs.jsx` |
| `/insurance` | Insurance Accepted | `src/pages/Insurance.jsx` |
| `/contact` | Contact Us (+ `#refer`, `#providers`) | `src/pages/Contact.jsx` |
| `/book` | Book Now | `src/pages/Book.jsx` |
| `/get-help` | Get help? | `src/pages/GetHelp.jsx` |
| `/refer-a-loved-one` | Refer a Loved One | `src/pages/Refer.jsx` |
| `/talk-to-a-specialist` | Talk to a Specialist | `src/pages/Specialist.jsx` |
| `/volunteer-with-us` | Volunteer with Us | `src/pages/Volunteer.jsx` |
| `/share-your-experience` | Share Your Experience | `src/pages/Share.jsx` |
| `/privacy-policy` | Privacy Policy | `src/pages/Privacy.jsx` |
| `/mobile` | Mobile Home (app shell) | `src/pages/MobileHome.jsx` |
| `*` | 404 | `src/pages/NotFound.jsx` |

The four service detail pages are generated from data:
`diagnosis-of-mental-illness`, `medications-management`,
`treatment-management`, `psychotherapy` — the live site's own slugs.

The six form pages (`book`, `contact`, `refer-a-loved-one`,
`talk-to-a-specialist`, `volunteer-with-us`, `share-your-experience`) are
described declaratively in `src/data/site.js` (`forms`) and rendered by a single
component, `src/components/LeadForm.jsx`. Add a field or a whole new form page
by editing data, not by writing another component.

The `/book` form deliberately mirrors the **structure of the practice's own live
appointment form** (the `appointmentForm` template embedded on
`/mental-health-care-book-now`): Name → Address → City/State/Zip → contact
preference → Email/Phone → best time to call → preferred date/time → comment →
privacy consent, with a "Fields marked * are required" note. Two deliberate
deviations: the template's **Fax** channel and Fax Number field are omitted
(the practice publishes no fax number — it is leftover template cruft), and the
practice's **Insurance** select is kept alongside it, since coverage must be
confirmed before an appointment is offered.

`/mobile` is the explicit app-shell variant: sticky crisis header, one-tap
calling, no desktop chrome. To make it non-public, remove
the route in `src/App.jsx` and the "Mobile view" link in `SiteFooter.jsx`.

---

## SEO, sharing metadata and prerendering

The production build is a **static site**. `npm run build` renders every route to
its own HTML file with the correct metadata already present in the markup.

This is a requirement, not a nice-to-have: Open Graph and Twitter Card tags are
read by scrapers (Facebook, LinkedIn, X, WhatsApp, Slack, iMessage) that **never
execute JavaScript**. In a client-rendered SPA every shared link shows the same
generic card, or none at all. Google does render JS, but a link preview does not.

### How the build works

`src/entry-server.jsx` renders the same `<App />` through a `MemoryRouter`, and
`src/main.jsx` calls `hydrateRoot()` on the result, so the prerendered markup is
**kept** rather than discarded and re-rendered. `scripts/prerender.mjs` then uses
the client build's `dist/index.html` as a shell (so every page points at the same
hashed asset filenames) and writes one file per route.

### One source of truth

`src/data/seo.js` defines the title, description, canonical URL and structured
data for every route. Two consumers read it and can never drift apart:

- `scripts/prerender.mjs` bakes the tags into the static HTML.
- `src/components/Seo.jsx` rewrites them **in place** during client-side
  navigation (matched by selector, so no duplicate tags accumulate).

### What every page gets

- A unique `<title>` and `<meta name="description">`, written to ~150 characters
  so Google does not truncate them.
- `<link rel="canonical">`, `og:*` and `twitter:*` tags, with a real **1200×630**
  branded preview image.
- **JSON-LD structured data**: a `MedicalClinic` node (address, geo coordinates,
  telephone, the four `availableService` entries, social profiles) on every page,
  plus `WebSite` on the home page, `FAQPage` on `/faqs`, `BreadcrumbList` and
  `MedicalWebPage` on each service page, and `ContactPage` / `AboutPage` where
  relevant.

### Crawling rules

| Concern | Behaviour |
| --- | --- |
| `dist/sitemap.xml` | all **18** indexable routes, with priorities |
| `dist/robots.txt` | allows everything, points at the sitemap |
| `/mobile` | `noindex, follow`, and excluded from the sitemap |
| `dist/404.html` | `noindex`, excluded from the sitemap |

`/mobile` is deliberately **not** `Disallow`ed in `robots.txt`: a `Disallow` rule
would stop crawlers ever reading its `noindex` tag, which is the opposite of what
is wanted.

### Canonical origin

Canonical URLs use the practice's production domain by default:

```bash
VITE_SITE_URL=https://staging.example.com
```

On Vercel no configuration is needed — the deployment's own domain is exported to
the build and becomes the canonical origin automatically. Set `VITE_SITE_URL`
only to override that (for example to point a staging deploy at the production
domain).

### Regenerating the share image and app icons

`public/og-image.png`, `apple-touch-icon.png`, `icon-192.png` and `icon-512.png`
are committed, and are reproducible from `scripts/generate-social-images.py`
(needs Pillow + the two OFL brand fonts):

```bash
curl -L -o /tmp/Jost.ttf 'https://raw.githubusercontent.com/google/fonts/main/ofl/jost/Jost%5Bwght%5D.ttf'
curl -L -o /tmp/Allison-Regular.ttf 'https://raw.githubusercontent.com/google/fonts/main/ofl/allison/Allison-Regular.ttf'
python3 scripts/generate-social-images.py --jost /tmp/Jost.ttf --allison /tmp/Allison-Regular.ttf
```

### Static hosting requirements

The output uses directory-style URLs, so the host must:

- serve `/about/index.html` for the request `/about` — Vercel, Netlify and
  Cloudflare Pages all do this by default; and
- serve `dist/404.html` for unknown paths — automatic on Vercel, Netlify and
  Cloudflare Pages.

After deploying, submit `https://<domain>/sitemap.xml` in Google Search Console.

### Deploying to Vercel

The site is hosted on Vercel. `vercel.json` in the repo root configures the
build (`npm run build`), the output directory (`dist`), the trailing-slash
behaviour and the response headers, so no dashboard settings are required:

```bash
npm run deploy:vercel     # vercel --prod
```

First-time setup, once per machine:

```bash
vercel login              # device flow: approves a code in the browser
vercel link               # links this directory to the Vercel project
```

Two details worth knowing:

- **No build-time configuration is needed.** Vercel exports the project's own
  production domain to the build, and `vite.config.js` turns it into the
  canonical origin, so canonicals, Open Graph tags, JSON-LD, `sitemap.xml` and
  `robots.txt` all point at the deployment that generated them. Set
  `VITE_SITE_URL` only to override that (e.g. to point a staging deploy at the
  production domain).
- **Security headers are set in `vercel.json`**, which is the reason this host
  was chosen over GitHub Pages: `Content-Security-Policy`,
  `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` and `X-Frame-Options`. The CSP allows exactly the
  third-party origins the site uses (Google Fonts, the OpenStreetMap embed, and
  Vercel's own preview toolbar) and nothing else. If you add an embedded widget
  or a form endpoint, add its origin to `connect-src`/`frame-src` there.

> **Subpath deploys.** `VITE_BASE` still exists for hosts that serve the site
> from a subdirectory. Every `public/` asset reference goes through `asset()` in
> `src/lib/asset.js`, which prefixes `import.meta.env.BASE_URL` (Vite rewrites
> the URLs it bundles, but not these), and the router runs with
> `basename={ROUTER_BASENAME}` on both the client (`src/main.jsx`) and the
> prerenderer (`src/entry-server.jsx`), so the static HTML and the hydrated app
> produce identical `href`s. Vercel serves from the domain root, so the default
> (`/`) is correct there.

---

## Brand fidelity — what was sourced from the live site

### Colours and fonts

The live site's own stylesheet (`wp-content/themes/cornerstonde928/style.min.css`)
declares its palette in a `:root` block. These are the **actual** brand tokens,
and they are what this build uses:

```css
:root {
  --priColor:      #0e0f3b;   /* deep navy / indigo */
  --secColor:      #27d4ed;   /* cyan */
  --terColor:      #14a5eb;   /* blue */
  --gradientColor: linear-gradient(180deg, #27d4ed 0%, #14a5eb 100%);
  --priFont:       'Jost', sans-serif;
  --secFont:       'Allison', sans-serif;   /* script accent */
  --bodyColor:     #555555;
  --bodyFontSize:  16px;
  --bodyLineHeight: 23px;
}
```

The live site also uses `#f9f9ff` as its main content background, and
`#ca4b4b` / `#d92800` for alert and required-field states — the coral here is
`#ca4b4b`, taken from that stylesheet.

The **signature type treatment** was reproduced from the live site's CSS:

```css
body     { font-family: var(--priFont) }                       /* Jost */
.h1_hdng { font-family: var(--secFont); color: var(--terColor) } /* Allison, blue */
h2       { font-family: var(--priFont); font-weight: 500; color: var(--priColor) }
```

So every section heading is a short **Allison script line in blue** above a
large **Jost heading in navy** — implemented as `SectionHeading` in
`src/components/Ui.jsx`.

### Logo

The practice's real logo PNGs were downloaded from the live theme and are
served from `public/brand/`:

| File | Source | Use |
| --- | --- | --- |
| `logo-primary.png` | `main-logo.png` | navy + cyan — **light** backgrounds |
| `logo-inverse.png` | `main-logo2.png` | white + cyan — **dark** backgrounds |

Both are 434×121 with alpha. Their dominant colours are `#0e0f3b` and
`#23cded` — i.e. the logo itself is built from the same brand tokens. The
favicon (`public/favicon.svg`) is a re-draw in the same two colours.

### Content and page structure

Copy for services, mission, vision, the founding story, the FAQ answers, the
resource list and the insurance list was taken verbatim (lightly copy-edited
for capitalisation) from the live site. Real figures:

- **Address** — 21 Mayor Thomas J. McGrath Hwy., Ste. 306, Quincy, MA 02169
- **Phone** — 351-231-2513
- **Email** — margaretoloyede@cornerstonehealthinc.com
- **Zocdoc** — the practice's real profile URL
- **Privacy policy** — the practice's real policy page
- **Socials** — real Facebook and Instagram profiles
- **Insurance** — all **16** plans the live site lists (Medicare, MassHealth,
  BCBS, Aetna, Humana, Tufts, Harvard Pilgrim, United Behavioral Health, Cigna,
  Carelon, Fallon, Magellan, Multiplan, ComPsych, Unicare, First Health)

### Insurance logos

All **16** plans ship with real artwork in `public/insurance/`, named after the
plan's `slug` in `src/data/site.js`. The homepage ticker and the `/insurance`
cards both render the files; each logo has a `title` tooltip (the tiles are
logo-only, so hovering reveals the plan name).

`vite.config.js` scans the directory and inlines a `{ slug: "/insurance/<file>" }`
map into **both** the client and the SSR bundle (`__INSURANCE_LOGOS__`), so the
map is identical during prerender and hydration (no mismatch).

| Plan | File | Source |
| --- | --- | --- |
| Medicare | `medicare.svg` | Wikimedia Commons (`Medicare_logo.svg`) |
| MassHealth | `masshealth.png` | mass.gov brand asset (`masshealth_brand_01.png`, 2400×1220) |
| Blue Cross Blue Shield | `blue-cross-blue-shield.svg` | Wikipedia (`Blue Cross Blue Shield Association logo.svg`) |
| Aetna | `aetna.svg` | Wikimedia Commons (`Aetna_logo.svg`) |
| Humana | `humana.svg` | Wikimedia Commons (`Humana_logo.svg`) |
| Tufts Health Plan | `tufts-health-plan.png` | Wikimedia Commons (`Tufts_Health_Plan_Logo.png`) |
| Harvard Pilgrim | `harvard-pilgrim.svg` | harvardpilgrim.org CDN (colour logo + Point32Health endorsement) |
| United Behavioral Health | `united-behavioral-health.svg` | Wikimedia Commons (`UnitedHealthcare (logo).svg`) |
| Cigna | `cigna.svg` | Wikipedia (`Cigna_logo.svg`) |
| Fallon Health | `fallon-health.png` | Wikipedia (`Fallon Health corporate logo.png`) |
| Unicare | `unicare.svg` | unicare.com header logo (inline SVG, extracted) |
| Carelon | `carelon.svg` | carelon.com brand asset (`crl_sm_h_rgb_cN.svg`) |
| Magellan | `magellan.png` | Wikimedia Commons (`Magellan_Health_Logo.png`) |
| ComPsych | `compsych.png` | compsych.com CMS (`cropped-CPLogo541_..._Worldwide.png`) |
| Multiplan | `multiplan.svg` | claritev.com brand asset — see rebrand note below |
| First Health | `first-health.png` | firsthealth.com header logo (inline PNG, extracted) |

Notes:

- **MultiPlan → Claritev.** MultiPlan rebranded to **Claritev** in 2025 and
  publishes no MultiPlan-era logo any more, so the tile uses the current Claritev
  wordmark. The list text still reads "Multiplan" to match insurance cards;
  relabel the entry (e.g. "Multiplan (Claritev)") if you prefer.
- **Raster files** are provided at ~160 px tall even though the slot renders at
  **24 px** (`h-6`), which keeps them crisp on 2×/3× screens.
- **Changing artwork** — drop a replacement in with the same slug filename and
  rebuild. `.svg` is preferred; `.webp`/`.png`/`.jpg` also work, and if a slug
  has several files the highest-ranked format wins.
- **Sizing** — the slot is 48 px (`h-12`) on the homepage ticker and 56 px
  (`h-14`) on `/insurance`; artwork is contained, so supply SVGs on a transparent
  background with a little padding.
- **Fallback** — a plan with no file renders a wordmark lockup (monogram + short
  name) in the same footprint, so the layout is never broken or half-empty.
  `short` in `site.js` controls that label.
- **Renaming** — the `slug` is the only link between data and file. Rename one
  and you must rename the other.
- **Licence** — logos are trademarks of their owners, used here to identify the
  plans the practice accepts. Confirm brand-usage rights before publishing;
  insurer logo use is usually governed by your provider agreements.

---

## Design system and accessibility

Tokens live in `src/index.css` under `@theme`. The **full contrast
measurement table is in the comment block at the top of that file**; the short
version:

| On white | Ratio | Verdict |
| --- | --- | --- |
| navy `#0e0f3b` | 18.26:1 | pass, any size |
| body `#555555` | 7.46:1 | pass, any size |
| coral `#ca4b4b` | 4.55:1 | pass, normal text |
| `cyan-deep` `#0a7d94` | 4.80:1 | pass, normal text |
| `blue-deep` `#0b6fa4` | 5.49:1 | pass, normal text |
| cyan `#27d4ed` | 1.79:1 | **fail — decorative only** |
| blue `#14a5eb` | 2.76:1 | **fail — decorative only** |

The brand's cyan and blue are *bright* colours. They cannot carry body text on
white and nothing white can sit on them. Two consequences, both deliberate:

1. Text in the cyan/blue family uses derived accessible variants
   (`--color-cyan-deep`, `--color-blue-deep`).
2. The signature gradient button uses **navy** text, not white: navy on cyan is
   10.20:1 and navy on blue is 6.62:1, so the label stays legible across the
   whole gradient. White on cyan would be 1.79:1 and fails outright.

Measured against navy, white is 18.26:1 and cyan 10.20:1, so the dark bands and
footer are comfortable.

Other accessibility work:

- Skip-to-content link as the first focusable element.
- 3px focus ring at `#0b6fa4`, which passes 3:1 against **both** the light page
  (5.49:1) and navy bands (3.33:1).
- The 988 ribbon is a labelled `region`, present on every route, **not
  dismissible**, and is the first thing in the reading order.
- "Get help?" puts the 988/911 block *above* all marketing content.
- Form errors announce via `role="alert"` with a focus-managed summary; fields
  get `aria-invalid` when invalid.
- FAQ uses native `details`/`summary` — zero JS, keyboard-operable.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
- Route changes reset scroll; `:target` offset clears the sticky header.
- Every route has exactly one `<h1>` (verified, see below).

---

## Verification performed

**Content and routes.** A temporary SSR harness rendered **all 20 routes**
(including the 404) through `renderToString` and asserted, per route: no render
throw, exactly one `<h1>`, `tel:988`, `tel:911`, the real phone number, the brand
logo, and **none** of the old invented content (fabricated clinician names,
invented office hours, the PRD's `#00a896`/`#f8f9ff`/`#0f2744` palette, "Plus
Jakarta Sans"). Data integrity was asserted too: 16 insurances, 4 services, 6
resources, 5 FAQs, 6 forms.

**Metadata.** Every one of the **19** prerendered routes plus `404.html` was
re-opened from disk and checked for exactly one `<title>`, one
`meta[name=description]`, one `rel=canonical`, one of each `og:*` and `twitter:*`
tag, one parseable `application/ld+json` block, the correct title/description for
that route, and the correct `robots` directive.

**Hydration — verified in a real browser.** All 20 pages were loaded in headless
Chrome. With `onRecoverableError` temporarily instrumented, **zero hydration
mismatches** and zero console errors were recorded on every route, meaning the
prerendered markup is reused exactly rather than silently discarded. The
instrumentation now logs any future mismatch via `console.error`.

**Client-side navigation.** A browser harness clicked real router links from the
prerendered home page and confirmed `document.title`, the canonical URL,
`og:title`, `og:url` and the description all update, leaving **exactly one** of
each tag behind — duplicates cannot accumulate, because the head is updated by
selector rather than appended to.

Production build: CSS **7.43 kB gzip**, JS **110.67 kB gzip**.

---

## ⚠️ Before this goes live

These are real gaps needing a decision — nothing below was invented to fill a
hole.

1. **No intake backend.** The forms POST to `VITE_INTAKE_ENDPOINT`. With the
   variable unset every form runs in **demo mode**: it validates, then shows a
   success panel saying the details were *not transmitted or stored*.

   ```bash
   # .env
   VITE_INTAKE_ENDPOINT=https://your-intake-service.example.com/intake
   ```

   The receiving service must be HIPAA-covered and served over HTTPS. A Vite env
   variable is embedded in the client bundle — never put a secret there.

2. **The live site publishes no office hours.** None are shown here, because
   inventing opening hours for a clinical practice is a real-world harm. The
   copy says appointments are scheduled by request instead. If the practice
   wants published hours, add them to `practice` in `src/data/site.js` and
   surface them on `/contact`.

3. **Homepage statistics are the practice's own claims and should be confirmed.**
   `stats` in `src/data/site.js` carries "20+ Years of Experience", "1000+
   Counseling Sessions" and "750+ Lives Changed" from the live site — but the
   practice was founded in September 2024. Worth reconciling before launch.

4. **Live-site imagery shows children and adolescents; stated scope is adults
   18–80.** No stock photography was copied into this build (deliberately — the
   live images are not licensed for reuse here), but the mismatch is worth
   flagging to the practice.

5. **Clinician names are deliberately absent.** The live site does not publish
   bios, so `/contact#providers` explains that biographies are shared at the
   first appointment. Replace with real bios if the practice wants them public.

6. **Privacy Policy page does not reproduce legal text.** `src/pages/Privacy.jsx`
   summarises only what *this website* does and links to the practice's
   authoritative policy. Do not paste invented legal terms into it.

7. **Legal and clinical review.** The footer disclaimer ("not a substitute for
   medical advice"; contacting the practice does not create a clinician–patient
   relationship), the scope statements, and all service copy should be reviewed
   by the practice's counsel/compliance advisor and by Margaret Oloyede.

8. **Twitter is intentionally omitted** from the footer socials. The live site
   links to `https://www.twitter.com` itself — a placeholder, not a profile.

---

## Performance notes (sub-2s TTI KPI)

- No UI, icon or component library. Dependencies are React, React DOM and React
  Router only; icons are one inline SVG module (`src/components/Icon.jsx`).
- Every route is prerendered, so the first paint shows real content and styling
  without waiting for the JS bundle to download, parse and execute.
- Fonts (`Jost`, `Allison`) load with `display=swap` behind `preconnect`.
- The map `<iframe>` is `loading="lazy"` and uses OpenStreetMap (no API key, no
  tracking cookie on load); the pin is geocoded to the real building
  (`42.2498331, -70.9983077`) rather than an approximate area.
- Tailwind v4 emits only the utilities actually used.
- Route-level code splitting is **not** in place. If the bundle grows, wrap page
  imports in `React.lazy()`.

---

## Project structure

```
public/
  brand/logo-primary.png   real logo, light backgrounds
  brand/logo-inverse.png   real logo, dark backgrounds
  favicon.svg              brand-coloured mark
  og-image.png             1200x630 social preview (generated)
  apple-touch-icon.png     iOS home-screen icon (generated)
  icon-192.png / icon-512.png  Android / manifest icons (generated)
  site.webmanifest         name, theme colour, icons
scripts/
  prerender.mjs            writes dist/<route>/index.html, sitemap.xml, robots.txt
  generate-social-images.py regenerates the OG image + icons (needs Pillow)
src/
  App.jsx                  all routes + <Seo />
  main.jsx                 entry; hydrates prerendered markup, else mounts
  entry-server.jsx         MemoryRouter render entry used by the prerenderer
  index.css                Tailwind import + real brand tokens + base layer
  lib/asset.js             deploy base + asset() for public/ URLs
  data/site.js             ALL content, single source of truth
  data/seo.js              per-route title/description/canonical/JSON-LD
  components/
    Layout.jsx             skip link, sticky ribbon+header, footer
    CrisisRibbon.jsx       persistent 988 ribbon
    SiteHeader.jsx         nav + mobile drawer
    SiteFooter.jsx         sitemap, contact, crisis card, disclaimer
    Seo.jsx                keeps <head> in sync on client-side navigation
    LeadForm.jsx           one validated form, config-driven for 6 pages
    LocationMap.jsx        OpenStreetMap embed + directions
    Accordion.jsx          native details/summary FAQ
    Ui.jsx                 Logo, SectionHeading, Card, Badge, CheckList
    Button.jsx             Link / a / button primitive, brand gradient variant
    Icon.jsx               inline SVG icon set
  pages/
    Home Services ServiceDetail About Resources Faqs Insurance
    Contact Book Refer Specialist Volunteer Share GetHelp Privacy
    FormPage (shared form layout) MobileHome NotFound
```

**To change any copy, start in `src/data/site.js`.** Nearly all text lives
there; page components handle layout only.
