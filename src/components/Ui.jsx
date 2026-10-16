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

/** Page gutter and measure. Every band's content sits inside one of these. */
export function Container({
  children,
  className = '',
  size = 'wide',
  as: As = 'div',
}) {
  const sizes = {
    wide: 'max-w-[84rem]',
    default: 'max-w-6xl',
    narrow: 'max-w-4xl',
    prose: 'max-w-[68ch]',
  }
  return (
    <As
      className={`mx-auto w-full ${sizes[size]} px-5 sm:px-7 lg:px-10 ${className}`}
    >
      {children}
    </As>
  )
}

/**
 * A full-width content band.
 *
 * `tone` picks the surface. In this system the surfaces are warm — cream is
 * the page, sand is the second band, white is the brightest — and `navy` is the
 * single deep band a page is allowed (plus the footer). Sections are separated
 * by space and hue, so `rule` is available but rarely needed.
 */
const SECTION_TONES = {
  none: '',
  white: 'bg-white',
  calm: 'bg-cream',
  cream: 'bg-cream',
  mist: 'bg-sand',
  sand: 'bg-sand',
  blush: 'bg-blush',
  soft: 'bg-mesh-soft',
  paper: 'bg-paper',
  navy: 'bg-mesh-navy text-white',
}

/**
 * Vertical rhythm. Three deliberate steps rather than one flat padding, so a
 * long page has cadence: an opening spread breathes, ordinary sections sit at
 * the default, and interstitials (a figures band, a pull quote) run tight.
 */
const SECTION_SPACING = {
  opening: 'py-20 sm:py-24 lg:py-28',
  default: 'py-16 sm:py-20 lg:py-24',
  dense: 'py-12 sm:py-14 lg:py-16',
}

export function Section({
  children,
  className = '',
  tone = 'none',
  tight = false,
  spacing,
  rule = false,
  as: As = 'section',
  ...rest
}) {
  const pad = tight
    ? SECTION_SPACING.dense
    : (SECTION_SPACING[spacing] ?? SECTION_SPACING.default)
  return (
    <As
      className={`${SECTION_TONES[tone]} ${pad} ${rule ? 'rule-top' : ''} ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/**
 * The kicker: a small uppercase label that opens a section. Pass `index` for a
 * section number, rendered fondly as a round sand chip; otherwise a small
 * gradient dot leads the label, which is the warmest possible way to say
 * "here begins a section" without drawing a line.
 *
 * The number, the dot and the icon are all decorative duplication, so they are
 * hidden from assistive tech — the label alone carries the meaning. `Eyebrow`
 * is kept as an alias for older call sites.
 */
export function Kicker({
  children,
  index,
  light = false,
  icon,
  className = '',
}) {
  const tone = light ? 'text-cyan' : 'text-blue-deep'
  return (
    <span
      className={`t-kicker inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 ${tone} ${className}`}
    >
      {index && (
        <span
          aria-hidden="true"
          className={`tnum grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.68rem] font-bold ${
            light ? 'bg-white/10 text-cyan' : 'bg-sand text-navy-500'
          }`}
        >
          {index}
        </span>
      )}
      {icon ? (
        <Icon name={icon} size={13} strokeWidth={2.4} aria-hidden="true" />
      ) : (
        !index && (
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              light ? 'bg-cyan' : 'bg-brand-gradient'
            }`}
          />
        )
      )}
      <span>{children}</span>
    </span>
  )
}

export const Eyebrow = Kicker

/** Opening paragraph of a piece. Larger, more open, meant to be read first. */
export function Deck({ children, light = false, className = '' }) {
  return (
    <p className={`t-lead ${light ? 'text-navy-100' : ''} ${className}`}>
      {children}
    </p>
  )
}

/** A hairline. Available, but space and hue do the dividing in this system. */
export function Rule({ className = '', heavy = false, light = false }) {
  return (
    <div
      role="presentation"
      className={`h-px w-full ${
        light ? 'bg-white/15' : heavy ? 'bg-navy' : 'bg-line'
      } ${className}`}
    />
  )
}

/**
 * Section heading: kicker + display heading + optional deck.
 *
 * `as` lets a page hero render the document's single <h1>. `script` and
 * `eyebrow` are both accepted so every existing call site keeps working.
 */
export function SectionHeading({
  eyebrow,
  script,
  index,
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
    xl: 't-display',
    lg: 't-title',
    md: 't-subtitle',
    sm: 't-subtitle-sm',
  }
  return (
    <div
      className={`${
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'
      } ${className}`}
    >
      {label && (
        <Kicker light={light} index={index}>
          {label}
        </Kicker>
      )}
      <As
        className={`${label ? 'mt-6' : ''} ${sizes[size]} ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </As>
      {body && (
        <Deck light={light} className="mt-5 max-w-2xl">
          {body}
        </Deck>
      )}
    </div>
  )
}

/** Small rounded tag. A soft chip, not a boxed label. */
export function Badge({ children, tone = 'cyan', icon, className = '' }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-ink',
    blue: 'bg-blue-50 text-blue-ink',
    navy: 'bg-navy-50 text-navy-600',
    coral: 'bg-coral-50 text-coral-deep',
    sand: 'bg-sand text-navy-600',
    white: 'bg-white text-navy shadow-clinical',
    light: 'bg-white/10 text-white border border-white/20',
  }
  return (
    <span
      className={`t-kicker inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} size={12} strokeWidth={2.4} aria-hidden="true" />}
      {children}
    </span>
  )
}

