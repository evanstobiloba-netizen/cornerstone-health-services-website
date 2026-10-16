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
 * `tone` picks the surface; `navy` flips the text colours for the one dark
 * band a page is allowed. `rule` draws the hairline that separates editorial
 * sections. Anything that bleeds to the edge belongs in the child markup with
 * `absolute`, so pass `relative overflow-hidden` via `className` then.
 */
const SECTION_TONES = {
  none: '',
  white: 'bg-white',
  calm: 'bg-calm',
  mist: 'bg-mist',
  paper: 'bg-white bg-paper',
  navy: 'bg-mesh-navy text-white',
}

/**
 * Vertical rhythm. Three deliberate steps rather than one flat padding, so a
 * long page has cadence: an opening spread breathes, ordinary sections sit at
 * the default, and interstitials (a figures band, a pull quote) run tight.
 */
const SECTION_SPACING = {
  opening: 'py-20 sm:py-24 lg:py-32',
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
 * The editorial kicker: a small uppercase label that opens a section. Pass
 * `index` to number it ("01 — Services"), which is how the numbered spine of
 * each page is built. `Eyebrow` is kept as an alias for older call sites.
 */
export function Kicker({
  children,
  index,
  light = false,
  icon,
  className = '',
}) {
  return (
    <p
      className={`t-kicker inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${
        light ? 'text-cyan' : 'text-blue-deep'
      } ${className}`}
    >
      {index && (
        <>
          <span
            aria-hidden="true"
            className={`tnum ${light ? 'text-navy-200' : 'text-navy-300'}`}
          >
            {index}
          </span>
          {/* The number is a section mark, so it is separated from the label
              the way a printed folio is: "01 — Welcome". */}
          <span
            aria-hidden="true"
            className={light ? 'text-navy-200' : 'text-navy-300'}
          >
            —
          </span>
        </>
      )}
      {icon && !index && (
        <Icon name={icon} size={14} strokeWidth={2.2} aria-hidden="true" />
      )}
      {children}
    </p>
  )
}

export const Eyebrow = Kicker

/** Opening paragraph of a piece. Larger, more open, meant to be read first. */
export function Deck({ children, light = false, className = '' }) {
  return (
    <p
      className={`t-lead ${light ? 'text-navy-100' : ''} ${className}`}
    >
      {children}
    </p>
  )
}

/** A hairline. The system's default way of dividing anything. */
export function Rule({ className = '', heavy = false, light = false }) {
  return (
    <div
      role="presentation"
      className={`h-px w-full ${
        light
          ? 'bg-white/15'
          : heavy
            ? 'bg-navy'
            : 'bg-[rgba(14,15,59,0.12)]'
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
        className={`${label ? 'mt-5' : ''} ${sizes[size]} ${
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

/** Small tag. Rectangular and uppercase — a label, not a chip. */
export function Badge({ children, tone = 'cyan', icon, className = '' }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-ink border-cyan-200',
    blue: 'bg-blue-50 text-blue-ink border-blue-200',
    navy: 'bg-navy-50 text-navy-600 border-navy-200',
    coral: 'bg-coral-50 text-coral-deep border-coral-100',
    white: 'bg-white text-navy border-navy-200',
    light: 'bg-white/10 text-white border-white/25',
  }
  return (
    <span
      className={`t-kicker inline-flex items-center gap-2 rounded-clinical-sm border px-2.5 py-1 tracking-[0.14em] ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} size={12} strokeWidth={2.4} aria-hidden="true" />}
      {children}
    </span>
  )
}

export const Pill = Badge

/** A block with the hairline that replaces the old softened card. */
export function Card({
  children,
  className = '',
  as: As = 'div',
  interactive = false,
  bordered = true,
  ...rest
}) {
  return (
    <As
      className={`bg-white p-6 sm:p-7 ${
        bordered ? 'border border-[rgba(14,15,59,0.12)]' : ''
      } ${
        interactive
          ? 'group transition duration-200 hover:border-navy-300 hover:shadow-clinical'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </As>
  )
}

/** A ruled list. Separators, not bullets — this is the editorial default. */
export function CheckList({ items, light = false, className = '' }) {
  const line = light ? 'border-white/15' : 'border-[rgba(14,15,59,0.12)]'
  return (
    <ul className={`${className}`}>
      {items.map((item, i) => (
        <li
          key={item}
          className={`flex gap-4 py-3.5 ${
            i === 0 ? 'border-t' : 'border-t'
          } ${line} ${i === items.length - 1 ? 'border-b' : ''}`}
        >
          <Icon
            name="check"
            size={15}
            strokeWidth={2.6}
            className={`mt-1 shrink-0 ${light ? 'text-cyan' : 'text-cyan-deep'}`}
            aria-hidden="true"
          />
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

/** Square icon tile. `tone="gradient"` uses the brand gradient behind navy. */
export function IconBadge({ name, tone = 'cyan', size = 'md', className = '' }) {
  const tones = {
    cyan: 'bg-cyan-50 text-cyan-deep',
    blue: 'bg-blue-50 text-blue-deep',
    coral: 'bg-coral-50 text-coral-deep',
    navy: 'bg-navy text-white',
    gradient: 'bg-brand-gradient text-navy',
    light: 'bg-white/10 text-cyan border border-white/15',
  }
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-13 w-13',
  }
  const glyph = { sm: 17, md: 20, lg: 24 }[size]
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-clinical ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <Icon name={name} size={glyph} aria-hidden="true" />
    </span>
  )
}

/** A single figure in a stats band: big numeral over its label. */
export function Stat({ value, label, light = false }) {
  return (
    <div className="pt-5 rule-top" style={{ borderColor: light ? 'rgba(255,255,255,0.2)' : undefined }}>
      <span
        className={`tnum block font-display leading-none tracking-tight ${
          light ? 'text-cyan' : 'text-navy'
        } text-[2.6rem] sm:text-[3.2rem]`}
      >
        {value}
      </span>
      <span
        className={`t-kicker mt-4 block ${
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
 * clickable row when `to` is given, so the whole line is a target.
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
      <span className="tnum w-8 shrink-0 pt-1 text-[0.78rem] font-semibold text-navy-300">
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

  const rowCls = `group flex gap-5 border-t border-[rgba(14,15,59,0.12)] py-6 ${className}`

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

/** A pull quote. The one place the italic serif is allowed to be large. */
export function PullQuote({ children, attribution, light = false }) {
  return (
    <figure className="max-w-3xl">
      <blockquote
        className={`font-display text-[1.5rem] italic leading-[1.35] tracking-[-0.02em] sm:text-[2rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption
          className={`t-kicker mt-6 ${
            light ? 'text-navy-200' : 'text-navy-400'
          }`}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * A captioned figure. Editorial images always carry a caption or are purely
 * decorative; this component is for the former.
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
        className={`relative overflow-hidden rounded-clinical-lg bg-navy-50 ${aspect}`}
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
        <figcaption className="mt-3 border-t border-[rgba(14,15,59,0.12)] pt-3 text-[0.82rem] leading-relaxed text-navy-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** A ruled key/value list — masthead metadata, office details, opening facts. */
export function MetaList({ items, light = false, className = '' }) {
  const line = light ? 'border-white/15' : 'border-[rgba(14,15,59,0.12)]'
  return (
    <dl className={`${className}`}>
      {items.map(([k, v]) => (
        <div
          key={k}
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t py-3.5 ${line}`}
        >
          <dt
            className={`t-kicker ${light ? 'text-navy-200' : 'text-navy-400'}`}
          >
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
