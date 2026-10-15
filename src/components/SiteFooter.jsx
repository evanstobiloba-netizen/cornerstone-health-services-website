import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addressOneLine, crisis, footerNav, practice } from '../data/site.js'
import Icon from './Icon.jsx'
import { Logo } from './Ui.jsx'

/** Build-time year, inlined by Vite. Falls back if the define is absent. */
const BUILD_YEAR =
  typeof __BUILD_YEAR__ === 'number' ? __BUILD_YEAR__ : new Date().getFullYear()

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20"
    >
      {children}
    </a>
  )
}

function ContactTile({ icon, label, tone, children }) {
  const tones = {
    cyan: 'bg-cyan/15 text-cyan',
    blue: 'bg-blue/15 text-blue',
  }
  return (
    <div className="flex items-start gap-3">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-clinical ${tones[tone]}`}
      >
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-200">
          {label}
        </span>
        <span className="mt-1 block font-semibold text-white">{children}</span>
      </span>
    </div>
  )
}

export default function SiteFooter() {
  /**
   * Start from the build-time year so the first client render matches the
   * prerendered HTML exactly, then correct it after mount if the calendar has
   * rolled over since the build. This avoids a hydration mismatch without the
   * copyright year ever going stale.
   */
  const [year, setYear] = useState(BUILD_YEAR)
  useEffect(() => {
    const actual = new Date().getFullYear()
    if (actual !== BUILD_YEAR) setYear(actual)
  }, [])

  return (
    <footer className="mt-auto bg-mesh-navy text-navy-100">
      <div aria-hidden="true" className="h-px w-full rule-brand" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light height={40} />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-navy-200">
              Compassionate, evidence-based psychiatric care for adults 18–80.
              In person in Quincy, or by telehealth across Massachusetts.
            </p>

            <div className="mt-6 flex gap-2.5">
              <Social
                href={practice.social.facebook}
                label="Cornerstone Health Services on Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8h3.2Z" />
                </svg>
              </Social>
              <Social
                href={practice.social.instagram}
                label="Cornerstone Health Services on Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </Social>
            </div>

            <p className="mt-7 text-xs leading-relaxed text-navy-200">
              Founded {practice.founded} · {practice.serves}
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cyan">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3 text-[0.95rem]">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-navy-200 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact block */}
        <div className="mt-14 grid gap-7 rounded-clinical-lg border border-white/10 bg-white/[0.04] p-7 sm:grid-cols-3">
          <a href={practice.phoneHref} className="group">
            <ContactTile icon="phone" label="Talk to us" tone="cyan">
              <span className="group-hover:underline">{practice.phoneDisplay}</span>
            </ContactTile>
          </a>

          <a href={`mailto:${practice.email}`} className="group">
            <ContactTile icon="document" label="Message us at" tone="blue">
              <span className="break-all group-hover:underline">{practice.email}</span>
            </ContactTile>
          </a>

          <ContactTile icon="map-pin" label="Visit us" tone="cyan">
            <address className="not-italic leading-relaxed">
              {practice.address.line1} {practice.address.line2}
              <br />
              {practice.address.city}, {practice.address.stateLong}{' '}
              {practice.address.zip}
            </address>
          </ContactTile>
        </div>

        {/* Crisis block - always present in the footer as well as the ribbon. */}
        <div className="mt-7 rounded-clinical-lg border border-coral/40 bg-coral/15 p-6">
          <p className="flex items-center gap-2 font-semibold text-white">
            <Icon name="alert-triangle" size={17} />
            24/7 crisis support
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-100">
            Call or text{' '}
            <a
              href={crisis.lifelineHref}
              className="font-bold text-white underline underline-offset-4"
            >
              {crisis.lifeline}
            </a>{' '}
            — the {crisis.lifelineText}, free and confidential, 24/7. For a
            life-threatening emergency, call {crisis.emergency}.
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <p className="max-w-4xl text-xs leading-relaxed text-navy-200">
            This website is for general information and is not a substitute for
            individual medical advice, diagnosis, or treatment. Contacting
            Cornerstone Health Services Inc does not by itself establish a
            clinician–patient relationship. If you are in crisis, please use the
            988 Lifeline or call 911.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-navy-200 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {practice.legalName}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link
                to="/privacy-policy"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Privacy Policy
              </Link>
              <a
                href={practice.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {practice.domain}
                <Icon name="external-link" size={12} />
              </a>
            </p>
          </div>
          <p className="sr-only">{addressOneLine}</p>
        </div>
      </div>
    </footer>
  )
}
