import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { asset } from '../lib/asset.js'

/**
 * Real brand lockup, supplied as the practice's own PNG assets:
 *   /brand/logo-primary.png  - navy + cyan, for LIGHT backgrounds
 *   /brand/logo-inverse.png  - white + cyan, for DARK backgrounds
 * Both are 434x121 (ratio ~3.586) and were taken from the live site.
 */
export function Logo({ light = false, className = '', height = 36 }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Cornerstone Health Services Inc — home"
    >
      <img
        src={asset(light ? 'brand/logo-inverse.png' : 'brand/logo-primary.png')}
        alt="Cornerstone Health Services Inc"
        width={Math.round(height * 3.586)}
        height={height}
        style={{ height, width: 'auto' }}
        className="shrink-0"
      />
    </Link>
  )
}

/** Horizontal page gutter. Every band's content sits inside one of these. */
export function Container({ children, className = '', size = 'wide' }) {
  const sizes = {
    wide: 'max-w-7xl',
    default: 'max-w-6xl',
    narrow: 'max-w-4xl',
    prose: 'max-w-3xl',
  }
  return (
    <div
      className={`mx-auto w-full ${sizes[size]} px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * A full-width content band with the standard vertical rhythm.
 *
 * `tone` picks the surface; `navy` flips the text colours for a dark band.
 * Anything that needs to bleed to the edge (a bloom, a pattern) belongs in the
 * child markup with `absolute`, so pass `relative overflow-hidden` via
 * `className` when you add one.
 */
const SECTION_TONES = {
  none: '',
  white: 'bg-white',
  calm: 'bg-calm',
  mist: 'bg-mist',
  navy: 'bg-mesh-navy text-white',
}

export function Section({
  children,
  className = '',
  tone = 'none',
  tight = false,
  as: As = 'section',
  ...rest
}) {
  return (
    <As
      className={`${SECTION_TONES[tone]} ${
        tight ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28'
      } ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/**
 * Small uppercase kicker that opens a section. Replaces the live site's
 * handwritten script line: the same "small label above a big heading" pairing,
 * restated in the new type system.
 */
export function Eyebrow({ children, light = false, icon, className = '' }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] ${
        light ? 'text-cyan' : 'text-blue-deep'
      } ${className}`}
    >
      {icon ? (
        <Icon name={icon} size={14} strokeWidth={2.2} />
      ) : (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
        />
      )}
      {children}
    </p>
  )
}

/**
 * Section heading: eyebrow + display heading + optional lede.
 *
 * `as` lets a page hero render the document's single <h1>. `script` is accepted
 * as an alias for `eyebrow` so older call sites keep working.
 */
export function SectionHeading({
  eyebrow,
  script,
  title,
  body,
  align = 'left',
  light = false,
  as: As = 'h2',
  size = 'lg',
  className = '',
}) {
  const label = eyebrow ?? script
  const sizes = {
    xl: 'text-[2.5rem] leading-[1.05] sm:text-[3.4rem] lg:text-[4.25rem]',
    lg: 'text-[2rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.2rem]',
    md: 'text-[1.6rem] leading-[1.12] sm:text-[2rem]',
    sm: 'text-xl leading-snug sm:text-2xl',
  }
  return (
    <div
      className={`${
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'
      } ${className}`}
    >
      {label && <Eyebrow light={light}>{label}</Eyebrow>}
      <As
        className={`${label ? 'mt-4' : ''} ${sizes[size]} font-medium ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </As>
      {body && (
        <p
          className={`mt-5 text-[1.05rem] leading-relaxed ${
            light ? 'text-navy-100' : 'text-body'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  )
}

/** Small pill label. `tone` matches the surface it sits on. */
export function Badge({ children, tone = 'cyan', icon, className = '' }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-ink ring-cyan-200',
    blue: 'bg-blue-50 text-blue-ink ring-blue-200',
    navy: 'bg-navy-50 text-navy-600 ring-navy-200',
    coral: 'bg-coral-50 text-coral-deep ring-coral-100',
    white: 'bg-white text-navy ring-navy-100 shadow-clinical',
    light: 'bg-white/10 text-white ring-white/25',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold ring-1 ring-inset ${
        tones[tone]
      } ${className}`}
    >
      {icon && <Icon name={icon} size={13} strokeWidth={2.2} />}
      {children}
    </span>
  )
}

export const Pill = Badge

/**
 * The single surface used across the site: soft white, hairline ring, soft
 * shadow. `interactive` adds the lift used by clickable cards.
 */
export function Card({
  children,
  className = '',
  as: As = 'div',
  interactive = false,
  ...rest
}) {
  return (
    <As
      className={`rounded-clinical-lg bg-white p-6 shadow-clinical ring-1 ring-navy-100/70 sm:p-7 ${
        interactive
          ? 'transition duration-200 hover:-translate-y-1 hover:shadow-clinical-lg hover:ring-navy-200'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/** Small check-list used across services, timeline and about sections. */
export function CheckList({ items, light = false, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
              light ? 'bg-cyan/20 text-cyan' : 'bg-cyan-50 text-cyan-deep'
            }`}
          >
            <Icon name="check" size={12} strokeWidth={2.8} />
          </span>
          <span
            className={`text-[0.95rem] leading-relaxed ${
              light ? 'text-navy-100' : 'text-body'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Square icon tile. `tone="gradient"` uses the brand gradient behind navy. */
export function IconBadge({
  name,
  tone = 'cyan',
  size = 'md',
  className = '',
}) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-deep',
    blue: 'bg-blue-50 text-blue-deep',
    coral: 'bg-coral-50 text-coral-deep',
    navy: 'bg-navy text-white',
    gradient: 'bg-brand-gradient text-navy shadow-clinical',
    light: 'bg-white/10 text-cyan ring-1 ring-inset ring-white/15',
  }
  const sizes = {
    sm: 'h-10 w-10 rounded-clinical-sm',
    md: 'h-12 w-12 rounded-clinical',
    lg: 'h-14 w-14 rounded-clinical',
  }
  const glyph = { sm: 19, md: 22, lg: 26 }[size]
  return (
    <span
      className={`grid shrink-0 place-items-center ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <Icon name={name} size={glyph} />
    </span>
  )
}

/** A single figure in the stats band. */
export function Stat({ value, label, light = false }) {
  return (
    <div className="text-center">
      <span
        className={`block font-display text-4xl font-medium leading-none tracking-tight sm:text-5xl ${
          light ? 'text-cyan' : 'text-navy'
        }`}
      >
        {value}
      </span>
      <span
        className={`mt-3 block text-[0.78rem] font-semibold uppercase leading-snug tracking-[0.14em] ${
          light ? 'text-navy-200' : 'text-navy-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

/** Google-Maps directions deep link for the practice address. */
export function directionsUrl(oneLine) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(oneLine)}`
}