export const Pill = Badge

/**
 * A lifted surface: white on the warm page, quietly shadowed, generously
 * rounded. This is the system's default container — there is no border.
 */
export function Card({
  children,
  className = '',
  as: As = 'div',
  interactive = false,
  padded = true,
  ...rest
}) {
  return (
    <As
      className={`rounded-clinical-lg bg-white shadow-clinical ${
        padded ? 'p-6 sm:p-7' : ''
      } ${
        interactive
          ? 'group transition duration-300 hover:-translate-y-1 hover:shadow-clinical-lg'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/** Soft rows, each with a round check tile — a list you can read at a glance. */
export function CheckList({ items, light = false, className = '' }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3.5 rounded-clinical px-4 py-3 ${
            light ? 'bg-white/[0.06]' : 'bg-white/70'
          }`}
        >
          <span
            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
              light ? 'bg-white/10 text-cyan' : 'bg-cyan-50 text-cyan-deep'
            }`}
          >
            <Icon name="check" size={13} strokeWidth={3} aria-hidden="true" />
          </span>
          <span
            className={`text-[0.97rem] leading-relaxed ${
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

/** Round icon tile. `tone="gradient"` uses the brand gradient behind navy. */
export function IconBadge({ name, tone = 'cyan', size = 'md', className = '' }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-deep',
    blue: 'bg-blue-50 text-blue-deep',
    coral: 'bg-coral-50 text-coral-deep',
    sand: 'bg-sand text-navy-600',
    navy: 'bg-navy text-white',
    gradient: 'bg-brand-gradient text-navy',
    light: 'bg-white/10 text-cyan border border-white/15',
  }
  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
    xl: 'h-16 w-16',
  }
  const glyph = { sm: 18, md: 21, lg: 25, xl: 28 }[size]
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <Icon name={name} size={glyph} aria-hidden="true" />
    </span>
  )
}

/** A single figure in a stats band: big numeral over its label. */
export function Stat({ value, label, light = false }) {
  return (
    <div
      className={`h-full rounded-clinical p-5 sm:p-6 ${
        light ? 'bg-white/[0.06]' : 'bg-sand/80'
      }`}
    >
      <span
        className={`tnum block font-display leading-none tracking-tight ${
          light ? 'text-cyan' : 'text-navy'
        } text-[2.4rem] sm:text-[2.9rem]`}
      >
        {value}
      </span>
      <span
        className={`t-kicker mt-3.5 block ${
          light ? 'text-navy-200' : 'text-navy-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * A numbered row for an index or a table of contents. Rendered as the whole
 * clickable row when `to` is given, so the whole line is a target. Rows lift
 * on hover rather than being divided by rules.
 */
export function IndexRow({
  index,
  title,
  meta,
  body,
  to,
  href,
  trailing = 'arrow',
  className = '',
}) {
  const label = (
    <>
      <span className="tnum grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-[0.78rem] font-semibold text-navy-500">
        {index}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="t-subtitle text-navy">{title}</span>
          {meta && <span className="t-kicker text-navy-400">{meta}</span>}
        </span>
        {body && (
          <span className="mt-2 block max-w-2xl text-[0.97rem] leading-relaxed text-body">
            {body}
          </span>
        )}
      </span>
      <Icon
        name={trailing}
        size={18}
        aria-hidden="true"
        className="mt-1.5 shrink-0 self-center text-navy-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-navy"
      />
    </>
  )

  const rowCls = `group flex gap-5 rounded-clinical border border-line bg-white/70 px-5 py-5 transition duration-200 ${
    to || href ? 'hover:-translate-y-0.5 hover:bg-white hover:shadow-clinical' : ''
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={rowCls}>
        {label}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={rowCls}>
        {label}
      </a>
    )
  }
  return <div className={rowCls}>{label}</div>
}

/** A pull quote. The display face, large, with a soft coral mark. */
export function PullQuote({ children, attribution, light = false }) {
  return (
    <figure className="max-w-3xl">
      <blockquote
        className={`font-display text-[1.4rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-[1.85rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        <span aria-hidden="true" className="text-coral">
          “
        </span>
        {children}
      </blockquote>
      {attribution && (
        <figcaption
          className={`t-kicker mt-6 ${light ? 'text-navy-200' : 'text-navy-400'}`}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * A captioned figure. Images carry a soft warm shadow and generous rounding;
 * a caption sits under it as quiet supporting text.
 */
export function Figure({
  src,
  alt = '',
  caption,
  aspect = 'aspect-[3/2]',
  className = '',
  eager = false,
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-clinical-lg bg-sand shadow-clinical-lg ${aspect}`}
      >
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>
      {caption && (
        <figcaption className="mt-3.5 px-1 text-[0.85rem] leading-relaxed text-navy-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Key/value facts as soft rows — office details, opening facts, opening hours. */
export function MetaList({ items, light = false, className = '' }) {
  return (
    <dl className={`space-y-2.5 ${className}`}>
      {items.map(([k, v]) => (
        <div
          key={k}
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-clinical px-4 py-3 ${
            light ? 'bg-white/[0.06]' : 'bg-white/70'
          }`}
        >
          <dt className={`t-kicker ${light ? 'text-navy-200' : 'text-navy-400'}`}>
            {k}
          </dt>
          <dd
            className={`text-[0.95rem] font-medium ${
              light ? 'text-white' : 'text-navy'
            }`}
          >
            {v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Google-Maps directions deep link for the practice address. */
export function directionsUrl(oneLine) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(oneLine)}`
}
